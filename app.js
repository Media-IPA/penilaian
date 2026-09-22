/**
 * js/app.js
 * Pengontrol Utama Aplikasi WARDIPA LKPD Rubrik Manager
 */

import {
  initDB,
  getAllPenilaian,
  getPenilaianFiltered,
  getPenilaianById,
  savePenilaian,
  deletePenilaian,
  getGroupHistory,
  getAllTopik,
  saveTopik,
  deleteTopik,
  getAllKelompok,
  saveKelompok,
  getSettings,
  saveSettings,
  exportFullDatabase,
  importFullDatabase,
  resetDatabase
} from './db.js';

import {
  DEFAULT_RUBRIK,
  getMengaplikasiInfo,
  getMerefleksiInfo,
  formatBintang
} from './rubrik.js';

import { analyzeGroupFlags, getEntryFlags } from './flags.js';
import {
  renderTrendLineChart,
  renderSelfRatingComparisonChart,
  downloadChartAsPng,
  getGroupColor
} from './charts.js';

import { exportToCSV, triggerPrintReport, downloadJsonBackup } from './export.js';
import {
  startCamera,
  stopCamera,
  capturePhotoFromVideo,
  readFileAsDataUrl,
  analyzeLkpdImage
} from './ai-scanner.js';

// State Global Aplikasi
const AppState = {
  currentTab: 'dashboard',
  topikList: [],
  kelompokList: [],
  selectedTopikId: null,
  selectedPertemuan: 'all',
  activeEntryId: null, // Jika sedang mengedit
  attachedPhotoUrl: null,
  isAiAssisted: false,
  settings: null,
  deferredPwaPrompt: null
};

// ==================== INISIALISASI APLIKASI ====================
document.addEventListener('DOMContentLoaded', async () => {
  setupPwa();
  await initDB();
  await loadBaseData();
  setupNavigation();
  setupEventListeners();
  renderDashboard();
});

// PWA Service Worker & Install Prompt
function setupPwa() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('SW registration note:', err);
      });
    });
  }

  const btnInstall = document.getElementById('btnInstallPwa');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    AppState.deferredPwaPrompt = e;
    if (btnInstall) btnInstall.style.display = 'inline-flex';
  });

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      if (AppState.deferredPwaPrompt) {
        AppState.deferredPwaPrompt.prompt();
        const { outcome } = await AppState.deferredPwaPrompt.userChoice;
        if (outcome === 'accepted') {
          btnInstall.style.display = 'none';
        }
        AppState.deferredPwaPrompt = null;
      }
    });
  }
}

// Memuat data awal dari DB
async function loadBaseData() {
  AppState.settings = await getSettings();
  AppState.topikList = await getAllTopik();
  AppState.kelompokList = await getAllKelompok();

  if (AppState.topikList.length > 0 && !AppState.selectedTopikId) {
    AppState.selectedTopikId = AppState.topikList[0].id;
  }

  populateTopikDropdowns();
  populateKelompokDropdowns();
  initCompositeSettingsUI();
}

function populateTopikDropdowns() {
  const selects = [
    document.getElementById('dashFilterTopik'),
    document.getElementById('inputTopik'),
    document.getElementById('trenFilterTopik'),
    document.getElementById('detailSelectTopik')
  ];

  selects.forEach(sel => {
    if (!sel) return;
    sel.innerHTML = '';
    AppState.topikList.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `${t.nama} (${t.kelas || 'IPA'})`;
      sel.appendChild(opt);
    });
    if (AppState.selectedTopikId) sel.value = AppState.selectedTopikId;
  });
}

function populateKelompokDropdowns() {
  const selects = [
    document.getElementById('inputKelompok'),
    document.getElementById('detailSelectKelompok')
  ];

  selects.forEach(sel => {
    if (!sel) return;
    sel.innerHTML = '';
    AppState.kelompokList.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k.id;
      opt.textContent = k.nama;
      sel.appendChild(opt);
    });
  });
}

// ==================== NAVIGASI ANTAR TAB ====================
function setupNavigation() {
  const navBtns = document.querySelectorAll('[data-tab]');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  const btnQuickInput = document.getElementById('btnQuickInput');
  if (btnQuickInput) {
    btnQuickInput.addEventListener('click', () => switchTab('input'));
  }
}

export function switchTab(tabId) {
  AppState.currentTab = tabId;

  // Update nav buttons
  document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Update tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tabId}`);
  });

  // Render tab terkait
  if (tabId === 'dashboard') {
    renderDashboard();
  } else if (tabId === 'tren') {
    renderTrenCharts();
  } else if (tabId === 'detail') {
    renderGroupDetail();
  } else if (tabId === 'rubrik') {
    renderRubrikTab();
  } else if (tabId === 'ekspor') {
    renderExportTab();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== TAB 1: DASHBOARD REKAP ====================
async function renderDashboard() {
  const topikId = AppState.selectedTopikId;
  const pertemuanFilter = AppState.selectedPertemuan;

  const allEntries = await getAllPenilaian();
  const topikEntries = allEntries.filter(e => e.topik_id === topikId);

  // Update opsi dropdown pertemuan
  const pertemuanSet = new Set(topikEntries.map(e => Number(e.pertemuan_ke)));
  const pertemuanList = Array.from(pertemuanSet).sort((a, b) => a - b);

  const filterPertemuanEl = document.getElementById('dashFilterPertemuan');
  if (filterPertemuanEl) {
    const currentVal = filterPertemuanEl.value;
    filterPertemuanEl.innerHTML = '<option value="all">Semua Pertemuan</option>';
    pertemuanList.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = `Pertemuan ${p}`;
      filterPertemuanEl.appendChild(opt);
    });
    if (pertemuanList.map(String).includes(currentVal) || currentVal === 'all') {
      filterPertemuanEl.value = currentVal;
    }
  }

  // Filter entri yang akan ditampilkan di kartu
  let displayEntries = topikEntries;
  if (pertemuanFilter !== 'all') {
    displayEntries = displayEntries.filter(e => Number(e.pertemuan_ke) === Number(pertemuanFilter));
  } else {
    // Jika semua pertemuan, tampilkan entri pertemuan terbaru per kelompok
    const latestMap = new Map();
    topikEntries.forEach(e => {
      const existing = latestMap.get(e.id_kelompok);
      if (!existing || Number(e.pertemuan_ke) > Number(existing.pertemuan_ke)) {
        latestMap.set(e.id_kelompok, e);
      }
    });
    displayEntries = Array.from(latestMap.values());
  }

  // Render Flag Anomali Global
  renderGlobalFlagBanners(topikEntries);

  // Render Kartu Kelompok
  const gridEl = document.getElementById('dashboardCardsGrid');
  if (!gridEl) return;
  gridEl.innerHTML = '';

  if (displayEntries.length === 0) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">📝</span>
        <h3 style="color: #fff; margin-bottom: 0.5rem;">Belum Ada Data Penilaian untuk Topik Ini</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.25rem;">Mulai input nilai LKPD pertama Anda untuk kelompok siswa.</p>
        <button class="btn btn-primary" onclick="window.WARDIPA.switchTab('input')">➕ Input Nilai Sekarang</button>
      </div>
    `;
    return;
  }

  // Urutkan entri berdasarkan nama kelompok
  displayEntries.sort((a, b) => (a.nama_kelompok || '').localeCompare(b.nama_kelompok || ''));

  displayEntries.forEach(entry => {
    const card = createGroupCard(entry, topikEntries);
    gridEl.appendChild(card);
  });
}

