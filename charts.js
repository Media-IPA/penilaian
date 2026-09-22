/**
 * js/charts.js
 * Visualisasi Data Mandiri (Pure HTML5 Canvas - Zero Dependency)
 * Menampilkan:
 * 1. Tiga Grafik Tren Terpisah (Memahami 0-100%, Mengaplikasi 1-4, Merefleksi 1-4)
 * 2. Diagram Komparasi Self-Rating Siswa vs Penilaian Guru
 * 3. Ekspor Grafik ke format PNG resolusi tinggi
 */

// Palet warna konsisten untuk tiap kelompok
export const GROUP_COLORS = [
  { stroke: '#0284c7', fill: 'rgba(2, 132, 199, 0.15)', name: 'Sky Blue' },
  { stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.15)', name: 'Amber' },
  { stroke: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.15)', name: 'Purple' },
  { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.15)', name: 'Emerald' },
  { stroke: '#f43f5e', fill: 'rgba(244, 63, 94, 0.15)', name: 'Rose' },
  { stroke: '#06b6d4', fill: 'rgba(6, 182, 212, 0.15)', name: 'Cyan' },
  { stroke: '#d97706', fill: 'rgba(217, 119, 6, 0.15)', name: 'Bronze' }
];

export function getGroupColor(index) {
  return GROUP_COLORS[index % GROUP_COLORS.length];
}

/**
 * Merender grafik garis tren untuk satu dimensi tertentu
 * @param {HTMLCanvasElement} canvas
 * @param {Object} options
 *   - entries: daftar entri penilaian yang sudah difilter per topik
 *   - groups: daftar semua kelompok
 *   - dimension: 'memahami' | 'mengaplikasi' | 'merefleksi'
 *   - title: judul grafik
 *   - minY: nilai Y minimum (cth: 0 atau 1)
 *   - maxY: nilai Y maksimum (cth: 100 atau 4)
 *   - yUnit: satuan Y (cth: '%' atau 'Level')
 */
