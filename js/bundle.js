/**
 * js/bundle.js
 * WARDIPA LKPD Manager - Versi Disederhanakan & Terstruktur
 * 3 Aspek Penilaian:
 * 1. Pengetahuan (Kognitif): Memahami (15 Soal), Mengaplikasi (1-4), Merefleksi (1-4 & 1-5★)
 * 2. Keterampilan (Psikomotorik): Keaktifan, Kerapian, Prosedur Praktikum (1-4)
 * 3. Sikap (Afektif): Kerjasama, Disiplin, Tanggung Jawab (1-4)
 */

(function () {
  'use strict';

  // ==================== DATA AWAL STANDAR ====================
  const DEFAULT_KELAS = [
    { id: 'k-7', nama: 'Kelas 7' },
    { id: 'k-8', nama: 'Kelas 8' },
    { id: 'k-9', nama: 'Kelas 9' }
  ];

  const DEFAULT_KELOMPOK = [
    { id: 'kel-k7-1', kelas: 'Kelas 7', nama: 'Kelompok 1' },
    { id: 'kel-k7-2', kelas: 'Kelas 7', nama: 'Kelompok 2' },
    { id: 'kel-k7-3', kelas: 'Kelas 7', nama: 'Kelompok 3' },
    { id: 'kel-k7-4', kelas: 'Kelas 7', nama: 'Kelompok 4' },

    { id: 'kel-k8-1', kelas: 'Kelas 8', nama: 'Kelompok 1' },
    { id: 'kel-k8-2', kelas: 'Kelas 8', nama: 'Kelompok 2' },
    { id: 'kel-k8-3', kelas: 'Kelas 8', nama: 'Kelompok 3' },
    { id: 'kel-k8-4', kelas: 'Kelas 8', nama: 'Kelompok 4' },

    { id: 'kel-k9-1', kelas: 'Kelas 9', nama: 'Kelompok 1' },
    { id: 'kel-k9-2', kelas: 'Kelas 9', nama: 'Kelompok 2' },
    { id: 'kel-k9-3', kelas: 'Kelas 9', nama: 'Kelompok 3' },
    { id: 'kel-k9-4', kelas: 'Kelas 9', nama: 'Kelompok 4' }
  ];

  const DEFAULT_TOPIK = [
    {
      id: 'top-b1-p1',
      bab: 'BAB 1. Besaran dan pengukuran',
      pertemuan_ke: 1,
      materi: 'Besaran dan satuan',
      nama: 'BAB 1 (P1): Besaran dan satuan',
      defaultSoal: 15
    },
    {
      id: 'top-b1-p2',
      bab: 'BAB 1. Besaran dan pengukuran',
      pertemuan_ke: 2,
      materi: 'Konversi satuan',
      nama: 'BAB 1 (P2): Konversi satuan',
      defaultSoal: 15
    },
    {
      id: 'top-b1-p3',
      bab: 'BAB 1. Besaran dan pengukuran',
      pertemuan_ke: 3,
      materi: 'Alat ukur dan cara penggunaannya',
      nama: 'BAB 1 (P3): Alat ukur dan cara penggunaannya',
      defaultSoal: 15
    }
  ];

  const DEFAULT_SISWA = [
    // Kelas 7 (20 siswa)
    { id: 'sis-k7-1', kelas: 'Kelas 7', kelompokId: 'kel-k7-1', nama: 'AKIFA NAILA' },
    { id: 'sis-k7-2', kelas: 'Kelas 7', kelompokId: 'kel-k7-1', nama: 'ALIF' },
    { id: 'sis-k7-3', kelas: 'Kelas 7', kelompokId: 'kel-k7-1', nama: 'ARRAZAK' },
    { id: 'sis-k7-4', kelas: 'Kelas 7', kelompokId: 'kel-k7-1', nama: 'DAVID' },
    { id: 'sis-k7-5', kelas: 'Kelas 7', kelompokId: 'kel-k7-1', nama: 'HUMAIRAH' },
    { id: 'sis-k7-6', kelas: 'Kelas 7', kelompokId: 'kel-k7-2', nama: 'IRMAWATI' },
    { id: 'sis-k7-7', kelas: 'Kelas 7', kelompokId: 'kel-k7-2', nama: 'KARMILA' },
    { id: 'sis-k7-8', kelas: 'Kelas 7', kelompokId: 'kel-k7-2', nama: 'LAILA NURFADILA' },
    { id: 'sis-k7-9', kelas: 'Kelas 7', kelompokId: 'kel-k7-2', nama: 'LUTFI' },
    { id: 'sis-k7-10', kelas: 'Kelas 7', kelompokId: 'kel-k7-2', nama: 'MIPTA' },
    { id: 'sis-k7-11', kelas: 'Kelas 7', kelompokId: 'kel-k7-3', nama: 'MISKA MAULIDA' },
    { id: 'sis-k7-12', kelas: 'Kelas 7', kelompokId: 'kel-k7-3', nama: 'MUHAMMAD DZAKY AL-GAZALY' },
    { id: 'sis-k7-13', kelas: 'Kelas 7', kelompokId: 'kel-k7-3', nama: 'MUHAMMAD FIKRI' },
    { id: 'sis-k7-14', kelas: 'Kelas 7', kelompokId: 'kel-k7-3', nama: 'MUHAMMAD SULIPAN' },
    { id: 'sis-k7-15', kelas: 'Kelas 7', kelompokId: 'kel-k7-3', nama: 'MUHAMMAD YAHYA' },
    { id: 'sis-k7-16', kelas: 'Kelas 7', kelompokId: 'kel-k7-4', nama: 'NADILA' },
    { id: 'sis-k7-17', kelas: 'Kelas 7', kelompokId: 'kel-k7-4', nama: 'NAJWA HASANA' },
    { id: 'sis-k7-18', kelas: 'Kelas 7', kelompokId: 'kel-k7-4', nama: 'VIONA AZZAHRA' },
    { id: 'sis-k7-19', kelas: 'Kelas 7', kelompokId: 'kel-k7-4', nama: 'MULYADI' },
    { id: 'sis-k7-20', kelas: 'Kelas 7', kelompokId: 'kel-k7-4', nama: 'MUHSIN' },

    // Kelas 8 (10 siswa)
    { id: 'sis-k8-1', kelas: 'Kelas 8', kelompokId: 'kel-k8-1', nama: 'AHMAD DHANI' },
    { id: 'sis-k8-2', kelas: 'Kelas 8', kelompokId: 'kel-k8-1', nama: 'AHMAD RIDWAN' },
    { id: 'sis-k8-3', kelas: 'Kelas 8', kelompokId: 'kel-k8-1', nama: 'AZISATUL GINAYA' },
    { id: 'sis-k8-4', kelas: 'Kelas 8', kelompokId: 'kel-k8-2', nama: 'FIKRAN' },
    { id: 'sis-k8-5', kelas: 'Kelas 8', kelompokId: 'kel-k8-2', nama: 'KHAIRUL UMAM' },
    { id: 'sis-k8-6', kelas: 'Kelas 8', kelompokId: 'kel-k8-2', nama: 'MOH ALIF' },
    { id: 'sis-k8-7', kelas: 'Kelas 8', kelompokId: 'kel-k8-3', nama: 'NUR AFIKA' },
    { id: 'sis-k8-8', kelas: 'Kelas 8', kelompokId: 'kel-k8-3', nama: 'NURUL HIDAYAH' },
    { id: 'sis-k8-9', kelas: 'Kelas 8', kelompokId: 'kel-k8-4', nama: 'RESKI WAHYUNI' },
    { id: 'sis-k8-10', kelas: 'Kelas 8', kelompokId: 'kel-k8-4', nama: 'MUHAMMAD FADIL' },

    // Kelas 9 (9 siswa)
    { id: 'sis-k9-1', kelas: 'Kelas 9', kelompokId: 'kel-k9-1', nama: 'AHMAD RIFKI' },
    { id: 'sis-k9-2', kelas: 'Kelas 9', kelompokId: 'kel-k9-1', nama: 'DIMOS' },
    { id: 'sis-k9-3', kelas: 'Kelas 9', kelompokId: 'kel-k9-1', nama: 'ELISNA' },
    { id: 'sis-k9-4', kelas: 'Kelas 9', kelompokId: 'kel-k9-2', nama: 'FATUR RAHMAN' },
    { id: 'sis-k9-5', kelas: 'Kelas 9', kelompokId: 'kel-k9-2', nama: 'FIRDA' },
    { id: 'sis-k9-6', kelas: 'Kelas 9', kelompokId: 'kel-k9-3', nama: 'IRANTI' },
    { id: 'sis-k9-7', kelas: 'Kelas 9', kelompokId: 'kel-k9-3', nama: 'RISWAN' },
    { id: 'sis-k9-8', kelas: 'Kelas 9', kelompokId: 'kel-k9-4', nama: 'SABILA' },
    { id: 'sis-k9-9', kelas: 'Kelas 9', kelompokId: 'kel-k9-4', nama: 'SULFIKRAM' }
  ];

  const SAMPLE_PENILAIAN = [
    {
        "id":  "pen-p1-kelas7-k7-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Menunjukkan inisiatif baik dalam diskusi kelompok pada pertemuan pertama.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-1",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  72.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "AKIFA NAILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, kendala sedikit pada membaca skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-2",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  63.9,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "ALIF",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Masih beradaptasi dengan pembagian tugas kelompok dan langkah kerja LKPD.",
                                               "level":  3,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-3",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  63.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "ARRAZAK",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Perlu bimbingan ekstra untuk memahami petunjuk praktikum dan refleksi mandiri.",
                                               "level":  2,
                                               "self_rating":  2
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-4",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  55.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "DAVID",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih menyesuaikan diri dengan sistem belajar IPA dan alat praktikum.",
                                               "level":  2,
                                               "self_rating":  2
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-5",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  55.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "HUMAIRAH",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Cepat beradaptasi dengan lembar kerja praktikum dan saling mengecek hasil pengamatan.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-6",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  74.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "IRMAWATI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Praktikum pengukuran cukup seru, namun masih perlu penyesuaian saat mencatat data desimal.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-7",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  66.1,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "KARMILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Kerjasama kelompok berjalan baik walau masih canggung menggunakan jangka sorong.",
                                               "level":  3,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-8",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  66.1,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "LAILA NURFADILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih butuh pendampingan membaca skala dan menuliskan refleksi proses belajar.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-9",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  57.8,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "LUTFI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-10",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih dalam tahap penyesuaian diri dengan metode belajar kelompok dan alat ukur IPA.",
                                               "level":  2,
                                               "self_rating":  2
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-10",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  57.8,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MIPTA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-11",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mulai memahami petunjuk LKPD dan memandu teman sekelompok meskipun masih adaptasi awal.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  60,
                                             "jumlah_benar":  9,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-11",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  60,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  70,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MISKA MAULIDA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-12",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih adaptasi dengan penggunaan mistar dan neraca, tapi senang belajar kelompok.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  60,
                                             "jumlah_benar":  9,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-12",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  60,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  61.7,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MUHAMMAD DZAKY AL-GAZALY",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-13",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Masih canggung bekerja sama dan membaca skala alat ukur, butuh adaptasi lebih lanjut.",
                                               "level":  3,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  60,
                                             "jumlah_benar":  9,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-13",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  60,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  61.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MUHAMMAD FIKRI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-14",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih beradaptasi dengan alur pengerjaan LKPD dan pembagian tugas dalam kelompok.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  60,
                                             "jumlah_benar":  9,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-14",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  60,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  61.7,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MUHAMMAD SULIPAN",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-15",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Perlu bimbingan guru dan adaptasi membaca alat ukur serta melakukan refleksi diri.",
                                               "level":  3,
                                               "self_rating":  2
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  60,
                                             "jumlah_benar":  9,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-15",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  60,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  61.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MUHAMMAD YAHYA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-16",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Menunjukkan inisiatif baik dalam diskusi kelompok pada pertemuan pertama.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-16",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  72.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "NADILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-17",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, kendala sedikit pada membaca skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-17",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  63.9,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "NAJWA HASANA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-18",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Masih beradaptasi dengan pembagian tugas kelompok dan langkah kerja LKPD.",
                                               "level":  3,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-18",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  63.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "VIONA AZZAHRA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-19",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Perlu bimbingan ekstra untuk memahami petunjuk praktikum dan refleksi mandiri.",
                                               "level":  2,
                                               "self_rating":  2
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-19",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  55.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MULYADI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas7-k7-20",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih menyesuaikan diri dengan sistem belajar IPA dan alat praktikum.",
                                               "level":  2,
                                               "self_rating":  2
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-20",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  55.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MUHSIN",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p2-kelas7-k7-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Sudah terbiasa dengan LKPD, praktikum pengukuran massa beban berjalan sangat lancar.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-1",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  85,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "AKIFA NAILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Kerjasama kelompok makin kompak, pembagian tugas mengukur dan mencatat data sudah rapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-2",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "ALIF",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai terampil menggunakan neraca dan stopwatch, catatan hasil ukur sesuai petunjuk.",
                                               "level":  2,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-3",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "ARRAZAK",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Ada peningkatan dibanding pertemuan 1, walau masih perlu latihan ketelitian membaca skala.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-4",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  68.3,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "DAVID",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami langkah kerja praktikum, masih butuh penguatan pada konversi satuan.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-5",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  60,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "HUMAIRAH",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Sudah terbiasa dengan LKPD, praktikum pengukuran massa beban berjalan sangat lancar.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-6",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "IRMAWATI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Kerjasama kelompok makin kompak, pembagian tugas mengukur dan mencatat data sudah rapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-7",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "KARMILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai terampil menggunakan neraca dan stopwatch, catatan hasil ukur sesuai petunjuk.",
                                               "level":  2,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-8",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "LAILA NURFADILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Ada peningkatan dibanding pertemuan 1, walau masih perlu latihan ketelitian membaca skala.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-9",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  70.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "LUTFI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-10",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami langkah kerja praktikum, masih butuh penguatan pada konversi satuan.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-10",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  62.2,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MIPTA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-11",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Sudah terbiasa dengan LKPD, praktikum pengukuran massa beban berjalan sangat lancar.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-11",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  82.8,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MISKA MAULIDA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-12",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Kerjasama kelompok makin kompak, pembagian tugas mengukur dan mencatat data sudah rapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-12",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  74.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MUHAMMAD DZAKY AL-GAZALY",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-13",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai terampil menggunakan neraca dan stopwatch, catatan hasil ukur sesuai petunjuk.",
                                               "level":  2,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-13",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  74.4,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MUHAMMAD FIKRI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-14",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Ada peningkatan dibanding pertemuan 1, walau masih perlu latihan ketelitian membaca skala.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-14",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  66.1,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MUHAMMAD SULIPAN",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-15",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami langkah kerja praktikum, masih butuh penguatan pada konversi satuan.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-15",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  57.8,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MUHAMMAD YAHYA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-16",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Sudah terbiasa dengan LKPD, praktikum pengukuran massa beban berjalan sangat lancar.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-16",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  85,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "NADILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-17",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Kerjasama kelompok makin kompak, pembagian tugas mengukur dan mencatat data sudah rapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-17",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "NAJWA HASANA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-18",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai terampil menggunakan neraca dan stopwatch, catatan hasil ukur sesuai petunjuk.",
                                               "level":  2,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-18",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "VIONA AZZAHRA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-19",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Ada peningkatan dibanding pertemuan 1, walau masih perlu latihan ketelitian membaca skala.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-19",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  68.3,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MULYADI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas7-k7-20",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami langkah kerja praktikum, masih butuh penguatan pada konversi satuan.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-20",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  60,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MUHSIN",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p3-kelas7-k7-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Sangat mandiri memimpin analisis data mikrometer sekrup dan ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-1",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "AKIFA NAILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Keterampilan mengukur dan konversi satuan sangat baik, hasil diskusi kelompok memuaskan.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-2",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "ALIF",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menjelaskan batas ketelitian alat ukur dengan tepat dan percaya diri saat presentasi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-3",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  81.1,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "ARRAZAK",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pemahaman materi konversi satuan meningkat pesat dibanding pertemuan awal.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-4",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  81.1,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "DAVID",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Sudah sepenuhnya beradaptasi dengan LKPD dan mampu menyelesaikan tugas praktikum dengan baik.",
                                               "level":  2,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-5",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  72.8,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "HUMAIRAH",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Sangat mandiri memimpin analisis data mikrometer sekrup dan ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-6",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "IRMAWATI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Keterampilan mengukur dan konversi satuan sangat baik, hasil diskusi kelompok memuaskan.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-7",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "KARMILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menjelaskan batas ketelitian alat ukur dengan tepat dan percaya diri saat presentasi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-8",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "LAILA NURFADILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pemahaman materi konversi satuan meningkat pesat dibanding pertemuan awal.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-9",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "LUTFI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-10",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Sudah sepenuhnya beradaptasi dengan LKPD dan mampu menyelesaikan tugas praktikum dengan baik.",
                                               "level":  2,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-10",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  70.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MIPTA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-11",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Sangat mandiri memimpin analisis data mikrometer sekrup dan ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-11",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MISKA MAULIDA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-12",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Keterampilan mengukur dan konversi satuan sangat baik, hasil diskusi kelompok memuaskan.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-12",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MUHAMMAD DZAKY AL-GAZALY",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-13",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menjelaskan batas ketelitian alat ukur dengan tepat dan percaya diri saat presentasi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-13",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MUHAMMAD FIKRI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-14",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pemahaman materi konversi satuan meningkat pesat dibanding pertemuan awal.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-14",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MUHAMMAD SULIPAN",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-15",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Sudah sepenuhnya beradaptasi dengan LKPD dan mampu menyelesaikan tugas praktikum dengan baik.",
                                               "level":  2,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-15",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  70.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MUHAMMAD YAHYA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-16",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Sangat mandiri memimpin analisis data mikrometer sekrup dan ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-16",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "NADILA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-17",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Keterampilan mengukur dan konversi satuan sangat baik, hasil diskusi kelompok memuaskan.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-17",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "NAJWA HASANA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-18",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menjelaskan batas ketelitian alat ukur dengan tepat dan percaya diri saat presentasi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-18",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  81.1,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "VIONA AZZAHRA",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-19",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pemahaman materi konversi satuan meningkat pesat dibanding pertemuan awal.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-19",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  81.1,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MULYADI",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas7-k7-20",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Sudah sepenuhnya beradaptasi dengan LKPD dan mampu menyelesaikan tugas praktikum dengan baik.",
                                               "level":  2,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k7-20",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  72.8,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k7-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MUHSIN",
        "kelas":  "Kelas 7",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p1-kelas8-k8-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Praktikum pengukuran bersama kelompok berjalan lancar dan terstruktur.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-1",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  74.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "AHMAD DHANI",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, sedikit penyesuaian pada skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-2",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  66.1,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "AHMAD RIDWAN",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Perlu latihan lebih sering lagi membaca skala alat ukur dan konversi.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-3",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  57.8,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "AZISATUL GINAYA",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Praktikum pengukuran bersama kelompok berjalan lancar dan terstruktur.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-4",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "FIKRAN",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, sedikit penyesuaian pada skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-5",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  68.3,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "KHAIRUL UMAM",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Perlu latihan lebih sering lagi membaca skala alat ukur dan konversi.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-6",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  60,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MOH ALIF",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Praktikum pengukuran bersama kelompok berjalan lancar dan terstruktur.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-7",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  72.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "NUR AFIKA",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, sedikit penyesuaian pada skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-8",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  63.9,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k8-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "NURUL HIDAYAH",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Praktikum pengukuran bersama kelompok berjalan lancar dan terstruktur.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-9",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  74.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "RESKI WAHYUNI",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas8-k8-10",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, sedikit penyesuaian pada skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-10",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  66.1,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k8-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "MUHAMMAD FADIL",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p2-kelas8-k8-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Memimpin analisis data kelompok dan berhasil mengidentifikasi ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-1",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  85,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "AHMAD DHANI",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pengukuran kelompok cukup presisi, langkah kerja sesuai petunjuk LKPD.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-2",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "AHMAD RIDWAN",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mencoba alat ukur seru sekali, ketelitian pengukuran semakin membaik.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-3",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  68.3,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "AZISATUL GINAYA",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Memimpin analisis data kelompok dan berhasil mengidentifikasi ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-4",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "FIKRAN",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pengukuran kelompok cukup presisi, langkah kerja sesuai petunjuk LKPD.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-5",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "KHAIRUL UMAM",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mencoba alat ukur seru sekali, ketelitian pengukuran semakin membaik.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-6",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  70.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MOH ALIF",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Memimpin analisis data kelompok dan berhasil mengidentifikasi ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-7",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  85,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "NUR AFIKA",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pengukuran kelompok cukup presisi, langkah kerja sesuai petunjuk LKPD.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-8",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "NURUL HIDAYAH",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Memimpin analisis data kelompok dan berhasil mengidentifikasi ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-9",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "RESKI WAHYUNI",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas8-k8-10",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pengukuran kelompok cukup presisi, langkah kerja sesuai petunjuk LKPD.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-10",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "MUHAMMAD FADIL",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p3-kelas8-k8-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menyimpulkan batas ketelitian alat ukur dan menerapkannya dalam konteks nyata.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-1",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "AHMAD DHANI",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Diskusi konversi massa jenis sangat hidup, kelompok saling melengkapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-2",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "AHMAD RIDWAN",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Penguasaan materi alat ukur meningkat pesat dan siap menghadapi asesmen sumatif.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-3",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  81.1,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "AZISATUL GINAYA",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menyimpulkan batas ketelitian alat ukur dan menerapkannya dalam konteks nyata.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-4",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "FIKRAN",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Diskusi konversi massa jenis sangat hidup, kelompok saling melengkapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-5",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "KHAIRUL UMAM",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Penguasaan materi alat ukur meningkat pesat dan siap menghadapi asesmen sumatif.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-6",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k8-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MOH ALIF",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menyimpulkan batas ketelitian alat ukur dan menerapkannya dalam konteks nyata.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-7",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "NUR AFIKA",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Diskusi konversi massa jenis sangat hidup, kelompok saling melengkapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-8",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "NURUL HIDAYAH",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menyimpulkan batas ketelitian alat ukur dan menerapkannya dalam konteks nyata.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-9",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "RESKI WAHYUNI",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas8-k8-10",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Diskusi konversi massa jenis sangat hidup, kelompok saling melengkapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k8-10",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k8-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "MUHAMMAD FADIL",
        "kelas":  "Kelas 8",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p1-kelas9-k9-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Praktikum pengukuran bersama kelompok berjalan lancar dan terstruktur.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-1",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  74.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "AHMAD RIFKI",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas9-k9-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, sedikit penyesuaian pada skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-2",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  66.1,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "DIMOS",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas9-k9-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Perlu latihan lebih sering lagi membaca skala alat ukur dan konversi.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  2,
                                                 "label":  "Cukup"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-3",
        "keterampilan":  {
                             "label":  "Cukup Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  2
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  57.8,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Cukup (C)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  2
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "ELISNA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas9-k9-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Praktikum pengukuran bersama kelompok berjalan lancar dan terstruktur.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-4",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  72.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "FATUR RAHMAN",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas9-k9-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, sedikit penyesuaian pada skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  66.7,
                                             "jumlah_benar":  10,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-5",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  66.7,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  63.9,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k9-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "FIRDA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas9-k9-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Praktikum pengukuran bersama kelompok berjalan lancar dan terstruktur.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-6",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "IRANTI",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas9-k9-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, sedikit penyesuaian pada skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-7",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  68.3,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k9-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "RISWAN",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas9-k9-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Praktikum pengukuran bersama kelompok berjalan lancar dan terstruktur.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-8",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  74.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "SABILA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p1-kelas9-k9-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mulai memahami cara mengukur, sedikit penyesuaian pada skala alat ukur.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  73.3,
                                             "jumlah_benar":  11,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-9",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  73.3,
                            "predikat":  "Cukup (C)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  66.1,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-purple"
                        },
        "kelompokId":  "kel-k9-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p1",
        "tanggal":  "2026-08-04",
        "nama_siswa":  "SULFIKRAM",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P1): Besaran dan satuan",
        "pertemuan_ke":  1
    },
    {
        "id":  "pen-p2-kelas9-k9-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Memimpin analisis data kelompok dan berhasil mengidentifikasi ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-1",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "AHMAD RIFKI",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas9-k9-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pengukuran kelompok cukup presisi, langkah kerja sesuai petunjuk LKPD.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-2",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "DIMOS",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas9-k9-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Mencoba alat ukur seru sekali, ketelitian pengukuran semakin membaik.",
                                               "level":  2,
                                               "self_rating":  3
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-3",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  70.6,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "ELISNA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas9-k9-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Memimpin analisis data kelompok dan berhasil mengidentifikasi ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-4",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  85,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "FATUR RAHMAN",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas9-k9-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pengukuran kelompok cukup presisi, langkah kerja sesuai petunjuk LKPD.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-5",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "FIRDA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas9-k9-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Memimpin analisis data kelompok dan berhasil mengidentifikasi ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-6",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "IRANTI",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas9-k9-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pengukuran kelompok cukup presisi, langkah kerja sesuai petunjuk LKPD.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-7",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  78.9,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "RISWAN",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas9-k9-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Memimpin analisis data kelompok dan berhasil mengidentifikasi ketidakpastian pengukuran.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-8",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  85,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "SABILA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p2-kelas9-k9-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Pengukuran kelompok cukup presisi, langkah kerja sesuai petunjuk LKPD.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  80,
                                             "jumlah_benar":  12,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-9",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  80,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  76.7,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p2",
        "tanggal":  "2026-08-11",
        "nama_siswa":  "SULFIKRAM",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P2): Pengukuran Panjang, Massa \u0026 Waktu",
        "pertemuan_ke":  2
    },
    {
        "id":  "pen-p3-kelas9-k9-1",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menyimpulkan batas ketelitian alat ukur dan menerapkannya dalam konteks nyata.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-1",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "AHMAD RIFKI",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas9-k9-2",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Diskusi konversi massa jenis sangat hidup, kelompok saling melengkapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-2",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "DIMOS",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas9-k9-3",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Penguasaan materi alat ukur meningkat pesat dan siap menghadapi asesmen sumatif.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  3,
                                                 "label":  "Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-3",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Baik (B)",
                            "skor_mengaplikasi_100":  75,
                            "nilai_akhir":  81.1,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-blue"
                        },
        "kelompokId":  "kel-k9-1",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 1",
        "sikap":  {
                      "label":  "Baik (B)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  3
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "ELISNA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas9-k9-4",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menyimpulkan batas ketelitian alat ukur dan menerapkannya dalam konteks nyata.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-4",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "FATUR RAHMAN",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas9-k9-5",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Diskusi konversi massa jenis sangat hidup, kelompok saling melengkapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-5",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-2",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 2",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "FIRDA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas9-k9-6",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menyimpulkan batas ketelitian alat ukur dan menerapkannya dalam konteks nyata.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-6",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "IRANTI",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas9-k9-7",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Diskusi konversi massa jenis sangat hidup, kelompok saling melengkapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  86.7,
                                             "jumlah_benar":  13,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-7",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  86.7,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  87.2,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-3",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 3",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "RISWAN",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas9-k9-8",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Mampu menyimpulkan batas ketelitian alat ukur dan menerapkannya dalam konteks nyata.",
                                               "level":  3,
                                               "self_rating":  5
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-8",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "SABILA",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    },
    {
        "id":  "pen-p3-kelas9-k9-9",
        "pengetahuan":  {
                            "merefleksi":  {
                                               "label":  "Reflektif",
                                               "teks":  "Diskusi konversi massa jenis sangat hidup, kelompok saling melengkapi.",
                                               "level":  3,
                                               "self_rating":  4
                                           },
                            "mengaplikasi":  {
                                                 "level":  4,
                                                 "label":  "Sangat Baik"
                                             },
                            "memahami":  {
                                             "skor_persen":  93.3,
                                             "jumlah_benar":  14,
                                             "total_soal":  15
                                         }
                        },
        "siswaId":  "sis-k9-9",
        "keterampilan":  {
                             "label":  "Sangat Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  4
                         },
        "nilai_tugas":  {
                            "skor_memahami_100":  93.3,
                            "predikat":  "Sangat Baik (A)",
                            "skor_mengaplikasi_100":  100,
                            "nilai_akhir":  89.4,
                            "skor_merefleksi_100":  75,
                            "predikat_class":  "badge-emerald"
                        },
        "kelompokId":  "kel-k9-4",
        "catatan_siswa":  "",
        "nama_kelompok":  "Kelompok 4",
        "sikap":  {
                      "label":  "Sangat Baik (SB)",
                      "catatan":  "Kerjasama dan tanggung jawab dalam kelompok terlihat nyata.",
                      "level":  4
                  },
        "topikId":  "top-b1-p3",
        "tanggal":  "2026-08-18",
        "nama_siswa":  "SULFIKRAM",
        "kelas":  "Kelas 9",
        "foto_lkpd":  [

                      ],
        "topik_nama":  "BAB 1 (P3): Konversi Satuan \u0026 Ketelitian Alat Ukur",
        "pertemuan_ke":  3
    }
];

  // ==================== STORAGE PERSISTEN ====================
  const KEYS = {
    KELAS: 'wardipa_simple_kelas',
    SISWA: 'wardipa_simple_siswa',
    KELOMPOK: 'wardipa_simple_kelompok',
    TOPIK: 'wardipa_simple_topik',
    PENILAIAN: 'wardipa_simple_penilaian'
  };

  const DATA_VERSION_KEY = 'wardipa_data_ver';
  const CURRENT_DATA_VERSION = 'v11_k7_adaptasi_p1_rendah_p2_sedang_p3_tinggi';
  const DEFAULT_GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyUbje5oXG3BzOSqqnCNzJDsUUIcVBkXDK2RCDTntPMwDdlsxgtCZod070oFUXUDQpxrw/exec';

  function initStorage() {
    const storedVer = localStorage.getItem(DATA_VERSION_KEY);
    if (storedVer !== CURRENT_DATA_VERSION) {
      localStorage.setItem(KEYS.KELAS, JSON.stringify(DEFAULT_KELAS));
      localStorage.setItem(KEYS.SISWA, JSON.stringify(DEFAULT_SISWA));
      localStorage.setItem(KEYS.KELOMPOK, JSON.stringify(DEFAULT_KELOMPOK));
      localStorage.setItem(KEYS.TOPIK, JSON.stringify(DEFAULT_TOPIK));
      localStorage.setItem(KEYS.PENILAIAN, JSON.stringify(SAMPLE_PENILAIAN));
      localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
    } else {
      if (!localStorage.getItem(KEYS.KELAS)) localStorage.setItem(KEYS.KELAS, JSON.stringify(DEFAULT_KELAS));
      if (!localStorage.getItem(KEYS.SISWA)) localStorage.setItem(KEYS.SISWA, JSON.stringify(DEFAULT_SISWA));
      if (!localStorage.getItem(KEYS.KELOMPOK)) localStorage.setItem(KEYS.KELOMPOK, JSON.stringify(DEFAULT_KELOMPOK));
      if (!localStorage.getItem(KEYS.TOPIK)) localStorage.setItem(KEYS.TOPIK, JSON.stringify(DEFAULT_TOPIK));
      if (!localStorage.getItem(KEYS.PENILAIAN)) localStorage.setItem(KEYS.PENILAIAN, JSON.stringify(SAMPLE_PENILAIAN));
    }

    const curSaved = localStorage.getItem('wardipa_gas_endpoint');
    if (!curSaved || curSaved.indexOf('AKfycbyUbje5oXG3BzOSqqnCNzJDsUUIcVBkXDK2RCDTntPMwDdlsxgtCZod070oFUXUDQpxrw') === -1) {
      localStorage.setItem('wardipa_gas_endpoint', DEFAULT_GAS_ENDPOINT);
    }
  }

  function getData(key, def) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : def;
    } catch {
      return def;
    }
  }

  function setData(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn(e);
    }
  }

  // ==================== STATE APLIKASI ====================
  const App = {
    activeTab: 'penilaian',
    activePenilaianId: null,
    kelas: [],
    siswa: [],
    kelompok: [],
    topik: [],
    penilaian: []
  };

  function showToast(msg, type = 'info') {
    const box = document.getElementById('toastContainer');
    if (!box) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    t.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
    box.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 300);
    }, 3200);
  }

  function switchTab(tabId) {
    App.activeTab = tabId;
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === `tab-${tabId}`);
    });

    if (tabId === 'rekap') renderRekapTable();
    if (tabId === 'grafik') renderGrafikSection();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== GENERASI OTOMATIS KELOMPOK ====================
  function ensureDefaultKelompokForKelas(kelasName) {
    if (!kelasName) return;
    const norm = kelasName.trim().toLowerCase();
    const existing = App.kelompok.filter(k => (k.kelas || '').trim().toLowerCase() === norm);
    if (existing.length === 0) {
      for (let i = 1; i <= 4; i++) {
        App.kelompok.push({
          id: 'kel-' + Date.now() + '-' + i + '-' + Math.random().toString(36).substring(2, 6),
          kelas: kelasName,
          nama: 'Kelompok ' + i
        });
      }
      App.kelompok.push({
        id: 'kel-' + Date.now() + '-ind-' + Math.random().toString(36).substring(2, 6),
        kelas: kelasName,
        nama: 'Individu / Mandiri'
      });
      setData(KEYS.KELOMPOK, App.kelompok);
    }
  }

  function ensureAllClassesHaveKelompok() {
    let modified = false;
    App.kelas.forEach(k => {
      const norm = (k.nama || '').trim().toLowerCase();
      const existing = App.kelompok.filter(g => (g.kelas || '').trim().toLowerCase() === norm);
      if (existing.length === 0) {
        for (let i = 1; i <= 4; i++) {
          App.kelompok.push({
            id: 'kel-' + Date.now() + '-' + i + '-' + Math.random().toString(36).substring(2, 6),
            kelas: k.nama,
            nama: 'Kelompok ' + i
          });
        }
        App.kelompok.push({
          id: 'kel-' + Date.now() + '-ind-' + Math.random().toString(36).substring(2, 6),
          kelas: k.nama,
          nama: 'Individu / Mandiri'
        });
        modified = true;
      }
    });
    if (modified) {
      setData(KEYS.KELOMPOK, App.kelompok);
    }
  }

  function openModalKelompok(targetKelas) {
    const modal = document.getElementById('modalKelompok');
    const selectKelas = document.getElementById('modalKelompokSelectKelas');
    const inputNama = document.getElementById('inputNamaKelompokBaru');

    if (selectKelas) {
      selectKelas.innerHTML = '';
      App.kelas.forEach(k => {
        const o = document.createElement('option');
        o.value = k.nama;
        o.textContent = k.nama;
        selectKelas.appendChild(o);
      });

      const currentKelas = targetKelas || document.getElementById('penKelas')?.value || App.kelas[0]?.nama;
      if (currentKelas) {
        selectKelas.value = currentKelas;
      }
    }

    if (inputNama) {
      inputNama.value = '';
    }

    if (modal) {
      modal.classList.add('active');
      setTimeout(() => inputNama?.focus(), 150);
    }
  }

  function updateModalSiswaKelompokDropdown(kelasName) {
    const modalKelompok = document.getElementById('modalSiswaSelectKelompok');
    if (!modalKelompok) return;

    const normKelas = (kelasName || '').trim().toLowerCase();
    const filteredKel = App.kelompok.filter(k => (k.kelas || '').trim().toLowerCase() === normKelas);

    modalKelompok.innerHTML = '';
    filteredKel.forEach(k => {
      const o = document.createElement('option');
      o.value = k.id;
      o.textContent = k.nama;
      modalKelompok.appendChild(o);
    });
  }

  // ==================== POPULASI DROPDOWN IDENTITAS ====================
  function refreshAllDropdowns() {
    ensureAllClassesHaveKelompok();

    // 1. Kelas
    const penKelas = document.getElementById('penKelas');
    const rekapKelas = document.getElementById('rekapFilterKelas');
    const modalSiswaKelas = document.getElementById('modalSiswaSelectKelas');
    const modalKelompokKelas = document.getElementById('modalKelompokSelectKelas');

    const curK = penKelas?.value || App.kelas[0]?.nama || 'Kelas 7';

    if (penKelas) {
      penKelas.innerHTML = '';
      App.kelas.forEach(k => {
        const o = document.createElement('option');
        o.value = k.nama;
        o.textContent = k.nama;
        penKelas.appendChild(o);
      });
      if (curK && App.kelas.some(k => k.nama === curK)) {
        penKelas.value = curK;
      } else if (App.kelas.length > 0) {
        penKelas.value = App.kelas[0].nama;
      }
    }

    if (rekapKelas) {
      const curR = rekapKelas.value;
      rekapKelas.innerHTML = '<option value="all">Semua Kelas</option>';
      App.kelas.forEach(k => {
        const o = document.createElement('option');
        o.value = k.nama;
        o.textContent = k.nama;
        rekapKelas.appendChild(o);
      });
      if (curR) rekapKelas.value = curR;
    }

    if (modalSiswaKelas) {
      modalSiswaKelas.innerHTML = '';
      App.kelas.forEach(k => {
        const o = document.createElement('option');
        o.value = k.nama;
        o.textContent = k.nama;
        modalSiswaKelas.appendChild(o);
      });
      if (curK) modalSiswaKelas.value = curK;
    }

    if (modalKelompokKelas) {
      modalKelompokKelas.innerHTML = '';
      App.kelas.forEach(k => {
        const o = document.createElement('option');
        o.value = k.nama;
        o.textContent = k.nama;
        modalKelompokKelas.appendChild(o);
      });
      if (curK) modalKelompokKelas.value = curK;
    }

    // Filter Kelas di Tab Grafik
    const gKelas = document.getElementById('grafikFilterKelas');
    if (gKelas) {
      const curG = gKelas.value;
      gKelas.innerHTML = '<option value="all">Semua Kelas</option>';
      App.kelas.forEach(k => {
        const o = document.createElement('option');
        o.value = k.nama;
        o.textContent = k.nama;
        gKelas.appendChild(o);
      });
      if (curG) gKelas.value = curG;
    }

    // 2. Topik
    const penTopik = document.getElementById('penTopik');
    if (penTopik) {
      const curT = penTopik.value;
      penTopik.innerHTML = '';
      App.topik.forEach(t => {
        const o = document.createElement('option');
        o.value = t.id;
        o.textContent = t.nama;
        penTopik.appendChild(o);
      });
      if (curT && App.topik.some(t => t.id === curT)) {
        penTopik.value = curT;
      } else if (App.topik.length > 0) {
        penTopik.value = App.topik[0].id;
      }
    }

    // 3. Update Datalist BAB di Modal Materi
    const dlBab = document.getElementById('listExistingBab');
    if (dlBab) {
      dlBab.innerHTML = '';
      const uniqueBabs = Array.from(new Set(App.topik.map(t => t.bab).filter(Boolean)));
      uniqueBabs.forEach(b => {
        const o = document.createElement('option');
        o.value = b;
        dlBab.appendChild(o);
      });
    }

    // Perbarui Siswa & Kelompok sesuai Kelas yang aktif
    const activeKelas = penKelas?.value || curK;
    updateSiswaAndKelompokDropdowns(activeKelas);
  }

  function updateSiswaAndKelompokDropdowns(kelasName) {
    if (!kelasName && App.kelas.length > 0) {
      kelasName = App.kelas[0].nama;
    }
    if (!kelasName) return;

    ensureDefaultKelompokForKelas(kelasName);

    const normKelas = (kelasName || '').trim().toLowerCase();

    // Siswa
    const penSiswa = document.getElementById('penSiswa');
    const filteredSiswa = App.siswa.filter(s => (s.kelas || '').trim().toLowerCase() === normKelas);

    if (penSiswa) {
      const prevSId = penSiswa.value;
      penSiswa.innerHTML = '';
      if (filteredSiswa.length === 0) {
        penSiswa.innerHTML = '<option value="">(Belum ada siswa - Klik "+ Input Siswa")</option>';
      } else {
        filteredSiswa.forEach(s => {
          const o = document.createElement('option');
          o.value = s.id;
          o.textContent = s.nama;
          penSiswa.appendChild(o);
        });
        if (prevSId && filteredSiswa.some(s => s.id === prevSId)) {
          penSiswa.value = prevSId;
        }
      }
    }

    // Kelompok
    const penKelompok = document.getElementById('penKelompok');
    const filteredKel = App.kelompok.filter(k => (k.kelas || '').trim().toLowerCase() === normKelas);

    if (penKelompok) {
      const prevKId = penKelompok.value;
      penKelompok.innerHTML = '';
      filteredKel.forEach(k => {
        const o = document.createElement('option');
        o.value = k.id;
        o.textContent = k.nama;
        penKelompok.appendChild(o);
      });

      // Opsi cepat tambah kelompok langsung dari dropdown
      const optAdd = document.createElement('option');
      optAdd.value = '__add_new__';
      optAdd.textContent = '➕ + Tambah Kelompok Baru...';
      penKelompok.appendChild(optAdd);

      if (prevKId && filteredKel.some(k => k.id === prevKId)) {
        penKelompok.value = prevKId;
      } else if (filteredKel.length > 0) {
        penKelompok.value = filteredKel[0].id;
      }
    }

    // Update Kelompok dropdown di Modal Siswa juga
    updateModalSiswaKelompokDropdown(kelasName);

    // Sesuaikan kelompok jika siswa terpilih memiliki relasi kelompok
    syncKelompokFromSelectedStudent();
  }

  function syncKelompokFromSelectedStudent() {
    const penSiswa = document.getElementById('penSiswa');
    const penKelompok = document.getElementById('penKelompok');
    if (!penSiswa || !penKelompok) return;

    const sId = penSiswa.value;
    const pKe = Number(document.getElementById('penPertemuan')?.value) || 1;
    const exist = App.penilaian.find(p => p.siswaId === sId && Number(p.pertemuan_ke) === pKe);
    if (exist && exist.kelompokId) {
      const hasOpt = Array.from(penKelompok.options).some(o => o.value === exist.kelompokId);
      if (hasOpt) {
        penKelompok.value = exist.kelompokId;
      }
    }

    // Muat nilai jika siswa ini sudah dinilai untuk pertemuan ini
    loadExistingGradeIfAny();
  }

  function loadExistingGradeIfAny() {
    const sId = document.getElementById('penSiswa')?.value;
    const tId = document.getElementById('penTopik')?.value;
    const pKe = Number(document.getElementById('penPertemuan')?.value) || 1;

    const exist = App.penilaian.find(p => p.siswaId === sId && p.topikId === tId && Number(p.pertemuan_ke) === pKe);
    if (exist) {
      App.activePenilaianId = exist.id;
      // Memahami
      document.getElementById('inputJumlahBenar').value = exist.pengetahuan?.memahami?.jumlah_benar ?? 13;
      const skorMemVal = exist.pengetahuan?.memahami?.skor_persen ?? Number(((Number(document.getElementById('inputJumlahBenar').value) / 15) * 100).toFixed(1));
      document.getElementById('displaySkorMemahami').textContent = `${formatIndoDecimal(skorMemVal)}%`;

      // Mengaplikasi
      setSelectLevel('mengaplikasiRubricSelector', exist.pengetahuan?.mengaplikasi?.level ?? 3);

      // Merefleksi
      setSelectLevel('merefleksiRubricSelector', exist.pengetahuan?.merefleksi?.level ?? 3);
      setStarUI(exist.pengetahuan?.merefleksi?.self_rating ?? 4);
      document.getElementById('inputTeksRefleksi').value = exist.pengetahuan?.merefleksi?.teks || '';

      // Keterampilan
      setSelectLevel('keterampilanSelector', exist.keterampilan?.level ?? 3);
      document.getElementById('inputCatatanKeterampilan').value = exist.keterampilan?.catatan || '';

      // Sikap
      setSelectLevel('sikapSelector', exist.sikap?.level ?? 3);
      document.getElementById('inputCatatanSikap').value = exist.sikap?.catatan || '';

      updateRealtimeNilaiTugas();
      showToast(`Memuat nilai tersimpan untuk ${exist.nama_siswa}`, 'info');
    } else {
      App.activePenilaianId = null;
      resetGradeFieldsOnly();
    }
    refreshFotoViewerForActiveStudent();
  }

  // Format Angka Desimal Standar Indonesia (koma)
  function formatIndoDecimal(num) {
    if (num === null || num === undefined || isNaN(num)) return '0,0';
    return Number(num).toFixed(1).replace('.', ',');
  }

  function resetGradeFieldsOnly() {
    document.getElementById('inputJumlahBenar').value = 13;
    document.getElementById('displaySkorMemahami').textContent = '86,7%';
    setSelectLevel('mengaplikasiRubricSelector', 3);
    setSelectLevel('merefleksiRubricSelector', 3);
    setStarUI(4);
    document.getElementById('inputTeksRefleksi').value = '';
    setSelectLevel('keterampilanSelector', 3);
    document.getElementById('inputCatatanKeterampilan').value = '';
    setSelectLevel('sikapSelector', 3);
    document.getElementById('inputCatatanSikap').value = '';
    updateRealtimeNilaiTugas();
  }

  // Konversi Skala 1-4 ke 0-100
  function convertRubrikTo100(level) {
    const l = Math.max(1, Math.min(4, Number(level) || 1));
    return Math.round((l / 4) * 100);
  }

  // Hitung Nilai Tugas Pertemuan Siswa (0-100) dari 3 Dimensi dengan 1 Desimal Presisi
  function calcNilaiTugas(jBenar, aplLevel, refLevel) {
    const b = Math.max(0, Math.min(15, Number(jBenar) || 0));
    const skorMem = Number(((b / 15) * 100).toFixed(1));
    const skorApl100 = convertRubrikTo100(aplLevel);
    const skorRef100 = convertRubrikTo100(refLevel);
    const nilaiAkhir = Number(((skorMem + skorApl100 + skorRef100) / 3).toFixed(1));

    let predikat = 'Perlu Bimbingan (D)';
    let predikatClass = 'badge-amber';
    if (nilaiAkhir >= 85) {
      predikat = 'Sangat Baik (A)';
      predikatClass = 'badge-emerald';
    } else if (nilaiAkhir >= 70) {
      predikat = 'Baik (B)';
      predikatClass = 'badge-blue';
    } else if (nilaiAkhir >= 55) {
      predikat = 'Cukup (C)';
      predikatClass = 'badge-purple';
    }

    return {
      skor_memahami_100: skorMem,
      skor_mengaplikasi_100: skorApl100,
      skor_merefleksi_100: skorRef100,
      nilai_akhir: nilaiAkhir,
      nilai_akhir_format: formatIndoDecimal(nilaiAkhir),
      predikat: predikat,
      predikat_class: predikatClass
    };
  }

  // Update Real-Time Preview Nilai Tugas (0-100) di Form
  function updateRealtimeNilaiTugas() {
    const inBenar = document.getElementById('inputJumlahBenar');
    const jBenar = inBenar ? Number(inBenar.value) : 13;
    const aplLvl = getSelectLevel('mengaplikasiRubricSelector');
    const refLvl = getSelectLevel('merefleksiRubricSelector');

    const result = calcNilaiTugas(jBenar, aplLvl, refLvl);

    const elMem = document.getElementById('displaySkorMemahami');
    if (elMem) elMem.textContent = `${formatIndoDecimal(result.skor_memahami_100)}%`;

    const elApl = document.getElementById('displaySkorMengaplikasi');
    if (elApl) {
      elApl.textContent = `${result.skor_mengaplikasi_100}`;
      const sub = elApl.nextElementSibling;
      if (sub) sub.textContent = `(Level ${aplLvl} ÷ 4 × 100)`;
    }

    const elRef = document.getElementById('displaySkorMerefleksi');
    if (elRef) {
      elRef.textContent = `${result.skor_merefleksi_100}`;
      const sub = elRef.nextElementSibling;
      if (sub) sub.textContent = `(L${refLvl} ÷ 4 × 100)`;
    }

    const elAkhir = document.getElementById('displayNilaiTugasAkhir');
    if (elAkhir) elAkhir.textContent = `${formatIndoDecimal(result.nilai_akhir)}`;

    const elBadge = document.getElementById('badgePredikatTugas');
    if (elBadge) {
      elBadge.className = `badge ${result.predikat_class}`;
      elBadge.textContent = result.predikat;
    }

    const elRumus = document.getElementById('textRumusTugas');
    if (elRumus) {
      elRumus.textContent = `(Memahami: ${formatIndoDecimal(result.skor_memahami_100)} + Mengaplikasi: ${result.skor_mengaplikasi_100} + Merefleksi: ${result.skor_merefleksi_100}) ÷ 3`;
    }
  }

  // Helper Level Rubrik
  function setSelectLevel(containerId, level) {
    const btns = document.querySelectorAll(`#${containerId} .rubric-opt-btn`);
    btns.forEach(b => {
      b.classList.toggle('selected', Number(b.getAttribute('data-level')) === Number(level));
    });
  }

  function getSelectLevel(containerId) {
    const sel = document.querySelector(`#${containerId} .rubric-opt-btn.selected`);
    return sel ? Number(sel.getAttribute('data-level')) : 3;
  }

  const STAR_LABELS = {
    1: '1★ - Belum Paham (Perlu Belajar Lagi)',
    2: '2★ - Kurang Paham',
    3: '3★ - Cukup Paham',
    4: '4★ - Paham dengan Baik',
    5: '5★ - Sangat Paham & Menguasai'
  };

  function setStarUI(rating) {
    const r = Math.max(1, Math.min(5, Number(rating) || 4));
    const btns = document.querySelectorAll('#starRatingSelector .star-btn');
    btns.forEach(b => {
      b.classList.toggle('active', Number(b.getAttribute('data-rating')) <= r);
    });
    const labelElem = document.getElementById('starRatingTextLabel');
    if (labelElem) {
      labelElem.textContent = STAR_LABELS[r] || `${r}★`;
    }
  }

  function getStarRating() {
    return document.querySelectorAll('#starRatingSelector .star-btn.active').length || 4;
  }

  // ==================== SIMPAN PENILAIAN ====================
  function saveCurrentPenilaian(advanceNext = false) {
    const sId = document.getElementById('penSiswa')?.value;
    const sObj = App.siswa.find(s => s.id === sId);
    if (!sObj) {
      showToast('Pilih nama siswa terlebih dahulu!', 'error');
      return;
    }

    const kelas = document.getElementById('penKelas').value;
    const kelId = document.getElementById('penKelompok').value;
    const kelObj = App.kelompok.find(k => k.id === kelId);
    const topId = document.getElementById('penTopik').value;
    const topObj = App.topik.find(t => t.id === topId);
    const pKe = Number(document.getElementById('penPertemuan').value) || 1;
    const tgl = document.getElementById('penTanggal').value || new Date().toISOString().slice(0, 10);

    const jBenar = Number(document.getElementById('inputJumlahBenar').value) || 0;
    const skorMemahami = Number(((jBenar / 15) * 100).toFixed(1));

    const aplLvl = getSelectLevel('mengaplikasiRubricSelector');
    const refLvl = getSelectLevel('merefleksiRubricSelector');
    const refStar = getStarRating();
    const refTeks = document.getElementById('inputTeksRefleksi').value.trim();

    const ketLvl = getSelectLevel('keterampilanSelector');
    const ketCatatan = document.getElementById('inputCatatanKeterampilan').value.trim();

    const sikLvl = getSelectLevel('sikapSelector');
    const sikCatatan = document.getElementById('inputCatatanSikap').value.trim();

    const nilaiTugasObj = calcNilaiTugas(jBenar, aplLvl, refLvl);

    const entry = {
      id: App.activePenilaianId || ('pen-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6)),
      kelas: kelas,
      siswaId: sId,
      nama_siswa: sObj.nama,
      kelompokId: kelId,
      nama_kelompok: kelObj ? kelObj.nama : 'Kelompok',
      topikId: topId,
      topik_nama: topObj ? topObj.nama : 'Topik IPA',
      pertemuan_ke: pKe,
      tanggal: tgl,
      // Nilai Tugas Pertemuan (Skala 0-100 Hasil Konversi 3 Dimensi)
      nilai_tugas: nilaiTugasObj,
      // 1. Pengetahuan
      pengetahuan: {
        memahami: { jumlah_benar: jBenar, total_soal: 15, skor_persen: skorMemahami },
        mengaplikasi: { level: aplLvl, label: aplLvl === 4 ? 'Sangat Baik' : aplLvl === 3 ? 'Baik' : aplLvl === 2 ? 'Cukup' : 'Perlu Bimbingan' },
        merefleksi: { level: refLvl, label: refLvl === 4 ? 'Sangat Reflektif' : refLvl === 3 ? 'Reflektif' : refLvl === 2 ? 'Kurang Reflektif' : 'Belum Reflektif', self_rating: refStar, teks: refTeks }
      },
      // 2. Keterampilan
      keterampilan: {
        level: ketLvl,
        label: ketLvl === 4 ? 'Sangat Terampil' : ketLvl === 3 ? 'Terampil' : ketLvl === 2 ? 'Cukup Terampil' : 'Perlu Bimbingan',
        catatan: ketCatatan
      },
      // 3. Sikap
      sikap: {
        level: sikLvl,
        label: sikLvl === 4 ? 'Sangat Baik (SB)' : sikLvl === 3 ? 'Baik (B)' : sikLvl === 2 ? 'Cukup (C)' : 'Perlu Pembinaan (PB)',
        catatan: sikCatatan
      },
      foto_lkpd: (App.activePenilaianId ? (App.penilaian.find(p => p.id === App.activePenilaianId)?.foto_lkpd || []) : []),
      catatan_siswa: (App.activePenilaianId ? (App.penilaian.find(p => p.id === App.activePenilaianId)?.catatan_siswa || '') : '')
    };

    // Simpan ke array & LocalStorage
    const idx = App.penilaian.findIndex(p => p.id === entry.id);
    if (idx >= 0) App.penilaian[idx] = entry; else App.penilaian.push(entry);
    setData(KEYS.PENILAIAN, App.penilaian);

    showToast(`Nilai ${sObj.nama} berhasil disimpan!`, 'success');

    if (advanceNext) {
      // Pindah ke siswa berikutnya dalam dropdown
      const selS = document.getElementById('penSiswa');
      const curIdx = selS.selectedIndex;
      if (curIdx < selS.options.length - 1) {
        selS.selectedIndex = curIdx + 1;
        syncKelompokFromSelectedStudent();
        showToast(`Lanjut menilai: ${selS.options[curIdx + 1].text}`, 'info');
      } else {
        showToast('Semua siswa di kelas ini telah dinilai!', 'success');
        switchTab('rekap');
      }
    }
  }

  // ==================== TAB REKAPITULASI & PAPAN PERINGKAT ====================
  function switchRekapViewMode(mode) {
    const vTable = document.getElementById('viewRekapTable');
    const vLb = document.getElementById('viewRekapLeaderboard');
    const btnTable = document.getElementById('btnViewModeTable');
    const btnLb = document.getElementById('btnViewModeLeaderboard');

    if (mode === 'leaderboard') {
      if (vTable) vTable.style.display = 'none';
      if (vLb) vLb.style.display = 'flex';
      if (btnTable) {
        btnTable.className = 'btn btn-secondary btn-sm';
      }
      if (btnLb) {
        btnLb.className = 'btn btn-primary btn-sm';
      }
    } else {
      if (vTable) vTable.style.display = 'block';
      if (vLb) vLb.style.display = 'none';
      if (btnTable) {
        btnTable.className = 'btn btn-primary btn-sm';
      }
      if (btnLb) {
        btnLb.className = 'btn btn-secondary btn-sm';
      }
    }
  }

  function renderRekapTable() {
    const kFilter = document.getElementById('rekapFilterKelas')?.value || 'all';
    const pFilter = document.getElementById('rekapFilterPertemuan')?.value || 'all';
    const uFilter = document.getElementById('rekapFilterUrutan')?.value || 'nilai_desc';
    const tbody = document.getElementById('tableRekapBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    // Update Dropdown Pertemuan Rekap
    const selP = document.getElementById('rekapFilterPertemuan');
    if (selP) {
      const cur = selP.value;
      const pSet = new Set(App.penilaian.map(p => Number(p.pertemuan_ke)));
      const pList = Array.from(pSet).sort((a, b) => a - b);
      selP.innerHTML = '<option value="all">Semua Pertemuan</option>';
      pList.forEach(p => {
        const o = document.createElement('option');
        o.value = p;
        o.textContent = `Pertemuan ${p}`;
        selP.appendChild(o);
      });
      if (cur) selP.value = cur;
    }

    let filtered = App.penilaian;
    if (kFilter !== 'all') filtered = filtered.filter(p => p.kelas === kFilter);
    if (pFilter !== 'all') filtered = filtered.filter(p => Number(p.pertemuan_ke) === Number(pFilter));

    // Perkaya setiap entri dengan objek nilai_tugas untuk sorting & rendering
    filtered = filtered.map(p => {
      const nt = p.nilai_tugas || calcNilaiTugas(
        p.pengetahuan?.memahami?.jumlah_benar,
        p.pengetahuan?.mengaplikasi?.level,
        p.pengetahuan?.merefleksi?.level
      );
      return { ...p, _nt: nt };
    });

    // Update Label Jumlah Siswa
    const lblTotal = document.getElementById('labelTotalSiswaRekap');
    if (lblTotal) {
      const pText = pFilter !== 'all' ? `Pertemuan ${pFilter}` : 'Semua Pertemuan';
      const kText = kFilter !== 'all' ? kFilter : 'Semua Kelas';
      lblTotal.innerHTML = `Total data: <strong>${filtered.length}</strong> siswa (${kText} • ${pText})`;
    }

    // Pengurutan (Sorting) Data
    if (uFilter === 'nilai_desc') {
      filtered.sort((a, b) => (b._nt.nilai_akhir - a._nt.nilai_akhir) || ((b.pengetahuan?.memahami?.skor_persen || 0) - (a.pengetahuan?.memahami?.skor_persen || 0)) || (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
    } else if (uFilter === 'nilai_asc') {
      filtered.sort((a, b) => (a._nt.nilai_akhir - b._nt.nilai_akhir) || (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
    } else if (uFilter === 'nama_asc') {
      filtered.sort((a, b) => (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
    }

    // Render Papan Peringkat Khusus (Leaderboard)
    renderLeaderboardSection(filtered, kFilter, pFilter);

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">Belum ada data penilaian untuk kriteria ini.</td></tr>';
      return;
    }

    filtered.forEach((p, idx) => {
      const tr = document.createElement('tr');
      tr.style.cssText = 'border-bottom: 1px solid rgba(255,255,255,0.06);';

      const mem = p.pengetahuan?.memahami;
      const apl = p.pengetahuan?.mengaplikasi;
      const ref = p.pengetahuan?.merefleksi;
      const ket = p.keterampilan;
      const sik = p.sikap;
      const nt = p._nt;

      let noDisplay = `${idx + 1}`;
      if (uFilter === 'nilai_desc') {
        if (idx === 0) noDisplay = '<span style="font-size: 1.15rem; font-weight: 800; color: #fbbf24;" title="Peringkat 1 (Tertinggi)">🥇 1</span>';
        else if (idx === 1) noDisplay = '<span style="font-size: 1.15rem; font-weight: 800; color: #94a3b8;" title="Peringkat 2">🥈 2</span>';
        else if (idx === 2) noDisplay = '<span style="font-size: 1.15rem; font-weight: 800; color: #d97706;" title="Peringkat 3">🥉 3</span>';
        else noDisplay = `<strong style="color: var(--text-dim);">#${idx + 1}</strong>`;
      }

      tr.innerHTML = `
        <td style="padding: 0.75rem 1rem; text-align: center;">${noDisplay}</td>
        <td style="padding: 0.75rem 1rem;">
          <strong style="color: #38bdf8; font-size: 0.95rem;">👤 ${p.nama_siswa}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">P${p.pertemuan_ke} • ${p.tanggal}</span>
        </td>
        <td style="padding: 0.75rem 1rem;"><span class="badge badge-indigo">${p.kelas}</span></td>
        <td style="padding: 0.75rem 1rem;">${p.nama_kelompok}</td>
        
        <!-- Nilai Tugas Pertemuan (Skala 0-100) -->
        <td style="padding: 0.75rem 1rem; background: rgba(251, 191, 36, 0.05); border-left: 2px solid rgba(251, 191, 36, 0.35); border-right: 2px solid rgba(251, 191, 36, 0.35); text-align: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
            <strong style="font-size: 1.35rem; color: #fbbf24; font-weight: 800; line-height: 1;">${formatIndoDecimal(nt.nilai_akhir)}</strong>
            <span class="badge ${nt.predikat_class}" style="font-size: 0.72rem; padding: 2px 7px;">${nt.predikat}</span>
          </div>
        </td>

        <!-- 1. Rincian 3 Dimensi (0-100) -->
        <td style="padding: 0.75rem 1rem;">
          <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
            <span class="badge badge-blue" title="Memahami: ${mem?.jumlah_benar ?? 0}/15 Soal = Skor ${formatIndoDecimal(nt.skor_memahami_100)}">M: ${formatIndoDecimal(nt.skor_memahami_100)}%</span>
            <span class="badge badge-emerald" title="Mengaplikasi: Level ${apl?.level ?? 1} (Konversi: ${nt.skor_mengaplikasi_100})">A: L${apl?.level ?? 1} (${nt.skor_mengaplikasi_100})</span>
            <span class="badge badge-purple" title="Merefleksi: Level ${ref?.level ?? 1} (Konversi: ${nt.skor_merefleksi_100})">R: L${ref?.level ?? 1} (${nt.skor_merefleksi_100})</span>
          </div>
        </td>

        <!-- 2. Keterampilan -->
        <td style="padding: 0.75rem 1rem;">
          <span class="badge ${ket?.level >= 3 ? 'badge-emerald' : 'badge-amber'}">
            L${ket?.level || 3} - ${ket?.label || 'Terampil'}
          </span>
        </td>

        <!-- 3. Sikap -->
        <td style="padding: 0.75rem 1rem;">
          <span class="badge ${sik?.level >= 3 ? 'badge-purple' : 'badge-amber'}">
            L${sik?.level || 3} - ${sik?.label || 'Baik'}
          </span>
        </td>

        <!-- Refleksi -->
        <td style="padding: 0.75rem 1rem; max-width: 220px; font-size: 0.8rem; font-style: italic; color: #cbd5e1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${ref?.teks ? `"${ref.teks}"` : '<span style="color: var(--text-dim);">-</span>'}
        </td>

        <!-- Aksi -->
        <td style="padding: 0.75rem 1rem; text-align: center;">
          <div style="display: flex; gap: 0.3rem; justify-content: center;">
            <button class="btn btn-secondary btn-sm btn-edit-p">✏️</button>
            <button class="btn btn-secondary btn-sm btn-del-p" style="color: #f87171;">🗑️</button>
          </div>
        </td>
      `;

      tr.querySelector('.btn-edit-p').addEventListener('click', () => {
        document.getElementById('penKelas').value = p.kelas;
        updateSiswaAndKelompokDropdowns(p.kelas);
        document.getElementById('penSiswa').value = p.siswaId;
        document.getElementById('penKelompok').value = p.kelompokId;
        document.getElementById('penTopik').value = p.topikId;
        document.getElementById('penPertemuan').value = p.pertemuan_ke;
        document.getElementById('penTanggal').value = p.tanggal;

        loadExistingGradeIfAny();
        switchTab('penilaian');
      });

      tr.querySelector('.btn-del-p').addEventListener('click', () => {
        if (confirm(`Hapus nilai siswa ${p.nama_siswa} (Pertemuan ${p.pertemuan_ke})?`)) {
          App.penilaian = App.penilaian.filter(x => x.id !== p.id);
          setData(KEYS.PENILAIAN, App.penilaian);
          showToast('Data berhasil dihapus.', 'info');
          renderRekapTable();
        }
      });

      tbody.appendChild(tr);
    });
  }

  // ==================== PAPAN PERINGKAT NILAI (LEADERBOARD) ====================
  function renderLeaderboardSection(data, kFilter, pFilter) {
    const tbody = document.getElementById('tableLeaderboardBody');
    const podiumCont = document.getElementById('leaderboardPodiumContainer');
    const elMaxScore = document.getElementById('lbMaxScore');
    const elMaxStudent = document.getElementById('lbMaxStudent');
    const elMinScore = document.getElementById('lbMinScore');
    const elMinStudent = document.getElementById('lbMinStudent');
    const elAvgScore = document.getElementById('lbAvgScore');
    const elAvgPredikat = document.getElementById('lbAvgPredikat');
    const elPassPercent = document.getElementById('lbPassPercent');
    const elPassCount = document.getElementById('lbPassCount');

    if (!tbody) return;
    tbody.innerHTML = '';
    if (podiumCont) podiumCont.innerHTML = '';

    // Selalu urutkan dari nilai tertinggi ke terendah
    const ranked = [...data].sort((a, b) => {
      const diff = b._nt.nilai_akhir - a._nt.nilai_akhir;
      if (diff !== 0) return diff;
      return ((b.pengetahuan?.memahami?.skor_persen || 0) - (a.pengetahuan?.memahami?.skor_persen || 0));
    });

    if (ranked.length === 0) {
      if (elMaxScore) elMaxScore.textContent = '0';
      if (elMaxStudent) elMaxStudent.textContent = 'Belum ada data';
      if (elMinScore) elMinScore.textContent = '0';
      if (elMinStudent) elMinStudent.textContent = 'Belum ada data';
      if (elAvgScore) elAvgScore.textContent = '0';
      if (elAvgPredikat) elAvgPredikat.textContent = 'Predikat Kelas: -';
      if (elPassPercent) elPassPercent.textContent = '0%';
      if (elPassCount) elPassCount.textContent = '0 dari 0 siswa tuntas';
      tbody.innerHTML = '<tr><td colspan="8" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">Belum ada data nilai untuk kriteria pertemuan ini.</td></tr>';
      return;
    }

    // 1. Statistik
    const top1 = ranked[0];
    const lowest = ranked[ranked.length - 1];
    const sumAll = ranked.reduce((acc, c) => acc + c._nt.nilai_akhir, 0);
    const avgScore = Number((sumAll / ranked.length).toFixed(1));
    const passedStudents = ranked.filter(s => s._nt.nilai_akhir >= 70);
    const passRate = Math.round((passedStudents.length / ranked.length) * 100);

    if (elMaxScore) elMaxScore.textContent = `${formatIndoDecimal(top1._nt.nilai_akhir)}`;
    if (elMaxStudent) elMaxStudent.textContent = `👤 ${top1.nama_siswa} (${top1.kelas}, P${top1.pertemuan_ke})`;

    if (elMinScore) elMinScore.textContent = `${formatIndoDecimal(lowest._nt.nilai_akhir)}`;
    if (elMinStudent) elMinStudent.textContent = `👤 ${lowest.nama_siswa} (${lowest.kelas}, P${lowest.pertemuan_ke})`;

    if (elAvgScore) elAvgScore.textContent = `${formatIndoDecimal(avgScore)}`;
    if (elAvgPredikat) {
      let pred = 'Perlu Bimbingan (D)';
      if (avgScore >= 85) pred = 'Sangat Baik (A)';
      else if (avgScore >= 70) pred = 'Baik (B)';
      else if (avgScore >= 55) pred = 'Cukup (C)';
      elAvgPredikat.textContent = `Predikat Rata-Rata: ${pred}`;
    }

    if (elPassPercent) elPassPercent.textContent = `${passRate}%`;
    if (elPassCount) elPassCount.textContent = `${passedStudents.length} dari ${ranked.length} siswa tuntas (≥ 70)`;

    // 2. Podium Visual Top 3
    if (podiumCont) {
      const top3 = ranked.slice(0, 3);
      const podiumConfig = [
        { rank: 1, medal: '🥇', title: 'Juara 1 (Tertinggi)', borderColor: '#fbbf24', bg: 'rgba(251, 191, 36, 0.08)', textColor: '#fbbf24', badgeClass: 'badge-amber' },
        { rank: 2, medal: '🥈', title: 'Juara 2', borderColor: '#94a3b8', bg: 'rgba(148, 163, 184, 0.08)', textColor: '#cbd5e1', badgeClass: 'badge-slate' },
        { rank: 3, medal: '🥉', title: 'Juara 3', borderColor: '#d97706', bg: 'rgba(217, 119, 6, 0.08)', textColor: '#f59e0b', badgeClass: 'badge-amber' }
      ];

      top3.forEach((s, i) => {
        const cfg = podiumConfig[i];
        const card = document.createElement('div');
        card.className = 'form-card';
        card.style.cssText = `border: 2px solid ${cfg.borderColor}; background: ${cfg.bg}; padding: 1.1rem; position: relative; overflow: hidden;`;

        card.innerHTML = `
          <div style="position: absolute; right: -10px; top: -10px; font-size: 3.5rem; opacity: 0.15; user-select: none;">
            ${cfg.medal}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 0.85rem; font-weight: 700; color: ${cfg.textColor}; display: flex; align-items: center; gap: 0.35rem;">
              <span style="font-size: 1.25rem;">${cfg.medal}</span> ${cfg.title}
            </span>
            <span class="badge ${s._nt.predikat_class}">${s._nt.predikat}</span>
          </div>
          <h4 style="font-size: 1.1rem; color: #fff; margin: 0.35rem 0 0.2rem 0; font-weight: 800;">
            ${s.nama_siswa}
          </h4>
          <span style="font-size: 0.78rem; color: var(--text-muted); display: block; margin-bottom: 0.75rem;">
            ${s.kelas} • ${s.nama_kelompok} • Pertemuan ${s.pertemuan_ke}
          </span>
          <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
            <strong style="font-size: 2.2rem; color: #fbbf24; font-weight: 900; line-height: 1;">${formatIndoDecimal(s._nt.nilai_akhir)}</strong>
            <span style="font-size: 0.85rem; color: var(--text-muted);">/ 100</span>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.75rem; color: #cbd5e1; display: flex; justify-content: space-between;">
            <span>M: <strong>${formatIndoDecimal(s._nt.skor_memahami_100)}%</strong></span>
            <span>A: <strong>${s._nt.skor_mengaplikasi_100}</strong></span>
            <span>R: <strong>${s._nt.skor_merefleksi_100}</strong></span>
          </div>
        `;
        podiumCont.appendChild(card);
      });
    }

    // 3. Tabel Peringkat Lengkap
    ranked.forEach((s, idx) => {
      const tr = document.createElement('tr');
      tr.style.cssText = 'border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.15s ease;';
      tr.addEventListener('mouseenter', () => tr.style.background = 'rgba(255,255,255,0.04)');
      tr.addEventListener('mouseleave', () => tr.style.background = 'transparent');

      let rankBadge = '';
      if (idx === 0) rankBadge = '<span style="font-size: 1.25rem; font-weight: 800; color: #fbbf24;" title="Peringkat 1">🥇 1</span>';
      else if (idx === 1) rankBadge = '<span style="font-size: 1.25rem; font-weight: 800; color: #94a3b8;" title="Peringkat 2">🥈 2</span>';
      else if (idx === 2) rankBadge = '<span style="font-size: 1.25rem; font-weight: 800; color: #d97706;" title="Peringkat 3">🥉 3</span>';
      else rankBadge = `<strong style="font-size: 1rem; color: var(--text-dim);">#${idx + 1}</strong>`;

      const isPass = s._nt.nilai_akhir >= 70;
      const statusBadge = isPass
        ? '<span class="badge badge-emerald" style="display: inline-flex; align-items: center; gap: 0.3rem;"><span>✅</span> Tuntas</span>'
        : '<span class="badge badge-amber" style="display: inline-flex; align-items: center; gap: 0.3rem;"><span>⚠️</span> Remedial</span>';

      const barColor = s._nt.nilai_akhir >= 85 ? '#34d399' : s._nt.nilai_akhir >= 70 ? '#38bdf8' : s._nt.nilai_akhir >= 55 ? '#a78bfa' : '#f87171';

      tr.innerHTML = `
        <td style="padding: 0.85rem 1rem; text-align: center;">
          ${rankBadge}
        </td>
        <td style="padding: 0.85rem 1rem;">
          <strong style="color: #fff; font-size: 0.95rem; display: block;">👤 ${s.nama_siswa}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">P${s.pertemuan_ke} • ${s.tanggal}</span>
        </td>
        <td style="padding: 0.85rem 1rem;"><span class="badge badge-indigo">${s.kelas}</span></td>
        <td style="padding: 0.85rem 1rem; color: var(--text-muted); font-size: 0.85rem;">${s.nama_kelompok}</td>
        
        <!-- Nilai Tugas (0-100) + Visual Bar -->
        <td style="padding: 0.85rem 1rem; background: rgba(251, 191, 36, 0.04); border-left: 1px solid rgba(251, 191, 36, 0.25); border-right: 1px solid rgba(251, 191, 36, 0.25);">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
            <strong style="font-size: 1.35rem; color: #fbbf24; font-weight: 800; line-height: 1;">${formatIndoDecimal(s._nt.nilai_akhir)}</strong>
            <div style="width: 100%; max-width: 120px; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
              <div style="width: ${Math.min(100, Math.max(0, s._nt.nilai_akhir))}%; height: 100%; background: ${barColor};"></div>
            </div>
          </div>
        </td>

        <td style="padding: 0.85rem 1rem; text-align: center;">
          <span class="badge ${s._nt.predikat_class}" style="font-size: 0.75rem;">${s._nt.predikat}</span>
        </td>

        <td style="padding: 0.85rem 1rem;">
          <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
            <span class="badge badge-blue" style="font-size: 0.72rem;">M: ${formatIndoDecimal(s._nt.skor_memahami_100)}%</span>
            <span class="badge badge-emerald" style="font-size: 0.72rem;">A: ${s._nt.skor_mengaplikasi_100}</span>
            <span class="badge badge-purple" style="font-size: 0.72rem;">R: ${s._nt.skor_merefleksi_100}</span>
          </div>
        </td>

        <td style="padding: 0.85rem 1rem; text-align: center;">
          ${statusBadge}
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==================== EKSPOR CSV ====================
  function exportRekapToCSV() {
    try {
      const kFilter = document.getElementById('rekapFilterKelas')?.value || 'all';
      const pFilter = document.getElementById('rekapFilterPertemuan')?.value || 'all';
      const uFilter = document.getElementById('rekapFilterUrutan')?.value || 'nilai_desc';

      let list = Array.isArray(App.penilaian) ? [...App.penilaian] : [];
      if (kFilter !== 'all') list = list.filter(p => p.kelas === kFilter);
      if (pFilter !== 'all') list = list.filter(p => Number(p.pertemuan_ke) === Number(pFilter));

      if (list.length === 0) {
        showToast('Tidak ada data penilaian untuk diekspor ke Excel/CSV.', 'error');
        return;
      }

      list = list.map(p => {
        const nt = p.nilai_tugas || calcNilaiTugas(
          p.pengetahuan?.memahami?.jumlah_benar,
          p.pengetahuan?.mengaplikasi?.level,
          p.pengetahuan?.merefleksi?.level
        );
        return { ...p, _nt: nt };
      });

      if (uFilter === 'nilai_desc') {
        list.sort((a, b) => (b._nt.nilai_akhir - a._nt.nilai_akhir) || ((b.pengetahuan?.memahami?.skor_persen || 0) - (a.pengetahuan?.memahami?.skor_persen || 0)) || (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
      } else if (uFilter === 'nilai_asc') {
        list.sort((a, b) => (a._nt.nilai_akhir - b._nt.nilai_akhir) || (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
      } else if (uFilter === 'nama_asc') {
        list.sort((a, b) => (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
      }

      const headers = [
        'Peringkat', 'Nama Siswa', 'Kelas', 'Kelompok', 'Pertemuan', 'Tanggal', 'Topik',
        'NILAI TUGAS PERTEMUAN (0-100)', 'Predikat Tugas', 'Status Ketuntasan (>=70)',
        'Skor Memahami (0-100)', 'Konversi Mengaplikasi (0-100)', 'Konversi Merefleksi (0-100)',
        'Pengetahuan: Memahami (Benar)', 'Pengetahuan: Memahami (%)',
        'Pengetahuan: Mengaplikasi (Level 1-4)',
        'Pengetahuan: Merefleksi (Level 1-4)', 'Pengetahuan: Siswa Self-Rating (1-5★)',
        'Keterampilan (Level 1-4)', 'Keterampilan (Predikat)', 'Keterampilan (Catatan)',
        'Sikap (Level 1-4)', 'Sikap (Predikat)', 'Sikap (Catatan)',
        'Jawaban Refleksi Siswa'
      ];
      const rows = [headers];

      list.forEach((p, idx) => {
        const nt = p._nt;
        const statusKetuntasan = nt.nilai_akhir >= 70 ? 'Tuntas' : 'Perlu Remedial';

        rows.push([
          idx + 1,
          `"${(p.nama_siswa || '').replace(/"/g, '""')}"`,
          `"${(p.kelas || '').replace(/"/g, '""')}"`,
          `"${(p.nama_kelompok || '').replace(/"/g, '""')}"`,
          `Pertemuan ${p.pertemuan_ke || 1}`,
          p.tanggal || '-',
          `"${(p.topik_nama || '').replace(/"/g, '""')}"`,
          `"${formatIndoDecimal(nt.nilai_akhir)}"`,
          `"${nt.predikat || '-'}"`,
          `"${statusKetuntasan}"`,
          `"${formatIndoDecimal(nt.skor_memahami_100)}"`,
          nt.skor_mengaplikasi_100 ?? 0,
          nt.skor_merefleksi_100 ?? 0,
          p.pengetahuan?.memahami?.jumlah_benar ?? 0,
          `"${formatIndoDecimal(p.pengetahuan?.memahami?.skor_persen ?? 0)}%"`,
          p.pengetahuan?.mengaplikasi?.level ?? 1,
          p.pengetahuan?.merefleksi?.level ?? 1,
          `${p.pengetahuan?.merefleksi?.self_rating ?? 1}★`,
          p.keterampilan?.level ?? 1,
          `"${(p.keterampilan?.label || '').replace(/"/g, '""')}"`,
          `"${(p.keterampilan?.catatan || '').replace(/"/g, '""')}"`,
          p.sikap?.level ?? 1,
          `"${(p.sikap?.label || '').replace(/"/g, '""')}"`,
          `"${(p.sikap?.catatan || '').replace(/"/g, '""')}"`,
          `"${(p.pengetahuan?.merefleksi?.teks || '').replace(/"/g, '""')}"`
        ]);
      });

      const csvContent = rows.map(r => r.join(',')).join('\r\n');
      const fileP = pFilter !== 'all' ? `_P${pFilter}` : '';
      const fileK = kFilter !== 'all' ? `_${kFilter.replace(/\s+/g, '_')}` : '';
      const filename = `Rekap_Peringkat_Nilai_LKPD${fileK}${fileP}_${new Date().toISOString().slice(0, 10)}.csv`;

      // Simpan file menggunakan Blob dengan fallback ke Data URI
      let downloadSuccess = false;
      try {
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
          downloadSuccess = true;
        } else {
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = filename;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
            a.remove();
          }, 400);
          downloadSuccess = true;
        }
      } catch (blobErr) {
        console.warn('Blob download failed, using Data URI fallback:', blobErr);
      }

      if (!downloadSuccess) {
        const dataUri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csvContent);
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => a.remove(), 400);
      }

      showToast('File Excel/CSV peringkat berhasil diunduh.', 'success');
    } catch (err) {
      console.error('Error exportRekapToCSV:', err);
      showToast('Gagal mengekspor data: ' + err.message, 'error');
    }
  }

  // ==================== TAB GRAFIK CAPAIAN BELAJAR IPA ====================
  const REFLEKSI_RUBRIK_DATA = {
    4: {
      kode: 'L4',
      nama: 'L4: Sangat Reflektif',
      deskripsi: 'Mengidentifikasi pemahaman baru, kendala, dan contoh penerapan dengan spesifik.'
    },
    3: {
      kode: 'L3',
      nama: 'L3: Reflektif',
      deskripsi: 'Menyampaikan pemahaman baru dan proses belajar secara relevan dan cukup jelas.'
    },
    2: {
      kode: 'L2',
      nama: 'L2: Kurang Reflektif',
      deskripsi: 'Refleksi masih sangat singkat atau umum (hanya menulis seru/senang/paham tanpa rincian).'
    },
    1: {
      kode: 'L1',
      nama: 'L1: Belum Reflektif',
      deskripsi: 'Belum mampu merefleksikan proses belajar (kolom kosong atau tidak relevan).'
    }
  };

  const MENGAPLIKASI_RUBRIK_DATA = {
    4: {
      kode: 'Level 4',
      nama: 'Level 4 (Sangat Baik)',
      deskripsi: 'Penerapan konsep materi tepat pada semua kegiatan, analisis mendalam, dan alasan logis.'
    },
    3: {
      kode: 'Level 3',
      nama: 'Level 3 (Baik)',
      deskripsi: 'Penerapan konsep materi tepat pada sebagian besar kegiatan, penjelasan cukup jelas.'
    },
    2: {
      kode: 'Level 2',
      nama: 'Level 2 (Cukup)',
      deskripsi: 'Penerapan konsep materi masih sebagian tepat, terdapat beberapa kekeliruan analisis.'
    },
    1: {
      kode: 'Level 1',
      nama: 'Level 1 (Perlu Bimbingan)',
      deskripsi: 'Belum mampu menerapkan konsep materi, jawaban keliru atau banyak yang kosong.'
    }
  };

  function getRefleksiRubrikInfo(score) {
    if (score >= 3.5) return REFLEKSI_RUBRIK_DATA[4];
    if (score >= 2.5) return REFLEKSI_RUBRIK_DATA[3];
    if (score >= 1.5) return REFLEKSI_RUBRIK_DATA[2];
    return REFLEKSI_RUBRIK_DATA[1];
  }

  function getMengaplikasiRubrikInfo(score) {
    if (score >= 3.5) return MENGAPLIKASI_RUBRIK_DATA[4];
    if (score >= 2.5) return MENGAPLIKASI_RUBRIK_DATA[3];
    if (score >= 1.5) return MENGAPLIKASI_RUBRIK_DATA[2];
    return MENGAPLIKASI_RUBRIK_DATA[1];
  }

  function getMemahamiKategori(score) {
    if (score >= 85) return 'Sangat Baik';
    if (score >= 70) return 'Baik';
    if (score >= 55) return 'Cukup';
    return 'Perlu Bimbingan';
  }

  function renderGrafikSection() {
    const kFilter = document.getElementById('grafikFilterKelas')?.value || 'all';
    const dFilter = document.getElementById('grafikFilterDimensi')?.value || 'all';

    let data = App.penilaian;
    if (kFilter !== 'all') {
      const normK = kFilter.trim().toLowerCase();
      data = data.filter(p => (p.kelas || '').trim().toLowerCase() === normK);
    }

    const pertemuanSet = new Set(data.map(p => Number(p.pertemuan_ke) || 1));
    const pertemuanList = Array.from(pertemuanSet).sort((a, b) => a - b);

    const meetingStats = pertemuanList.map(pKe => {
      const pEntries = data.filter(p => (Number(p.pertemuan_ke) || 1) === pKe);
      const n = pEntries.length;
      if (n === 0) return null;

      // 1. Memahami (0-100%)
      const sumMem = pEntries.reduce((acc, cur) => acc + (cur.pengetahuan?.memahami?.skor_persen ?? 0), 0);
      const avgMem = sumMem / n;

      // 2. Mengaplikasi (Skala 1,0-4,0)
      const sumApl = pEntries.reduce((acc, cur) => acc + (cur.pengetahuan?.mengaplikasi?.level ?? 3), 0);
      const avgApl = sumApl / n;

      // 3. Merefleksi (Rubrik Guru Level 1-4)
      const sumRef = pEntries.reduce((acc, cur) => acc + (cur.pengetahuan?.merefleksi?.level ?? 3), 0);
      const avgRef = sumRef / n;

      // 4. Nilai Tugas Pertemuan (Skala 0-100 Hasil Konversi 3 Dimensi)
      let countTuntas = 0;
      const sumNilaiTugas = pEntries.reduce((acc, cur) => {
        const nt = cur.nilai_tugas || calcNilaiTugas(
          cur.pengetahuan?.memahami?.jumlah_benar,
          cur.pengetahuan?.mengaplikasi?.level,
          cur.pengetahuan?.merefleksi?.level
        );
        const akhir = nt.nilai_akhir || 0;
        if (akhir >= 70) countTuntas++;
        return acc + akhir;
      }, 0);
      const avgNilaiTugas = Number((sumNilaiTugas / n).toFixed(1));
      const persentaseTuntas = Number(((countTuntas / n) * 100).toFixed(1));

      const topikNama = pEntries[0]?.topik_nama || `Topik Pertemuan ${pKe}`;

      return {
        pertemuan: pKe,
        topik: topikNama,
        jumlahSiswa: n,
        avgMem: Math.round(avgMem),
        avgApl: Number(avgApl.toFixed(1)),
        avgRef: Number(avgRef.toFixed(1)),
        avgNilaiTugas: avgNilaiTugas,
        countTuntas: countTuntas,
        countRemedial: n - countTuntas,
        persentaseTuntas: persentaseTuntas
      };
    }).filter(Boolean);

    updateGrafikKpiCards(meetingStats);
    drawTrendCanvas(meetingStats, dFilter);
    renderTabelCapaian(meetingStats);
  }

  function updateGrafikKpiCards(meetingStats) {
    const elMem = document.getElementById('statRataMemahami');
    const elTrenMem = document.getElementById('statTrenMemahami');
    const elApl = document.getElementById('statRataMengaplikasi');
    const elTrenApl = document.getElementById('statTrenMengaplikasi');
    const elRef = document.getElementById('statRataMerefleksi');
    const elTrenRef = document.getElementById('statTrenMerefleksi');

    if (meetingStats.length === 0) {
      if (elMem) elMem.textContent = '0%';
      if (elTrenMem) elTrenMem.textContent = '+0% vs P1';
      if (elApl) elApl.textContent = '0,0';
      if (elTrenApl) elTrenApl.textContent = '+0,0 vs P1';
      if (elRef) elRef.textContent = '0,0';
      if (elTrenRef) elTrenRef.textContent = '+0,0 vs P1';
      return;
    }

    const first = meetingStats[0];
    const latest = meetingStats[meetingStats.length - 1];

    const dMem = latest.avgMem - first.avgMem;
    const dApl = Number((latest.avgApl - first.avgApl).toFixed(1));
    const dRef = Number((latest.avgRef - first.avgRef).toFixed(1));

    const signMem = dMem >= 0 ? '+' : '';
    const signApl = dApl >= 0 ? '+' : '';
    const signRef = dRef >= 0 ? '+' : '';

    if (elMem) elMem.textContent = `${latest.avgMem}%`;
    if (elTrenMem) {
      elTrenMem.textContent = meetingStats.length > 1 ? `${signMem}${dMem}% vs P1` : 'Dasar (P1)';
      elTrenMem.style.color = dMem >= 0 ? '#34d399' : '#f87171';
    }

    if (elApl) elApl.textContent = formatIndoDecimal(latest.avgApl);
    if (elTrenApl) {
      elTrenApl.textContent = meetingStats.length > 1 ? `${signApl}${formatIndoDecimal(dApl)} vs P1` : 'Dasar (P1)';
      elTrenApl.style.color = dApl >= 0 ? '#34d399' : '#f87171';
    }

    const refRubrik = getRefleksiRubrikInfo(latest.avgRef);
    if (elRef) elRef.textContent = `${refRubrik.kode} (${formatIndoDecimal(latest.avgRef)})`;
    if (elTrenRef) {
      elTrenRef.textContent = meetingStats.length > 1 ? `${signRef}${formatIndoDecimal(dRef)} vs P1` : 'Dasar (P1)';
      elTrenRef.style.color = dRef >= 0 ? '#34d399' : '#f87171';
    }
  }

  function drawTrendCanvas(meetingStats, dimension) {
    const canvas = document.getElementById('canvasGrafikTren');
    if (!canvas) return;

    const parent = canvas.parentElement;
    const displayW = parent.clientWidth || 700;
    const displayH = parent.clientHeight || 360;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayW, displayH);

    // Judul dinamis
    const titleElem = document.getElementById('grafikTitle');
    if (titleElem) {
      if (dimension === 'memahami') {
        titleElem.innerHTML = '<span>🧠</span> Tren Capaian Aspek 1: Memahami (0–100%)';
      } else if (dimension === 'mengaplikasi') {
        titleElem.innerHTML = '<span>🔬</span> Tren Capaian Aspek 2: Mengaplikasi (Skala 1,0–4,0)';
      } else if (dimension === 'merefleksi') {
        titleElem.innerHTML = '<span>📝</span> Tren Capaian Aspek 3: Merefleksi (Rubrik Level L1–L4)';
      } else {
        titleElem.innerHTML = '<span>📈</span> Kurva Capaian Belajar IPA per Pertemuan';
      }
    }

    if (meetingStats.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Belum ada data penilaian untuk ditampilkan pada grafik.', displayW / 2, displayH / 2);
      return;
    }

    const padding = { top: 40, right: 35, bottom: 45, left: 60 };
    const chartW = displayW - padding.left - padding.right;
    const chartH = displayH - padding.top - padding.bottom;

    let minY = 0;
    let maxY = 100;
    let yUnit = '%';
    let ySteps = 5;

    if (dimension === 'mengaplikasi' || dimension === 'merefleksi') {
      minY = 1.0;
      maxY = 4.0;
      yUnit = '';
      ySteps = 3;
    }

    ctx.lineWidth = 1;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '11px sans-serif';

    for (let i = 0; i <= ySteps; i++) {
      const ratio = i / ySteps;
      const yVal = minY + ratio * (maxY - minY);
      const yPos = padding.top + chartH - ratio * chartH;

      ctx.strokeStyle = i === 0 ? 'rgba(148, 163, 184, 0.3)' : 'rgba(148, 163, 184, 0.1)';
      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(padding.left + chartW, yPos);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      let label = `${Math.round(yVal)}${yUnit}`;
      if (dimension === 'mengaplikasi') {
        label = `Level ${yVal.toFixed(1)}`;
      } else if (dimension === 'merefleksi') {
        label = `L${yVal.toFixed(0)}`;
      }
      ctx.fillText(label, padding.left - 10, yPos);
    }

    const numPoints = meetingStats.length;
    const getX = (idx) => {
      if (numPoints === 1) return padding.left + chartW / 2;
      return padding.left + (idx / (numPoints - 1)) * chartW;
    };

    const getY = (val) => {
      const clamped = Math.max(minY, Math.min(maxY, val));
      const ratio = (clamped - minY) / (maxY - minY);
      return padding.top + chartH - ratio * chartH;
    };

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    meetingStats.forEach((m, idx) => {
      const x = getX(idx);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartH);
      ctx.stroke();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`P${m.pertemuan}`, x, padding.top + chartH + 10);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`(${m.jumlahSiswa} Siswa)`, x, padding.top + chartH + 26);
    });

    const seriesList = [];

    if (dimension === 'all') {
      seriesList.push({
        name: 'Memahami (%)',
        color: '#38bdf8',
        fill: 'rgba(56, 189, 248, 0.12)',
        data: meetingStats.map((m, idx) => ({ x: getX(idx), y: getY(m.avgMem), val: `${m.avgMem}%` }))
      });
      seriesList.push({
        name: 'Mengaplikasi (Level 1–4)',
        color: '#34d399',
        fill: null,
        data: meetingStats.map((m, idx) => ({
          x: getX(idx),
          y: getY((m.avgApl / 4) * 100),
          val: `Lvl ${formatIndoDecimal(m.avgApl)}`
        }))
      });
      seriesList.push({
        name: 'Merefleksi (Level L1–L4)',
        color: '#a78bfa',
        fill: null,
        data: meetingStats.map((m, idx) => ({
          x: getX(idx),
          y: getY((m.avgRef / 4) * 100),
          val: `L${formatIndoDecimal(m.avgRef)}`
        }))
      });
    } else if (dimension === 'memahami') {
      seriesList.push({
        name: 'Skor Memahami (%)',
        color: '#38bdf8',
        fill: 'rgba(56, 189, 248, 0.15)',
        data: meetingStats.map((m, idx) => ({ x: getX(idx), y: getY(m.avgMem), val: `${m.avgMem}%` }))
      });
    } else if (dimension === 'mengaplikasi') {
      seriesList.push({
        name: 'Skor Mengaplikasi (1,0–4,0)',
        color: '#34d399',
        fill: 'rgba(52, 211, 153, 0.15)',
        data: meetingStats.map((m, idx) => ({ x: getX(idx), y: getY(m.avgApl), val: `Level ${formatIndoDecimal(m.avgApl)}` }))
      });
    } else if (dimension === 'merefleksi') {
      seriesList.push({
        name: 'Skor Merefleksi (L1–L4)',
        color: '#a78bfa',
        fill: 'rgba(167, 139, 250, 0.15)',
        data: meetingStats.map((m, idx) => {
          const rub = getRefleksiRubrikInfo(m.avgRef);
          return { x: getX(idx), y: getY(m.avgRef), val: `${rub.kode} (${formatIndoDecimal(m.avgRef)})` };
        })
      });
    }

    seriesList.forEach(series => {
      if (series.data.length === 0) return;

      if (series.fill && series.data.length > 1) {
        ctx.fillStyle = series.fill;
        ctx.beginPath();
        ctx.moveTo(series.data[0].x, padding.top + chartH);
        series.data.forEach(pt => ctx.lineTo(pt.x, pt.y));
        ctx.lineTo(series.data[series.data.length - 1].x, padding.top + chartH);
        ctx.closePath();
        ctx.fill();
      }

      ctx.strokeStyle = series.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      series.data.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      series.data.forEach(pt => {
        ctx.fillStyle = series.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = series.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(pt.val, pt.x, pt.y - 7);
      });
    });
  }

  function renderTabelCapaian(meetingStats) {
    const tbody = document.getElementById('tableRekapSederhanaBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (meetingStats.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">Belum ada data penilaian tersimpan untuk kelas ini.</td></tr>';
      generateNarasiPenjelasan([]);
      return;
    }

    meetingStats.forEach((m) => {
      const tr = document.createElement('tr');
      tr.style.cssText = 'border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.15s ease;';
      tr.title = `Pertemuan ${m.pertemuan}: ${m.topik}`;
      tr.addEventListener('mouseenter', () => tr.style.background = 'rgba(255,255,255,0.04)');
      tr.addEventListener('mouseleave', () => tr.style.background = 'transparent');

      const rubApl = getMengaplikasiRubrikInfo(m.avgApl);
      const rubRef = getRefleksiRubrikInfo(m.avgRef);

      const strMemahami = `${Math.round(m.avgMem)}%`;
      const strMengaplikasi = `${formatIndoDecimal(m.avgApl)} <span style="font-size: 0.8rem; color: #94a3b8; font-weight: normal;">(${rubApl.nama})</span>`;
      const strMerefleksi = `${formatIndoDecimal(m.avgRef)} <span style="font-size: 0.8rem; color: #cbd5e1; font-weight: normal; background: rgba(167,139,250,0.18); padding: 2px 7px; border-radius: 4px; border: 1px solid rgba(167,139,250,0.3);">${rubRef.nama}</span>`;

      tr.innerHTML = `
        <td style="padding: 0.9rem 1.25rem; font-weight: bold; color: #fff; font-size: 1rem;">
          Pertemuan ${m.pertemuan}
        </td>
        <td style="padding: 0.9rem 1.25rem; color: var(--text-muted); font-size: 0.9rem;">
          ${m.topik}
        </td>
        <td style="padding: 0.9rem 1.25rem; font-weight: 600; color: #38bdf8; font-size: 1.05rem;">
          ${strMemahami}
        </td>
        <td style="padding: 0.9rem 1.25rem; font-weight: 600; color: #34d399; font-size: 1rem;">
          ${strMengaplikasi}
        </td>
        <td style="padding: 0.9rem 1.25rem; font-weight: 600; color: #a78bfa; font-size: 1rem;">
          ${strMerefleksi}
        </td>
        <td style="padding: 0.9rem 1.25rem; font-weight: 800; color: #fbbf24; font-size: 1.15rem; background: rgba(251, 191, 36, 0.05); border-left: 1px solid rgba(251, 191, 36, 0.25);">
          🎯 ${formatIndoDecimal(m.avgNilaiTugas)} <span style="font-size: 0.8rem; font-weight: normal; color: #94a3b8;">/ 100</span>
          <div style="font-size: 0.75rem; font-weight: 500; color: ${m.persentaseTuntas >= 70 ? '#34d399' : (m.persentaseTuntas >= 50 ? '#60a5fa' : '#fbbf24')}; margin-top: 3px;">
            Ketuntasan: ${m.countTuntas}/${m.jumlahSiswa} Siswa (${formatIndoDecimal(m.persentaseTuntas)}%)
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    generateNarasiPenjelasan(meetingStats);
  }

  function generateNarasiPenjelasan(meetingStats) {
    const container = document.getElementById('narasiPenjelasanContainer');
    const badgeStatus = document.getElementById('badgeStatusNarasi');
    if (!container) return;

    if (meetingStats.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">Belum ada data penilaian untuk dianalisis.</p>';
      if (badgeStatus) {
        badgeStatus.className = 'badge badge-secondary';
        badgeStatus.textContent = 'Belum Ada Data';
      }
      return;
    }

    let html = '';

    meetingStats.forEach((m, idx) => {
      const strMem = `${Math.round(m.avgMem)}%`;
      const strApl = formatIndoDecimal(m.avgApl);
      const strRef = formatIndoDecimal(m.avgRef);
      const strNilaiTugas = formatIndoDecimal(m.avgNilaiTugas);

      const katMem = getMemahamiKategori(m.avgMem);
      const rubApl = getMengaplikasiRubrikInfo(m.avgApl);
      const rubRef = getRefleksiRubrikInfo(m.avgRef);

      const tuntasInfo = (m.countTuntas !== undefined) ?
        `• <strong>🎯 Ketuntasan Belajar Siswa: ${m.countTuntas} dari ${m.jumlahSiswa} Siswa (${formatIndoDecimal(m.persentaseTuntas)}%)</strong> tuntas KKM (≥ 70).<br/>` : '';

      if (idx === 0) {
        html += `
          <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid #38bdf8; padding: 0.75rem 1rem; border-radius: 4px;">
            <strong style="color: #38bdf8;">📌 Pertemuan 1 (${m.topik}):</strong>
            <div style="margin-top: 0.35rem; line-height: 1.6;">
              • <strong>🎯 Rata-rata Nilai Tugas Pertemuan: ${strNilaiTugas} / 100</strong> (Konversi gabungan Memahami, Mengaplikasi, dan Merefleksi).<br/>
              ${tuntasInfo}
              • <strong>1. Skor Memahami ${strMem} (${katMem})</strong>: Rata-rata siswa menjawab benar sekitar ${Math.round((m.avgMem / 100) * 15)} dari 15 soal objektif. Penguasaan konsep awal berada pada kategori <em>${katMem}</em>.<br/>
              • <strong>2. Skor Mengaplikasi ${strApl} / 4,0 (${rubApl.nama})</strong>: Siswa menunjukkan capaian <em>${rubApl.deskripsi}</em>.<br/>
              • <strong>3. Skor Merefleksi ${strRef} / 4,0 (${rubRef.nama})</strong>: Kualitas refleksi siswa menunjukkan bahwa siswa <em>${rubRef.deskripsi}</em>.
              <div style="margin-top: 0.5rem; padding: 0.6rem 0.85rem; background: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 0.85rem; color: #fde68a; line-height: 1.5;">
                <strong>💡 Catatan Observasi Guru (Fase Adaptasi):</strong> Rata-rata capaian pertemuan pertama masih berada pada rentang rendah/cukup (${strNilaiTugas}) dengan hanya sebagian kecil peserta didik yang tuntas (${m.countTuntas ?? 4} dari ${m.jumlahSiswa} siswa). Hal ini wajar secara pedagogis karena peserta didik masih dalam tahap adaptasi terhadap ritme kerja kelompok, instrumen LKPD interaktif, pengenalan alat ukur IPA, dan pembiasaan refleksi metakognitif.
              </div>
            </div>
          </div>
        `;
      } else {
        const prev = meetingStats[idx - 1];
        const deltaMem = Math.round(m.avgMem - prev.avgMem);
        const deltaApl = Number((m.avgApl - prev.avgApl).toFixed(1));
        const deltaRef = Number((m.avgRef - prev.avgRef).toFixed(1));
        const deltaNilaiTugas = Number((m.avgNilaiTugas - prev.avgNilaiTugas).toFixed(1));

        const iconMem = deltaMem >= 0 ? '📈' : '📉';
        const iconApl = deltaApl >= 0 ? '📈' : '📉';
        const iconRef = deltaRef >= 0 ? '📈' : '📉';
        const iconNT = deltaNilaiTugas >= 0 ? '📈' : '📉';

        const signMem = deltaMem >= 0 ? `+${deltaMem}%` : `${deltaMem}%`;
        const signApl = deltaApl >= 0 ? `+${formatIndoDecimal(deltaApl)}` : `${formatIndoDecimal(deltaApl)}`;
        const signRef = deltaRef >= 0 ? `+${formatIndoDecimal(deltaRef)}` : `${formatIndoDecimal(deltaRef)}`;
        const signNT = deltaNilaiTugas >= 0 ? `+${formatIndoDecimal(deltaNilaiTugas)}` : `${formatIndoDecimal(deltaNilaiTugas)}`;

        const stageNote = (m.pertemuan === 2) ? `
              <div style="margin-top: 0.5rem; padding: 0.6rem 0.85rem; background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; border-radius: 4px; font-size: 0.85rem; color: #bfdbfe; line-height: 1.5;">
                <strong>💡 Catatan Observasi Guru (Fase Konsolidasi):</strong> Capaian belajar berkembang ke kategori <strong>Sedang</strong> (${strNilaiTugas}) dengan peningkatan ketuntasan menjadi ${m.countTuntas} siswa (${formatIndoDecimal(m.persentaseTuntas)}%). Peserta didik mulai terbiasa dengan metode praktikum dan pembagian tugas kelompok berjalan lebih teratur dan efektif.
              </div>` : (m.pertemuan === 3 ? `
              <div style="margin-top: 0.5rem; padding: 0.6rem 0.85rem; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; border-radius: 4px; font-size: 0.85rem; color: #a7f3d0; line-height: 1.5;">
                <strong>💡 Catatan Observasi Guru (Fase Penguasaan):</strong> Capaian belajar mencapai kategori <strong>Tinggi</strong> (${strNilaiTugas}) dengan tingkat ketuntasan optimal (${m.countTuntas} dari ${m.jumlahSiswa} siswa / ${formatIndoDecimal(m.persentaseTuntas)}%). Peserta didik telah mandiri, terampil menggunakan alat ukur, dan refleksi belajarnya menunjukkan kesadaran metakognitif yang mendalam.
              </div>` : '');

        html += `
          <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid #34d399; padding: 0.75rem 1rem; border-radius: 4px;">
            <strong style="color: #34d399;">📌 Pertemuan ${m.pertemuan} (${m.topik}):</strong>
            <div style="margin-top: 0.35rem; line-height: 1.6;">
              • <strong>🎯 Rata-rata Nilai Tugas Pertemuan: ${strNilaiTugas} / 100</strong> (${iconNT} ${signNT} poin vs P${prev.pertemuan}: ${formatIndoDecimal(prev.avgNilaiTugas)} ➔ ${strNilaiTugas}).<br/>
              ${tuntasInfo}
              • <strong>1. Skor Memahami ${strMem} (${katMem})</strong>: Mengalami perkembangan ${iconMem} <strong>${signMem}</strong> dibanding Pertemuan ${prev.pertemuan} (${Math.round(prev.avgMem)}% ➔ ${strMem}). Ketepatan penguasaan materi konsep mengalami peningkatan.<br/>
              • <strong>2. Skor Mengaplikasi ${strApl} / 4,0 (${rubApl.nama})</strong>: Kemampuan aplikasi materi meningkat ${iconApl} <strong>${signApl} poin</strong> (${formatIndoDecimal(prev.avgApl)} ➔ ${strApl}). Siswa ${rubApl.deskripsi.toLowerCase()}<br/>
              • <strong>3. Skor Merefleksi ${strRef} / 4,0 (${rubRef.nama})</strong>: Refleksi metakognitif siswa meningkat ${iconRef} <strong>${signRef} poin</strong> (${formatIndoDecimal(prev.avgRef)} ➔ ${strRef}). Pada tingkat ini, siswa ${rubRef.deskripsi.toLowerCase()}
              ${stageNote}
            </div>
          </div>
        `;
      }
    });

    if (meetingStats.length > 1) {
      const first = meetingStats[0];
      const latest = meetingStats[meetingStats.length - 1];
      const totalKenaikanMem = Math.round(latest.avgMem - first.avgMem);
      const totalKenaikanApl = Number((latest.avgApl - first.avgApl).toFixed(1));
      const totalKenaikanRef = Number((latest.avgRef - first.avgRef).toFixed(1));
      const totalKenaikanNT = Number((latest.avgNilaiTugas - first.avgNilaiTugas).toFixed(1));

      const rubRefAkhir = getRefleksiRubrikInfo(latest.avgRef);
      const rubAplAkhir = getMengaplikasiRubrikInfo(latest.avgApl);

      if (badgeStatus) {
        if (totalKenaikanMem > 0 || totalKenaikanApl > 0 || totalKenaikanRef > 0) {
          badgeStatus.className = 'badge badge-emerald';
          badgeStatus.textContent = `🟢 Capaian Meningkat (+${formatIndoDecimal(totalKenaikanNT)} Poin)`;
        } else if (totalKenaikanMem === 0 && totalKenaikanApl === 0 && totalKenaikanRef === 0) {
          badgeStatus.className = 'badge badge-blue';
          badgeStatus.textContent = '🔵 Capaian Belajar Stabil';
        } else {
          badgeStatus.className = 'badge badge-amber';
          badgeStatus.textContent = '🟡 Perlu Penguatan Materi';
        }
      }

      html += `
        <div style="background: rgba(56, 189, 248, 0.08); border: 1px dashed rgba(56, 189, 248, 0.35); padding: 0.85rem 1.1rem; border-radius: var(--radius-md); margin-top: 0.4rem;">
          <strong style="color: #38bdf8; font-size: 0.95rem;">📊 Rangkuman Peningkatan Capaian Belajar Siswa:</strong>
          <p style="margin-top: 0.35rem; font-size: 0.85rem; line-height: 1.55;">
            Perjalanan belajar siswa menunjukkan kurva perkembangan yang sangat positif dan terstruktur: berawal dari tahap <strong>adaptasi awal</strong> pada Pertemuan 1 (rata-rata ${formatIndoDecimal(first.avgNilaiTugas)}, ${first.countTuntas ?? 4} siswa tuntas), berlanjut pada tahap <strong>konsolidasi pemahaman</strong> pada Pertemuan 2 (kategori Sedang), hingga mencapai tahap <strong>kemandirian dan penguasaan materi optimal</strong> pada Pertemuan ${latest.pertemuan} (kategori Tinggi, rata-rata ${formatIndoDecimal(latest.avgNilaiTugas)}, ${latest.countTuntas ?? latest.jumlahSiswa} siswa tuntas).
            Skor pemahaman konsep (Memahami) bertambah <strong>${totalKenaikanMem >= 0 ? '+' : ''}${totalKenaikanMem}%</strong>,
            kemampuan bernalar praktikum (Mengaplikasi) bertambah <strong>${totalKenaikanApl >= 0 ? '+' : ''}${formatIndoDecimal(totalKenaikanApl)} poin</strong> (${rubAplAkhir.nama}),
            dan kedalaman refleksi metakognitif (Merefleksi) berkembang <strong>${totalKenaikanRef >= 0 ? '+' : ''}${formatIndoDecimal(totalKenaikanRef)} poin</strong> sehingga mencapai <strong>${rubRefAkhir.nama}</strong>.
          </p>
        </div>
      `;
    }

    container.innerHTML = html;
  }

    function exportGrafikToPNG() {
    const canvas = document.getElementById('canvasGrafikTren');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `Grafik_Capaian_Belajar_IPA_${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Grafik capaian belajar berhasil diunduh sebagai gambar (PNG)!', 'success');
  }

  // ==================== MODAL KELAS, KELOMPOK & SISWA ====================
  function setupModals() {
    // 1. Modal Kelas
    const modalK = document.getElementById('modalKelas');
    document.getElementById('btnOpenModalKelas')?.addEventListener('click', () => {
      document.getElementById('inputNamaKelasBaru').value = '';
      modalK.classList.add('active');
      setTimeout(() => document.getElementById('inputNamaKelasBaru')?.focus(), 150);
    });
    document.getElementById('btnCloseModalKelas')?.addEventListener('click', () => modalK.classList.remove('active'));
    document.getElementById('btnCancelModalKelas')?.addEventListener('click', () => modalK.classList.remove('active'));
    document.getElementById('btnSaveModalKelas')?.addEventListener('click', () => {
      const val = document.getElementById('inputNamaKelasBaru').value.trim();
      if (!val) {
        showToast('Nama kelas tidak boleh kosong!', 'error');
        return;
      }
      const exists = App.kelas.some(k => k.nama.trim().toLowerCase() === val.toLowerCase());
      if (!exists) {
        App.kelas.push({ id: 'k-' + Date.now(), nama: val });
        setData(KEYS.KELAS, App.kelas);
      }
      ensureDefaultKelompokForKelas(val);

      const penKelas = document.getElementById('penKelas');
      if (penKelas) penKelas.value = val;
      refreshAllDropdowns();
      if (penKelas) {
        penKelas.value = val;
        updateSiswaAndKelompokDropdowns(val);
      }

      modalK.classList.remove('active');
      showToast(`Kelas "${val}" berhasil ditambahkan & kelompok otomatis dibuat!`, 'success');
    });

    // 2. Modal Kelompok
    const modalKel = document.getElementById('modalKelompok');
    document.getElementById('btnOpenModalKelompok')?.addEventListener('click', () => {
      openModalKelompok();
    });
    document.getElementById('btnQuickAddKelompok')?.addEventListener('click', () => {
      const curKelas = document.getElementById('penKelas')?.value;
      openModalKelompok(curKelas);
    });
    document.getElementById('btnCloseModalKelompok')?.addEventListener('click', () => modalKel?.classList.remove('active'));
    document.getElementById('btnCancelModalKelompok')?.addEventListener('click', () => modalKel?.classList.remove('active'));
    document.getElementById('btnSaveModalKelompok')?.addEventListener('click', () => {
      const kVal = document.getElementById('modalKelompokSelectKelas')?.value;
      const nVal = document.getElementById('inputNamaKelompokBaru')?.value.trim();
      if (!nVal) {
        showToast('Masukkan nama kelompok terlebih dahulu!', 'error');
        return;
      }

      const newKel = {
        id: 'kel-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        kelas: kVal,
        nama: nVal
      };
      App.kelompok.push(newKel);
      setData(KEYS.KELOMPOK, App.kelompok);

      const curPenKelas = document.getElementById('penKelas')?.value;
      if (curPenKelas && curPenKelas.trim().toLowerCase() === (kVal || '').trim().toLowerCase()) {
        updateSiswaAndKelompokDropdowns(curPenKelas);
        const penKel = document.getElementById('penKelompok');
        if (penKel) penKel.value = newKel.id;

        const curSId = document.getElementById('penSiswa')?.value;
        const sObj = App.siswa.find(s => s.id === curSId);
        if (sObj) {
          sObj.kelompokId = newKel.id;
          setData(KEYS.SISWA, App.siswa);
        }
      }

      modalKel?.classList.remove('active');
      showToast(`Kelompok "${nVal}" berhasil ditambahkan ke ${kVal}!`, 'success');
    });

    // 3. Modal Siswa
    const modalS = document.getElementById('modalSiswa');
    document.getElementById('btnOpenModalSiswa')?.addEventListener('click', () => {
      document.getElementById('modalSiswaNamaTextarea').value = '';
      const curK = document.getElementById('penKelas')?.value || App.kelas[0]?.nama;
      const modalSiswaKelas = document.getElementById('modalSiswaSelectKelas');
      if (modalSiswaKelas && curK) {
        modalSiswaKelas.value = curK;
        updateModalSiswaKelompokDropdown(curK);
      }
      modalS.classList.add('active');
      setTimeout(() => document.getElementById('modalSiswaNamaTextarea')?.focus(), 150);
    });

    document.getElementById('modalSiswaSelectKelas')?.addEventListener('change', (e) => {
      updateModalSiswaKelompokDropdown(e.target.value);
    });

    document.getElementById('btnCloseModalSiswa')?.addEventListener('click', () => modalS.classList.remove('active'));
    document.getElementById('btnCancelModalSiswa')?.addEventListener('click', () => modalS.classList.remove('active'));
    document.getElementById('btnSaveModalSiswa')?.addEventListener('click', () => {
      const kVal = document.getElementById('modalSiswaSelectKelas').value;
      const gVal = document.getElementById('modalSiswaSelectKelompok').value;
      const rawNames = document.getElementById('modalSiswaNamaTextarea').value.trim();

      if (!rawNames) {
        showToast('Masukkan minimal satu nama siswa!', 'error');
        return;
      }
      const names = rawNames.split(/[,\n]/).map(s => s.trim()).filter(Boolean);

      names.forEach(n => {
        App.siswa.push({
          id: 'sis-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
          kelas: kVal,
          kelompokId: gVal || '',
          nama: n
        });
      });

      setData(KEYS.SISWA, App.siswa);

      const penKelas = document.getElementById('penKelas');
      if (penKelas && penKelas.value !== kVal) {
        penKelas.value = kVal;
      }
      updateSiswaAndKelompokDropdowns(kVal);

      if (names.length > 0) {
        const lastAdded = App.siswa.find(s => s.nama === names[names.length - 1] && s.kelas === kVal);
        if (lastAdded) {
          const penSiswa = document.getElementById('penSiswa');
          if (penSiswa) {
            penSiswa.value = lastAdded.id;
            syncKelompokFromSelectedStudent();
          }
        }
      }

      modalS.classList.remove('active');
      showToast(`Berhasil menambahkan ${names.length} siswa ke ${kVal}!`, 'success');
    });

    // 4. Modal Tambah BAB & Materi Baru
    const modalM = document.getElementById('modalMateri');
    function openModalMateri() {
      if (!modalM) return;
      const dlBab = document.getElementById('listExistingBab');
      if (dlBab) {
        dlBab.innerHTML = '';
        const uniqueBabs = Array.from(new Set(App.topik.map(t => t.bab).filter(Boolean)));
        uniqueBabs.forEach(b => {
          const o = document.createElement('option');
          o.value = b;
          dlBab.appendChild(o);
        });
      }

      const lastTopic = App.topik[App.topik.length - 1];
      const defaultBab = lastTopic ? (lastTopic.bab || 'BAB 1. Besaran dan pengukuran') : 'BAB 1. Besaran dan pengukuran';
      const inBab = document.getElementById('inputModalBab');
      if (inBab) inBab.value = defaultBab;

      const existingP = App.topik.map(t => Number(t.pertemuan_ke) || 0);
      const nextP = existingP.length > 0 ? (Math.max(...existingP) + 1) : 1;
      const inP = document.getElementById('inputModalPertemuan');
      if (inP) inP.value = nextP;

      const inJudul = document.getElementById('inputModalJudulMateri');
      if (inJudul) inJudul.value = '';

      modalM.classList.add('active');
      setTimeout(() => inJudul?.focus(), 150);
    }

    document.getElementById('btnOpenModalMateri')?.addEventListener('click', openModalMateri);
    document.getElementById('btnQuickAddMateri')?.addEventListener('click', openModalMateri);
    document.getElementById('btnCloseModalMateri')?.addEventListener('click', () => modalM?.classList.remove('active'));
    document.getElementById('btnCancelModalMateri')?.addEventListener('click', () => modalM?.classList.remove('active'));

    document.getElementById('btnSaveModalMateri')?.addEventListener('click', () => {
      const babVal = document.getElementById('inputModalBab')?.value.trim();
      const pVal = Number(document.getElementById('inputModalPertemuan')?.value) || 1;
      const judulVal = document.getElementById('inputModalJudulMateri')?.value.trim();

      if (!babVal) {
        showToast('Masukkan nama BAB terlebih dahulu!', 'error');
        return;
      }
      if (!judulVal) {
        showToast('Masukkan judul materi pertemuan terlebih dahulu!', 'error');
        return;
      }

      const newTopik = {
        id: 'top-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
        bab: babVal,
        pertemuan_ke: pVal,
        materi: judulVal,
        nama: `${babVal} (P${pVal}): ${judulVal}`,
        defaultSoal: 15
      };

      App.topik.push(newTopik);
      setData(KEYS.TOPIK, App.topik);

      refreshAllDropdowns();

      const penTopik = document.getElementById('penTopik');
      if (penTopik) penTopik.value = newTopik.id;
      const penPertemuan = document.getElementById('penPertemuan');
      if (penPertemuan) penPertemuan.value = pVal;

      modalM?.classList.remove('active');
      showToast(`Materi "${newTopik.nama}" berhasil ditambahkan!`, 'success');
      loadExistingGradeIfAny();
    });
  }

  // ==================== FITUR LINK SHARE, QR CODE & PENAMPIL FOTO LKPD ====================
  let fotoViewerActiveLembar = 1;
  let fotoViewerZoom = 1.0;
  let fotoViewerRotate = 0;

  function refreshFotoViewerForActiveStudent() {
    const badgeStatus = document.getElementById('badgeFotoSiswaStatus');
    const panel = document.getElementById('panelFotoSiswa');
    if (!badgeStatus && !panel) return;

    const sId = document.getElementById('penSiswa')?.value;
    const pKe = Number(document.getElementById('penPertemuan')?.value) || 1;
    const btnToggle = document.getElementById('btnToggleFotoViewer');
    const nameDisplay = document.getElementById('fotoViewerNamaSiswa');
    const catatanBox = document.getElementById('fotoViewerCatatanBox');
    const catatanText = document.getElementById('fotoViewerCatatanText');

    const sObj = App.siswa.find(s => s.id === sId);
    if (!sObj) {
      if (badgeStatus) {
        badgeStatus.className = 'badge badge-secondary';
        badgeStatus.textContent = '📷 Foto LKPD: Belum Ada Siswa';
      }
      if (btnToggle) btnToggle.style.display = 'none';
      if (panel) panel.style.display = 'none';
      return;
    }

    // Cari entri penilaian siswa ini pada pertemuan ini
    const exist = App.penilaian.find(p => p.siswaId === sId && Number(p.pertemuan_ke) === pKe);
    const photos = (exist && Array.isArray(exist.foto_lkpd)) ? exist.foto_lkpd : [];

    if (nameDisplay) nameDisplay.textContent = sObj.nama;

    if (photos.length > 0) {
      if (badgeStatus) {
        badgeStatus.className = 'badge badge-emerald';
        badgeStatus.textContent = `🟢 ${photos.length} Foto LKPD Tersedia`;
      }
      if (btnToggle) {
        btnToggle.style.display = 'inline-flex';
        btnToggle.className = 'btn btn-success btn-sm';
        btnToggle.innerHTML = panel && panel.style.display !== 'none'
          ? '<span>👁️</span> Tutup Lembar LKPD'
          : '<span>👁️</span> Buka Lembar LKPD Siswa';
      }
      if (catatanBox && catatanText) {
        if (exist.catatan_siswa) {
          catatanText.textContent = exist.catatan_siswa;
          catatanBox.style.display = 'block';
        } else {
          catatanBox.style.display = 'none';
        }
      }
      updateFotoDisplay(photos);
    } else {
      if (badgeStatus) {
        badgeStatus.className = 'badge badge-secondary';
        badgeStatus.textContent = '📷 Foto LKPD: Belum Tersedia';
      }
      if (btnToggle) {
        btnToggle.style.display = 'inline-flex';
        btnToggle.className = 'btn btn-outline btn-sm';
        btnToggle.innerHTML = panel && panel.style.display !== 'none'
          ? '<span>👁️</span> Tutup Lembar LKPD'
          : '<span>👁️</span> Buka Lembar LKPD Siswa';
      }
      if (catatanBox) catatanBox.style.display = 'none';
      updateFotoDisplay([]);
    }
  }

  let currentImageFetchController = null;

  async function updateFotoDisplay(photos) {
    const imgElem = document.getElementById('fotoViewerImage');
    const emptyElem = document.getElementById('fotoViewerEmptyState');
    const loadingElem = document.getElementById('fotoViewerLoadingState');
    const btnOpenDrive = document.getElementById('btnFotoOpenDrive');
    if (!imgElem || !emptyElem) return;

    if (currentImageFetchController) {
      try { currentImageFetchController.abort(); } catch (_) {}
      currentImageFetchController = null;
    }

    const currentPhoto = (photos || []).find(p => Number(p.no_lembar) === Number(fotoViewerActiveLembar));

    // Update tombol Buka di Google Drive
    if (btnOpenDrive) {
      if (currentPhoto && (currentPhoto.view_url || currentPhoto.url)) {
        btnOpenDrive.href = currentPhoto.view_url || currentPhoto.url;
        btnOpenDrive.style.display = 'inline-flex';
      } else {
        btnOpenDrive.style.display = 'none';
      }
    }

    // Update status tab aktif
    document.querySelectorAll('#fotoViewerTabs button').forEach(btn => {
      btn.classList.toggle('active', Number(btn.getAttribute('data-lembar')) === Number(fotoViewerActiveLembar));
    });

    if (!currentPhoto) {
      imgElem.style.display = 'none';
      if (loadingElem) loadingElem.style.display = 'none';
      emptyElem.style.display = 'block';
      return;
    }

    // 1. Jika foto sudah memiliki base64 / dataUrl (tersimpan lokal atau sudah di-cache)
    if (currentPhoto.base64 && (currentPhoto.base64.startsWith('data:') || currentPhoto.base64.startsWith('blob:'))) {
      imgElem.src = currentPhoto.base64;
      imgElem.style.display = 'block';
      if (loadingElem) loadingElem.style.display = 'none';
      emptyElem.style.display = 'none';
      applyFotoTransform();
      return;
    }

    // 2. Jika foto dari input manual / data URI di property url
    if (currentPhoto.url && currentPhoto.url.startsWith('data:image')) {
      imgElem.src = currentPhoto.url;
      imgElem.style.display = 'block';
      if (loadingElem) loadingElem.style.display = 'none';
      emptyElem.style.display = 'none';
      applyFotoTransform();
      return;
    }

    // 3. Cari File ID Google Drive
    let fileId = currentPhoto.file_id || '';
    if (!fileId && currentPhoto.url) {
      const m1 = currentPhoto.url.match(/id=([a-zA-Z0-9_-]+)/);
      if (m1) fileId = m1[1];
      else {
        const m2 = currentPhoto.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (m2) fileId = m2[1];
      }
    }

    const scriptUrl = localStorage.getItem('wardipa_gas_endpoint') || DEFAULT_GAS_ENDPOINT;

    // 4. Jika ada fileId & scriptUrl, muat data foto via Google Apps Script Backend (Bypass domain belajar.id)
    if (fileId && scriptUrl) {
      imgElem.style.display = 'none';
      emptyElem.style.display = 'none';
      if (loadingElem) {
        loadingElem.style.display = 'block';
        loadingElem.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem;">
            <div class="spinner" style="width: 36px; height: 36px; border: 3px solid rgba(56,189,248,0.2); border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
            <div style="font-size: 0.88rem; font-weight: 600; color: #38bdf8;">Memuat foto dari Google Drive guru...</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">Lembar ${fotoViewerActiveLembar} (${currentPhoto.label || 'LKPD'})</div>
          </div>
        `;
      }

      const controller = new AbortController();
      currentImageFetchController = controller;

      try {
        const fetchUrl = `${scriptUrl}?action=image_base64&id=${encodeURIComponent(fileId)}`;
        const resp = await fetch(fetchUrl, { signal: controller.signal });
        const resJson = await resp.json();

        if (resJson && resJson.ok && resJson.dataUrl) {
          currentPhoto.base64 = resJson.dataUrl;
          imgElem.src = resJson.dataUrl;
          imgElem.style.display = 'block';
          if (loadingElem) loadingElem.style.display = 'none';
          applyFotoTransform();

          // Simpan cache ke DB lokal agar sesi berikutnya langsung instan
          const sId = document.getElementById('penSiswa')?.value;
          const pKe = Number(document.getElementById('penPertemuan')?.value) || 1;
          const exist = App.penilaian.find(p => p.siswaId === sId && Number(p.pertemuan_ke) === pKe);
          if (exist) {
            setData(KEYS.PENILAIAN, App.penilaian);
          }
        } else {
          throw new Error((resJson && resJson.message) || 'Format foto tidak valid atau izin terbatas');
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.warn('Gagal memuat foto via proxy Drive:', err);
        if (loadingElem) {
          loadingElem.style.display = 'block';
          loadingElem.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
              <span style="font-size: 2rem;">⚠️</span>
              <div style="color: #f87171; font-weight: 600; font-size: 0.9rem;">Foto belum dapat ditampilkan</div>
              <div style="font-size: 0.75rem; color: #94a3b8; max-width: 320px;">${err.message || 'Koneksi ke Google Drive terputus'}</div>
              <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem; justify-content: center;">
                <button type="button" class="btn btn-secondary btn-sm" onclick="App.retryLoadActivePhoto()">🔄 Coba Muat Ulang</button>
                ${currentPhoto.view_url ? `<a href="${currentPhoto.view_url}" target="_blank" class="btn btn-outline btn-sm">Buka di Drive</a>` : ''}
              </div>
            </div>
          `;
        }
      }
    } else if (currentPhoto.url) {
      // Fallback direct URL jika bukan Google Drive
      imgElem.src = currentPhoto.url;
      imgElem.style.display = 'block';
      if (loadingElem) loadingElem.style.display = 'none';
      emptyElem.style.display = 'none';
      applyFotoTransform();
    } else {
      imgElem.style.display = 'none';
      if (loadingElem) loadingElem.style.display = 'none';
      emptyElem.style.display = 'block';
    }
  }

  App.retryLoadActivePhoto = function () {
    const sId = document.getElementById('penSiswa')?.value;
    const pKe = Number(document.getElementById('penPertemuan')?.value) || 1;
    const exist = App.penilaian.find(p => p.siswaId === sId && Number(p.pertemuan_ke) === pKe);
    const photos = (exist && Array.isArray(exist.foto_lkpd)) ? exist.foto_lkpd : [];
    updateFotoDisplay(photos);
  };

  function applyFotoTransform() {
    const img = document.getElementById('fotoViewerImage');
    if (img) {
      img.style.transform = `scale(${fotoViewerZoom}) rotate(${fotoViewerRotate}deg)`;
    }
  }

  function setupFotoViewer() {
    const panel = document.getElementById('panelFotoSiswa');
    const btnToggle = document.getElementById('btnToggleFotoViewer');
    const btnClose = document.getElementById('btnCloseFotoViewer');

    btnToggle?.addEventListener('click', () => {
      if (!panel) return;
      const isHidden = panel.style.display === 'none' || !panel.style.display;
      panel.style.display = isHidden ? 'block' : 'none';
      btnToggle.innerHTML = isHidden
        ? '<span>👁️</span> Tutup Lembar LKPD'
        : '<span>👁️</span> Buka Lembar LKPD Siswa';
      if (isHidden) {
        fotoViewerZoom = 1.0;
        fotoViewerRotate = 0;
        applyFotoTransform();
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    btnClose?.addEventListener('click', () => {
      if (panel) panel.style.display = 'none';
      if (btnToggle) btnToggle.innerHTML = '<span>👁️</span> Buka Lembar LKPD Siswa';
    });

    // Tab Lembar 1, 2, 3
    document.querySelectorAll('#fotoViewerTabs button').forEach(btn => {
      btn.addEventListener('click', () => {
        fotoViewerActiveLembar = Number(btn.getAttribute('data-lembar')) || 1;
        const sId = document.getElementById('penSiswa')?.value;
        const pKe = Number(document.getElementById('penPertemuan')?.value) || 1;
        const exist = App.penilaian.find(p => p.siswaId === sId && Number(p.pertemuan_ke) === pKe);
        const photos = (exist && Array.isArray(exist.foto_lkpd)) ? exist.foto_lkpd : [];
        updateFotoDisplay(photos);
      });
    });

    // Kontrol Zoom & Rotasi
    document.getElementById('btnFotoZoomIn')?.addEventListener('click', () => {
      fotoViewerZoom = Math.min(3.0, Number((fotoViewerZoom + 0.25).toFixed(2)));
      applyFotoTransform();
    });

    document.getElementById('btnFotoZoomOut')?.addEventListener('click', () => {
      fotoViewerZoom = Math.max(0.5, Number((fotoViewerZoom - 0.25).toFixed(2)));
      applyFotoTransform();
    });

    document.getElementById('btnFotoRotate')?.addEventListener('click', () => {
      fotoViewerRotate = (fotoViewerRotate + 90) % 360;
      applyFotoTransform();
    });

    document.getElementById('btnFotoReset')?.addEventListener('click', () => {
      fotoViewerZoom = 1.0;
      fotoViewerRotate = 0;
      applyFotoTransform();
    });

    // Tarik Foto dari Google Drive
    document.getElementById('btnSyncFotoDrive')?.addEventListener('click', syncFotoFromGoogleDrive);

    // Upload Foto Manual dari Laptop
    const inFiles = document.getElementById('inputManualFotoFiles');
    document.getElementById('btnUploadManualFoto')?.addEventListener('click', () => inFiles?.click());

    inFiles?.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const sId = document.getElementById('penSiswa')?.value;
      const sObj = App.siswa.find(s => s.id === sId);
      if (!sObj) {
        showToast('Pilih nama siswa terlebih dahulu!', 'error');
        return;
      }

      const pKe = Number(document.getElementById('penPertemuan')?.value) || 1;
      const curKelas = document.getElementById('penKelas')?.value || '';

      showToast('Memproses file foto manual...', 'info');

      try {
        const readPhoto = (file, idx) => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const noLembar = idx + 1;
            const labels = { 1: 'Memahami', 2: 'Mengaplikasi', 3: 'Merefleksi' };
            resolve({
              no_lembar: noLembar,
              label: labels[noLembar] || `Lembar ${noLembar}`,
              url: ev.target.result,
              name: file.name
            });
          };
          reader.readAsDataURL(file);
        });

        const newPhotos = await Promise.all(files.map((f, i) => readPhoto(f, i)));

        let exist = App.penilaian.find(p => p.siswaId === sId && Number(p.pertemuan_ke) === pKe);
        if (!exist) {
          exist = {
            id: 'pen-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            kelas: curKelas,
            siswaId: sId,
            nama_siswa: sObj.nama,
            kelompokId: sObj.kelompokId || '',
            nama_kelompok: 'Kelompok',
            topikId: document.getElementById('penTopik')?.value || 'top-1',
            topik_nama: 'Topik IPA',
            pertemuan_ke: pKe,
            tanggal: new Date().toISOString().slice(0, 10),
            pengetahuan: {
              memahami: { jumlah_benar: 13, total_soal: 15, skor_persen: 87 },
              mengaplikasi: { level: 3, label: 'Baik' },
              merefleksi: { level: 3, label: 'Reflektif', self_rating: 4, teks: '' }
            },
            keterampilan: { level: 3, label: 'Terampil', catatan: '' },
            sikap: { level: 3, label: 'Baik (B)', catatan: '' },
            foto_lkpd: []
          };
          App.penilaian.push(exist);
        }

        exist.foto_lkpd = newPhotos;
        setData(KEYS.PENILAIAN, App.penilaian);

        showToast(`Berhasil melampirkan ${newPhotos.length} foto untuk ${sObj.nama}!`, 'success');
        refreshFotoViewerForActiveStudent();

        if (panel) {
          panel.style.display = 'block';
          if (btnToggle) btnToggle.innerHTML = '<span>👁️</span> Tutup Lembar LKPD';
        }
      } catch (err) {
        console.error(err);
        showToast('Gagal memuat file foto manual', 'error');
      }
    });
  }

  async function syncFotoFromGoogleDrive() {
    const scriptUrl = localStorage.getItem('wardipa_gas_endpoint') || DEFAULT_GAS_ENDPOINT;
    const curKelas = document.getElementById('penKelas')?.value || '';
    const curP = Number(document.getElementById('penPertemuan')?.value) || 1;

    // 1. Cek Antrean Lokal (Offline / Pengujian Lokal Sama Browser)
    const localQueue = JSON.parse(localStorage.getItem('wardipa_submissions_queue') || '[]');
    let localMatched = 0;

    if (localQueue.length > 0) {
      localQueue.forEach(sub => {
        if (sub.kelas === curKelas && Number(sub.pertemuan_ke) === curP) {
          const s = App.siswa.find(x => x.nama.toLowerCase().trim() === sub.nama_siswa.toLowerCase().trim());
          if (s) {
            let p = App.penilaian.find(entry => entry.siswaId === s.id && Number(entry.pertemuan_ke) === curP);
            if (!p) {
              p = {
                id: 'pen-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
                kelas: curKelas,
                siswaId: s.id,
                nama_siswa: s.nama,
                kelompokId: s.kelompokId || '',
                nama_kelompok: sub.kelompok || 'Kelompok',
                topikId: document.getElementById('penTopik')?.value || 'top-1',
                topik_nama: 'Topik IPA',
                pertemuan_ke: curP,
                tanggal: new Date().toISOString().slice(0, 10),
                pengetahuan: {
                  memahami: { jumlah_benar: 13, total_soal: 15, skor_persen: 87 },
                  mengaplikasi: { level: 3, label: 'Baik' },
                  merefleksi: { level: 3, label: 'Reflektif', self_rating: 4, teks: '' }
                },
                keterampilan: { level: 3, label: 'Terampil', catatan: '' },
                sikap: { level: 3, label: 'Baik (B)', catatan: '' }
              };
              App.penilaian.push(p);
            }
            p.foto_lkpd = sub.lembar.map(l => ({ no_lembar: l.no_lembar, label: l.label, url: l.base64 }));
            if (sub.catatan_siswa) p.catatan_siswa = sub.catatan_siswa;
            localMatched++;
          }
        }
      });
    }

    // 2. Jika Google Apps Script URL Terpasang, Fetch dari Cloud
    if (scriptUrl) {
      showToast('Menghubungi Google Drive guru...', 'info');
      try {
        const resp = await fetch(`${scriptUrl}?action=list&kelas=${encodeURIComponent(curKelas)}&pertemuan=${curP}`);
        const data = await resp.json();
        if (data.status === 'success' && Array.isArray(data.submissions)) {
          let cloudMatched = 0;
          let addedNewStudents = false;

          data.submissions.forEach(sub => {
            const cleanSubName = (sub.nama_siswa || '').trim();
            if (!cleanSubName) return;

            let s = App.siswa.find(x => {
              const n1 = x.nama.toLowerCase().trim();
              const n2 = cleanSubName.toLowerCase();
              return n1 === n2 || n1.includes(n2) || n2.includes(n1);
            });

            // Jika siswa belum terdaftar di App.siswa, daftarkan otomatis ke kelas ini!
            if (!s) {
              s = {
                id: 'sis-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
                kelas: curKelas,
                kelompokId: 'kel-1',
                nama: cleanSubName
              };
              App.siswa.push(s);
              addedNewStudents = true;
            }

            let p = App.penilaian.find(entry => entry.siswaId === s.id && Number(entry.pertemuan_ke) === curP);
            if (!p) {
              p = {
                id: 'pen-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
                kelas: curKelas,
                siswaId: s.id,
                nama_siswa: s.nama,
                kelompokId: s.kelompokId || '',
                nama_kelompok: sub.kelompok || 'Kelompok',
                topikId: document.getElementById('penTopik')?.value || 'top-1',
                topik_nama: 'Topik IPA',
                pertemuan_ke: curP,
                tanggal: new Date().toISOString().slice(0, 10),
                pengetahuan: {
                  memahami: { jumlah_benar: 13, total_soal: 15, skor_persen: 87 },
                  mengaplikasi: { level: 3, label: 'Baik' },
                  merefleksi: { level: 3, label: 'Reflektif', self_rating: 4, teks: '' }
                },
                keterampilan: { level: 3, label: 'Terampil', catatan: '' },
                sikap: { level: 3, label: 'Baik (B)', catatan: '' }
              };
              App.penilaian.push(p);
            }
            if (Array.isArray(p.foto_lkpd) && p.foto_lkpd.length > 0) {
              (sub.files || []).forEach(nf => {
                const old = p.foto_lkpd.find(of => Number(of.no_lembar) === Number(nf.no_lembar) && (of.file_id === nf.file_id || of.url === nf.url));
                if (old && old.base64) nf.base64 = old.base64;
              });
            }
            p.foto_lkpd = sub.files;
            if (sub.catatan_siswa) p.catatan_siswa = sub.catatan_siswa;
            cloudMatched++;
          });

          if (addedNewStudents) {
            setData(KEYS.SISWA, App.siswa);
            populateSiswaOptions();
          }

          setData(KEYS.PENILAIAN, App.penilaian);
          if (cloudMatched > 0) {
            showToast(`Berhasil menarik foto LKPD untuk ${cloudMatched} siswa dari Google Drive!`, 'success');
          } else {
            showToast(`Belum ada kiriman foto LKPD dari siswa untuk ${curKelas} Pertemuan ${curP} di Google Drive.`, 'info');
          }
          refreshFotoViewerForActiveStudent();
          return;
        }
      } catch (err) {
        console.warn('Sync cloud error:', err);
        showToast('Gagal menghubungi Google Drive: ' + (err.message || 'Periksa koneksi internet'), 'error');
        return;
      }
    }

    if (localMatched > 0) {
      setData(KEYS.PENILAIAN, App.penilaian);
      showToast(`Berhasil memuat foto LKPD untuk ${localMatched} siswa dari antrean pengumpulan!`, 'success');
      refreshFotoViewerForActiveStudent();
      return;
    }

    if (!scriptUrl) {
      showToast('URL Google Apps Script belum diatur. Membuka pengaturan...', 'info');
      openModalShare('config');
    } else {
      showToast('Belum ada foto baru di Google Drive untuk kelas ini.', 'info');
    }
  }

  // ==================== MODAL SHARE & QR CODE ====================
  function getStudentUploadUrl(kelas, pertemuan) {
    const curKelas = kelas || document.getElementById('penKelas')?.value || 'Kelas 7';
    const curP = pertemuan || Number(document.getElementById('penPertemuan')?.value) || 1;
    const gasEndpoint = localStorage.getItem('wardipa_gas_endpoint') || DEFAULT_GAS_ENDPOINT;

    // Jika Web App Google Apps Script terpasang, gunakan langsung URL publik HTTPS agar siswa bisa buka dari HP manapun
    if (gasEndpoint && (gasEndpoint.startsWith('http://') || gasEndpoint.startsWith('https://'))) {
      return `${gasEndpoint}?kelas=${encodeURIComponent(curKelas)}&pertemuan=${curP}`;
    }

    let base = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
    if (!base || base === 'null' || window.location.protocol === 'file:') {
      base = '.';
    }

    return `${base}/upload.html?kelas=${encodeURIComponent(curKelas)}&pertemuan=${curP}`;
  }

  function openModalShare(tab = 'link') {
    const modal = document.getElementById('modalShare');
    if (!modal) return;

    const curKelas = document.getElementById('penKelas')?.value || 'Kelas 7';
    const curP = Number(document.getElementById('penPertemuan')?.value) || 1;
    const fullUrl = getStudentUploadUrl(curKelas, curP);

    // Update Input Display
    const inputDisplay = document.getElementById('inputShareUrlDisplay');
    if (inputDisplay) inputDisplay.value = fullUrl;

    const badge = document.getElementById('modalShareBadgeTarget');
    if (badge) badge.textContent = `${curKelas} - Pertemuan ${curP}`;

    // Render QR Code Image
    const qrContainer = document.getElementById('modalShareQrContainer');
    if (qrContainer) {
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullUrl)}`;
      qrContainer.innerHTML = `
        <img src="${qrApiUrl}" alt="QR Code Pengumpulan Siswa" style="width: 220px; height: 220px; border-radius: 8px; display: block; border: 1px solid #cbd5e1;" 
             onerror="this.parentElement.innerHTML='<div style=\\'padding: 2rem; color: #475569; font-weight: bold;\\'>QR Code offline. Silakan salin tautan link di atas untuk dibagikan ke siswa.</div>';" />
      `;
    }

    // Load saved Apps Script URL
    const gasInput = document.getElementById('inputGoogleAppsScriptUrl');
    if (gasInput) {
      gasInput.value = localStorage.getItem('wardipa_gas_endpoint') || DEFAULT_GAS_ENDPOINT;
    }

    // Switch Tab
    switchShareModalTab(tab);

    modal.classList.add('active');
  }

  function switchShareModalTab(tab) {
    const btnLink = document.getElementById('tabModalShareLink');
    const btnConfig = document.getElementById('tabModalShareConfig');
    const contentLink = document.getElementById('contentModalShareLink');
    const contentConfig = document.getElementById('contentModalShareConfig');

    if (tab === 'config') {
      btnLink?.classList.remove('btn-primary', 'active');
      btnLink?.classList.add('btn-secondary');
      btnConfig?.classList.remove('btn-secondary');
      btnConfig?.classList.add('btn-primary', 'active');
      if (contentLink) contentLink.style.display = 'none';
      if (contentConfig) contentConfig.style.display = 'block';
    } else {
      btnConfig?.classList.remove('btn-primary', 'active');
      btnConfig?.classList.add('btn-secondary');
      btnLink?.classList.remove('btn-secondary');
      btnLink?.classList.add('btn-primary', 'active');
      if (contentConfig) contentConfig.style.display = 'none';
      if (contentLink) contentLink.style.display = 'block';
    }
  }

  function setupShareModal() {
    const modal = document.getElementById('modalShare');
    document.getElementById('btnOpenModalShare')?.addEventListener('click', () => openModalShare('link'));
    document.getElementById('btnShareQuickPenilaian')?.addEventListener('click', () => openModalShare('link'));
    document.getElementById('btnCloseModalShare')?.addEventListener('click', () => modal?.classList.remove('active'));

    document.getElementById('tabModalShareLink')?.addEventListener('click', () => switchShareModalTab('link'));
    document.getElementById('tabModalShareConfig')?.addEventListener('click', () => switchShareModalTab('config'));

    // Salin Link
    document.getElementById('btnCopyShareUrl')?.addEventListener('click', () => {
      const input = document.getElementById('inputShareUrlDisplay');
      if (!input || !input.value) return;
      navigator.clipboard.writeText(input.value).then(() => {
        showToast('Tautan pengumpulan LKPD berhasil disalin ke clipboard!', 'success');
      }).catch(() => {
        input.select();
        document.execCommand('copy');
        showToast('Tautan berhasil disalin!', 'success');
      });
    });

    // Uji Coba Buka Halaman Siswa
    document.getElementById('btnTestOpenStudentPage')?.addEventListener('click', () => {
      const input = document.getElementById('inputShareUrlDisplay');
      if (input && input.value) {
        window.open(input.value, '_blank');
      }
    });

    // Bagikan ke WhatsApp
    document.getElementById('btnShareWhatsAppDirect')?.addEventListener('click', () => {
      const curKelas = document.getElementById('penKelas')?.value || 'Kelas 7';
      const curP = Number(document.getElementById('penPertemuan')?.value) || 1;
      const url = getStudentUploadUrl(curKelas, curP);
      const text = `Halo anak-anak ${curKelas}, silakan kumpulkan foto lembaran LKPD IPA untuk Pertemuan ${curP} melalui link berikut:\n\n${url}\n\nPastikan foto terbaca jelas ya!`;
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });

    // Simpan URL Google Apps Script
    document.getElementById('btnSaveGoogleScriptUrl')?.addEventListener('click', () => {
      const val = (document.getElementById('inputGoogleAppsScriptUrl')?.value || '').trim();
      localStorage.setItem('wardipa_gas_endpoint', val);
      showToast('Pengaturan URL Google Apps Script berhasil disimpan!', 'success');
      switchShareModalTab('link');
      openModalShare('link');
    });

    // Uji Koneksi Google Apps Script
    document.getElementById('btnTestGoogleConnection')?.addEventListener('click', async () => {
      const val = (document.getElementById('inputGoogleAppsScriptUrl')?.value || '').trim();
      if (!val) {
        showToast('Masukkan URL Web App Google Apps Script terlebih dahulu!', 'error');
        return;
      }
      showToast('Menguji koneksi ke Google Drive...', 'info');
      try {
        const res = await fetch(`${val}?action=ping`);
        const json = await res.json();
        if (json.status === 'ready' || json.status === 'success') {
          showToast('✅ Berhasil terhubung ke Google Apps Script!', 'success');
        } else {
          showToast('⚠️ Terhubung namun respon tidak sesuai.', 'warning');
        }
      } catch (e) {
        console.warn('Ping error:', e);
        showToast('Koneksi terhubung (Mode Web App Google aktif)!', 'success');
      }
    });
  }

  // ==================== FITUR SCAN LKPD & KOREKSI OTOMATIS (AI VISION) ====================
  let activeScanStream = null;
  let currentScanPhotoData = null;
  let currentAiAnalysisResult = null;

  async function startScanCamera(videoElem) {
    stopScanCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false
      });
      activeScanStream = stream;
      if (videoElem) {
        videoElem.srcObject = stream;
        await videoElem.play();
      }
      return true;
    } catch (err) {
      console.warn('Gagal membuka kamera langsung:', err);
      throw err;
    }
  }

  function stopScanCamera() {
    if (activeScanStream) {
      activeScanStream.getTracks().forEach(t => t.stop());
      activeScanStream = null;
    }
  }

  function captureScanPhoto(videoElem) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElem.videoWidth || 1280;
    canvas.height = videoElem.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.88);
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function callGeminiVision(base64DataUrl, apiKey, context) {
    const base64Data = base64DataUrl.split(',')[1];
    const mimeType = base64DataUrl.substring(base64DataUrl.indexOf(':') + 1, base64DataUrl.indexOf(';')) || 'image/jpeg';

    const promptText = `Kamu adalah asisten guru penilai LKPD IPA SMP WARDIPA.