function renderGlobalFlagBanners(topikEntries) {
  const container = document.getElementById('flagBannerContainer');
  if (!container) return;
  container.innerHTML = '';

  // Kumpulkan flags dari semua kelompok
  const allFlags = [];
  AppState.kelompokList.forEach(group => {
    const groupHistory = topikEntries
      .filter(e => e.id_kelompok === group.id)
      .sort((a, b) => Number(a.pertemuan_ke) - Number(b.pertemuan_ke));

    const analysis = analyzeGroupFlags(groupHistory);
    if (analysis.hasFlags) {
      analysis.flags.forEach(f => {
        allFlags.push({ ...f, groupName: group.nama });
      });
    }
  });

  if (allFlags.length === 0) return;

  allFlags.forEach(f => {
    const banner = document.createElement('div');
    banner.className = `flag-alert ${f.severity}`;
    banner.innerHTML = `
      <div class="flag-alert-icon">${f.icon}</div>
      <div class="flag-alert-body">
        <div class="flag-alert-title">${f.groupName} — ${f.judul}</div>
        <div class="flag-alert-desc">${f.pesan}</div>
      </div>
    `;
    container.appendChild(banner);
  });
}

function createGroupCard(entry, allTopikEntries) {
  const card = document.createElement('div');
  card.className = 'group-card';

  const entryFlags = getEntryFlags(entry, allTopikEntries);
  const hasAnomaly = entryFlags.some(f => f.type === 'ANOMALI_KOGNITIF_REFLEKSI');
  if (hasAnomaly) {
    card.classList.add('has-anomaly');
  }

  const aplInfo = getMengaplikasiInfo(entry.mengaplikasi?.level);
  const refInfo = getMerefleksiInfo(entry.merefleksi?.level);
  const stars = entry.merefleksi?.self_rating_siswa || 1;

  // Perhitungan Skor Komposit (jika aktif)
  let compositeHtml = '';
  if (AppState.settings?.showComposite) {
    const w = AppState.settings.compositeWeights || { memahami: 40, mengaplikasi: 30, merefleksi: 30 };
    const memScore = entry.memahami?.skor_persen || 0;
    const aplNorm = ((entry.mengaplikasi?.level || 1) / 4) * 100;
    const refNorm = ((entry.merefleksi?.level || 1) / 4) * 100;
    const compScore = ((memScore * w.memahami) + (aplNorm * w.mengaplikasi) + (refNorm * w.merefleksi)) / 100;

    compositeHtml = `
      <div style="background: rgba(2, 132, 199, 0.12); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: var(--radius-sm); padding: 0.4rem 0.6rem; margin-bottom: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.75rem; color: #bae6fd;">Skor Komposit (Bobot ${w.memahami}%:${w.mengaplikasi}%:${w.merefleksi}%):</span>
        <strong style="font-size: 1rem; color: #38bdf8;">${compScore.toFixed(1)}</strong>
      </div>
    `;
  }

  // Flag badge per kartu
  let flagsBadgesHtml = '';
  if (entryFlags.length > 0) {
    flagsBadgesHtml = `
      <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
        ${entryFlags.map(f => `
          <span class="badge ${f.severity === 'danger' ? 'badge-rose' : 'badge-amber'}" title="${f.pesan}">
            ${f.icon} ${f.judul}
          </span>
        `).join('')}
      </div>
    `;
  }

  // Kutipan Refleksi
  const quoteText = entry.merefleksi?.teks_jawaban?.trim() 
    ? `"${entry.merefleksi.teks_jawaban}"` 
    : '<span style="color: var(--text-dim);">(Tidak ada catatan teks refleksi)</span>';

  card.innerHTML = `
    <div class="group-card-header">
      <div>
        <h3 class="group-name">${entry.nama_kelompok || 'Kelompok'}</h3>
        <div class="group-members">${entry.anggota || 'Anggota belum diisi'}</div>
      </div>
      <span class="meeting-badge">Pertemuan ${entry.pertemuan_ke}</span>
    </div>

    ${flagsBadgesHtml}
    ${compositeHtml}

    <!-- 3 Dimensi Berdampingan -->
    <div class="pillars-container">
      <!-- Dimensi 1: Memahami -->
      <div class="pillar-col">
        <span class="pillar-title memahami">1. Memahami</span>
        <div class="pillar-value" style="color: var(--color-memahami);">
          ${entry.memahami?.skor_persen ?? 0}%
        </div>
        <span class="pillar-sub">${entry.memahami?.jumlah_benar ?? 0}/${entry.memahami?.total_soal ?? 0} Benar</span>
      </div>

      <!-- Dimensi 2: Mengaplikasi -->
      <div class="pillar-col">
        <span class="pillar-title mengaplikasi">2. Mengaplikasi</span>
        <div class="pillar-value" style="color: var(--color-mengaplikasi);">
          L${entry.mengaplikasi?.level ?? 1}
        </div>
        <span class="pillar-sub">${aplInfo.label}</span>
      </div>

      <!-- Dimensi 3: Merefleksi -->
      <div class="pillar-col">
        <span class="pillar-title merefleksi">3. Merefleksi</span>
        <div class="pillar-value" style="color: var(--color-merefleksi);">
          L${entry.merefleksi?.level ?? 1}
        </div>
        <span class="pillar-sub" style="color: var(--color-bintang); font-weight: bold;">
          ${formatBintang(stars)}
        </span>
      </div>
    </div>

    <!-- Kutipan Refleksi Kualitatif Siswa -->
    <div class="quote-box" title="Teks Refleksi Siswa">
      ${quoteText}
    </div>

    <div class="card-footer">
      <div style="display: flex; gap: 0.4rem;">
        <button class="btn btn-outline btn-sm btn-detail-group" data-group-id="${entry.id_kelompok}">
          <span>👥</span> Riwayat
        </button>
        ${entry.lampiran_foto ? `
          <button class="btn btn-secondary btn-sm btn-view-photo" data-photo-url="${entry.lampiran_foto}" data-title="${entry.nama_kelompok} - P${entry.pertemuan_ke}">
            <span>📷</span> Foto
          </button>
        ` : ''}
      </div>

      <div style="display: flex; gap: 0.4rem;">
        <button class="btn btn-secondary btn-sm btn-edit-entry" data-id="${entry.id}">
          <span>✏️</span> Edit
        </button>
        <button class="btn btn-secondary btn-sm btn-delete-entry" data-id="${entry.id}" style="color: #f87171;">
          🗑️
        </button>
      </div>
    </div>
  `;

  // Event handlers kartu
  card.querySelector('.btn-detail-group').addEventListener('click', () => {
    const sel = document.getElementById('detailSelectKelompok');
    if (sel) sel.value = entry.id_kelompok;
    switchTab('detail');
  });

  const viewPhotoBtn = card.querySelector('.btn-view-photo');
  if (viewPhotoBtn) {
    viewPhotoBtn.addEventListener('click', () => {
      openPhotoModal(entry.lampiran_foto, `${entry.nama_kelompok} - Pertemuan ${entry.pertemuan_ke}`);
    });
  }

  card.querySelector('.btn-edit-entry').addEventListener('click', () => {
    loadEntryToForm(entry);
    switchTab('input');
  });

  card.querySelector('.btn-delete-entry').addEventListener('click', async () => {
    if (confirm(`Hapus data penilaian ${entry.nama_kelompok} Pertemuan ${entry.pertemuan_ke}?`)) {
      await deletePenilaian(entry.id);
      showToast('Data penilaian berhasil dihapus.', 'info');
      renderDashboard();
    }
  });

  return card;
}