export function renderTrendLineChart(canvas, {
  entries = [],
  groups = [],
  dimension = 'memahami',
  title = '',
  minY = 0,
  maxY = 100,
  yUnit = ''
}) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();

  // Dukungan Layar Retina / High DPI
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = rect.width || 600;
  const displayHeight = rect.height || 320;
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, displayWidth, displayHeight);

  // Kumpulkan semua pertemuan unik dan urutkan
  const pertemuanSet = new Set(entries.map(e => Number(e.pertemuan_ke)));
  const pertemuanList = Array.from(pertemuanSet).sort((a, b) => a - b);

  // Jika belum ada data pertemuan sama sekali, buat default P1 - P3
  const meetings = pertemuanList.length > 0 ? pertemuanList : [1, 2, 3];

  const padding = { top: 40, right: 30, bottom: 50, left: 60 };
  const chartW = displayWidth - padding.left - padding.right;
  const chartH = displayHeight - padding.top - padding.bottom;

  // Background chart
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, displayWidth, displayHeight);

  // Gambar Garis Grid Horizontal
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
  ctx.lineWidth = 1;
  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  const yStepCount = dimension === 'memahami' ? 5 : 3; // 0, 25, 50, 75, 100 atau 1, 2, 3, 4
  for (let i = 0; i <= yStepCount; i++) {
    const val = minY + (i / yStepCount) * (maxY - minY);
    const yPos = padding.top + chartH - (i / yStepCount) * chartH;

    ctx.beginPath();
    ctx.moveTo(padding.left, yPos);
    ctx.lineTo(padding.left + chartW, yPos);
    ctx.stroke();

    const labelText = dimension === 'memahami' ? `${Math.round(val)}${yUnit}` : `Level ${Math.round(val)}`;
    ctx.fillText(labelText, padding.left - 10, yPos);
  }

  // Label Sumbu X (Pertemuan)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const xStep = meetings.length > 1 ? chartW / (meetings.length - 1) : chartW / 2;

  meetings.forEach((m, idx) => {
    const xPos = meetings.length > 1 ? padding.left + idx * xStep : padding.left + chartW / 2;
    
    // Grid vertikal tipis
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.moveTo(xPos, padding.top);
    ctx.lineTo(xPos, padding.top + chartH);
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Pertemuan ${m}`, xPos, padding.top + chartH + 12);
  });

  // Gambar Garis untuk Tiap Kelompok
  groups.forEach((group, gIdx) => {
    const color = getGroupColor(gIdx);
    const groupEntries = entries
      .filter(e => e.id_kelompok === group.id)
      .sort((a, b) => Number(a.pertemuan_ke) - Number(b.pertemuan_ke));

    if (groupEntries.length === 0) return;

    const points = [];
    groupEntries.forEach(entry => {
      const mIdx = meetings.indexOf(Number(entry.pertemuan_ke));
      if (mIdx === -1) return;

      const xPos = meetings.length > 1 ? padding.left + mIdx * xStep : padding.left + chartW / 2;
      let val = 0;
      if (dimension === 'memahami') {
        val = entry.memahami?.skor_persen ?? 0;
      } else if (dimension === 'mengaplikasi') {
        val = entry.mengaplikasi?.level ?? 1;
      } else if (dimension === 'merefleksi') {
        val = entry.merefleksi?.level ?? 1;
      }

      // Normalisasi posisi Y
      const ratio = (val - minY) / (maxY - minY);
      const clampedRatio = Math.max(0, Math.min(1, ratio));
      const yPos = padding.top + chartH - clampedRatio * chartH;

      points.push({ x: xPos, y: yPos, val, entry });
    });

    if (points.length === 0) return;

    // Gambar Garis Poligon
    ctx.beginPath();
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    points.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    // Gambar Lingkaran Data Point
    points.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = color.stroke;
      ctx.stroke();

      // Angka nilai di atas titik
      ctx.font = 'bold 10px sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      const label = dimension === 'memahami' ? `${pt.val}%` : `L${pt.val}`;
      ctx.fillText(label, pt.x, pt.y - 12);
    });
  });

  // Judul Grafik di Bagian Atas
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.textAlign = 'left';
  ctx.fillText(title, padding.left, 24);
}

/**
 * Merender Diagram Batang Berdampingan: Perbandingan Self-Rating Siswa (1-5★) vs Nilai Guru (1-4 Level)
 * Skala dinormalkan ke persentase 0-100% agar dapat dibandingkan langsung secara adil.
 */
export function renderSelfRatingComparisonChart(canvas, {
  entries = [],
  groups = [],
  pertemuan_ke = null
}) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();

  const dpr = window.devicePixelRatio || 1;
  const displayWidth = rect.width || 600;
  const displayHeight = rect.height || 320;
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, displayWidth, displayHeight);

  // Background
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, displayWidth, displayHeight);

  // Filter entri untuk pertemuan yang dipilih
  const targetEntries = pertemuan_ke 
    ? entries.filter(e => Number(e.pertemuan_ke) === Number(pertemuan_ke))
    : entries;

  const padding = { top: 50, right: 30, bottom: 60, left: 60 };
  const chartW = displayWidth - padding.left - padding.right;
  const chartH = displayHeight - padding.top - padding.bottom;

  // Grid Horizontal 0 - 100%
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
  ctx.lineWidth = 1;
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let i = 0; i <= 4; i++) {
    const pct = i * 25;
    const yPos = padding.top + chartH - (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(padding.left, yPos);
    ctx.lineTo(padding.left + chartW, yPos);
    ctx.stroke();
    ctx.fillText(`${pct}%`, padding.left - 10, yPos);
  }

  if (targetEntries.length === 0) {
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.font = 'italic 13px sans-serif';
    ctx.fillText('Belum ada data penilaian refleksi untuk pertemuan ini', displayWidth / 2, displayHeight / 2);
    return;
  }

  // Siapkan Data Bar per Kelompok
  const groupSlotW = chartW / targetEntries.length;
  const barW = Math.min(28, groupSlotW * 0.32);

  targetEntries.forEach((entry, idx) => {
    const groupCenterX = padding.left + (idx + 0.5) * groupSlotW;

    const guruLevel = entry.merefleksi?.level || 1; // 1-4
    const siswaStars = entry.merefleksi?.self_rating_siswa || 1; // 1-5

    const guruPct = (guruLevel / 4) * 100;
    const siswaPct = (siswaStars / 5) * 100;

    const guruH = (guruPct / 100) * chartH;
    const siswaH = (siswaPct / 100) * chartH;

    // Batang 1: Penilaian Guru (Indigo / #6366f1)
    const bar1X = groupCenterX - barW - 3;
    const bar1Y = padding.top + chartH - guruH;
    ctx.fillStyle = '#818cf8';
    ctx.beginPath();
    ctx.roundRect(bar1X, bar1Y, barW, guruH, [4, 4, 0, 0]);
    ctx.fill();

    // Label di atas batang guru
    ctx.fillStyle = '#c7d2fe';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`L${guruLevel}`, bar1X + barW / 2, bar1Y - 6);

    // Batang 2: Self-Rating Siswa (Amber Gold / #fbbf24)
    const bar2X = groupCenterX + 3;
    const bar2Y = padding.top + chartH - siswaH;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.roundRect(bar2X, bar2Y, barW, siswaH, [4, 4, 0, 0]);
    ctx.fill();

    // Label di atas batang siswa
    ctx.fillStyle = '#fef08a';
    ctx.fillText(`${siswaStars}★`, bar2X + barW / 2, bar2Y - 6);

    // Label Nama Kelompok di Bawah
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '11px sans-serif';
    const shortName = entry.nama_kelompok ? entry.nama_kelompok.replace(/Kelompok\s*/i, 'K.') : `K-${idx + 1}`;
    ctx.fillText(shortName, groupCenterX, padding.top + chartH + 18);

    // Indikator status persepsi (Selisih)
    const diff = siswaPct - guruPct;
    if (Math.abs(diff) >= 30) {
      const badgeText = diff > 0 ? 'Over' : 'Under';
      const badgeColor = diff > 0 ? '#f87171' : '#38bdf8';
      ctx.fillStyle = badgeColor;
      ctx.font = 'italic 9px sans-serif';
      ctx.fillText(`(${badgeText})`, groupCenterX, padding.top + chartH + 32);
    }
  });

  // Judul & Legenda di Atas
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'left';
  ctx.fillText('Komparasi Persepsi: Penilaian Rubrik Guru vs Self-Rating Bintang Siswa', padding.left, 22);

  // Legenda
  const legY = 22;
  const legRight = displayWidth - padding.right;

  // Siswa Legenda
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(legRight - 160, legY - 10, 12, 12);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Self-Rating (1-5★)', legRight - 142, legY);

  // Guru Legenda
  ctx.fillStyle = '#818cf8';
  ctx.fillRect(legRight - 280, legY - 10, 12, 12);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('Rubrik Guru (L1-4)', legRight - 262, legY);
}

/**
 * Mengunduh canvas grafik sebagai file gambar PNG beresolusi tinggi
 * @param {HTMLCanvasElement} canvas
 * @param {string} filename
 */
export function downloadChartAsPng(canvas, filename = 'grafik-rubrik-wardipa.png') {
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