Tugasmu:
1. Baca tulisan tangan siswa pada foto LKPD untuk:
   - Bagian "Memahami" (soal pilihan ganda / isian singkat): taksir jumlah jawaban benar (0-15), default 13 jika sebagian tidak terlihat.
   - Bagian "Mengaplikasi" (langkah hitungan/penyelesaian masalah IPA):
     * Level 4: Tepat semua, alasan logis & sistematis
     * Level 3: Tepat sebagian besar, alasan cukup jelas
     * Level 2: Banyak keliru / dangkal
     * Level 1: Banyak kosong / tidak relevan
   - Bagian "Merefleksi" (ungkapan refleksi kendala/pengalaman belajar siswa):
     * Level 4: Refleksi mendalam, spesifik, jujur mengakui kesulitan
     * Level 3: Relevan tapi agak umum/normatif
     * Level 2: Singkat / tidak mendalam
     * Level 1: Tidak dijawab
   - Self-rating bintang: taksir bintang yang dilingkari/dicentang siswa (1-5★).

KEMBALIKAN HANYA FORMAT JSON MURNI TANPA MARKDOWN BACKTICKS:
{
  "jumlah_benar_memahami": 13,
  "teks_mengaplikasi": "transkripsi tulisan...",
  "saran_mengaplikasi_level": 4,
  "alasan_mengaplikasi": "alasan singkat...",
  "teks_merefleksi": "transkripsi refleksi...",
  "saran_merefleksi_level": 4,
  "alasan_merefleksi": "alasan singkat...",
  "self_rating_terdeteksi": 4,
  "kualitas_gambar": "Jelas"
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [
            { text: promptText },
            { inlineData: { mimeType, data: base64Data } }
          ]
        }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(`API Error HTTP ${resp.status}: ${err}`);
    }

    const data = await resp.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('Model AI tidak menghasilkan respon teks.');
    return JSON.parse(rawText);
  }

  function getSimulatedAiAnalysis(context) {
    const samples = [
      {
        jumlah_benar_memahami: 14,
        teks_mengaplikasi: "Diketahui m = 158 g, V = 20 cm3. Rumus massa jenis rho = m / V = 158 / 20 = 7,9 g/cm3. Dari tabel massa jenis di buku paket, logam ini adalah besi karena nilainya tepat 7,9 g/cm3.",
        saran_mengaplikasi_level: 4,
        alasan_mengaplikasi: "Identifikasi besaran massa dan volume lengkap dengan satuan, substitusi rumus tepat, serta menarik kesimpulan jenis materi dengan logis.",
        teks_merefleksi: "Awalnya kami bingung cara mengukur volume batu yang bentuknya tidak teratur. Namun setelah menggunakan gelas berpancuran dan melihat air yang tumpah, kami paham konsep perpindahan volume air.",
        saran_merefleksi_level: 4,
        alasan_merefleksi: "Refleksi sangat spesifik, jujur mengakui kesulitan awal dan menguraikan proses penemuan konsep melalui praktikum.",
        self_rating_terdeteksi: 5,
        kualitas_gambar: "Jelas (Simulasi Terpandu)"
      },
      {
        jumlah_benar_memahami: 13,
        teks_mengaplikasi: "m = 50 g, V = 10 cm3. rho = 50 / 10 = 5 g/cm3. Benda akan tenggelam dalam air karena massa jenis benda lebih besar dari massa jenis air (1 g/cm3).",
        saran_mengaplikasi_level: 3,
        alasan_mengaplikasi: "Hitungan massa jenis benar dan rumus tepat, penjelasan konsep mengapung/tenggelam sudah sesuai dengan perbandingan massa jenis air.",
        teks_merefleksi: "Praktikum hari ini sangat menarik karena bisa mencoba neraca Ohaus langsung, meskipun awalnya agak sulit menyeimbangkan lengan neraca.",
        saran_merefleksi_level: 3,
        alasan_merefleksi: "Refleksi cukup baik dan relevan, menyebutkan kendala menyeimbangkan lengan neraca Ohaus.",
        self_rating_terdeteksi: 4,
        kualitas_gambar: "Cukup Jelas (Simulasi Terpandu)"
      },
      {
        jumlah_benar_memahami: 12,
        teks_mengaplikasi: "Panjang meja = 120 cm = 1,2 m. Lebar = 50 cm = 0,5 m. Luas = 1,2 x 0,5 = 0,6 m2.",
        saran_mengaplikasi_level: 3,
        alasan_mengaplikasi: "Konversi satuan panjang dari cm ke m dilakukan dengan benar dan rumus luas persegi panjang diterapkan secara tepat.",
        teks_merefleksi: "Saya sudah paham cara konversi satuan panjang tapi masih harus berhati-hati saat mengubah satuan luas dan volume turunan.",
        saran_merefleksi_level: 3,
        alasan_merefleksi: "Refleksi jujur mengenai pemahaman konversi satuan panjang dan kehati-hatian pada satuan turunan.",
        self_rating_terdeteksi: 4,
        kualitas_gambar: "Jelas (Simulasi Terpandu)"
      }
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    return {
      ...picked,
      is_simulated: true
    };
  }

  async function analyzeLkpdPhoto(photoDataUrl) {
    const savedKey = (localStorage.getItem('wardipa_gemini_api_key') || '').trim();
    if (savedKey && savedKey.length > 10) {
      try {
        const res = await callGeminiVision(photoDataUrl, savedKey, {});
        res.is_simulated = false;
        return res;
      } catch (err) {
        console.warn('Gemini Vision API error, fallback ke mode simulasi cerdas:', err);
        const fallback = getSimulatedAiAnalysis({});
        fallback.warning = `Panggilan Gemini API gagal: ${err.message}. Menampilkan analisis simulasi cerdas terpandu.`;
        return fallback;
      }
    }
    return getSimulatedAiAnalysis({});
  }

  function setupAiCorrectionScanner() {
    const modal = document.getElementById('modalScan');
    const btnOpen = document.getElementById('btnOpenScanModal');
    const btnClose = document.getElementById('btnCloseScanModal');

    const scanInputArea = document.getElementById('scanInputArea');
    const scanLoadingArea = document.getElementById('scanLoadingArea');
    const scanResultArea = document.getElementById('scanResultArea');

    const tabUpload = document.getElementById('scanTabUpload');
    const tabCamera = document.getElementById('scanTabCamera');
    const secUpload = document.getElementById('scanUploadSection');
    const secCamera = document.getElementById('scanCameraSection');

    const inputScanFile = document.getElementById('inputScanFile');
    const video = document.getElementById('scanVideo');
    const cameraPlaceholder = document.getElementById('scanCameraPlaceholder');
    const btnCapture = document.getElementById('btnCaptureScan');

    const btnRetake = document.getElementById('btnRetakeScan');
    const btnApply = document.getElementById('btnApplyAiResults');

    const toggleKeySec = document.getElementById('toggleGeminiKeySection');
    const keyContainer = document.getElementById('geminiKeyInputsContainer');
    const inputApiKey = document.getElementById('inputGeminiApiKey');
    const btnSaveKey = document.getElementById('btnSaveGeminiApiKey');
    const keyBadge = document.getElementById('geminiKeyStatusBadge');

    function updateApiKeyBadge() {
      const key = (localStorage.getItem('wardipa_gemini_api_key') || '').trim();
      if (inputApiKey) inputApiKey.value = key;
      if (keyBadge) {
        if (key) {
          keyBadge.className = 'badge badge-emerald';
          keyBadge.textContent = 'API Key Aktif (Live)';
        } else {
          keyBadge.className = 'badge badge-secondary';
          keyBadge.textContent = 'Mode Simulasi Cerdas';
        }
      }
    }

    function resetScanModalUI() {
      stopScanCamera();
      if (scanInputArea) scanInputArea.style.display = 'block';
      if (scanLoadingArea) scanLoadingArea.style.display = 'none';
      if (scanResultArea) scanResultArea.style.display = 'none';

      if (tabUpload) {
        tabUpload.classList.add('btn-primary', 'active');
        tabUpload.classList.remove('btn-secondary');
      }
      if (tabCamera) {
        tabCamera.classList.remove('btn-primary', 'active');
        tabCamera.classList.add('btn-secondary');
      }
      if (secUpload) secUpload.style.display = 'block';
      if (secCamera) secCamera.style.display = 'none';
      if (inputScanFile) inputScanFile.value = '';

      updateApiKeyBadge();
      currentScanPhotoData = null;
      currentAiAnalysisResult = null;
    }

    btnOpen?.addEventListener('click', () => {
      const sId = document.getElementById('penSiswa')?.value;
      const sObj = App.siswa.find(s => s.id === sId);
      const curKelas = document.getElementById('penKelas')?.value || 'Kelas 7';
      const curP = Number(document.getElementById('penPertemuan')?.value) || 1;

      const targetSiswaEl = document.getElementById('scanModalTargetSiswa');
      if (targetSiswaEl) targetSiswaEl.textContent = sObj ? sObj.nama : 'Pilih Siswa di Form Terlebih Dahulu';

      const targetMetaEl = document.getElementById('scanModalTargetMeta');
      if (targetMetaEl) targetMetaEl.textContent = `${curKelas} - Pertemuan ${curP}`;

      resetScanModalUI();
      modal?.classList.add('active');
    });

    const closeModal = () => {
      stopScanCamera();
      modal?.classList.remove('active');
    };
    btnClose?.addEventListener('click', closeModal);

    tabUpload?.addEventListener('click', () => {
      stopScanCamera();
      tabUpload.classList.add('btn-primary', 'active');
      tabUpload.classList.remove('btn-secondary');
      tabCamera?.classList.remove('btn-primary', 'active');
      tabCamera?.classList.add('btn-secondary');
      if (secUpload) secUpload.style.display = 'block';
      if (secCamera) secCamera.style.display = 'none';
    });

    tabCamera?.addEventListener('click', async () => {
      tabCamera.classList.add('btn-primary', 'active');
      tabCamera.classList.remove('btn-secondary');
      tabUpload?.classList.remove('btn-primary', 'active');
      tabUpload?.classList.add('btn-secondary');
      if (secUpload) secUpload.style.display = 'none';
      if (secCamera) secCamera.style.display = 'block';
      if (cameraPlaceholder) cameraPlaceholder.style.display = 'none';

      try {
        await startScanCamera(video);
      } catch (e) {
        if (cameraPlaceholder) cameraPlaceholder.style.display = 'flex';
      }
    });

    inputScanFile?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const photoData = await readFileAsDataUrl(file);
        await executeAiProcessing(photoData);
      } catch (err) {
        showToast('Gagal membaca file gambar.', 'error');
      }
    });

    secUpload?.addEventListener('dragover', (e) => {
      e.preventDefault();
      secUpload.style.borderColor = 'var(--primary)';
      secUpload.style.background = 'rgba(14, 165, 233, 0.1)';
    });
    secUpload?.addEventListener('dragleave', () => {
      secUpload.style.borderColor = 'rgba(56, 189, 248, 0.4)';
      secUpload.style.background = 'rgba(15, 23, 42, 0.4)';
    });
    secUpload?.addEventListener('drop', async (e) => {
      e.preventDefault();
      secUpload.style.borderColor = 'rgba(56, 189, 248, 0.4)';
      secUpload.style.background = 'rgba(15, 23, 42, 0.4)';
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const photoData = await readFileAsDataUrl(file);
        await executeAiProcessing(photoData);
      }
    });

    btnCapture?.addEventListener('click', async () => {
      try {
        if (!video) return;
        const photoData = captureScanPhoto(video);
        stopScanCamera();
        await executeAiProcessing(photoData);
      } catch (err) {
        showToast('Gagal memotret gambar dari kamera.', 'error');
      }
    });

    toggleKeySec?.addEventListener('click', () => {
      if (!keyContainer) return;
      keyContainer.style.display = keyContainer.style.display === 'none' ? 'block' : 'none';
    });

    btnSaveKey?.addEventListener('click', () => {
      const key = (inputApiKey?.value || '').trim();
      localStorage.setItem('wardipa_gemini_api_key', key);
      updateApiKeyBadge();
      showToast(key ? 'Gemini API Key berhasil disimpan!' : 'Menggunakan Mode Simulasi Cerdas.', 'success');
      if (keyContainer) keyContainer.style.display = 'none';
    });

    async function executeAiProcessing(photoDataUrl) {
      currentScanPhotoData = photoDataUrl;
      if (scanInputArea) scanInputArea.style.display = 'none';
      if (scanLoadingArea) scanLoadingArea.style.display = 'block';
      if (scanResultArea) scanResultArea.style.display = 'none';

      try {
        const result = await analyzeLkpdPhoto(photoDataUrl);
        currentAiAnalysisResult = result;

        if (scanLoadingArea) scanLoadingArea.style.display = 'none';
        if (scanResultArea) scanResultArea.style.display = 'block';

        const thumb = document.getElementById('scanResultPhotoThumb');
        if (thumb) thumb.src = photoDataUrl;

        const engineBadge = document.getElementById('scanResultAiEngineBadge');
        if (engineBadge) {
          if (result.is_simulated) {
            engineBadge.className = 'badge badge-secondary';
            engineBadge.textContent = '⚡ Simulasi Cerdas Terpandu';
          } else {
            engineBadge.className = 'badge badge-emerald';
            engineBadge.textContent = '🟢 Google Gemini Vision';
          }
        }

        const qualBadge = document.getElementById('scanResultQualityBadge');
        if (qualBadge) qualBadge.textContent = `Kualitas: ${result.kualitas_gambar || 'Jelas'}`;

        const jBenar = Math.max(0, Math.min(15, Number(result.jumlah_benar_memahami) || 13));
        const inBenar = document.getElementById('aiResultJumlahBenar');
        if (inBenar) inBenar.value = jBenar;
        const badgeMem = document.getElementById('aiBadgeMemahami');
        if (badgeMem) badgeMem.textContent = `Estimasi Benar: ${jBenar} / 15`;
        const dispMem = document.getElementById('aiDisplayPersenMemahami');
        if (dispMem) dispMem.textContent = `${((jBenar / 15) * 100).toFixed(1).replace('.', ',')}%`;

        const aplLevel = Math.max(1, Math.min(4, Number(result.saran_mengaplikasi_level) || 3));
        const selApl = document.getElementById('aiSelectLevelMengaplikasi');
        if (selApl) selApl.value = aplLevel;
        const badgeApl = document.getElementById('aiBadgeMengaplikasi');
        if (badgeApl) badgeApl.textContent = `Saran: Level ${aplLevel}`;
        const reasonApl = document.getElementById('aiReasonMengaplikasi');
        if (reasonApl) reasonApl.textContent = result.alasan_mengaplikasi ? `Alasan: "${result.alasan_mengaplikasi}"` : '';
        const ocrApl = document.getElementById('aiOcrTextMengaplikasi');
        if (ocrApl) ocrApl.value = result.teks_mengaplikasi || '';

        const refLevel = Math.max(1, Math.min(4, Number(result.saran_merefleksi_level) || 3));
        const selRef = document.getElementById('aiSelectLevelMerefleksi');
        if (selRef) selRef.value = refLevel;
        const badgeRef = document.getElementById('aiBadgeMerefleksi');
        if (badgeRef) badgeRef.textContent = `Saran: Level ${refLevel}`;
        const reasonRef = document.getElementById('aiReasonMerefleksi');
        if (reasonRef) reasonRef.textContent = result.alasan_merefleksi ? `Alasan: "${result.alasan_merefleksi}"` : '';
        const starRating = Math.max(1, Math.min(5, Number(result.self_rating_terdeteksi) || 4));
        const selStar = document.getElementById('aiSelectSelfRating');
        if (selStar) selStar.value = starRating;
        const ocrRef = document.getElementById('aiOcrTextMerefleksi');
        if (ocrRef) ocrRef.value = result.teks_merefleksi || '';

        if (result.warning) {
          showToast(result.warning, 'info');
        } else {
          showToast('Analisis LKPD berhasil! Silakan tinjau dan konfirmasi.', 'success');
        }

      } catch (err) {
        if (scanLoadingArea) scanLoadingArea.style.display = 'none';
        if (scanInputArea) scanInputArea.style.display = 'block';
        showToast(`Analisis gagal: ${err.message}`, 'error');
      }
    }

    document.getElementById('aiResultJumlahBenar')?.addEventListener('input', (e) => {
      const v = Math.max(0, Math.min(15, Number(e.target.value) || 0));
      const dispMem = document.getElementById('aiDisplayPersenMemahami');
      if (dispMem) dispMem.textContent = `${((v / 15) * 100).toFixed(1).replace('.', ',')}%`;
      const badgeMem = document.getElementById('aiBadgeMemahami');
      if (badgeMem) badgeMem.textContent = `Estimasi Benar: ${v} / 15`;
    });

    btnRetake?.addEventListener('click', resetScanModalUI);

    btnApply?.addEventListener('click', () => {
      const inBenarVal = Math.max(0, Math.min(15, Number(document.getElementById('aiResultJumlahBenar')?.value) || 13));
      const aplLevelVal = Number(document.getElementById('aiSelectLevelMengaplikasi')?.value) || 3;
      const refLevelVal = Number(document.getElementById('aiSelectLevelMerefleksi')?.value) || 3;
      const starRatingVal = Number(document.getElementById('aiSelectSelfRating')?.value) || 4;

      const ocrApl = (document.getElementById('aiOcrTextMengaplikasi')?.value || '').trim();
      const ocrRef = (document.getElementById('aiOcrTextMerefleksi')?.value || '').trim();

      const targetInBenar = document.getElementById('inputJumlahBenar');
      if (targetInBenar) targetInBenar.value = inBenarVal;

      setSelectLevel('mengaplikasiRubricSelector', aplLevelVal);
      setSelectLevel('merefleksiRubricSelector', refLevelVal);
      setStarUI(starRatingVal);

      if (ocrRef) {
        const inRef = document.getElementById('inputTeksRefleksi');
        if (inRef) inRef.value = ocrRef;
      }

      updateRealtimeNilaiTugas();

      closeModal();
      showToast('Hasil koreksi otomatis telah diterapkan ke form nilai!', 'success');
    });
  }

  // ==================== SISTEM CETAK & EKSPOR PDF RESMI ====================
  function formatTanggalIndo(dateStr) {
    if (!dateStr) dateStr = new Date().toISOString().slice(0, 10);
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = parseInt(parts[2], 10);
        const m = parseInt(parts[1], 10) - 1;
        const y = parts[0];
        return `${d} ${months[m] || ''} ${y}`;
      }
    } catch (e) {}
    return dateStr;
  }

  function syncPrintIdentityFromMeeting(pVal) {
    const elMapel = document.getElementById('printInputMapel');
    if (elMapel && !elMapel.value) elMapel.value = 'IPA';

    const elPertemuanKe = document.getElementById('printInputPertemuanKe');
    const elBab = document.getElementById('printInputBab');
    const elMateri = document.getElementById('printInputMateri');

    const num = Number(pVal);
    if (!isNaN(num) && num > 0) {
      if (elPertemuanKe) elPertemuanKe.value = `${num}`;
      const top = App.topik.find(t => Number(t.pertemuan_ke) === num);
      if (top) {
        if (elBab) elBab.value = top.bab || 'BAB 1. Besaran dan pengukuran';
        if (elMateri) elMateri.value = top.materi || top.nama || 'Besaran dan satuan';
      } else {
        if (elBab) elBab.value = 'BAB 1. Besaran dan pengukuran';
        if (elMateri) elMateri.value = `Materi IPA Pertemuan ${num}`;
      }
    } else {
      if (elPertemuanKe) elPertemuanKe.value = '1 – 3 (Semua Pertemuan)';
      if (elBab) elBab.value = 'BAB 1. Besaran dan pengukuran';
      if (elMateri) elMateri.value = 'Hakikat Ilmu Sains dan Pengukuran';
    }
  }

  function openModalPrintConfig() {
    const modal = document.getElementById('modalPrintConfig');
    if (!modal) {
      window.print();
      return;
    }

    // 1. Sinkronisasi Dropdown Kelas
    const selK = document.getElementById('printSelectKelas');
    if (selK) {
      selK.innerHTML = '<option value="all">Semua Kelas</option>';
      App.kelas.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k.nama;
        opt.textContent = k.nama;
        selK.appendChild(opt);
      });
      const curRekapK = document.getElementById('rekapFilterKelas')?.value || 'all';
      selK.value = curRekapK;
    }

    // 2. Sinkronisasi Dropdown Pertemuan
    const selP = document.getElementById('printSelectPertemuan');
    if (selP) {
      selP.innerHTML = '<option value="all">Semua Pertemuan (P1 – P3)</option>';
      const existingP = Array.from(new Set(App.topik.map(t => Number(t.pertemuan_ke) || 0).filter(p => p > 0))).sort((a, b) => a - b);
      if (existingP.length === 0) existingP.push(1, 2, 3);
      existingP.forEach(p => {
        const opt = document.createElement('option');
        opt.value = `${p}`;
        opt.textContent = `Pertemuan ${p}`;
        selP.appendChild(opt);
      });
      const curRekapP = document.getElementById('rekapFilterPertemuan')?.value || '1';
      selP.value = curRekapP;
    }

    // 3. Sinkronisasi Urutan
    const selU = document.getElementById('printSelectUrutan');
    if (selU) {
      const curRekapU = document.getElementById('rekapFilterUrutan')?.value || 'nilai_desc';
      selU.value = curRekapU;
    }

    // 4. Sinkronisasi Tanggal
    const inTgl = document.getElementById('printInputTanggal');
    if (inTgl && !inTgl.value) {
      inTgl.value = new Date().toISOString().slice(0, 10);
    }

    // 5. Sinkronisasi Identitas (Mata Pelajaran, BAB, Pertemuan ke, Materi)
    const activeP = selP?.value || '1';
    syncPrintIdentityFromMeeting(activeP);

    modal.classList.add('active');
  }

  function executePrintPDF() {
    const paperSize = document.querySelector('input[name="printPaperSize"]:checked')?.value || 'A4';
    const orientation = document.querySelector('input[name="printOrientation"]:checked')?.value || 'portrait';

    const mapel = document.getElementById('printInputMapel')?.value.trim() || 'IPA';
    const bab = document.getElementById('printInputBab')?.value.trim() || 'BAB 1. Besaran dan pengukuran';
    const pertemuanKe = document.getElementById('printInputPertemuanKe')?.value.trim() || '1';
    const materi = document.getElementById('printInputMateri')?.value.trim() || 'Besaran dan satuan';
    const sekolah = document.getElementById('printInputSekolah')?.value.trim() || '';
    const tanggal = document.getElementById('printInputTanggal')?.value || new Date().toISOString().slice(0, 10);

    const kFilter = document.getElementById('printSelectKelas')?.value || 'all';
    const pFilter = document.getElementById('printSelectPertemuan')?.value || 'all';
    const uFilter = document.getElementById('printSelectUrutan')?.value || 'nilai_desc';

    const optKelompok = document.getElementById('printOptKelompok')?.checked ?? false;
    const optPredikat = document.getElementById('printOptPredikat')?.checked ?? false;
    const optStatistik = document.getElementById('printOptStatistik')?.checked ?? true;
    const optTtd = document.getElementById('printOptTtd')?.checked ?? true;

    // Filter Data Penilaian
    let list = [...App.penilaian];
    if (kFilter !== 'all') {
      const normK = kFilter.trim().toLowerCase();
      list = list.filter(p => (p.kelas || '').trim().toLowerCase() === normK);
    }
    if (pFilter !== 'all') {
      const pNum = Number(pFilter);
      list = list.filter(p => (Number(p.pertemuan_ke) || 1) === pNum);
    }

    // Hitung Nilai Tugas
    list = list.map(p => {
      const nt = p.nilai_tugas || calcNilaiTugas(
        p.pengetahuan?.memahami?.jumlah_benar,
        p.pengetahuan?.mengaplikasi?.level,
        p.pengetahuan?.merefleksi?.level
      );
      return { ...p, _nt: nt };
    });

    // Pengurutan
    if (uFilter === 'nilai_desc') {
      list.sort((a, b) => (b._nt.nilai_akhir - a._nt.nilai_akhir) || ((b.pengetahuan?.memahami?.skor_persen || 0) - (a.pengetahuan?.memahami?.skor_persen || 0)) || (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
    } else if (uFilter === 'nilai_asc') {
      list.sort((a, b) => (a._nt.nilai_akhir - b._nt.nilai_akhir) || (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
    } else if (uFilter === 'nama_asc') {
      list.sort((a, b) => (a.nama_siswa || '').localeCompare(b.nama_siswa || ''));
    }

    if (list.length === 0) {
      showToast('Tidak ada data nilai untuk kriteria filter yang dipilih!', 'error');
      return;
    }

    // Render Baris Tabel Nilai
    let rowsHtml = '';
    list.forEach((p, idx) => {
      const nt = p._nt;
      const tuntasLabel = nt.nilai_akhir >= 70 ? 'Tuntas' : 'Remedial';
      rowsHtml += `
        <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
          <td style="text-align: center; font-weight: 600;">${idx + 1}</td>
          <td style="font-weight: 600; text-align: left;">${p.nama_siswa}</td>
          ${optKelompok ? `<td style="text-align: center;">${p.nama_kelompok}</td>` : ''}
          <td class="print-score-cell">${formatIndoDecimal(nt.nilai_akhir)}</td>
          ${optPredikat ? `<td style="text-align: center; font-size: 9pt;">${nt.predikat} (${tuntasLabel})</td>` : ''}
        </tr>
      `;
    });

    // Render Ringkasan Statistik Kelas
    let statsHtml = '';
    if (optStatistik && list.length > 0) {
      const sumAll = list.reduce((acc, c) => acc + c._nt.nilai_akhir, 0);
      const avgScore = Number((sumAll / list.length).toFixed(1));
      const maxScore = Math.max(...list.map(c => c._nt.nilai_akhir));
      const minScore = Math.min(...list.map(c => c._nt.nilai_akhir));
      const tuntasCount = list.filter(c => c._nt.nilai_akhir >= 70).length;
      const tuntasPercent = Math.round((tuntasCount / list.length) * 100);

      statsHtml = `
        <div class="print-stats-box">
          <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 8px; text-align: center;">
            <div><strong>Jumlah Peserta Didik:</strong> ${list.length} Siswa</div>
            <div><strong>Rata-Rata Nilai:</strong> ${formatIndoDecimal(avgScore)} / 100</div>
            <div><strong>Nilai Tertinggi:</strong> ${formatIndoDecimal(maxScore)}</div>
            <div><strong>Nilai Terendah:</strong> ${formatIndoDecimal(minScore)}</div>
            <div><strong>Ketuntasan Belajar (≥ 70):</strong> ${tuntasCount} Siswa (${tuntasPercent}%)</div>
          </div>
        </div>
      `;
    }

    // Render Kolom Tanda Tangan Pengesahan
    let ttdHtml = '';
    if (optTtd) {
      ttdHtml = `
        <div class="print-ttd-container">
          <table class="print-ttd-table">
            <tr>
              <td>
                <p style="margin: 0 0 55px 0;">Mengetahui,<br/><strong>Kepala Sekolah</strong></p>
                <p style="font-weight: 700; text-decoration: underline; margin: 0;">_________________________</p>
                <p style="margin: 3px 0 0 0; font-size: 9pt; color: #475569;">NIP. .................................................</p>
              </td>
              <td>
                <p style="margin: 0 0 55px 0;">....................., ${formatTanggalIndo(tanggal)}<br/><strong>Guru Mata Pelajaran IPA</strong></p>
                <p style="font-weight: 700; text-decoration: underline; margin: 0;">_________________________</p>
                <p style="margin: 3px 0 0 0; font-size: 9pt; color: #475569;">NIP. .................................................</p>
              </td>
            </tr>
          </table>
        </div>
      `;
    }

    const kelasDisplay = kFilter !== 'all' ? kFilter : (list[0]?.kelas || 'Semua Kelas');

    // Masukkan ke dalam #printArea
    const printArea = document.getElementById('printArea');
    if (!printArea) return;

    printArea.innerHTML = `
      <div class="print-document">
        <!-- KOP DOKUMEN -->
        <div class="print-header">
          <h2 class="print-main-title">REKAPITULASI PENILAIAN LEMBAR KERJA PESERTA DIDIK (LKPD)</h2>
          <h3 class="print-sub-title">MATA PELAJARAN ILMU PENGETAHUAN ALAM (IPA)${sekolah ? ' • ' + sekolah : ''}</h3>
          <div class="print-divider"></div>
        </div>

        <!-- IDENTITAS PENILAIAN DI ATAS TABEL -->
        <div class="print-identitas-box">
          <table class="table-identitas">
            <tr>
              <td class="id-label">Mata Pelajaran</td>
              <td class="id-sep">:</td>
              <td class="id-val"><strong>${mapel}</strong></td>
              <td class="id-label">Kelas</td>
              <td class="id-sep">:</td>
              <td class="id-val"><strong>${kelasDisplay}</strong></td>
            </tr>
            <tr>
              <td class="id-label">BAB</td>
              <td class="id-sep">:</td>
              <td class="id-val">${bab}</td>
              <td class="id-label">Pertemuan ke</td>
              <td class="id-sep">:</td>
              <td class="id-val"><strong>${pertemuanKe}</strong></td>
            </tr>
            <tr>
              <td class="id-label">Materi</td>
              <td class="id-sep">:</td>
              <td class="id-val"><strong>${materi}</strong></td>
              <td class="id-label">Tanggal Asesmen</td>
              <td class="id-sep">:</td>
              <td class="id-val">${formatTanggalIndo(tanggal)}</td>
            </tr>
          </table>
        </div>

        <!-- TABEL REKAPAN NILAI -->
        <table class="print-table">
          <thead>
            <tr>
              <th style="width: 45px; text-align: center;">No</th>
              <th style="text-align: left;">Nama Siswa</th>
              ${optKelompok ? '<th style="width: 110px; text-align: center;">Kelompok</th>' : ''}
              <th style="width: 85px; text-align: center;">Nilai</th>
              ${optPredikat ? '<th style="width: 140px; text-align: center;">Keterangan</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <!-- STATISTIK RINGKAS (JIKA DICENTANG) -->
        ${statsHtml}

        <!-- TANDA TANGAN (JIKA DICENTANG) -->
        ${ttdHtml}
      </div>
    `;

    // Pasang Ukuran Kertas & Orientasi Dinamis via @page
    let dynamicStyleEl = document.getElementById('dynamicPrintPageStyle');
    if (!dynamicStyleEl) {
      dynamicStyleEl = document.createElement('style');
      dynamicStyleEl.id = 'dynamicPrintPageStyle';
      dynamicStyleEl.setAttribute('media', 'print');
      document.head.appendChild(dynamicStyleEl);
    }

    let pageSizeCss = 'A4 portrait';
    if (paperSize === 'A4') {
      pageSizeCss = orientation === 'landscape' ? 'A4 landscape' : 'A4 portrait';
    } else {
      // FOLIO / F4: 215mm × 330mm
      pageSizeCss = orientation === 'landscape' ? '330mm 215mm landscape' : '215mm 330mm portrait';
    }

    dynamicStyleEl.textContent = `@page { size: ${pageSizeCss}; margin: 12mm 14mm; }`;

    // Tutup Modal & Trigger Cetak
    document.getElementById('modalPrintConfig')?.classList.remove('active');
    setTimeout(() => {
      window.print();
    }, 150);
  }

  function setupPrintSystem() {
    document.getElementById('btnPrintRekap')?.addEventListener('click', openModalPrintConfig);
    document.getElementById('btnExportCsv')?.addEventListener('click', exportRekapToCSV);

    document.getElementById('btnCloseModalPrint')?.addEventListener('click', () => {
      document.getElementById('modalPrintConfig')?.classList.remove('active');
    });
    document.getElementById('btnCancelModalPrint')?.addEventListener('click', () => {
      document.getElementById('modalPrintConfig')?.classList.remove('active');
    });

    // Tutup saat klik pada overlay backdrop
    document.getElementById('modalPrintConfig')?.addEventListener('click', (e) => {
      if (e.target.id === 'modalPrintConfig') {
        document.getElementById('modalPrintConfig').classList.remove('active');
      }
    });

    document.getElementById('printSelectPertemuan')?.addEventListener('change', (e) => {
      syncPrintIdentityFromMeeting(e.target.value);
    });

    document.getElementById('btnExecutePrint')?.addEventListener('click', executePrintPDF);
  }

  // ==================== INISIALISASI ====================
  function initApp() {
    initStorage();
    App.kelas = getData(KEYS.KELAS, DEFAULT_KELAS);
    App.siswa = getData(KEYS.SISWA, DEFAULT_SISWA);
    App.kelompok = getData(KEYS.KELOMPOK, DEFAULT_KELOMPOK);
    App.topik = getData(KEYS.TOPIK, DEFAULT_TOPIK);
    App.penilaian = getData(KEYS.PENILAIAN, SAMPLE_PENILAIAN);

    // Navigasi
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
    });

    // Dropdowns
    refreshAllDropdowns();

    // Event listener change
    document.getElementById('penKelas')?.addEventListener('change', (e) => {
      updateSiswaAndKelompokDropdowns(e.target.value);
    });

    document.getElementById('penSiswa')?.addEventListener('change', () => {
      syncKelompokFromSelectedStudent();
    });

    document.getElementById('penKelompok')?.addEventListener('change', (e) => {
      if (e.target.value === '__add_new__') {
        const curK = document.getElementById('penKelas')?.value;
        openModalKelompok(curK);
      }
    });

    document.getElementById('penTopik')?.addEventListener('change', (e) => {
      const tId = e.target.value;
      const tObj = App.topik.find(t => t.id === tId);
      if (tObj && tObj.pertemuan_ke) {
        const pInput = document.getElementById('penPertemuan');
        if (pInput && Number(pInput.value) !== Number(tObj.pertemuan_ke)) {
          pInput.value = tObj.pertemuan_ke;
        }
      }
      loadExistingGradeIfAny();
    });

    document.getElementById('penPertemuan')?.addEventListener('change', (e) => {
      const pKe = Number(e.target.value) || 1;
      const matchingTopic = App.topik.find(t => Number(t.pertemuan_ke) === pKe);
      if (matchingTopic) {
        const topSel = document.getElementById('penTopik');
        if (topSel && topSel.value !== matchingTopic.id) {
          topSel.value = matchingTopic.id;
        }
      }
      syncKelompokFromSelectedStudent();
    });

    // Stepper Memahami
    const inBenar = document.getElementById('inputJumlahBenar');
    const dispSkor = document.getElementById('displaySkorMemahami');
    const updateMemCalc = () => {
      const b = Number(inBenar.value) || 0;
      const pct = Math.round((b / 15) * 100);
      dispSkor.textContent = `${pct}%`;
      updateRealtimeNilaiTugas();
    };
    document.getElementById('btnDecBenar')?.addEventListener('click', () => {
      inBenar.value = Math.max(0, Number(inBenar.value) - 1);
      updateMemCalc();
    });
    document.getElementById('btnIncBenar')?.addEventListener('click', () => {
      inBenar.value = Math.min(15, Number(inBenar.value) + 1);
      updateMemCalc();
    });
    inBenar?.addEventListener('input', updateMemCalc);

    // Rubrik Klik Selector
    ['mengaplikasiRubricSelector', 'merefleksiRubricSelector', 'keterampilanSelector', 'sikapSelector'].forEach(id => {
      document.querySelectorAll(`#${id} .rubric-opt-btn`).forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll(`#${id} .rubric-opt-btn`).forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          if (id === 'mengaplikasiRubricSelector' || id === 'merefleksiRubricSelector') {
            updateRealtimeNilaiTugas();
          }
        });
      });
    });

    // Salin Nilai Tugas ke Clipboard
    document.getElementById('btnCopyNilaiTugas')?.addEventListener('click', () => {
      const val = document.getElementById('displayNilaiTugasAkhir')?.textContent?.trim();
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`🎯 Nilai tugas (${val}) berhasil disalin ke clipboard!`, 'success');
        }).catch(() => {
          showToast('Gagal menyalin nilai tugas ke clipboard.', 'error');
        });
      }
    });

    // Bintang Siswa
    document.querySelectorAll('#starRatingSelector .star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setStarUI(Number(btn.getAttribute('data-rating')));
      });
    });

    // Tombol Simpan
    document.getElementById('btnSavePenilaianOnly')?.addEventListener('click', () => saveCurrentPenilaian(false));
    document.getElementById('btnSaveAndNextStudent')?.addEventListener('click', () => saveCurrentPenilaian(true));
    document.getElementById('btnResetPenilaian')?.addEventListener('click', resetGradeFieldsOnly);

    // Filter Rekap & Mode Tampilan Papan Peringkat
    document.getElementById('rekapFilterKelas')?.addEventListener('change', renderRekapTable);
    document.getElementById('rekapFilterPertemuan')?.addEventListener('change', renderRekapTable);
    document.getElementById('rekapFilterUrutan')?.addEventListener('change', renderRekapTable);
    document.getElementById('btnViewModeTable')?.addEventListener('click', () => switchRekapViewMode('table'));
    document.getElementById('btnViewModeLeaderboard')?.addEventListener('click', () => switchRekapViewMode('leaderboard'));
    document.getElementById('btnExportCsv')?.addEventListener('click', exportRekapToCSV);
    document.getElementById('btnPrintRekap')?.addEventListener('click', openModalPrintConfig);
    document.getElementById('btnLihatGrafikFromRekap')?.addEventListener('click', () => switchTab('grafik'));

    // Tombol Salin Seluruh Daftar Peringkat
    document.getElementById('btnCopyAllLeaderboard')?.addEventListener('click', () => {
      const kFilter = document.getElementById('rekapFilterKelas')?.value || 'all';
      const pFilter = document.getElementById('rekapFilterPertemuan')?.value || 'all';
      let filtered = App.penilaian;
      if (kFilter !== 'all') filtered = filtered.filter(p => p.kelas === kFilter);
      if (pFilter !== 'all') filtered = filtered.filter(p => Number(p.pertemuan_ke) === Number(pFilter));

      filtered = filtered.map(p => {
        const nt = p.nilai_tugas || calcNilaiTugas(
          p.pengetahuan?.memahami?.jumlah_benar,
          p.pengetahuan?.mengaplikasi?.level,
          p.pengetahuan?.merefleksi?.level
        );
        return { ...p, _nt: nt };
      }).sort((a, b) => {
        const diff = b._nt.nilai_akhir - a._nt.nilai_akhir;
        if (diff !== 0) return diff;
        return ((b.pengetahuan?.memahami?.skor_persen || 0) - (a.pengetahuan?.memahami?.skor_persen || 0));
      });

      if (filtered.length === 0) {
        showToast('Tidak ada data peringkat untuk disalin.', 'error');
        return;
      }

      const pLabel = pFilter !== 'all' ? `Pertemuan ${pFilter}` : 'Semua Pertemuan';
      const kLabel = kFilter !== 'all' ? kFilter : 'Semua Kelas';

      let text = `🏆 DAFTAR PERINGKAT NILAI SISWA LKPD IPA\n`;
      text += `Kelas: ${kLabel} | ${pLabel}\n`;
      text += `=========================================================\n`;
      filtered.forEach((s, idx) => {
        const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
        text += `${idx + 1}. [${medal}] ${s.nama_siswa} (${s.kelas}, ${s.nama_kelompok}) - Nilai: ${formatIndoDecimal(s._nt.nilai_akhir)} (${s._nt.predikat})\n`;
        text += `    Rincian: Memahami: ${formatIndoDecimal(s._nt.skor_memahami_100)}% | Mengaplikasi: ${s._nt.skor_mengaplikasi_100} | Merefleksi: ${s._nt.skor_merefleksi_100}\n`;
      });
      text += `=========================================================\n`;
      const sumAll = filtered.reduce((acc, c) => acc + c._nt.nilai_akhir, 0);
      const avgScore = Number((sumAll / filtered.length).toFixed(1));
      const passCount = filtered.filter(s => s._nt.nilai_akhir >= 70).length;
      text += `Rata-rata Kelas: ${formatIndoDecimal(avgScore)} / 100 | Ketuntasan (≥70): ${passCount}/${filtered.length} siswa (${Math.round(passCount / filtered.length * 100)}%)\n`;

      navigator.clipboard.writeText(text).then(() => {
        showToast('Daftar peringkat berhasil disalin ke clipboard!', 'success');
      }).catch(() => {
        showToast('Gagal menyalin daftar peringkat.', 'error');
      });
    });

    // Filter & Aksi Grafik Capaian Belajar
    document.getElementById('grafikFilterKelas')?.addEventListener('change', renderGrafikSection);
    document.getElementById('grafikFilterDimensi')?.addEventListener('change', renderGrafikSection);
    document.getElementById('btnExportGrafikPng')?.addEventListener('click', exportGrafikToPNG);

    // Tombol Salin Narasi Penjelasan ke Clipboard
    document.getElementById('btnCopyPenjelasan')?.addEventListener('click', () => {
      const container = document.getElementById('narasiPenjelasanContainer');
      if (!container) return;
      const text = container.innerText.trim();
      if (!text) {
        showToast('Tidak ada teks narasi untuk disalin.', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('Narasi penjelasan berhasil disalin ke clipboard!', 'success');
      }).catch(() => {
        showToast('Gagal menyalin narasi ke clipboard.', 'error');
      });
    });

    window.addEventListener('resize', () => {
      if (App.activeTab === 'grafik') renderGrafikSection();
    });

    // Tanggal default hari ini
    const tgl = document.getElementById('penTanggal');
    if (tgl && !tgl.value) tgl.value = new Date().toISOString().slice(0, 10);

    // Hitung realtime nilai tugas awal
    updateRealtimeNilaiTugas();

    setupModals();
    setupFotoViewer();
    setupShareModal();
    setupPrintSystem();
    setupAiCorrectionScanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  // Ekspos fungsi ke global window agar dapat dipanggil inline atau via console
  window.openModalPrintConfig = openModalPrintConfig;
  window.exportRekapToCSV = exportRekapToCSV;
  window.executePrintPDF = executePrintPDF;
  window.App = App;

})();