// ==================== PANEL SKOR KOMPOSIT ====================
function initCompositeSettingsUI() {
  const toggle = document.getElementById('toggleCompositeScore');
  const weightsSection = document.getElementById('compositeWeightsSection');
  const sliderM = document.getElementById('sliderWeightMemahami');
  const sliderA = document.getElementById('sliderWeightMengaplikasi');
  const sliderR = document.getElementById('sliderWeightMerefleksi');

  if (!toggle) return;

  const showComp = AppState.settings?.showComposite || false;
  toggle.checked = showComp;
  if (weightsSection) weightsSection.style.display = showComp ? 'grid' : 'none';

  const w = AppState.settings?.compositeWeights || { memahami: 40, mengaplikasi: 30, merefleksi: 30 };
  if (sliderM) sliderM.value = w.memahami;
  if (sliderA) sliderA.value = w.mengaplikasi;
  if (sliderR) sliderR.value = w.merefleksi;
  updateWeightsDisplay();

  toggle.addEventListener('change', async () => {
    AppState.settings.showComposite = toggle.checked;
    if (weightsSection) weightsSection.style.display = toggle.checked ? 'grid' : 'none';
    await saveSettings(AppState.settings);
    renderDashboard();
  });

  [sliderM, sliderA, sliderR].forEach(slider => {
    if (!slider) return;
    slider.addEventListener('input', async () => {
      updateWeightsDisplay();
      AppState.settings.compositeWeights = {
        memahami: Number(sliderM.value),
        mengaplikasi: Number(sliderA.value),
        merefleksi: Number(sliderR.value)
      };
      await saveSettings(AppState.settings);
      renderDashboard();
    });
  });
}

function updateWeightsDisplay() {
  const m = Number(document.getElementById('sliderWeightMemahami')?.value || 40);
  const a = Number(document.getElementById('sliderWeightMengaplikasi')?.value || 30);
  const r = Number(document.getElementById('sliderWeightMerefleksi')?.value || 30);

  const lblM = document.getElementById('valWeightMemahami');
  const lblA = document.getElementById('valWeightMengaplikasi');
  const lblR = document.getElementById('valWeightMerefleksi');
  const statusEl = document.getElementById('totalWeightStatus');

  if (lblM) lblM.textContent = m;
  if (lblA) lblA.textContent = a;
  if (lblR) lblR.textContent = r;

  const total = m + a + r;
  if (statusEl) {
    statusEl.textContent = `Total: ${total}%`;
    statusEl.className = total === 100 ? 'badge badge-emerald' : 'badge badge-rose';
  }
}

// ==================== TAB 2: INPUT NILAI CEPAT ====================
function setupInputForm() {
  const inputBenar = document.getElementById('inputJumlahBenar');
  const inputTotal = document.getElementById('inputTotalSoal');
  const displayPersen = document.getElementById('displaySkorMemahami');

  const updateMemahamiCalc = () => {
    const b = Number(inputBenar.value) || 0;
    const t = Math.max(1, Number(inputTotal.value) || 10);
    const pct = Math.round((b / t) * 100);
    displayPersen.textContent = `${pct}%`;
  };

  document.getElementById('btnDecBenar')?.addEventListener('click', () => {
    inputBenar.value = Math.max(0, Number(inputBenar.value) - 1);
    updateMemahamiCalc();
  });
  document.getElementById('btnIncBenar')?.addEventListener('click', () => {
    inputBenar.value = Math.min(Number(inputTotal.value), Number(inputBenar.value) + 1);
    updateMemahamiCalc();
  });
  document.getElementById('btnDecTotal')?.addEventListener('click', () => {
    inputTotal.value = Math.max(1, Number(inputTotal.value) - 1);
    updateMemahamiCalc();
  });
  document.getElementById('btnIncTotal')?.addEventListener('click', () => {
    inputTotal.value = Number(inputTotal.value) + 1;
    updateMemahamiCalc();
  });
  inputBenar?.addEventListener('input', updateMemahamiCalc);
  inputTotal?.addEventListener('input', updateMemahamiCalc);

  // Rubrik Mengaplikasi Selector
  const mengaplikasiBtns = document.querySelectorAll('#mengaplikasiRubricSelector .rubric-opt-btn');
  mengaplikasiBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mengaplikasiBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Star Rating Siswa Selector
  const starBtns = document.querySelectorAll('#starRatingSelector .star-btn');
  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const rating = Number(btn.getAttribute('data-rating'));
      setStarRatingUI(rating);
    });
  });

  // Rubrik Merefleksi Selector
  const merefleksiBtns = document.querySelectorAll('#merefleksiRubricSelector .rubric-opt-btn');
  merefleksiBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      merefleksiBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Hapus foto terlampir
  document.getElementById('btnRemoveAttachedPhoto')?.addEventListener('click', () => {
    AppState.attachedPhotoUrl = null;
    AppState.isAiAssisted = false;
    document.getElementById('photoAttachmentBanner').style.display = 'none';
  });

  // Tombol Simpan Saja
  document.getElementById('btnSaveOnly')?.addEventListener('click', async () => {
    await handleSaveForm(false);
  });

  // Tombol Simpan & Lanjut ke Kelompok Berikutnya
  document.getElementById('btnSaveAndNext')?.addEventListener('click', async () => {
    await handleSaveForm(true);
  });

  // Tombol Batal
  document.getElementById('btnCancelInput')?.addEventListener('click', () => {
    resetInputForm();
  });

  // Set tanggal default ke hari ini
  const tglInput = document.getElementById('inputTanggal');
  if (tglInput && !tglInput.value) {
    tglInput.value = new Date().toISOString().slice(0, 10);
  }
}

