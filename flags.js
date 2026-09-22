/**
 * js/flags.js
 * Algoritma Pendeteksi Flag Otomatis (Anomali & Pola Pembelajaran)
 * Sesuai Prinsip Penilaian LKPD WARDIPA:
 * 1. Skor Memahami tinggi (>80) tapi Merefleksi rendah (<=2) dua kali berturut-turut
 * 2. Tren salah satu dimensi menurun 2 pertemuan berturut-turut
 * 3. Disparitas persepsi self-rating siswa vs penilaian guru
 */

/**
 * Menganalisis riwayat penilaian sebuah kelompok untuk menemukan flag anomali
 * @param {Array} historySorted - Daftar entri penilaian kelompok terurut berdasarkan pertemuan_ke (menaik)
 * @returns {Object} Hasil deteksi flag aktif dan rinciannya
 */
export function analyzeGroupFlags(historySorted) {
  const flags = [];
  if (!historySorted || historySorted.length === 0) {
    return { hasFlags: false, flags: [] };
  }

  // 1. Deteksi: Memahami tinggi (>80) tapi Merefleksi rendah (<=2) dua pertemuan berturut-turut
  if (historySorted.length >= 2) {
    for (let i = 1; i < historySorted.length; i++) {
      const prev = historySorted[i - 1];
      const curr = historySorted[i];

      const prevMemahamiHigh = prev.memahami?.skor_persen > 80;
      const prevRefleksiLow = prev.merefleksi?.level <= 2;
      const currMemahamiHigh = curr.memahami?.skor_persen > 80;
      const currRefleksiLow = curr.merefleksi?.level <= 2;

      if (prevMemahamiHigh && prevRefleksiLow && currMemahamiHigh && currRefleksiLow) {
        flags.push({
          type: 'ANOMALI_KOGNITIF_REFLEKSI',
          severity: 'danger',
          icon: '🚩',
          judul: 'Anomali Kognitif-Reflektif',
          pesan: `Pertemuan ${prev.pertemuan_ke} & ${curr.pertemuan_ke}: Skor Memahami tinggi (>80%), namun Merefleksi rendah (≤ Level 2) dua kali berturut-turut. Perlu ditelaah apakah refleksi dilewati atau menyalin jawaban objektif.`,
          pertemuan_terkait: [prev.pertemuan_ke, curr.pertemuan_ke]
        });
        break; // Tampilkan satu notifikasi komprehensif
      }
    }
  }

  // 2. Deteksi: Tren salah satu dimensi menurun 2 pertemuan berturut-turut
  // Syarat: minimal 3 pertemuan (P1 > P2 > P3)
  if (historySorted.length >= 3) {
    for (let i = 2; i < historySorted.length; i++) {
      const p1 = historySorted[i - 2];
      const p2 = historySorted[i - 1];
      const p3 = historySorted[i];

      // Cek Memahami
      const mem1 = p1.memahami?.skor_persen ?? 0;
      const mem2 = p2.memahami?.skor_persen ?? 0;
      const mem3 = p3.memahami?.skor_persen ?? 0;
      if (mem3 < mem2 && mem2 < mem1) {
        flags.push({
          type: 'TREN_MENURUN_MEMAHAMI',
          severity: 'warning',
          icon: '📉',
          judul: 'Tren Memahami Menurun',
          pesan: `Skor Memahami menurun 2 kali berturut-turut (P${p1.pertemuan_ke}: ${mem1}% → P${p2.pertemuan_ke}: ${mem2}% → P${p3.pertemuan_ke}: ${mem3}%). Butuh penguatan materi dasar.`,
          pertemuan_terkait: [p1.pertemuan_ke, p2.pertemuan_ke, p3.pertemuan_ke],
          dimensi: 'memahami'
        });
      }

      // Cek Mengaplikasi
      const apl1 = p1.mengaplikasi?.level ?? 0;
      const apl2 = p2.mengaplikasi?.level ?? 0;
      const apl3 = p3.mengaplikasi?.level ?? 0;
      if (apl3 < apl2 && apl2 < apl1) {
        flags.push({
          type: 'TREN_MENURUN_MENGAPLIKASI',
          severity: 'warning',
          icon: '📉',
          judul: 'Tren Mengaplikasi Menurun',
          pesan: `Level Mengaplikasi menurun 2 kali berturut-turut (P${p1.pertemuan_ke}: L${apl1} → P${p2.pertemuan_ke}: L${apl2} → P${p3.pertemuan_ke}: L${apl3}). Butuh bimbingan prosedur eksperimen/hitung.`,
          pertemuan_terkait: [p1.pertemuan_ke, p2.pertemuan_ke, p3.pertemuan_ke],
          dimensi: 'mengaplikasi'
        });
      }

      // Cek Merefleksi
      const ref1 = p1.merefleksi?.level ?? 0;
      const ref2 = p2.merefleksi?.level ?? 0;
      const ref3 = p3.merefleksi?.level ?? 0;
      if (ref3 < ref2 && ref2 < ref1) {
        flags.push({
          type: 'TREN_MENURUN_MEREFLEKSI',
          severity: 'warning',
          icon: '📉',
          judul: 'Tren Merefleksi Menurun',
          pesan: `Kedalaman refleksi menurun berturut-turut (P${p1.pertemuan_ke}: L${ref1} → P${p2.pertemuan_ke}: L${ref2} → P${p3.pertemuan_ke}: L${ref3}). Motivasi dan kesadaran diri kelompok menurun.`,
          pertemuan_terkait: [p1.pertemuan_ke, p2.pertemuan_ke, p3.pertemuan_ke],
          dimensi: 'merefleksi'
        });
      }
    }
  }

  // 3. Deteksi: Disparitas persepsi pada pertemuan terakhir
  const latest = historySorted[historySorted.length - 1];
  if (latest?.merefleksi) {
    const guruLevel = latest.merefleksi.level || 1; // 1-4
    const selfRating = latest.merefleksi.self_rating_siswa || 1; // 1-5

    // Skala ternormalisasi ke 0-100 untuk perbandingan intuitif
    const guruNorm = (guruLevel / 4) * 100;
    const siswaNorm = (selfRating / 5) * 100;
    const selisih = siswaNorm - guruNorm;

    if (selisih >= 35) {
      flags.push({
        type: 'OVERCONFIDENT',
        severity: 'info',
        icon: '💡',
        judul: 'Overconfident (Persepsi Siswa Jauh Lebih Tinggi)',
        pesan: `Pada Pertemuan ${latest.pertemuan_ke}, siswa memberi rating diri ${selfRating}★ (${siswaNorm}%), sedangkan penilaian rubrik guru berada di Level ${guruLevel} (${guruNorm}%). Perlu klarifikasi indikator pemahaman.`,
        pertemuan_terkait: [latest.pertemuan_ke]
      });
    } else if (selisih <= -35) {
      flags.push({
        type: 'UNDERCONFIDENT',
        severity: 'info',
        icon: '🌱',
        judul: 'Underconfident (Siswa Kurang Percaya Diri)',
        pesan: `Pada Pertemuan ${latest.pertemuan_ke}, kelompok tampil sangat baik (Level ${guruLevel} guru), namun hanya memberi rating diri ${selfRating}★. Butuh apresiasi penguatan rasa percaya diri.`,
        pertemuan_terkait: [latest.pertemuan_ke]
      });
    }
  }

  return {
    hasFlags: flags.length > 0,
    flags
  };
}

/**
 * Mendeteksi flag untuk sebuah entri penilaian spesifik
 * @param {Object} currentEntry
 * @param {Array} groupAllEntries
 */
export function getEntryFlags(currentEntry, groupAllEntries) {
  const sorted = [...groupAllEntries].sort((a, b) => a.pertemuan_ke - b.pertemuan_ke);
  const upToCurrent = sorted.filter(e => e.pertemuan_ke <= currentEntry.pertemuan_ke);
  const result = analyzeGroupFlags(upToCurrent);
  
  // Filter flags yang relevan dengan pertemuan ini
  const relevantFlags = result.flags.filter(f => 
    f.pertemuan_terkait.includes(currentEntry.pertemuan_ke)
  );

  return relevantFlags;
}
