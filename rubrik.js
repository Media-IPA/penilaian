/**
 * js/rubrik.js
 * Definisi Rubrik Penilaian LKPD WARDIPA (3 Dimensi)
 * - Memahami (Objektif persentase)
 * - Mengaplikasi (Skala 1-4 deskriptor kualitatif)
 * - Merefleksi (Skala 1-4 kualitatif + self-rating 1-5 bintang siswa)
 */

export const DEFAULT_RUBRIK = {
  mengaplikasi: {
    judul: 'Dimensi Mengaplikasi',
    deskripsi: 'Menilai kemampuan menerapkan konsep/rumus/prosedur IPA dalam pemecahan masalah.',
    skala: [
      {
        level: 4,
        label: 'Sangat Baik',
        deskripsi: 'Identifikasi besaran/satuan/konsep tepat semua; jawaban disertai alasan logis dan sistematis.',
        warna: 'emerald',
        badgeClass: 'badge-emerald'
      },
      {
        level: 3,
        label: 'Baik',
        deskripsi: 'Identifikasi tepat sebagian besar; alasan cukup jelas meski ada kekurangan minor.',
        warna: 'blue',
        badgeClass: 'badge-blue'
      },
      {
        level: 2,
        label: 'Cukup',
        deskripsi: 'Identifikasi banyak keliru; jawaban dangkal/hanya menyalin soal tanpa alasan memadai.',
        warna: 'amber',
        badgeClass: 'badge-amber'
      },
      {
        level: 1,
        label: 'Perlu Bimbingan',
        deskripsi: 'Kolom banyak kosong atau jawaban tidak relevan dengan fenomena IPA yang diamati.',
        warna: 'rose',
        badgeClass: 'badge-rose'
      }
    ]
  },
  merefleksi: {
    judul: 'Dimensi Merefleksi',
    deskripsi: 'Menilai kesadaran metakognitif, kejujuran terhadap kesulitan, dan pemaknaan proses belajar.',
    skala: [
      {
        level: 4,
        label: 'Sangat Reflektif',
        deskripsi: 'Spesifik, jujur mengakui kendala/kesulitan, dan mampu menghubungkan konsep IPA ke pengalaman sehari-hari.',
        warna: 'purple',
        badgeClass: 'badge-purple'
      },
      {
        level: 3,
        label: 'Reflektif',
        deskripsi: 'Relevan dengan topik pembelajaran, namun uraian refleksi masih agak umum/normatif.',
        warna: 'indigo',
        badgeClass: 'badge-indigo'
      },
      {
        level: 2,
        label: 'Kurang Reflektif',
        deskripsi: 'Jawaban sangat singkat, tidak spesifik (misal hanya menulis "seru", "paham"), tidak menggali kendala.',
        warna: 'amber',
        badgeClass: 'badge-amber'
      },
      {
        level: 1,
        label: 'Belum Reflektif',
        deskripsi: 'Bagian refleksi tidak dijawab sama sekali atau jawaban tidak nyambung dengan isi LKPD.',
        warna: 'rose',
        badgeClass: 'badge-rose'
      }
    ]
  },
  self_rating: {
    judul: 'Self-Rating Siswa (Tingkat Pemahaman)',
    skala: [
      { rating: 5, label: 'Sangat Paham Sekali (⭐⭐⭐⭐⭐)', deskripsi: 'Merasa menguasai materi secara penuh dan siap menjelaskan ke teman.' },
      { rating: 4, label: 'Paham dengan Baik (⭐⭐⭐⭐)', deskripsi: 'Memahami sebagian besar konsep tanpa banyak kendala.' },
      { rating: 3, label: 'Cukup Paham (⭐⭐⭐)', deskripsi: 'Paham dasar-dasarnya, tapi masih ragu di beberapa hitungan/konsep.' },
      { rating: 2, label: 'Kurang Paham (⭐⭐)', deskripsi: 'Masih banyak hal yang membingungkan selama kegiatan LKPD.' },
      { rating: 1, label: 'Belum Paham (⭐)', deskripsi: 'Sangat kesulitan memahami tujuan dan isi materi pertemuan ini.' }
    ]
  }
};

export const DEFAULT_TOPIK_LIST = [
  { id: 'topik-1', nama: 'Besaran, Satuan, dan Pengukuran IPA', kelas: 'Kelas 7', defaultSoal: 10 },
  { id: 'topik-2', nama: 'Zat dan Karakteristiknya (Wujud Zat)', kelas: 'Kelas 7', defaultSoal: 10 },
  { id: 'topik-3', nama: 'Suhu, Kalor, dan Pemuaian Benda', kelas: 'Kelas 7', defaultSoal: 12 },
  { id: 'topik-4', nama: 'Gerak Lurus dan Hukum Newton', kelas: 'Kelas 7', defaultSoal: 10 },
  { id: 'topik-5', nama: 'Struktur Sel dan Mikroskop', kelas: 'Kelas 8', defaultSoal: 10 }
];

export const DEFAULT_KELOMPOK_LIST = [
  { id: 'k-1', nama: 'Kelompok 1 (Newton)', anggota: 'Ahmad, Budi, Cindy, Dewi' },
  { id: 'k-2', nama: 'Kelompok 2 (Galileo)', anggota: 'Eko, Fani, Gilang, Hana' },
  { id: 'k-3', nama: 'Kelompok 3 (Archimedes)', anggota: 'Indra, Joko, Kirana, Laras' },
  { id: 'k-4', nama: 'Kelompok 4 (Curie)', anggota: 'Mega, Nanda, Oki, Putri' },
  { id: 'k-5', nama: 'Kelompok 5 (Einstein)', anggota: 'Rian, Sari, Taufik, Vina' }
];

// Helper untuk mendapatkan detail level Mengaplikasi
export function getMengaplikasiInfo(level, customRubrik = null) {
  const skala = customRubrik?.mengaplikasi?.skala || DEFAULT_RUBRIK.mengaplikasi.skala;
  return skala.find(item => Number(item.level) === Number(level)) || {
    level: level,
    label: `Level ${level}`,
    deskripsi: '-',
    warna: 'slate',
    badgeClass: 'badge-slate'
  };
}

// Helper untuk mendapatkan detail level Merefleksi
export function getMerefleksiInfo(level, customRubrik = null) {
  const skala = customRubrik?.merefleksi?.skala || DEFAULT_RUBRIK.merefleksi.skala;
  return skala.find(item => Number(item.level) === Number(level)) || {
    level: level,
    label: `Level ${level}`,
    deskripsi: '-',
    warna: 'slate',
    badgeClass: 'badge-slate'
  };
}

// Helper untuk format bintang
export function formatBintang(rating) {
  const r = Math.max(1, Math.min(5, Number(rating) || 1));
  return '★'.repeat(r) + '☆'.repeat(5 - r);
}