function setStarRatingUI(rating) {
  const starBtns = document.querySelectorAll('#starRatingSelector .star-btn');
  starBtns.forEach(b => {
    const r = Number(b.getAttribute('data-rating'));
    b.classList.toggle('active', r <= rating);
  });

  const lbl = document.getElementById('starRatingLabel');
  const info = DEFAULT_RUBRIK.self_rating.skala.find(s => s.rating === rating);
  if (lbl) {
    lbl.textContent = `${rating} Bintang — ${info?.label || ''}`;
  }
}

function getSelectedMengaplikasiLevel() {
  const sel = document.querySelector('#mengaplikasiRubricSelector .rubric-opt-btn.selected');
  return sel ? Number(sel.getAttribute('data-level')) : 3;
}

function setSelectedMengaplikasiLevel(lvl) {
  const btns = document.querySelectorAll('#mengaplikasiRubricSelector .rubric-opt-btn');
  btns.forEach(b => {
    b.classList.toggle('selected', Number(b.getAttribute('data-level')) === Number(lvl));
  });
}

function getSelectedMerefleksiLevel() {
  const sel = document.querySelector('#merefleksiRubricSelector .rubric-opt-btn.selected');
  return sel ? Number(sel.getAttribute('data-level')) : 3;
}

function setSelectedMerefleksiLevel(lvl) {
  const btns = document.querySelectorAll('#merefleksiRubricSelector .rubric-opt-btn');
  btns.forEach(b => {
    b.classList.toggle('selected', Number(b.getAttribute('data-level')) === Number(lvl));
  });
}

function getSelectedStarRating() {
  const activeStars = document.querySelectorAll('#starRatingSelector .star-btn.active');
  return activeStars.length || 3;
}

async function handleSaveForm(advanceToNext = false) {
  const topikId = document.getElementById('inputTopik').value;
  const topik = AppState.topikList.find(t => t.id === topikId);
  const pertemuan = Number(document.getElementById('inputPertemuan').value) || 1;
  const kelompokId = document.getElementById('inputKelompok').value;
  const kelompok = AppState.kelompokList.find(k => k.id === kelompokId);
  const tanggal = document.getElementById('inputTanggal').value;

  const jmlBenar = Number(document.getElementById('inputJumlahBenar').value) || 0;
  const totSoal = Number(document.getElementById('inputTotalSoal').value) || 10;
  const skorPersen = Math.round((jmlBenar / totSoal) * 100);

  const aplLevel = getSelectedMengaplikasiLevel();
  const aplCatatan = document.getElementById('inputCatatanMengaplikasi').value.trim();

  const refLevel = getSelectedMerefleksiLevel();
  const refSelfRating = getSelectedStarRating();
  const refTeks = document.getElementById('inputTeksRefleksi').value.trim();

  const entry = {
    id: AppState.activeEntryId || undefined,
    topik_id: topikId,
    topik_nama: topik ? topik.nama : 'Topik IPA',
    pertemuan_ke: pertemuan,
    tanggal: tanggal || new Date().toISOString().slice(0, 10),
    id_kelompok: kelompokId,
    nama_kelompok: kelompok ? kelompok.nama : 'Kelompok',
    anggota: kelompok ? kelompok.anggota : '',
    memahami: {
      jumlah_benar: jmlBenar,
      total_soal: totSoal,
      skor_persen: skorPersen
    },
    mengaplikasi: {
      level: aplLevel,
      catatan_guru: aplCatatan
    },
    merefleksi: {
      level: refLevel,
      self_rating_siswa: refSelfRating,
      teks_jawaban: refTeks
    },
    lampiran_foto: AppState.attachedPhotoUrl || undefined,
    ai_assisted: AppState.isAiAssisted
  };

  await savePenilaian(entry);
  showToast(`Nilai ${kelompok?.nama || 'Kelompok'} Pertemuan ${pertemuan} berhasil disimpan!`, 'success');

  if (advanceToNext) {
    // Alihkan ke kelompok berikutnya secara otomatis
    const selKelompok = document.getElementById('inputKelompok');
    const curIdx = selKelompok.selectedIndex;
    if (curIdx < selKelompok.options.length - 1) {
      selKelompok.selectedIndex = curIdx + 1;
      resetFormFieldsForNextGroup();
      showToast(`Beralih ke: ${selKelompok.options[curIdx + 1].text}`, 'info');
    } else {
      showToast('Semua kelompok dalam daftar telah dinilai!', 'success');
      resetInputForm();
      switchTab('dashboard');
    }
  } else {
    resetInputForm();
    switchTab('dashboard');
  }
}

function loadEntryToForm(entry) {
  AppState.activeEntryId = entry.id;

  if (entry.topik_id) document.getElementById('inputTopik').value = entry.topik_id;
  if (entry.pertemuan_ke) document.getElementById('inputPertemuan').value = entry.pertemuan_ke;
  if (entry.id_kelompok) document.getElementById('inputKelompok').value = entry.id_kelompok;
  if (entry.tanggal) document.getElementById('inputTanggal').value = entry.tanggal;

  document.getElementById('inputJumlahBenar').value = entry.memahami?.jumlah_benar ?? 8;
  document.getElementById('inputTotalSoal').value = entry.memahami?.total_soal ?? 10;
  document.getElementById('displaySkorMemahami').textContent = `${entry.memahami?.skor_persen ?? 80}%`;

  setSelectedMengaplikasiLevel(entry.mengaplikasi?.level ?? 3);
  document.getElementById('inputCatatanMengaplikasi').value = entry.mengaplikasi?.catatan_guru || '';

  setSelectedMerefleksiLevel(entry.merefleksi?.level ?? 3);
  setStarRatingUI(entry.merefleksi?.self_rating_siswa ?? 4);
  document.getElementById('inputTeksRefleksi').value = entry.merefleksi?.teks_jawaban || '';

  if (entry.lampiran_foto) {
    AppState.attachedPhotoUrl = entry.lampiran_foto;
    AppState.isAiAssisted = !!entry.ai_assisted;
    const banner = document.getElementById('photoAttachmentBanner');
    const thumb = document.getElementById('attachedPhotoThumb');
    const aiBadge = document.getElementById('aiAssistedBadge');
    if (banner && thumb) {
      thumb.src = entry.lampiran_foto;
      banner.style.display = 'flex';
      if (aiBadge) aiBadge.style.display = entry.ai_assisted ? 'inline-flex' : 'none';
    }
  }
}

