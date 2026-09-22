/**
 * js/sample-data.js
 * Data Awal Realistis Pembelajaran IPA SMP (Model LKPD WARDIPA)
 * Disusun untuk 5 Kelompok sepanjang 3 Pertemuan
 * Memuat kasus nyata: Anomali Kognitif-Reflektif, Tren Menurun, dan Disparitas Persepsi
 */

export const SAMPLE_DATA = [
  // --- PERTEMUAN 1: Pengukuran Panjang dan Massa (Jangka Sorong & Neraca) ---
  {
    id: 'pen-p1-k1',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 1,
    tanggal: '2026-08-04',
    id_kelompok: 'k-1',
    nama_kelompok: 'Kelompok 1 (Newton)',
    anggota: 'Ahmad, Budi, Cindy, Dewi',
    memahami: {
      jumlah_benar: 8,
      total_soal: 10,
      skor_persen: 80
    },
    mengaplikasi: {
      level: 3,
      catatan_guru: 'Membaca skala jangka sorong sudah tepat, satuan gram ke kg tepat.'
    },
    merefleksi: {
      level: 3,
      self_rating_siswa: 4,
      teks_jawaban: 'Kami belajar cara membaca jangka sorong. Awalnya agak pusing lihat garis nonius, tapi setelah coba tiga kali akhirnya bisa.',
      catatan_guru: 'Refleksi cukup baik, sudah menyebutkan kendala membaca skala nonius.'
    },
    created_at: '2026-08-04T09:30:00.000Z',
    updated_at: '2026-08-04T09:30:00.000Z'
  },
  {
    id: 'pen-p1-k2',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 1,
    tanggal: '2026-08-04',
    id_kelompok: 'k-2',
    nama_kelompok: 'Kelompok 2 (Galileo)',
    anggota: 'Eko, Fani, Gilang, Hana',
    memahami: {
      jumlah_benar: 9,
      total_soal: 10,
      skor_persen: 90
    },
    mengaplikasi: {
      level: 3,
      catatan_guru: 'Perhitungan rapi, pengukuran neraca digital lancar.'
    },
    merefleksi: {
      level: 2,
      self_rating_siswa: 5,
      teks_jawaban: 'Praktikum seru dan mudah.',
      catatan_guru: 'Refleksi sangat singkat, tidak menuliskan kendala atau proses belajar.'
    },
    created_at: '2026-08-04T09:35:00.000Z',
    updated_at: '2026-08-04T09:35:00.000Z'
  },
  {
    id: 'pen-p1-k3',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 1,
    tanggal: '2026-08-04',
    id_kelompok: 'k-3',
    nama_kelompok: 'Kelompok 3 (Archimedes)',
    anggota: 'Indra, Joko, Kirana, Laras',
    memahami: {
      jumlah_benar: 9,
      total_soal: 10,
      skor_persen: 90
    },
    mengaplikasi: {
      level: 4,
      catatan_guru: 'Sangat teliti mengkalibrasi neraca dan mencatat ketidakpastian alat ukur.'
    },
    merefleksi: {
      level: 4,
      self_rating_siswa: 4,
      teks_jawaban: 'Kami menyadari bahwa sebelum menimbang, neraca harus disetel ke angka nol terlebih dahulu agar massa kelereng tidak berlebih.',
      catatan_guru: 'Refleksi mendalam dan mengaitkan prosedur dengan keakuratan data.'
    },
    created_at: '2026-08-04T09:40:00.000Z',
    updated_at: '2026-08-04T09:40:00.000Z'
  },
  {
    id: 'pen-p1-k4',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 1,
    tanggal: '2026-08-04',
    id_kelompok: 'k-4',
    nama_kelompok: 'Kelompok 4 (Curie)',
    anggota: 'Mega, Nanda, Oki, Putri',
    memahami: {
      jumlah_benar: 7,
      total_soal: 10,
      skor_persen: 70
    },
    mengaplikasi: {
      level: 3,
      catatan_guru: 'Dapat menentukan volume balok dengan benar.'
    },
    merefleksi: {
      level: 3,
      self_rating_siswa: 2,
      teks_jawaban: 'Kami merasa masih lambat dalam menghitung dan takut salah saat membaca skala mikrometer sekrup.',
      catatan_guru: 'Siswa tampak cemas padahal kinerjanya sudah cukup baik.'
    },
    created_at: '2026-08-04T09:45:00.000Z',
    updated_at: '2026-08-04T09:45:00.000Z'
  },
  {
    id: 'pen-p1-k5',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 1,
    tanggal: '2026-08-04',
    id_kelompok: 'k-5',
    nama_kelompok: 'Kelompok 5 (Einstein)',
    anggota: 'Rian, Sari, Taufik, Vina',
    memahami: {
      jumlah_benar: 8,
      total_soal: 10,
      skor_persen: 80
    },
    mengaplikasi: {
      level: 3,
      catatan_guru: 'Eksperimen berjalan lancar, pembagian tugas kelompok tertib.'
    },
    merefleksi: {
      level: 3,
      self_rating_siswa: 3,
      teks_jawaban: 'Belajar pengukuran membuat kami sadar bahwa mengukur dengan jengkal tidak baku karena tangan tiap teman panjangnya beda.',
      catatan_guru: 'Contoh konkret satuan tidak baku sangat tepat.'
    },
    created_at: '2026-08-04T09:50:00.000Z',
    updated_at: '2026-08-04T09:50:00.000Z'
  },

  // --- PERTEMUAN 2: Volume Benda Tak Beraturan & Konversi Satuan ---
  {
    id: 'pen-p2-k1',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 2,
    tanggal: '2026-08-11',
    id_kelompok: 'k-1',
    nama_kelompok: 'Kelompok 1 (Newton)',
    anggota: 'Ahmad, Budi, Cindy, Dewi',
    memahami: {
      jumlah_benar: 9,
      total_soal: 10,
      skor_persen: 90
    },
    mengaplikasi: {
      level: 4,
      catatan_guru: 'Metode gelas berpancuran dilakukan dengan teliti tanpa tumpahan air.'
    },
    merefleksi: {
      level: 4,
      self_rating_siswa: 4,
      teks_jawaban: 'Menyenangkan membuktikan cara Archimedes mencari volume batu tak beraturan. Kami sempat lupa membaca miniskus bawah air, tapi diingatkan guru lalu kami koreksi.',
      catatan_guru: 'Refleksi sangat jujur mengakui kesalahan miniskus air.'
    },
    created_at: '2026-08-11T09:30:00.000Z',
    updated_at: '2026-08-11T09:30:00.000Z'
  },
  {
    id: 'pen-p2-k2',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 2,
    tanggal: '2026-08-11',
    id_kelompok: 'k-2',
    nama_kelompok: 'Kelompok 2 (Galileo)',
    anggota: 'Eko, Fani, Gilang, Hana',
    memahami: {
      jumlah_benar: 10,
      total_soal: 10,
      skor_persen: 100
    },
    mengaplikasi: {
      level: 3,
      catatan_guru: 'Soal hitungan konversi selesai paling cepat.'
    },
    merefleksi: {
      level: 1,
      self_rating_siswa: 5,
      teks_jawaban: '-',
      catatan_guru: 'Kolom refleksi dikosongkan. Siswa terburu-buru mengumpulkan karena sudah merasa benar semua.'
    },
    created_at: '2026-08-11T09:35:00.000Z',
    updated_at: '2026-08-11T09:35:00.000Z'
  },
  {
    id: 'pen-p2-k3',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 2,
    tanggal: '2026-08-11',
    id_kelompok: 'k-3',
    nama_kelompok: 'Kelompok 3 (Archimedes)',
    anggota: 'Indra, Joko, Kirana, Laras',
    memahami: {
      jumlah_benar: 8,
      total_soal: 10,
      skor_persen: 80
    },
    mengaplikasi: {
      level: 3,
      catatan_guru: 'Ada kekeliruan saat mengubah cm kubik ke meter kubik (kurang nol tiga).'
    },
    merefleksi: {
      level: 3,
      self_rating_siswa: 3,
      teks_jawaban: 'Konversi tangga pangkat tiga ternyata membingungkan, kami harus lebih teliti lagi saat membagi satu juta.',
      catatan_guru: 'Menyadari letak kelemahan pada tangga pangkat 3.'
    },
    created_at: '2026-08-11T09:40:00.000Z',
    updated_at: '2026-08-11T09:40:00.000Z'
  },
  {
    id: 'pen-p2-k4',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 2,
    tanggal: '2026-08-11',
    id_kelompok: 'k-4',
    nama_kelompok: 'Kelompok 4 (Curie)',
    anggota: 'Mega, Nanda, Oki, Putri',
    memahami: {
      jumlah_benar: 9,
      total_soal: 10,
      skor_persen: 90
    },
    mengaplikasi: {
      level: 4,
      catatan_guru: 'Semua jawaban konversi sempurna dan disertai langkah pengerjaan.'
    },
    merefleksi: {
      level: 4,
      self_rating_siswa: 2,
      teks_jawaban: 'Kami mencocokkan rumus berkali-kali karena takut salah. Meskipun selesai tepat waktu, kami masih merasa belum sepintar kelompok lain.',
      catatan_guru: 'Terdeteksi underconfident: nilai sangat tinggi namun persepsi diri rendah.'
    },
    created_at: '2026-08-11T09:45:00.000Z',
    updated_at: '2026-08-11T09:45:00.000Z'
  },
  {
    id: 'pen-p2-k5',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 2,
    tanggal: '2026-08-11',
    id_kelompok: 'k-5',
    nama_kelompok: 'Kelompok 5 (Einstein)',
    anggota: 'Rian, Sari, Taufik, Vina',
    memahami: {
      jumlah_benar: 8,
      total_soal: 10,
      skor_persen: 80
    },
    mengaplikasi: {
      level: 3,
      catatan_guru: 'Hasil ukur gelas ukur konsisten.'
    },
    merefleksi: {
      level: 3,
      self_rating_siswa: 4,
      teks_jawaban: 'Praktikum kedua ini lebih lancar karena tugas mencatat dan mengukur dibagi rata antar anggota.',
      catatan_guru: 'Kerja sama tim meningkat signifikan.'
    },
    created_at: '2026-08-11T09:50:00.000Z',
    updated_at: '2026-08-11T09:50:00.000Z'
  },

  // --- PERTEMUAN 3: Analisis Massa Jenis dan Pemecahan Masalah ---
  {
    id: 'pen-p3-k1',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 3,
    tanggal: '2026-08-18',
    id_kelompok: 'k-1',
    nama_kelompok: 'Kelompok 1 (Newton)',
    anggota: 'Ahmad, Budi, Cindy, Dewi',
    memahami: {
      jumlah_benar: 10,
      total_soal: 10,
      skor_persen: 100
    },
    mengaplikasi: {
      level: 4,
      catatan_guru: 'Berhasil mengidentifikasi jenis logam misterius berdasarkan perhitungan massa jenis.'
    },
    merefleksi: {
      level: 4,
      self_rating_siswa: 5,
      teks_jawaban: 'Kami sangat senang waktu massa jenis logam yang kami hitung (7,9 g/cm3) cocok dengan tabel besi. Kami jadi paham kenapa kapal besi yang berongga bisa terapung.',
      catatan_guru: 'Luar biasa, berhasil mengaitkan massa jenis ke fenomena kapal terapung.'
    },
    created_at: '2026-08-18T09:30:00.000Z',
    updated_at: '2026-08-18T09:30:00.000Z'
  },
  {
    id: 'pen-p3-k2',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 3,
    tanggal: '2026-08-18',
    id_kelompok: 'k-2',
    nama_kelompok: 'Kelompok 2 (Galileo)',
    anggota: 'Eko, Fani, Gilang, Hana',
    memahami: {
      jumlah_benar: 9,
      total_soal: 10,
      skor_persen: 90
    },
    mengaplikasi: {
      level: 3,
      catatan_guru: 'Rumus massa jenis benar rho = m/v, namun satuan SI lupa dicantumkan.'
    },
    merefleksi: {
      level: 2,
      self_rating_siswa: 5,
      teks_jawaban: 'Sudah selesai semua.',
      catatan_guru: 'Refleksi masih sangat minim meski sudah diingatkan guru.'
    },
    created_at: '2026-08-18T09:35:00.000Z',
    updated_at: '2026-08-18T09:35:00.000Z'
  },
  {
    id: 'pen-p3-k3',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 3,
    tanggal: '2026-08-18',
    id_kelompok: 'k-3',
    nama_kelompok: 'Kelompok 3 (Archimedes)',
    anggota: 'Indra, Joko, Kirana, Laras',
    memahami: {
      jumlah_benar: 7,
      total_soal: 10,
      skor_persen: 70
    },
    mengaplikasi: {
      level: 2,
      catatan_guru: 'Banyak kesalahan dalam substitusi massa dan volume ke rumus rho.'
    },
    merefleksi: {
      level: 2,
      self_rating_siswa: 2,
      teks_jawaban: 'Sulit sekali menghitung pembagian desimal massa jenis.',
      catatan_guru: 'Tercatat tren penurunan berturut-turut pada Mengaplikasi (Level 4 -> 3 -> 2).'
    },
    created_at: '2026-08-18T09:40:00.000Z',
    updated_at: '2026-08-18T09:40:00.000Z'
  },
  {
    id: 'pen-p3-k4',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 3,
    tanggal: '2026-08-18',
    id_kelompok: 'k-4',
    nama_kelompok: 'Kelompok 4 (Curie)',
    anggota: 'Mega, Nanda, Oki, Putri',
    memahami: {
      jumlah_benar: 9,
      total_soal: 10,
      skor_persen: 90
    },
    mengaplikasi: {
      level: 4,
      catatan_guru: 'Analisis logam aluminium tepat, grafik massa terhadap volume dibuat dengan rapi.'
    },
    merefleksi: {
      level: 4,
      self_rating_siswa: 4,
      teks_jawaban: 'Setelah diberi dorongan oleh guru, kami berani memimpin presentasi di depan kelas dan ternyata teman-teman paham penjelasan kami.',
      catatan_guru: 'Kepercayaan diri mulai meningkat sejalan dengan capaian nyata mereka.'
    },
    created_at: '2026-08-18T09:45:00.000Z',
    updated_at: '2026-08-18T09:45:00.000Z'
  },
  {
    id: 'pen-p3-k5',
    topik_id: 'topik-1',
    topik_nama: 'Besaran, Satuan, dan Pengukuran IPA',
    pertemuan_ke: 3,
    tanggal: '2026-08-18',
    id_kelompok: 'k-5',
    nama_kelompok: 'Kelompok 5 (Einstein)',
    anggota: 'Rian, Sari, Taufik, Vina',
    memahami: {
      jumlah_benar: 9,
      total_soal: 10,
      skor_persen: 90
    },
    mengaplikasi: {
      level: 4,
      catatan_guru: 'Dapat menghubungkan massa jenis dengan posisi benda terapung, melayang, tenggelam.'
    },
    merefleksi: {
      level: 4,
      self_rating_siswa: 4,
      teks_jawaban: 'Materi ini paling seru karena kami bisa menebak telur akan terapung di air garam pekat dan berhasil membuktikannya.',
      catatan_guru: 'Refleksi hidup dan menunjukkan rasa ingin tahu saintifik yang kuat.'
    },
    created_at: '2026-08-18T09:50:00.000Z',
    updated_at: '2026-08-18T09:50:00.000Z'
  }
];