function resetFormFieldsForNextGroup() {
  AppState.activeEntryId = null;
  AppState.attachedPhotoUrl = null;
  AppState.isAiAssisted = false;
  document.getElementById('photoAttachmentBanner').style.display = 'none';

  document.getElementById('inputJumlahBenar').value = 8;
  document.getElementById('displaySkorMemahami').textContent = '80%';
  setSelectedMengaplikasiLevel(3);
  document.getElementById('inputCatatanMengaplikasi').value = '';
  setSelectedMerefleksiLevel(3);
  setStarRatingUI(4);
  document.getElementById('inputTeksRefleksi').value = '';
}

function resetInputForm() {
  resetFormFieldsForNextGroup();
  document.getElementById('inputPertemuan').value = 1;
  document.getElementById('inputKelompok').selectedIndex = 0;
}

// ==================== TAB 3: TREN & GRAFIK ====================
async function renderTrenCharts() {
  const topikId = document.getElementById('trenFilterTopik')?.value || AppState.selectedTopikId;
  const allEntries = await getAllPenilaian();
  const topikEntries = allEntries.filter(e => e.topik_id === topikId);

  // Opsi pertemuan untuk diagram komparasi
  const pertemuanSet = new Set(topikEntries.map(e => Number(e.pertemuan_ke)));
  const pertemuanList = Array.from(pertemuanSet).sort((a, b) => a - b);
  const filterPertemuanEl = document.getElementById('trenFilterPertemuan');
  if (filterPertemuanEl) {
    const curVal = filterPertemuanEl.value;
    filterPertemuanEl.innerHTML = '';
    pertemuanList.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = `Pertemuan ${p}`;
      filterPertemuanEl.appendChild(opt);
    });
    if (pertemuanList.length > 0) {
      filterPertemuanEl.value = (pertemuanList.map(String).includes(curVal)) 
        ? curVal 
        : String(pertemuanList[pertemuanList.length - 1]); // Default pertemuan terbaru
    }
  }

  // Render 3 Grafik Tren Terpisah
  const cMem = document.getElementById('canvasMemahami');
  const cApl = document.getElementById('canvasMengaplikasi');
  const cRef = document.getElementById('canvasMerefleksi');

  renderTrendLineChart(cMem, {
    entries: topikEntries,
    groups: AppState.kelompokList,
    dimension: 'memahami',
    title: 'Tren Dimensi Memahami (Objektif)',
    minY: 0,
    maxY: 100,
    yUnit: '%'
  });

  renderTrendLineChart(cApl, {
    entries: topikEntries,
    groups: AppState.kelompokList,
    dimension: 'mengaplikasi',
    title: 'Tren Dimensi Mengaplikasi (Rubrik 1-4)',
    minY: 1,
    maxY: 4,
    yUnit: ''
  });

  renderTrendLineChart(cRef, {
    entries: topikEntries,
    groups: AppState.kelompokList,
    dimension: 'merefleksi',
    title: 'Tren Dimensi Merefleksi (Kualitatif 1-4)',
    minY: 1,
    maxY: 4,
    yUnit: ''
  });

  // Render Diagram Komparasi Self-Rating Siswa vs Guru
  const cKomp = document.getElementById('canvasKomparasi');
  const targetPertemuan = filterPertemuanEl ? filterPertemuanEl.value : null;
  renderSelfRatingComparisonChart(cKomp, {
    entries: topikEntries,
    groups: AppState.kelompokList,
    pertemuan_ke: targetPertemuan
  });
}

// ==================== TAB 4: DETAIL KELOMPOK ====================
async function renderGroupDetail() {
  const groupId = document.getElementById('detailSelectKelompok')?.value;
  const topikId = document.getElementById('detailSelectTopik')?.value || AppState.selectedTopikId;

  const history = await getGroupHistory(groupId, topikId);
  const group = AppState.kelompokList.find(k => k.id === groupId);

  const profileEl = document.getElementById('groupProfileCard');
  const timelineEl = document.getElementById('groupTimelineContainer');
  if (!profileEl || !timelineEl) return;

  if (!group) return;

  // Analisis Flags untuk kelompok ini
  const flagAnalysis = analyzeGroupFlags(history);

  // Rata-rata capaian
  let avgMem = 0, avgApl = 0, avgRef = 0, avgStars = 0;
  if (history.length > 0) {
    avgMem = Math.round(history.reduce((acc, e) => acc + (e.memahami?.skor_persen || 0), 0) / history.length);
    avgApl = (history.reduce((acc, e) => acc + (e.mengaplikasi?.level || 1), 0) / history.length).toFixed(1);
    avgRef = (history.reduce((acc, e) => acc + (e.merefleksi?.level || 1), 0) / history.length).toFixed(1);
    avgStars = (history.reduce((acc, e) => acc + (e.merefleksi?.self_rating_siswa || 1), 0) / history.length).toFixed(1);
  }

  let flagsHtml = '';
  if (flagAnalysis.hasFlags) {
    flagsHtml = `
      <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        ${flagAnalysis.flags.map(f => `
          <div class="flag-alert ${f.severity}" style="padding: 0.5rem 0.75rem;">
            <span style="font-size: 1.1rem;">${f.icon}</span>
            <div style="font-size: 0.8rem;"><strong>${f.judul}:</strong> ${f.pesan}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  profileEl.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
      <div>
        <h3 style="font-size: 1.3rem; color: #fff;">${group.nama}</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.2rem;">Anggota: ${group.anggota || 'Belum diisi'}</p>
        <p style="color: #38bdf8; font-size: 0.8rem; margin-top: 0.2rem;">Total Pertemuan Dinilai: <strong>${history.length} Pertemuan</strong></p>
      </div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <div style="background: var(--bg-surface); padding: 0.6rem 0.9rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
          <span style="font-size: 0.7rem; color: var(--color-memahami); display: block;">Rata-rata Memahami</span>
          <strong style="font-size: 1.1rem; color: #fff;">${avgMem}%</strong>
        </div>
        <div style="background: var(--bg-surface); padding: 0.6rem 0.9rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
          <span style="font-size: 0.7rem; color: var(--color-mengaplikasi); display: block;">Rata-rata Mengaplikasi</span>
          <strong style="font-size: 1.1rem; color: #fff;">L${avgApl}</strong>
        </div>
        <div style="background: var(--bg-surface); padding: 0.6rem 0.9rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
          <span style="font-size: 0.7rem; color: var(--color-merefleksi); display: block;">Rata-rata Merefleksi</span>
          <strong style="font-size: 1.1rem; color: #fff;">L${avgRef}</strong>
        </div>
        <div style="background: var(--bg-surface); padding: 0.6rem 0.9rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
          <span style="font-size: 0.7rem; color: var(--color-bintang); display: block;">Rata-rata Siswa</span>
          <strong style="font-size: 1.1rem; color: #fff;">${avgStars}★</strong>
        </div>
      </div>
    </div>

    ${flagsHtml}
  `;

  // Render Garis Waktu Pertemuan
  timelineEl.innerHTML = '';
  if (history.length === 0) {
    timelineEl.innerHTML = `
      <div style="color: var(--text-muted); font-style: italic; padding: 1rem 0;">
        Belum ada riwayat penilaian untuk kelompok ini pada topik terpilih.
      </div>
    `;
    return;
  }

  history.forEach(entry => {
    const node = document.createElement('div');
    node.className = 'timeline-node';

    const aplInfo = getMengaplikasiInfo(entry.mengaplikasi?.level);
    const refInfo = getMerefleksiInfo(entry.merefleksi?.level);
    const stars = entry.merefleksi?.self_rating_siswa || 1;

    node.innerHTML = `
      <div class="group-card" style="margin-bottom: 0;">
        <div class="group-card-header">
          <div>
            <span class="meeting-badge" style="background: var(--color-primary); color: #fff;">Pertemuan ${entry.pertemuan_ke}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">${entry.tanggal || '-'}</span>
          </div>
          <span style="font-size: 0.8rem; color: #cbd5e1;">${entry.topik_nama || ''}</span>
        </div>

        <div class="pillars-container" style="margin-top: 0.5rem;">
          <div class="pillar-col">
            <span class="pillar-title memahami">Memahami</span>
            <div class="pillar-value" style="color: var(--color-memahami);">${entry.memahami?.skor_persen ?? 0}%</div>
            <span class="pillar-sub">${entry.memahami?.jumlah_benar}/${entry.memahami?.total_soal} Soal</span>
          </div>
          <div class="pillar-col">
            <span class="pillar-title mengaplikasi">Mengaplikasi</span>
            <div class="pillar-value" style="color: var(--color-mengaplikasi);">L${entry.mengaplikasi?.level}</div>
            <span class="pillar-sub">${aplInfo.label}</span>
          </div>
          <div class="pillar-col">
            <span class="pillar-title merefleksi">Merefleksi</span>
            <div class="pillar-value" style="color: var(--color-merefleksi);">L${entry.merefleksi?.level}</div>
            <span class="pillar-sub" style="color: var(--color-bintang); font-weight: bold;">${formatBintang(stars)}</span>
          </div>
        </div>

        <!-- Bukti Refleksi Kualitatif Siswa -->
        <div style="background: var(--bg-surface); padding: 0.75rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.05);">
          <span style="font-size: 0.75rem; color: var(--color-merefleksi); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 0.3rem;">
            📝 Jawaban Refleksi Siswa:
          </span>
          <p style="font-size: 0.85rem; color: #e2e8f0; font-style: italic; line-height: 1.4;">
            ${entry.merefleksi?.teks_jawaban?.trim() ? `"${entry.merefleksi.teks_jawaban}"` : '<span style="color: var(--text-dim);">(Kosong / Tidak dijawab)</span>'}
          </p>
        </div>

        ${entry.mengaplikasi?.catatan_guru ? `
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            <strong>Catatan Guru (Mengaplikasi):</strong> ${entry.mengaplikasi.catatan_guru}
          </div>
        ` : ''}

        ${entry.lampiran_foto ? `
          <div style="margin-top: 0.5rem;">
            <button class="btn btn-secondary btn-sm btn-timeline-photo" data-photo="${entry.lampiran_foto}" data-title="${group.nama} - P${entry.pertemuan_ke}">
              <span>📷</span> Lihat Foto Bukti LKPD
            </button>
          </div>
        ` : ''}
      </div>
    `;

    const photoBtn = node.querySelector('.btn-timeline-photo');
    if (photoBtn) {
      photoBtn.addEventListener('click', () => {
        openPhotoModal(entry.lampiran_foto, `${group.nama} - Pertemuan ${entry.pertemuan_ke}`);
      });
    }

    timelineEl.appendChild(node);
  });
}

// ==================== TAB 5: PENGATURAN TOPIK & RUBRIK ====================
async function renderRubrikTab() {
  // 1. Render Daftar Topik
  const topikContainer = document.getElementById('topikListContainer');
  if (topikContainer) {
    topikContainer.innerHTML = '';
    AppState.topikList.forEach(t => {
      const item = document.createElement('div');
      item.style.cssText = 'background: var(--bg-surface); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;';
      item.innerHTML = `
        <div>
          <strong style="color: #fff; font-size: 0.9rem;">${t.nama}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">${t.kelas || 'IPA'} • Default: ${t.defaultSoal || 10} Soal</span>
        </div>
        <button class="btn btn-secondary btn-sm btn-del-topik" data-id="${t.id}" style="color: #f87171;">🗑️</button>
      `;

      item.querySelector('.btn-del-topik').addEventListener('click', async () => {
        if (confirm(`Hapus topik "${t.nama}"?`)) {
          await deleteTopik(t.id);
          AppState.topikList = await getAllTopik();
          populateTopikDropdowns();
          renderRubrikTab();
          showToast('Topik berhasil dihapus.', 'info');
        }
      });

      topikContainer.appendChild(item);
    });
  }

  // 2. Gemini API Key
  const apiKeyInput = document.getElementById('inputGeminiApiKey');
  if (apiKeyInput && AppState.settings?.geminiApiKey) {
    apiKeyInput.value = AppState.settings.geminiApiKey;
  }

  // 3. Render Editor Rubrik
  const rubricEditor = document.getElementById('rubrikEditorGrid');
  if (rubricEditor) {
    rubricEditor.innerHTML = '';

    // Mengaplikasi
    const colApl = document.createElement('div');
    colApl.innerHTML = `
      <h4 style="color: var(--color-mengaplikasi); font-size: 0.95rem; margin-bottom: 0.75rem;">
        Dimensi Mengaplikasi (Level 1–4)
      </h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${DEFAULT_RUBRIK.mengaplikasi.skala.map(s => `
          <div style="background: var(--bg-surface); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <div style="font-size: 0.8rem; font-weight: bold; color: #fff; margin-bottom: 0.2rem;">Level ${s.level}: ${s.label}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${s.deskripsi}</div>
          </div>
        `).join('')}
      </div>
    `;
    rubricEditor.appendChild(colApl);

    // Merefleksi
    const colRef = document.createElement('div');
    colRef.innerHTML = `
      <h4 style="color: var(--color-merefleksi); font-size: 0.95rem; margin-bottom: 0.75rem;">
        Dimensi Merefleksi (Level 1–4)
      </h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${DEFAULT_RUBRIK.merefleksi.skala.map(s => `
          <div style="background: var(--bg-surface); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <div style="font-size: 0.8rem; font-weight: bold; color: #fff; margin-bottom: 0.2rem;">Level ${s.level}: ${s.label}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${s.deskripsi}</div>
          </div>
        `).join('')}
      </div>
    `;
    rubricEditor.appendChild(colRef);
  }
}

// ==================== TAB 6: EKSPOR & PELAPORAN ====================
async function renderExportTab() {
  const allEntries = await getAllPenilaian();
  const tbody = document.getElementById('tableExportBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (allEntries.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="padding: 2rem; text-align: center; color: var(--text-muted);">Belum ada data untuk diekspor.</td></tr>';
    return;
  }

  // Urutkan berdasarkan topik lalu pertemuan
  allEntries.sort((a, b) => {
    if (a.topik_nama !== b.topik_nama) return (a.topik_nama || '').localeCompare(b.topik_nama || '');
    return Number(a.pertemuan_ke) - Number(b.pertemuan_ke);
  });

  allEntries.forEach(entry => {
    const flags = getEntryFlags(entry, allEntries);
    const tr = document.createElement('tr');
    tr.style.cssText = 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);';

    tr.innerHTML = `
      <td style="padding: 0.75rem 1rem; font-weight: 600; color: #fff;">${entry.nama_kelompok}</td>
      <td style="padding: 0.75rem 1rem;">Pertemuan ${entry.pertemuan_ke}</td>
      <td style="padding: 0.75rem 1rem; color: var(--color-memahami); font-weight: bold;">
        ${entry.memahami?.skor_persen}% (${entry.memahami?.jumlah_benar}/${entry.memahami?.total_soal})
      </td>
      <td style="padding: 0.75rem 1rem; color: var(--color-mengaplikasi); font-weight: bold;">
        Level ${entry.mengaplikasi?.level}
      </td>
      <td style="padding: 0.75rem 1rem; color: var(--color-merefleksi); font-weight: bold;">
        Level ${entry.merefleksi?.level}
      </td>
      <td style="padding: 0.75rem 1rem; color: var(--color-bintang);">
        ${entry.merefleksi?.self_rating_siswa}★
      </td>
      <td style="padding: 0.75rem 1rem; font-size: 0.8rem; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-style: italic; color: #cbd5e1;">
        ${entry.merefleksi?.teks_jawaban || '-'}
      </td>
      <td style="padding: 0.75rem 1rem;">
        ${flags.length > 0 ? `<span class="badge badge-rose">${flags[0].icon} ${flags[0].judul}</span>` : '<span style="color: var(--text-dim);">-</span>'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==================== SCAN KAMERA & ASISTENSI AI ====================
let currentCapturedPhotoData = null;
let currentAiAnalysisResult = null;

function setupCameraAndAi() {
  const modal = document.getElementById('modalScan');
  const video = document.getElementById('cameraVideo');
  const btnOpen = document.getElementById('btnOpenScanModal');
  const btnClose = document.getElementById('btnCloseScanModal');
  const btnCapture = document.getElementById('btnCapturePhoto');
  const inputFile = document.getElementById('inputFileUploadScan');
  const btnRetake = document.getElementById('btnRetakePhoto');
  const btnConfirm = document.getElementById('btnConfirmAiScores');

  btnOpen?.addEventListener('click', async () => {
    modal.classList.add('active');
    resetCameraModalUI();
    try {
      await startCamera(video);
    } catch (e) {
      document.getElementById('cameraPlaceholder').style.display = 'flex';
    }
  });

  const closeModal = () => {
    stopCamera();
    modal.classList.remove('active');
  };

  btnClose?.addEventListener('click', closeModal);

  // Ambil Foto dari Kamera
  btnCapture?.addEventListener('click', async () => {
    try {
      const photoData = capturePhotoFromVideo(video);
      stopCamera();
      await processPhotoWithAi(photoData);
    } catch (err) {
      showToast('Gagal mengambil foto kamera.', 'error');
    }
  });

  // Unggah Foto dari File / Galeri
  inputFile?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      stopCamera();
      const photoData = await readFileAsDataUrl(file);
      await processPhotoWithAi(photoData);
    } catch (err) {
      showToast('Gagal membaca file gambar.', 'error');
    }
  });

  // Foto Ulang
  btnRetake?.addEventListener('click', async () => {
    resetCameraModalUI();
    try {
      await startCamera(video);
    } catch (e) {
      document.getElementById('cameraPlaceholder').style.display = 'flex';
    }
  });

  // Konfirmasi Guru (PRINSIP: Skor hanya tersimpan ke form jika guru menekan konfirmasi)
  btnConfirm?.addEventListener('click', () => {
    if (!currentAiAnalysisResult) return;

    // Ambil nilai koreksi dari textarea (guru bisa mengedit teks OCR sebelum konfirmasi)
    const ocrMengaplikasi = document.getElementById('ocrTextMengaplikasi').value;
    const ocrMerefleksi = document.getElementById('ocrTextMerefleksi').value;

    // Terapkan ke form input utama
    setSelectedMengaplikasiLevel(currentAiAnalysisResult.saran_mengaplikasi_level || 3);
    setSelectedMerefleksiLevel(currentAiAnalysisResult.saran_merefleksi_level || 3);
    setStarRatingUI(currentAiAnalysisResult.self_rating_terdeteksi || 4);

    document.getElementById('inputTeksRefleksi').value = ocrMerefleksi;
    if (ocrMengaplikasi) {
      document.getElementById('inputCatatanMengaplikasi').value = `Hasil Analisis Siswa: ${ocrMengaplikasi}`;
    }

    // Lampirkan foto asli
    AppState.attachedPhotoUrl = currentCapturedPhotoData;
    AppState.isAiAssisted = true;
    const banner = document.getElementById('photoAttachmentBanner');
    const thumb = document.getElementById('attachedPhotoThumb');
    if (banner && thumb) {
      thumb.src = currentCapturedPhotoData;
      banner.style.display = 'flex';
    }

    closeModal();
    showToast('Hasil analisis telah dimasukkan ke Form. Silakan tinjau dan simpan.', 'success');
  });
}

function resetCameraModalUI() {
  document.getElementById('cameraArea').style.display = 'block';
  document.getElementById('cameraPlaceholder').style.display = 'none';
  document.getElementById('aiLoadingIndicator').style.display = 'none';
  document.getElementById('aiResultArea').style.display = 'none';
  currentCapturedPhotoData = null;
  currentAiAnalysisResult = null;
}

async function processPhotoWithAi(photoDataUrl) {
  currentCapturedPhotoData = photoDataUrl;
  document.getElementById('cameraArea').style.display = 'none';
  document.getElementById('aiLoadingIndicator').style.display = 'block';

  try {
    const apiKey = AppState.settings?.geminiApiKey || '';
    const res = await analyzeLkpdImage(photoDataUrl, apiKey);
    currentAiAnalysisResult = res;

    // Tampilkan hasil di modal
    document.getElementById('aiLoadingIndicator').style.display = 'none';
    document.getElementById('aiResultArea').style.display = 'block';

    document.getElementById('aiResultPhotoPreview').src = photoDataUrl;
    document.getElementById('aiModeLabel').textContent = res.is_simulated ? 'Mode Asistensi Terpandu' : 'Google Gemini Vision';
    document.getElementById('aiImageQualityText').textContent = `Kualitas Gambar: ${res.kualitas_gambar || 'Jelas'}`;

    // Mengaplikasi
    document.getElementById('aiBadgeMengaplikasi').textContent = `Saran AI: Level ${res.saran_mengaplikasi_level}`;
    document.getElementById('aiReasonMengaplikasi').textContent = `Alasan: "${res.alasan_mengaplikasi || '-'}"`;
    document.getElementById('ocrTextMengaplikasi').value = res.teks_mengaplikasi || '';

    // Merefleksi
    document.getElementById('aiBadgeMerefleksi').textContent = `Saran AI: Level ${res.saran_merefleksi_level}`;
    document.getElementById('aiReasonMerefleksi').textContent = `Alasan: "${res.alasan_merefleksi || '-'}"`;
    document.getElementById('ocrTextMerefleksi').value = res.teks_merefleksi || '';

  } catch (err) {
    document.getElementById('aiLoadingIndicator').style.display = 'none';
    document.getElementById('cameraArea').style.display = 'block';
    showToast(`Analisis gagal: ${err.message}. Silakan gunakan input manual.`, 'error');
  }
}

// ==================== MODAL LIHAT FOTO ====================
function openPhotoModal(imgUrl, title = 'Lampiran Foto LKPD') {
  const modal = document.getElementById('modalPhotoView');
  const img = document.getElementById('photoViewImg');
  const titleEl = document.getElementById('photoViewTitle');
  if (!modal || !img) return;

  img.src = imgUrl;
  if (titleEl) titleEl.textContent = title;
  modal.classList.add('active');

  document.getElementById('btnClosePhotoView')?.addEventListener('click', () => {
    modal.classList.remove('active');
  }, { once: true });
}

// ==================== TOAST SYSTEM ====================
export function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==================== EVENT LISTENERS GLOBAL ====================
function setupEventListeners() {
  setupInputForm();
  setupCameraAndAi();

  // Filter Dashboard Topik & Pertemuan
  document.getElementById('dashFilterTopik')?.addEventListener('change', (e) => {
    AppState.selectedTopikId = e.target.value;
    renderDashboard();
  });
  document.getElementById('dashFilterPertemuan')?.addEventListener('change', (e) => {
    AppState.selectedPertemuan = e.target.value;
    renderDashboard();
  });

  // Filter Tren Topik & Pertemuan
  document.getElementById('trenFilterTopik')?.addEventListener('change', () => {
    renderTrenCharts();
  });
  document.getElementById('trenFilterPertemuan')?.addEventListener('change', () => {
    renderTrenCharts();
  });

  // Filter Detail Kelompok
  document.getElementById('detailSelectKelompok')?.addEventListener('change', () => {
    renderGroupDetail();
  });
  document.getElementById('detailSelectTopik')?.addEventListener('change', () => {
    renderGroupDetail();
  });

  // Download Charts PNG
  document.getElementById('btnDownloadChartMemahami')?.addEventListener('click', () => {
    downloadChartAsPng(document.getElementById('canvasMemahami'), 'tren-memahami-wardipa.png');
  });
  document.getElementById('btnDownloadChartMengaplikasi')?.addEventListener('click', () => {
    downloadChartAsPng(document.getElementById('canvasMengaplikasi'), 'tren-mengaplikasi-wardipa.png');
  });
  document.getElementById('btnDownloadChartMerefleksi')?.addEventListener('click', () => {
    downloadChartAsPng(document.getElementById('canvasMerefleksi'), 'tren-merefleksi-wardipa.png');
  });
  document.getElementById('btnDownloadChartKomparasi')?.addEventListener('click', () => {
    downloadChartAsPng(document.getElementById('canvasKomparasi'), 'komparasi-self-rating-wardipa.png');
  });

  // Ekspor & Cetak
  document.getElementById('btnExportCsv')?.addEventListener('click', async () => {
    const list = await getAllPenilaian();
    exportToCSV(list);
    showToast('Rekapitulasi CSV/Excel berhasil diunduh.', 'success');
  });
  document.getElementById('btnPrintReport')?.addEventListener('click', () => {
    triggerPrintReport();
  });

  // Tambah Topik Baru
  document.getElementById('btnAddNewTopik')?.addEventListener('click', async () => {
    const nama = prompt('Masukkan Nama Topik / Materi Pembelajaran IPA Baru:');
    if (!nama || !nama.trim()) return;
    const kelas = prompt('Tingkat Kelas (misal: Kelas 7, Kelas 8, Kelas 9):', 'Kelas 7');
    const soal = Number(prompt('Jumlah butir soal LKPD standar:', '10')) || 10;

    await saveTopik({ nama: nama.trim(), kelas: kelas || 'Kelas 7', defaultSoal: soal });
    AppState.topikList = await getAllTopik();
    populateTopikDropdowns();
    renderRubrikTab();
    showToast(`Topik "${nama}" berhasil ditambahkan.`, 'success');
  });

  // Simpan API Key Gemini
  document.getElementById('btnSaveApiKey')?.addEventListener('click', async () => {
    const key = document.getElementById('inputGeminiApiKey').value.trim();
    AppState.settings.geminiApiKey = key;
    await saveSettings(AppState.settings);
    showToast('Kunci API Gemini berhasil disimpan lokal di perangkat.', 'success');
  });

  // Backup & Restore Database
  document.getElementById('btnBackupDb')?.addEventListener('click', async () => {
    const backup = await exportFullDatabase();
    downloadJsonBackup(backup);
    showToast('Cadangan database JSON berhasil diunduh.', 'success');
  });

  document.getElementById('inputRestoreDb')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      await importFullDatabase(json);
      await loadBaseData();
      renderDashboard();
      showToast('Database berhasil dipulihkan dari file cadangan.', 'success');
    } catch (err) {
      showToast(`Gagal memulihkan cadangan: ${err.message}`, 'error');
    }
  });

  // Reset Database ke Contoh Awal
  document.getElementById('btnResetDb')?.addEventListener('click', async () => {
    if (confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh database ke contoh awal LKPD WARDIPA? Semua perubahan data akan digantikan.')) {
      await resetDatabase();
      await loadBaseData();
      renderDashboard();
      showToast('Database berhasil direset ke data sampel awal.', 'info');
    }
  });
}

// Ekspos global helper untuk navigasi dari tombol HTML inline
window.WARDIPA = {
  switchTab
};
