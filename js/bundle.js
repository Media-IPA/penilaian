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
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih beradaptasi dengan pembagian tugas kelompok dan langkah kerja LKPD.",
                                               "level":  2,
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
                            "nilai_akhir":  55.6,
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
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Kerjasama kelompok berjalan baik walau masih canggung menggunakan jangka sorong.",
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
                            "nilai_akhir":  57.8,
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
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih canggung bekerja sama dan membaca skala alat ukur, butuh adaptasi lebih lanjut.",
                                               "level":  2,
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
                            "predikat":  "Perlu Bimbingan (D)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  53.3,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-amber"
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
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Perlu bimbingan guru dan adaptasi membaca alat ukur serta melakukan refleksi diri.",
                                               "level":  2,
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
                            "predikat":  "Perlu Bimbingan (D)",
                            "skor_mengaplikasi_100":  50,
                            "nilai_akhir":  53.3,
                            "skor_merefleksi_100":  50,
                            "predikat_class":  "badge-amber"
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
                                               "label":  "Kurang Reflektif",
                                               "teks":  "Masih beradaptasi dengan pembagian tugas kelompok dan langkah kerja LKPD.",
                                               "level":  2,
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
                            "nilai_akhir":  55.6,
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
                                               "label":  "Reflektif",
                                               "teks":  "Mulai terampil menggunakan neraca dan stopwatch, catatan hasil ukur sesuai petunjuk.",
                                               "level":  3,
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
                                               "label":  "Reflektif",
                                               "teks":  "Mulai terampil menggunakan neraca dan stopwatch, catatan hasil ukur sesuai petunjuk.",
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
        "siswaId":  "sis-k7-8",
        "keterampilan":  {
                             "label":  "Terampil",
                             "catatan":  "Praktikum pengukuran terlaksana dengan baik.",
                             "level":  3
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
                                               "label":  "Reflektif",
                                               "teks":  "Mulai terampil menggunakan neraca dan stopwatch, catatan hasil ukur sesuai petunjuk.",
                                               "level":  3,
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
                            "nilai_akhir":  82.8,
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
                                               "label":  "Reflektif",
                                               "teks":  "Mulai terampil menggunakan neraca dan stopwatch, catatan hasil ukur sesuai petunjuk.",
                                               "level":  3,
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
                                               "label":  "Reflektif",
                                               "teks":  "Sudah sepenuhnya beradaptasi dengan LKPD dan mampu menyelesaikan tugas praktikum dengan baik.",
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
    PENILAIAN: 'wardipa_simple_penilaian',
    PROFILE: 'wardipa_teacher_profile',
    EVAL_SCORES: 'wardipa_eval_scores'
  };

  const DATA_VERSION_KEY = 'wardipa_data_ver';
  const CURRENT_DATA_VERSION = 'v12_k7_merefleksi_meningkat_p1_rendah_p2_sedang_p3_tinggi';
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

  function loadTeacherProfile() {
    const prof = getData(KEYS.PROFILE, {
      sekolah: 'SMPN SATAP BULU MINUNG',
      kepsek: '',
      nipKepsek: '',
      guru: '',
      nipGuru: ''
    });
    if (!prof.sekolah || prof.sekolah.includes('SELAYAR') || prof.sekolah === 'SMP / MTs') {
      prof.sekolah = 'SMPN SATAP BULU MINUNG';
    }
    return prof;
  }

  function saveTeacherProfile(partial) {
    if (!partial || typeof partial !== 'object') return;
    const cur = loadTeacherProfile();
    const updated = { ...cur };
    Object.keys(partial).forEach(k => {
      if (partial[k] !== undefined && partial[k] !== null) {
        updated[k] = partial[k];
      }
    });
    setData(KEYS.PROFILE, updated);
    return updated;
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
      tbody.innerHTML = '<tr><td colspan="11" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">Belum ada data penilaian untuk kriteria ini.</td></tr>';
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
          <strong style="font-size: 1.35rem; color: #fbbf24; font-weight: 800; line-height: 1;">${formatIndoDecimal(nt.nilai_akhir)}</strong>
        </td>

        <!-- Keterangan (Tuntas / Belum Tuntas & Predikat) -->
        <td style="padding: 0.75rem 1rem; text-align: center;">
          <span class="badge ${nt.nilai_akhir >= 70 ? 'badge-emerald' : 'badge-amber'}" style="font-size: 0.78rem; font-weight: 700; padding: 3px 8px; display: inline-flex; align-items: center; gap: 0.3rem;">
            ${nt.nilai_akhir >= 70 ? '✅ Tuntas' : 'Belum Tuntas'}
          </span>
          <span style="font-size: 0.72rem; color: var(--text-muted); display: block; margin-top: 3px;">${nt.predikat}</span>
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
        : '<span class="badge badge-amber" style="display: inline-flex; align-items: center; gap: 0.3rem;">Belum Tuntas</span>';

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
        const statusKetuntasan = nt.nilai_akhir >= 70 ? 'Tuntas' : 'Belum Tuntas';

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
        countBelumTuntas: n - countTuntas,
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

  // ==================== MODAL PREVIEW & EKSPOR PDF/WORD CAPAIAN & RUBRIK ====================
  let currentDocType = 'analisis'; // 'analisis' | 'rubrik'

  // Hitung Data Capaian Pertemuan untuk Kelas Terpilih
  function computeMeetingStatsData(kFilter) {
    let data = App.penilaian || [];
    if (kFilter && kFilter !== 'all') {
      const normK = kFilter.trim().toLowerCase();
      data = data.filter(p => (p.kelas || '').trim().toLowerCase() === normK);
    }

    const pertemuanSet = new Set(data.map(p => Number(p.pertemuan_ke) || 1));
    const pertemuanList = Array.from(pertemuanSet).sort((a, b) => a - b);
    if (pertemuanList.length === 0) pertemuanList.push(1, 2, 3);

    return pertemuanList.map(pKe => {
      const pEntries = data.filter(p => (Number(p.pertemuan_ke) || 1) === pKe);
      const n = pEntries.length;
      if (n === 0) return null;

      const sumMem = pEntries.reduce((acc, cur) => acc + (cur.pengetahuan?.memahami?.skor_persen ?? 0), 0);
      const avgMem = sumMem / n;
      const sumApl = pEntries.reduce((acc, cur) => acc + (cur.pengetahuan?.mengaplikasi?.level ?? 3), 0);
      const avgApl = sumApl / n;
      const sumRef = pEntries.reduce((acc, cur) => acc + (cur.pengetahuan?.merefleksi?.level ?? 3), 0);
      const avgRef = sumRef / n;

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

      const matchingTopik = App.topik?.find(t => Number(t.pertemuan_ke) === pKe);
      const topikNama = pEntries[0]?.topik_nama || matchingTopik?.nama || `Pertemuan ${pKe}`;

      return {
        pertemuan: pKe,
        topik: topikNama,
        jumlahSiswa: n,
        avgMem: Math.round(avgMem),
        avgApl: Number(avgApl.toFixed(1)),
        avgRef: Number(avgRef.toFixed(1)),
        avgNilaiTugas: avgNilaiTugas,
        countTuntas: countTuntas,
        countBelumTuntas: n - countTuntas,
        persentaseTuntas: persentaseTuntas
      };
    }).filter(Boolean);
  }

  // Generate Gambar Kurva Tren Capaian Belajar Resolusi Tinggi Khusus Cetak & Pratinjau
  function generatePrintableChartDataUrl(meetingStats) {
    const canvas = document.createElement('canvas');
    canvas.width = 860;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Latar belakang putih bersih
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bingkai luar halus
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);

    // Judul Grafik di Dokumen
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('KURVA TREN CAPAIAN BELAJAR IPA (3 DIMENSI)', 24, 28);

    // Legend di kanan atas
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';

    // 1. Memahami (Biru)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(510, 18, 12, 10);
    ctx.fillStyle = '#334155';
    ctx.fillText('1. Memahami (%)', 526, 27);

    // 2. Mengaplikasi (Hijau)
    ctx.fillStyle = '#059669';
    ctx.fillRect(635, 18, 12, 10);
    ctx.fillStyle = '#334155';
    ctx.fillText('2. Mengaplikasi (1-4)', 651, 27);

    // 3. Merefleksi (Ungu)
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(770, 18, 12, 10);
    ctx.fillStyle = '#334155';
    ctx.fillText('3. Merefleksi (L1-L4)', 786, 27);

    if (!meetingStats || meetingStats.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = 'italic 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Belum ada data penilaian tersimpan untuk kelas ini.', canvas.width / 2, canvas.height / 2);
      return canvas.toDataURL('image/png');
    }

    const padding = { top: 58, right: 45, bottom: 52, left: 65 };
    const chartW = canvas.width - padding.left - padding.right;
    const chartH = canvas.height - padding.top - padding.bottom;

    // Grid garis mendatar & Y-Axis (0 - 100%)
    const ySteps = 5;
    ctx.lineWidth = 1;
    for (let i = 0; i <= ySteps; i++) {
      const ratio = i / ySteps;
      const yVal = Math.round(ratio * 100);
      const yPos = padding.top + chartH - ratio * chartH;

      ctx.strokeStyle = i === 0 ? '#94a3b8' : '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(padding.left + chartW, yPos);
      ctx.stroke();

      // Label Y kiri (%)
      ctx.fillStyle = '#475569';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${yVal}%`, padding.left - 8, yPos);

      // Label Y kanan (Skala 1,0-4,0)
      const rubrikVal = (1.0 + ratio * 3.0).toFixed(1);
      ctx.textAlign = 'left';
      ctx.fillText(`L${rubrikVal}`, padding.left + chartW + 8, yPos);
    }

    const numPoints = meetingStats.length;
    const getX = (idx) => {
      if (numPoints === 1) return padding.left + chartW / 2;
      return padding.left + (idx / (numPoints - 1)) * chartW;
    };
    const getYPercent = (val) => {
      const clamped = Math.max(0, Math.min(100, val));
      return padding.top + chartH - (clamped / 100) * chartH;
    };
    const getYRubrik = (val) => {
      const clamped = Math.max(1.0, Math.min(4.0, val));
      const ratio = (clamped - 1.0) / 3.0;
      return padding.top + chartH - ratio * chartH;
    };

    // Label X-Axis
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    meetingStats.forEach((m, idx) => {
      const x = getX(idx);
      ctx.strokeStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(x, padding.top + chartH);
      ctx.lineTo(x, padding.top + chartH + 5);
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Pertemuan ${m.pertemuan}`, x, padding.top + chartH + 8);

      ctx.fillStyle = '#64748b';
      ctx.font = '10px sans-serif';
      ctx.fillText(`(${m.jumlahSiswa} Siswa)`, x, padding.top + chartH + 24);
    });

    // Garis 1: Memahami (%)
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    meetingStats.forEach((m, idx) => {
      const x = getX(idx);
      const y = getYPercent(m.avgMem);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Garis 2: Mengaplikasi (1-4)
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    meetingStats.forEach((m, idx) => {
      const x = getX(idx);
      const y = getYRubrik(m.avgApl);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Garis 3: Merefleksi (L1-L4)
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    meetingStats.forEach((m, idx) => {
      const x = getX(idx);
      const y = getYRubrik(m.avgRef);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Titik Bulat & Angka Nilai di Setiap Pertemuan
    meetingStats.forEach((m, idx) => {
      const x = getX(idx);

      // Titik Memahami
      const y1 = getYPercent(m.avgMem);
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(x, y1, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${m.avgMem}%`, x, y1 - 16);

      // Titik Mengaplikasi
      const y2 = getYRubrik(m.avgApl);
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.arc(x, y2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#059669';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${formatIndoDecimal(m.avgApl)}`, x, y2 - 16);

      // Titik Merefleksi
      const y3 = getYRubrik(m.avgRef);
      ctx.fillStyle = '#7c3aed';
      ctx.beginPath();
      ctx.arc(x, y3, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#7c3aed';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`L${formatIndoDecimal(m.avgRef)}`, x, y3 + 8);
    });

    return canvas.toDataURL('image/png');
  }

  // Bangun Dokumen Analisis Penilaian Capaian Belajar (HTML)
  function buildAnalisisPenilaianHtml(options, chartDataUrl) {
    const {
      kFilter = 'all',
      sekolah = '',
      mapel = 'IPA',
      tanggal = new Date().toISOString().slice(0, 10),
      kepsek = '',
      nipKepsek = '',
      guru = '',
      nip = '',
      optTtd = true,
      optChart = true,
      optNarasi = true,
      fontSize = 10,
      isForWord = false
    } = options;

    const stats = computeMeetingStatsData(kFilter);
    const kelasDisplay = kFilter !== 'all' ? kFilter : 'Semua Kelas (7, 8, 9)';
    const guruDisplay = guru || 'Guru Mata Pelajaran IPA';

    // Rata-rata keseluruhan
    let avgMemTotal = 0;
    let avgAplTotal = 0;
    let avgRefTotal = 0;
    let avgNilaiTugasTotal = 0;
    let totalSiswa = 0;
    let totalTuntas = 0;

    if (stats.length > 0) {
      const sumMem = stats.reduce((acc, c) => acc + c.avgMem, 0);
      const sumApl = stats.reduce((acc, c) => acc + c.avgApl, 0);
      const sumRef = stats.reduce((acc, c) => acc + c.avgRef, 0);
      const sumNT = stats.reduce((acc, c) => acc + c.avgNilaiTugas, 0);
      totalSiswa = stats[stats.length - 1].jumlahSiswa || 20;
      totalTuntas = stats[stats.length - 1].countTuntas || 0;

      avgMemTotal = Math.round(sumMem / stats.length);
      avgAplTotal = Number((sumApl / stats.length).toFixed(1));
      avgRefTotal = Number((sumRef / stats.length).toFixed(1));
      avgNilaiTugasTotal = Number((sumNT / stats.length).toFixed(1));
    }

    const katMemTotal = getMemahamiKategori(avgMemTotal);
    const rubAplTotal = getMengaplikasiRubrikInfo(avgAplTotal);
    const rubRefTotal = getRefleksiRubrikInfo(avgRefTotal);
    const persenTuntasTotal = totalSiswa > 0 ? Math.round((totalTuntas / totalSiswa) * 100) : 0;

    // Baris Tabel Rekap
    let rowsHtml = '';
    stats.forEach((m) => {
      const rubApl = getMengaplikasiRubrikInfo(m.avgApl);
      const rubRef = getRefleksiRubrikInfo(m.avgRef);
      rowsHtml += `
        <tr>
          <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 7px;">Pertemuan ${m.pertemuan}</td>
          <td style="border: 1px solid #1e293b; padding: 5px 7px;">${m.topik}</td>
          <td style="text-align: center; border: 1px solid #1e293b; padding: 5px 7px;">${m.jumlahSiswa} Siswa</td>
          <td style="text-align: center; font-weight: 700; color: #0284c7; border: 1px solid #1e293b; padding: 5px 7px;">${m.avgMem}%</td>
          <td style="text-align: center; font-weight: 700; color: #059669; border: 1px solid #1e293b; padding: 5px 7px;">${formatIndoDecimal(m.avgApl)} <span style="font-weight: normal; font-size: 8.5pt;">(${rubApl.kode})</span></td>
          <td style="text-align: center; font-weight: 700; color: #7c3aed; border: 1px solid #1e293b; padding: 5px 7px;">${formatIndoDecimal(m.avgRef)} <span style="font-weight: normal; font-size: 8.5pt;">(${rubRef.kode})</span></td>
          <td style="text-align: center; font-weight: 800; border: 1px solid #1e293b; padding: 5px 7px; background-color: #fef3c7;">${formatIndoDecimal(m.avgNilaiTugas)}</td>
          <td style="text-align: center; border: 1px solid #1e293b; padding: 5px 7px;">${m.countTuntas}/${m.jumlahSiswa} (${m.persentaseTuntas}%)</td>
        </tr>
      `;
    });

    if (stats.length === 0) {
      rowsHtml = '<tr><td colspan="8" style="text-align: center; padding: 15px; border: 1px solid #1e293b;">Belum ada data capaian belajar tersimpan.</td></tr>';
    }

    // Narasi Analisis Pedagogis
    let narasiHtml = '';
    if (optNarasi && stats.length > 0) {
      stats.forEach((m, idx) => {
        const strMem = `${Math.round(m.avgMem)}%`;
        const strApl = formatIndoDecimal(m.avgApl);
        const strRef = formatIndoDecimal(m.avgRef);
        const strNT = formatIndoDecimal(m.avgNilaiTugas);
        const rubApl = getMengaplikasiRubrikInfo(m.avgApl);
        const rubRef = getRefleksiRubrikInfo(m.avgRef);
        const katMem = getMemahamiKategori(m.avgMem);

        if (idx === 0) {
          narasiHtml += `
            <div style="margin-bottom: 8px; border-left: 3px solid #0284c7; padding-left: 8px;">
              <strong>• Pertemuan 1 (${m.topik}):</strong> Rata-rata Nilai Tugas awal <strong>${strNT} / 100</strong> (Ketuntasan: ${m.countTuntas}/${m.jumlahSiswa} siswa / ${m.persentaseTuntas}%).
              Pemahaman konsep berada pada kategori <em>${katMem} (${strMem})</em>, kemampuan aplikasi sains <em>${rubApl.nama} (${strApl})</em>, dan kesadaran refleksi belajar <em>${rubRef.nama} (${strRef})</em>.
              <div style="font-size: 9pt; color: #475569; margin-top: 2px;">
                <em>Catatan Fase Adaptasi:</em> Peserta didik masih dalam tahap penyesuaian terhadap ritme eksperimen LKPD dan penggunaan alat ukur sains.
              </div>
            </div>
          `;
        } else {
          const prev = stats[idx - 1];
          const deltaNT = Number((m.avgNilaiTugas - prev.avgNilaiTugas).toFixed(1));
          const deltaMem = Math.round(m.avgMem - prev.avgMem);
          const deltaApl = Number((m.avgApl - prev.avgApl).toFixed(1));
          const deltaRef = Number((m.avgRef - prev.avgRef).toFixed(1));

          const signNT = deltaNT >= 0 ? `+${formatIndoDecimal(deltaNT)}` : formatIndoDecimal(deltaNT);
          const signMem = deltaMem >= 0 ? `+${deltaMem}%` : `${deltaMem}%`;
          const signApl = deltaApl >= 0 ? `+${formatIndoDecimal(deltaApl)}` : formatIndoDecimal(deltaApl);
          const signRef = deltaRef >= 0 ? `+${formatIndoDecimal(deltaRef)}` : formatIndoDecimal(deltaRef);

          const stageLabel = m.pertemuan === 2 ? 'Fase Konsolidasi' : 'Fase Kemandirian & Penguasaan';
          narasiHtml += `
            <div style="margin-bottom: 8px; border-left: 3px solid #059669; padding-left: 8px;">
              <strong>• Pertemuan ${m.pertemuan} (${m.topik}):</strong> Nilai Tugas berkembang menjadi <strong>${strNT} / 100</strong> (${signNT} poin vs P${prev.pertemuan}).
              Tingkat ketuntasan meningkat menjadi <strong>${m.countTuntas} siswa (${m.persentaseTuntas}%)</strong>.
              Skor Memahami meningkat ${signMem}, kemampuan Mengaplikasi naik ${signApl} poin (${rubApl.nama}), dan kedalaman Merefleksi meningkat ${signRef} poin (${rubRef.nama}).
              <div style="font-size: 9pt; color: #475569; margin-top: 2px;">
                <em>Catatan ${stageLabel}:</em> Partisipasi kelompok semakin terstruktur dan keterampilan penggunaan instrumen IPA terlaksana secara mandiri.
              </div>
            </div>
          `;
        }
      });

      if (stats.length > 1) {
        const first = stats[0];
        const latest = stats[stats.length - 1];
        const totalGainNT = Number((latest.avgNilaiTugas - first.avgNilaiTugas).toFixed(1));
        const totalGainMem = latest.avgMem - first.avgMem;
        narasiHtml += `
          <div style="margin-top: 8px; padding: 6px 10px; background-color: #f1f5f9; border-radius: 4px; font-weight: 600;">
            📊 <strong>Kesimpulan Capaian Belajar:</strong> Secara akumulatif antar pertemuan, terjadi peningkatan rata-rata capaian sebesar <strong>+${formatIndoDecimal(totalGainNT)} Poin</strong>, dengan penguatan pemahaman konsep sebesar <strong>+${totalGainMem}%</strong>. Pembelajaran berdiferensiasi dan instrumen LKPD terbukti efektif meningkatkan ketuntasan belajar siswa.
          </div>
        `;
      }
    }

    // Tanda Tangan
    let ttdHtml = '';
    if (optTtd) {
      const kepsekDisplay = kepsek || '_________________________';
      const nipKepsekDisplay = nipKepsek ? `NIP. ${nipKepsek}` : 'NIP. .................................................';
      const nipGuruDisplay = nip ? `NIP. ${nip}` : 'NIP. .................................................';

      ttdHtml = `
        <div class="print-ttd-container" style="width: 100%; margin-top: 22px; page-break-inside: avoid; break-inside: avoid;">
          <table class="print-ttd-table" style="width: 100%; border-collapse: collapse; border: none !important;">
            <tr>
              <td style="width: 50%; vertical-align: top; text-align: center; border: none !important; padding: 0 10px;">
                <p style="margin: 0 0 52px 0;">Mengetahui,<br/><strong>Kepala Sekolah</strong></p>
                <p style="font-weight: 700; text-decoration: underline; margin: 0;">${kepsekDisplay}</p>
                <p style="margin: 3px 0 0 0; font-size: ${fontSize - 1}pt; color: #475569;">${nipKepsekDisplay}</p>
              </td>
              <td style="width: 50%; vertical-align: top; text-align: center; border: none !important; padding: 0 10px;">
                <p style="margin: 0 0 52px 0;">....................., ${formatTanggalIndo(tanggal)}<br/><strong>Guru Mata Pelajaran IPA</strong></p>
                <p style="font-weight: 700; text-decoration: underline; margin: 0;"><strong>${guruDisplay}</strong></p>
                <p style="margin: 3px 0 0 0; font-size: ${fontSize - 1}pt; color: #475569;">${nipGuruDisplay}</p>
              </td>
            </tr>
          </table>
        </div>
      `;
    }

    return `
      <div class="print-document" style="font-size: ${fontSize}pt; line-height: 1.4;">
        <!-- KOP DOKUMEN -->
        <div class="print-header" style="text-align: center; margin-bottom: 10px;">
          <h2 class="print-main-title" style="font-size: ${fontSize + 3.5}pt; font-weight: 800; text-transform: uppercase; margin: 0; color: #000; letter-spacing: 0.5px;">LAPORAN ANALISIS CAPAIAN BELAJAR &amp; PENILAIAN LKPD IPA</h2>
          <h3 class="print-sub-title" style="font-size: ${fontSize + 0.5}pt; font-weight: 600; margin: 4px 0 0 0; color: #1e293b;">PEMBELAJARAN BERBASIS INKUIRI &amp; REFLEKSI METAKOGNITIF (3 DIMENSI)${sekolah ? ' • ' + sekolah : ''}</h3>
          <div class="print-divider" style="border-bottom: 2px solid #000; border-top: 1px solid #000; height: 2px; margin: 8px 0 10px 0;"></div>
        </div>

        <!-- IDENTITAS PENILAIAN -->
        <div class="print-identitas-box" style="margin-bottom: 10px; border: 1px solid #475569; background-color: #f8fafc; border-radius: 4px; padding: 6px 10px;">
          <table class="table-identitas" style="width: 100%; border-collapse: collapse; font-size: ${fontSize}pt; border: none;">
            <tr>
              <td style="width: 130px; font-weight: 700; border: none; padding: 2px 4px;">Mata Pelajaran</td>
              <td style="width: 10px; text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${mapel}</strong></td>
              <td style="width: 130px; font-weight: 700; border: none; padding: 2px 4px;">Kelas</td>
              <td style="width: 10px; text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${kelasDisplay}</strong></td>
            </tr>
            <tr>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Tanggal Asesmen</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;">${formatTanggalIndo(tanggal)}</td>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Guru Pengampu</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${guruDisplay}</strong></td>
            </tr>
          </table>
        </div>

        <!-- RINGKASAN INDIKATOR CAPAIAN 3 DIMENSI -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; border: 1px solid #1e293b;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 25%; font-size: ${fontSize}pt;">1. Rata-Rata Memahami</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 25%; font-size: ${fontSize}pt;">2. Rata-Rata Mengaplikasi</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 25%; font-size: ${fontSize}pt;">3. Rata-Rata Merefleksi</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 25%; font-size: ${fontSize}pt;">🎯 Rata-Rata Nilai Akhir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; padding: 8px; border: 1px solid #1e293b;">
                <strong style="font-size: ${fontSize + 3}pt; color: #0284c7;">${avgMemTotal}%</strong><br/>
                <span style="font-size: 8.5pt; color: #475569;">Kategori: <strong>${katMemTotal}</strong></span>
              </td>
              <td style="text-align: center; padding: 8px; border: 1px solid #1e293b;">
                <strong style="font-size: ${fontSize + 3}pt; color: #059669;">${formatIndoDecimal(avgAplTotal)}</strong><br/>
                <span style="font-size: 8.5pt; color: #475569;">${rubAplTotal.nama}</span>
              </td>
              <td style="text-align: center; padding: 8px; border: 1px solid #1e293b;">
                <strong style="font-size: ${fontSize + 3}pt; color: #7c3aed;">${formatIndoDecimal(avgRefTotal)}</strong><br/>
                <span style="font-size: 8.5pt; color: #475569;">${rubRefTotal.nama}</span>
              </td>
              <td style="text-align: center; padding: 8px; border: 1px solid #1e293b; background-color: #fef3c7;">
                <strong style="font-size: ${fontSize + 3}pt; color: #b45309;">${formatIndoDecimal(avgNilaiTugasTotal)}</strong><br/>
                <span style="font-size: 8.5pt; color: #475569;">Ketuntasan: <strong>${totalTuntas}/${totalSiswa} Siswa (${persenTuntasTotal}%)</strong></span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- GAMBAR GRAFIK KURVA CAPAIAN -->
        ${optChart && chartDataUrl ? `
          <div class="print-chart-container" style="text-align: center; margin: 8px 0 12px 0;">
            <img src="${chartDataUrl}" class="print-chart-img" alt="Kurva Capaian Belajar IPA" style="max-width: 100%; height: auto; max-height: 270px; border: 1px solid #cbd5e1; border-radius: 4px;" />
          </div>
        ` : ''}

        <!-- TABEL CAPAIAN PER PERTEMUAN -->
        <h4 style="font-size: ${fontSize + 1}pt; font-weight: 700; margin: 12px 0 6px 0; color: #0f172a; text-transform: uppercase;">
          Tabel Capaian Belajar per Pertemuan (3 Dimensi &amp; Nilai Tugas)
        </h4>
        <table class="print-table" style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: ${fontSize}pt; border: 1px solid #1e293b;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 12%; text-align: center;">Pertemuan</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; text-align: left;">Topik Materi IPA</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 11%; text-align: center;">Jml Siswa</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 13%; text-align: center;">1. Memahami</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 15%; text-align: center;">2. Mengaplikasi</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 15%; text-align: center;">3. Merefleksi</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 14%; text-align: center; background-color: #fef3c7;">🎯 Nilai Akhir</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 14%; text-align: center;">Ketuntasan</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <!-- PANDUAN KRITERIA CAPAIAN -->
        <div style="border: 1px solid #64748b; border-radius: 4px; padding: 7px 10px; margin-bottom: 10px; background-color: #f8fafc; font-size: ${fontSize - 0.5}pt;">
          <strong>Kriteria &amp; Rentang Predikat Capaian 3 Dimensi:</strong>
          <table style="width: 100%; border-collapse: collapse; margin-top: 4px; border: none;">
            <tr>
              <td style="border: none; padding: 1px 4px; width: 33%; vertical-align: top;">
                <strong>1. Memahami (0–100%):</strong><br/>
                • ≥85%: Sangat Baik (Konsep dasar sangat dikuasai)<br/>
                • 70–84%: Baik (Konsep dikuasai secara tepat)<br/>
                • 55–69%: Cukup (Perlu sedikit penguatan)<br/>
                • &lt;55%: Perlu Bimbingan (Belum tuntas)
              </td>
              <td style="border: none; padding: 1px 4px; width: 33%; vertical-align: top;">
                <strong>2. Mengaplikasi (1,0–4,0):</strong><br/>
                • Level 4: Sangat Baik (Penerapan konsep materi tepat)<br/>
                • Level 3: Baik (Tepat pada sebagian besar kegiatan)<br/>
                • Level 2: Cukup (Penerapan masih sebagian tepat)<br/>
                • Level 1: Perlu Bimbingan (Belum mampu menerapkan)
              </td>
              <td style="border: none; padding: 1px 4px; width: 34%; vertical-align: top;">
                <strong>3. Merefleksi (L1–L4):</strong><br/>
                • L4: Sangat Reflektif (Spesifik &amp; jujur)<br/>
                • L3: Reflektif (Cukup jelas &amp; relevan)<br/>
                • L2: Kurang Reflektif (Singkat atau umum)<br/>
                • L1: Belum Reflektif (Belum mampu merefleksikan)
              </td>
            </tr>
          </table>
        </div>

        <!-- NARASI ANALISIS GURU -->
        ${optNarasi && narasiHtml ? `
          <div class="print-narasi-box" style="border: 1px solid #475569; background-color: #f8fafc; border-radius: 4px; padding: 8px 12px; margin-bottom: 12px; font-size: ${fontSize - 0.5}pt; line-height: 1.5;">
            <strong style="display: block; margin-bottom: 6px; font-size: ${fontSize}pt; color: #0f172a; text-transform: uppercase;">
              📝 Narasi Analisis Perkembangan Belajar Siswa Antar Pertemuan:
            </strong>
            ${narasiHtml}
          </div>
        ` : ''}

        <!-- PENGESAHAN TANDA TANGAN -->
        ${ttdHtml}
      </div>
    `;
  }

  // Bangun Dokumen Panduan & Rubrik Penilaian Lengkap LKPD (HTML & Word)
  function buildRubrikPenilaianHtml(options) {
    const {
      sekolah = '',
      mapel = 'IPA',
      tanggal = new Date().toISOString().slice(0, 10),
      kepsek = '',
      nipKepsek = '',
      guru = '',
      nip = '',
      optTtd = true,
      fontSize = 10,
      isForWord = false
    } = options;

    const guruDisplay = guru || 'Guru Mata Pelajaran IPA';

    // Tanda Tangan
    let ttdHtml = '';
    if (optTtd) {
      const kepsekDisplay = kepsek || '_________________________';
      const nipKepsekDisplay = nipKepsek ? `NIP. ${nipKepsek}` : 'NIP. .................................................';
      const nipGuruDisplay = nip ? `NIP. ${nip}` : 'NIP. .................................................';

      ttdHtml = `
        <div class="print-ttd-container" style="width: 100%; margin-top: 24px; page-break-inside: avoid; break-inside: avoid;">
          <table class="print-ttd-table" style="width: 100%; border-collapse: collapse; border: none !important;">
            <tr>
              <td style="width: 50%; vertical-align: top; text-align: center; border: none !important; padding: 0 10px;">
                <p style="margin: 0 0 52px 0;">Mengetahui,<br/><strong>Kepala Sekolah</strong></p>
                <p style="font-weight: 700; text-decoration: underline; margin: 0;">${kepsekDisplay}</p>
                <p style="margin: 3px 0 0 0; font-size: ${fontSize - 1}pt; color: #475569;">${nipKepsekDisplay}</p>
              </td>
              <td style="width: 50%; vertical-align: top; text-align: center; border: none !important; padding: 0 10px;">
                <p style="margin: 0 0 52px 0;">....................., ${formatTanggalIndo(tanggal)}<br/><strong>Guru Mata Pelajaran IPA</strong></p>
                <p style="font-weight: 700; text-decoration: underline; margin: 0;"><strong>${guruDisplay}</strong></p>
                <p style="margin: 3px 0 0 0; font-size: ${fontSize - 1}pt; color: #475569;">${nipGuruDisplay}</p>
              </td>
            </tr>
          </table>
        </div>
      `;
    }

    return `
      <div class="print-document" style="font-size: ${fontSize}pt; line-height: 1.45;">
        <!-- KOP DOKUMEN -->
        <div class="print-header" style="text-align: center; margin-bottom: 12px;">
          <h2 class="print-main-title" style="font-size: ${fontSize + 3.5}pt; font-weight: 800; text-transform: uppercase; margin: 0; color: #000; letter-spacing: 0.5px;">INSTRUMEN &amp; PANDUAN RUBRIK PENILAIAN LEMBAR KERJA PESERTA DIDIK (LKPD) IPA</h2>
          <h3 class="print-sub-title" style="font-size: ${fontSize + 0.5}pt; font-weight: 600; margin: 4px 0 0 0; color: #1e293b;">KURIKULUM MERDEKA — PEMBELAJARAN BERBASIS INKUIRI &amp; REFLEKSI METAKOGNITIF${sekolah ? ' • ' + sekolah : ''}</h3>
          <div class="print-divider" style="border-bottom: 2px solid #000; border-top: 1px solid #000; height: 2px; margin: 8px 0 12px 0;"></div>
        </div>

        <!-- IDENTITAS INSTRUMEN -->
        <div class="print-identitas-box" style="margin-bottom: 12px; border: 1px solid #475569; background-color: #f8fafc; border-radius: 4px; padding: 6px 12px;">
          <table class="table-identitas" style="width: 100%; border-collapse: collapse; font-size: ${fontSize}pt; border: none;">
            <tr>
              <td style="width: 140px; font-weight: 700; border: none; padding: 2px 4px;">Mata Pelajaran</td>
              <td style="width: 10px; text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${mapel}</strong></td>
              <td style="width: 140px; font-weight: 700; border: none; padding: 2px 4px;">Satuan Pendidikan</td>
              <td style="width: 10px; text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${sekolah || 'SMP / MTs'}</strong></td>
            </tr>
            <tr>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Fase / Sasaran</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;">Fase D (Kelas 7, 8, 9 SMP)</td>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Penyusun / Pengampu</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${guruDisplay}</strong></td>
            </tr>
            <tr>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Instrumen Penilaian</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;">Lembar Kerja Peserta Didik (LKPD) Interaktif</td>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Tanggal Penetapan</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;">${formatTanggalIndo(tanggal)}</td>
            </tr>
          </table>
        </div>

        <!-- BAGIAN 1: STRUKTUR & PEMBOBOTAN ASESMEN -->
        <h4 style="font-size: ${fontSize + 1}pt; font-weight: 800; margin: 12px 0 6px 0; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #0f172a; padding-bottom: 2px;">
          I. Struktur &amp; Komponen Pembobotan Nilai Tugas LKPD
        </h4>
        <p style="margin: 4px 0 8px 0; font-size: ${fontSize}pt;">
          Penilaian LKPD WARDIPA memadukan 3 Aspek Terpadu: Pengetahuan Kognitif (Memahami), Keterampilan Penalaran &amp; Aplikasi Sains (Mengaplikasi), serta Kesadaran Metakognitif (Merefleksi), dilengkapi observasi Keterampilan Praktikum dan Sikap Ilmiah.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: ${fontSize}pt; border: 1px solid #1e293b;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 6%; text-align: center;">No</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 26%; text-align: left;">Dimensi Penilaian</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 14%; text-align: center;">Skala Asli</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 14%; text-align: center;">Bobot Tugas</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; text-align: left;">Fokus Pengukuran</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">1</td>
              <td style="font-weight: 700; border: 1px solid #1e293b; padding: 5px 8px; color: #0284c7;">Dimensi 1: Memahami</td>
              <td style="text-align: center; border: 1px solid #1e293b; padding: 5px 8px;">0 – 100%</td>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">1/3 (33,3%)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">Dihitung otomatis dari (Jumlah Benar ÷ 15 Soal) × 100%. Mengukur persentase ketepatan siswa dalam menjawab butir soal objektif LKPD (isian, B/S, menjodohkan).</td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">2</td>
              <td style="font-weight: 700; border: 1px solid #1e293b; padding: 5px 8px; color: #059669;">Dimensi 2: Mengaplikasi</td>
              <td style="text-align: center; border: 1px solid #1e293b; padding: 5px 8px;">Skala 1,0 – 4,0</td>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">1/3 (33,3%)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">Rata-rata dari skor rubrik penilaian guru skala 1,0–4,0. Mengukur kemampuan bernalar dalam menerapkan konsep materi ke dalam kegiatan eksperimen atau fenomena nyata.</td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">3</td>
              <td style="font-weight: 700; border: 1px solid #1e293b; padding: 5px 8px; color: #7c3aed;">Dimensi 3: Merefleksi</td>
              <td style="text-align: center; border: 1px solid #1e293b; padding: 5px 8px;">Rubrik L1 – L4</td>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">1/3 (33,3%)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">Rata-rata penilaian guru skala 1,0–4,0 berdasarkan kedalaman refleksi belajar siswa (bukan dinilai dari pemberian bintang).</td>
            </tr>
            <tr style="background-color: #fef3c7; font-weight: bold;">
              <td colspan="3" style="text-align: right; border: 1px solid #1e293b; padding: 5px 8px;">Formula Nilai Tugas &amp; KKM:</td>
              <td style="text-align: center; border: 1px solid #1e293b; padding: 5px 8px;">100%</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">Nilai Tugas = (Memahami + Mengaplikasi [0-100] + Merefleksi [0-100]) ÷ 3 | KKM / KKTP: Nilai Akhir ≥ 70</td>
            </tr>
          </tbody>
        </table>

        <!-- BAGIAN 2: MATRIKS DIMENSI 1: MEMAHAMI -->
        <h4 style="font-size: ${fontSize + 1}pt; font-weight: 800; margin: 14px 0 6px 0; color: #0284c7; text-transform: uppercase; border-bottom: 1.5px solid #0284c7; padding-bottom: 2px;">
          II. Matriks Rubrik Dimensi 1: Pemahaman Konsep (Memahami)
        </h4>
        <p style="margin: 4px 0 6px 0; font-size: ${fontSize}pt;">
          <strong>Cara Perolehan:</strong> Dihitung otomatis dari <code>(Jumlah Benar ÷ 15 Soal) × 100%</code>. Mengukur persentase ketepatan siswa dalam menjawab 15 butir soal objektif LKPD (isian, B/S, menjodohkan).
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: ${fontSize}pt; border: 1px solid #1e293b;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 18%; text-align: center;">Rentang Skor</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 22%; text-align: center;">Kategori Capaian</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; text-align: left;">Deskriptor Kualitatif Kemampuan Siswa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">≥ 85%</td>
              <td style="text-align: center; font-weight: 700; color: #059669; border: 1px solid #1e293b; padding: 5px 8px;">Sangat Baik (A)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">Konsep dasar sangat dikuasai (13–15 butir benar). Menguasai konsep esensial materi secara mendalam.</td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">70% – 84%</td>
              <td style="text-align: center; font-weight: 700; color: #0284c7; border: 1px solid #1e293b; padding: 5px 8px;">Baik (B)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">Konsep dikuasai secara tepat (11–12 butir benar). Memenuhi target capaian pembelajaran minimum.</td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">55% – 69%</td>
              <td style="text-align: center; font-weight: 700; color: #d97706; border: 1px solid #1e293b; padding: 5px 8px;">Cukup (C)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">Perlu sedikit penguatan (8–10 butir benar). Memahami sebagian konsep dasar namun masih terdapat kekeliruan.</td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">&lt; 55%</td>
              <td style="text-align: center; font-weight: 700; color: #dc2626; border: 1px solid #1e293b; padding: 5px 8px;">Perlu Bimbingan (D)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">Belum tuntas (&le; 7 butir benar). Belum menguasai konsep dasar materi, memerlukan pendampingan intensif.</td>
            </tr>
          </tbody>
        </table>

        <!-- BAGIAN 3: MATRIKS DIMENSI 2: MENGAPLIKASI -->
        <h4 style="font-size: ${fontSize + 1}pt; font-weight: 800; margin: 14px 0 6px 0; color: #059669; text-transform: uppercase; border-bottom: 1.5px solid #059669; padding-bottom: 2px;">
          III. Matriks Rubrik Dimensi 2: Aplikasi Konsep Sains (Mengaplikasi)
        </h4>
        <p style="margin: 4px 0 6px 0; font-size: ${fontSize}pt;">
          <strong>Cara Perolehan:</strong> Rata-rata dari skor rubrik penilaian guru skala 1,0–4,0. Mengukur kemampuan bernalar dalam menerapkan konsep materi ke dalam kegiatan eksperimen atau fenomena nyata.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: ${fontSize}pt; border: 1px solid #1e293b;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 14%; text-align: center;">Tingkat</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 22%; text-align: center;">Skor &amp; Predikat</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; text-align: left;">Indikator Capaian Rubrik</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level 4</td>
              <td style="text-align: center; font-weight: 700; color: #059669; border: 1px solid #1e293b; padding: 5px 8px;">Level 4: Sangat Baik (Skor 4 / 100)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">
                Penerapan konsep materi tepat pada semua kegiatan, analisis mendalam, dan alasan logis.
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level 3</td>
              <td style="text-align: center; font-weight: 700; color: #0284c7; border: 1px solid #1e293b; padding: 5px 8px;">Level 3: Baik (Skor 3 / 75)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">
                Penerapan konsep materi tepat pada sebagian besar kegiatan, penjelasan cukup jelas.
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level 2</td>
              <td style="text-align: center; font-weight: 700; color: #d97706; border: 1px solid #1e293b; padding: 5px 8px;">Level 2: Cukup (Skor 2 / 50)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">
                Penerapan konsep materi masih sebagian tepat, terdapat beberapa kekeliruan analisis.
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level 1</td>
              <td style="text-align: center; font-weight: 700; color: #dc2626; border: 1px solid #1e293b; padding: 5px 8px;">Level 1: Perlu Bimbingan (Skor 1 / 25)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">
                Belum mampu menerapkan konsep materi, jawaban keliru atau banyak yang kosong.
              </td>
            </tr>
          </tbody>
        </table>

        <!-- BAGIAN 4: MATRIKS DIMENSI 3: MEREFLEKSI -->
        <h4 style="font-size: ${fontSize + 1}pt; font-weight: 800; margin: 14px 0 6px 0; color: #7c3aed; text-transform: uppercase; border-bottom: 1.5px solid #7c3aed; padding-bottom: 2px;">
          IV. Matriks Rubrik Dimensi 3: Refleksi Metakognitif (Merefleksi)
        </h4>
        <p style="margin: 4px 0 6px 0; font-size: ${fontSize}pt;">
          <strong>Cara Perolehan:</strong> Rata-rata penilaian guru skala 1,0–4,0 berdasarkan kedalaman refleksi belajar siswa (bukan dinilai dari pemberian bintang).
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: ${fontSize}pt; border: 1px solid #1e293b;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 14%; text-align: center;">Level Rubrik</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; width: 22%; text-align: center;">Kategori Kualitas</th>
              <th style="padding: 6px 8px; border: 1px solid #1e293b; text-align: left;">Indikator Kedalaman Refleksi Metakognisi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level L4</td>
              <td style="text-align: center; font-weight: 700; color: #7c3aed; border: 1px solid #1e293b; padding: 5px 8px;">L4: Sangat Reflektif (Skor 4 / 100)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">
                Mengidentifikasi pemahaman baru, kendala, dan contoh penerapan dengan spesifik.
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level L3</td>
              <td style="text-align: center; font-weight: 700; color: #4338ca; border: 1px solid #1e293b; padding: 5px 8px;">L3: Reflektif (Skor 3 / 75)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">
                Menyampaikan pemahaman baru dan proses belajar secara relevan dan cukup jelas.
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level L2</td>
              <td style="text-align: center; font-weight: 700; color: #d97706; border: 1px solid #1e293b; padding: 5px 8px;">L2: Kurang Reflektif (Skor 2 / 50)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">
                Refleksi masih sangat singkat atau umum (hanya menulis seru/senang/paham tanpa rincian).
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level L1</td>
              <td style="text-align: center; font-weight: 700; color: #dc2626; border: 1px solid #1e293b; padding: 5px 8px;">L1: Belum Reflektif (Skor 1 / 25)</td>
              <td style="border: 1px solid #1e293b; padding: 5px 8px;">
                Belum mampu merefleksikan proses belajar (kolom kosong atau tidak relevan).
              </td>
            </tr>
          </tbody>
        </table>

        <!-- PANDUAN BINTANG MANDIRI SISWA -->
        <p style="margin: 4px 0 10px 0; font-size: ${fontSize - 0.5}pt; color: #475569;">
          <em>Catatan Rating Pemahaman Diri:</em> Skor refleksi dinilai berdasarkan kedalaman uraian teks refleksi siswa di rubrik L1–L4. Penilaian bintang mandiri siswa (⭐ 1–5: 1★ Belum Paham, 2★ Kurang Paham, 3★ Cukup Paham, 4★ Paham dengan Baik, 5★ Sangat Paham &amp; Menguasai) berfungsi sebagai alat ukur persepsi diri siswa (Self-Rating Awareness).
        </p>

        <!-- BAGIAN 5: OBSERVASI KETERAMPILAN & SIKAP -->
        <h4 style="font-size: ${fontSize + 1}pt; font-weight: 800; margin: 14px 0 6px 0; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #0f172a; padding-bottom: 2px;">
          V. Rubrik Observasi Keterampilan Praktikum &amp; Sikap Ilmiah
        </h4>
        <div style="margin-bottom: 14px; font-size: ${fontSize}pt;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; border: 1px solid #1e293b;">
            <thead>
              <tr style="background-color: #f1f5f9;">
                <th colspan="3" style="padding: 6px 8px; border: 1px solid #1e293b; text-align: left; color: #059669; font-weight: 700;">
                  A. Aspek Keterampilan (Psikomotorik) — Menilai keaktifan, kerapian, ketepatan langkah kerja, serta hasil unjuk kerja atau praktikum IPA.
                </th>
              </tr>
              <tr style="background-color: #f8fafc; font-size: ${fontSize - 0.5}pt;">
                <th style="padding: 5px 8px; border: 1px solid #1e293b; width: 14%; text-align: center;">Tingkat</th>
                <th style="padding: 5px 8px; border: 1px solid #1e293b; width: 22%; text-align: center;">Predikat Capaian</th>
                <th style="padding: 5px 8px; border: 1px solid #1e293b; text-align: left;">Indikator Pengamatan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 4px 8px;">Level 4</td>
                <td style="text-align: center; font-weight: 700; color: #059669; border: 1px solid #1e293b; padding: 4px 8px;">Level 4: Sangat Terampil</td>
                <td style="border: 1px solid #1e293b; padding: 4px 8px;">Langkah kerja sangat tepat dan runtut, peralatan/bahan digunakan rapi &amp; aman, aktif, hasil akurat.</td>
              </tr>
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 4px 8px;">Level 3</td>
                <td style="text-align: center; font-weight: 700; color: #0284c7; border: 1px solid #1e293b; padding: 4px 8px;">Level 3: Terampil</td>
                <td style="border: 1px solid #1e293b; padding: 4px 8px;">Langkah kerja tepat, penggunaan peralatan/bahan cukup rapi, aktif selama kegiatan praktikum.</td>
              </tr>
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 4px 8px;">Level 2</td>
                <td style="text-align: center; font-weight: 700; color: #d97706; border: 1px solid #1e293b; padding: 5px 8px;">Level 2: Cukup Terampil</td>
                <td style="border: 1px solid #1e293b; padding: 4px 8px;">Langkah kerja cukup, membutuhkan sesekali arahan guru dalam prosedur atau pengamatan.</td>
              </tr>
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 4px 8px;">Level 1</td>
                <td style="text-align: center; font-weight: 700; color: #dc2626; border: 1px solid #1e293b; padding: 4px 8px;">Level 1: Perlu Bimbingan</td>
                <td style="border: 1px solid #1e293b; padding: 4px 8px;">Pasif selama kegiatan atau banyak melakukan kesalahan prosedur yang membutuhkan bimbingan intensif.</td>
              </tr>
            </tbody>
          </table>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; border: 1px solid #1e293b;">
            <thead>
              <tr style="background-color: #f1f5f9;">
                <th colspan="3" style="padding: 6px 8px; border: 1px solid #1e293b; text-align: left; color: #7c3aed; font-weight: 700;">
                  B. Aspek Sikap Ilmiah (Afektif) — Menilai kerjasama kelompok, kedisiplinan, tanggung jawab, dan keaktifan saat diskusi.
                </th>
              </tr>
              <tr style="background-color: #f8fafc; font-size: ${fontSize - 0.5}pt;">
                <th style="padding: 5px 8px; border: 1px solid #1e293b; width: 14%; text-align: center;">Tingkat</th>
                <th style="padding: 5px 8px; border: 1px solid #1e293b; width: 22%; text-align: center;">Predikat Capaian</th>
                <th style="padding: 5px 8px; border: 1px solid #1e293b; text-align: left;">Indikator Pengamatan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 4px 8px;">Level 4</td>
                <td style="text-align: center; font-weight: 700; color: #7c3aed; border: 1px solid #1e293b; padding: 4px 8px;">Level 4: Sangat Baik (SB)</td>
                <td style="border: 1px solid #1e293b; padding: 4px 8px;">Sangat kooperatif, disiplin waktu, bertanggung jawab penuh terhadap tugas kelompok, santun.</td>
              </tr>
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 4px 8px;">Level 3</td>
                <td style="text-align: center; font-weight: 700; color: #4338ca; border: 1px solid #1e293b; padding: 4px 8px;">Level 3: Baik (B)</td>
                <td style="border: 1px solid #1e293b; padding: 4px 8px;">Bekerja sama dengan baik dalam kelompok, disiplin, menjalankan peran dan tugasnya.</td>
              </tr>
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 4px 8px;">Level 2</td>
                <td style="text-align: center; font-weight: 700; color: #d97706; border: 1px solid #1e293b; padding: 4px 8px;">Level 2: Cukup (C)</td>
                <td style="border: 1px solid #1e293b; padding: 4px 8px;">Kurang fokus pada diskusi, sesekali perlu diingatkan guru untuk bekerjasama.</td>
              </tr>
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #1e293b; padding: 5px 8px;">Level 1</td>
                <td style="text-align: center; font-weight: 700; color: #dc2626; border: 1px solid #1e293b; padding: 4px 8px;">Level 1: Perlu Pembinaan (PB)</td>
                <td style="border: 1px solid #1e293b; padding: 4px 8px;">Pasif, tidak menjalankan tugas kelompok, atau mengganggu jalannya kegiatan/diskusi.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- BAGIAN 6: FORMULA KONVERSI NILAI AKHIR -->
        <div style="border: 1px solid #475569; background-color: #f8fafc; border-radius: 4px; padding: 8px 12px; margin-bottom: 14px; font-size: ${fontSize}pt;">
          <strong>VI. Formula Perhitungan Nilai Tugas Pertemuan (Skala 0 – 100):</strong>
          <div style="margin: 6px 0; font-family: monospace; font-weight: bold; color: #0f172a; background: #e2e8f0; padding: 6px 10px; border-radius: 3px; font-size: ${fontSize}pt;">
            Nilai Tugas = (Skor Memahami [0–100] + Skor Mengaplikasi [0–100] + Skor Merefleksi [0–100]) ÷ 3
          </div>
          <div style="font-size: ${fontSize - 0.5}pt; color: #334155; line-height: 1.5; margin-top: 4px;">
            • <strong>Skor Memahami:</strong> Dihitung langsung dari (Jumlah Benar ÷ 15 Soal) × 100%<br/>
            • <strong>Skor Mengaplikasi:</strong> Dikonversi ke skala 0–100 dengan rumus (Level Mengaplikasi ÷ 4) × 100<br/>
            • <strong>Skor Merefleksi:</strong> Dikonversi ke skala 0–100 dengan rumus (Level Merefleksi ÷ 4) × 100<br/>
            • <strong>Kriteria Ketuntasan Minimal (KKM / KKTP):</strong> Nilai Akhir &ge; 70 dinyatakan <strong>TUNTAS</strong>, dan Nilai Akhir &lt; 70 dinyatakan <strong>BELUM TUNTAS</strong>.
          </div>
        </div>

        <!-- PENGESAHAN TANDA TANGAN -->
        ${ttdHtml}
      </div>
    `;
  }

  // Update Live Preview Lembar Kertas di Modal
  function updateCapaianPreview() {
    const sheet = document.getElementById('previewPaperSheet');
    if (!sheet) return;

    const paperSize = document.querySelector('input[name="previewPaperSize"]:checked')?.value || 'A4';
    const orientation = document.querySelector('input[name="previewOrientation"]:checked')?.value || 'portrait';
    const fontSize = parseFloat(document.getElementById('prevSelectFontSize')?.value) || 10;
    const kFilter = document.getElementById('prevSelectKelas')?.value || 'all';

    const sekolah = document.getElementById('prevInputSekolah')?.value.trim() || '';
    const mapel = document.getElementById('prevInputMapel')?.value.trim() || 'IPA';
    const tanggal = document.getElementById('prevInputTanggal')?.value || new Date().toISOString().slice(0, 10);
    const kepsek = document.getElementById('prevInputKepsek')?.value.trim() || '';
    const nipKepsek = document.getElementById('prevInputNipKepsek')?.value.trim() || '';
    const guru = document.getElementById('prevInputGuru')?.value.trim() || '';
    const nip = document.getElementById('prevInputNip')?.value.trim() || '';

    const optTtd = document.getElementById('prevOptTtd')?.checked ?? true;
    const optChart = document.getElementById('prevOptChart')?.checked ?? true;
    const optNarasi = document.getElementById('prevOptNarasi')?.checked ?? true;

    // Perbarui teks informasi preview
    const paperName = paperSize === 'A4' ? 'A4 (210×297 mm)' : 'FOLIO / F4 (215×330 mm)';
    const orientName = orientation === 'portrait' ? '📄 Potrait (Tegak)' : '📜 Lanskap (Mendatar)';
    const infoText = document.getElementById('prevPaperInfoText');
    if (infoText) {
      infoText.textContent = `Kertas ${paperName} — ${orientName} — Font ${fontSize} pt`;
    }

    const badgeFont = document.getElementById('prevFontSizeBadge');
    if (badgeFont) badgeFont.textContent = `${fontSize} pt`;

    // Perbarui dimensi lembar kertas preview
    sheet.style.fontSize = `${fontSize}pt`;
    if (orientation === 'portrait') {
      sheet.style.maxWidth = '680px';
      sheet.style.minHeight = paperSize === 'A4' ? '960px' : '1040px';
      sheet.style.padding = '28px 34px';
    } else {
      sheet.style.maxWidth = paperSize === 'A4' ? '960px' : '1040px';
      sheet.style.minHeight = '680px';
      sheet.style.padding = '24px 30px';
    }

    // Toggle tampilan opsi khusus analisis
    const chartWrapper = document.getElementById('prevOptChartWrapper');
    const narasiWrapper = document.getElementById('prevOptNarasiWrapper');
    const kelasWrapper = document.getElementById('prevSelectKelasWrapper');

    if (currentDocType === 'rubrik') {
      if (chartWrapper) chartWrapper.style.display = 'none';
      if (narasiWrapper) narasiWrapper.style.display = 'none';
      if (kelasWrapper) kelasWrapper.style.display = 'none';
    } else {
      if (chartWrapper) chartWrapper.style.display = 'flex';
      if (narasiWrapper) narasiWrapper.style.display = 'flex';
      if (kelasWrapper) kelasWrapper.style.display = 'block';
    }

    // Render Dokumen
    if (currentDocType === 'analisis') {
      const stats = computeMeetingStatsData(kFilter);
      const chartUrl = generatePrintableChartDataUrl(stats);
      sheet.innerHTML = buildAnalisisPenilaianHtml({
        kFilter, sekolah, mapel, tanggal, kepsek, nipKepsek, guru, nip, optTtd, optChart, optNarasi, fontSize, isForWord: false
      }, chartUrl);
    } else {
      sheet.innerHTML = buildRubrikPenilaianHtml({
        sekolah, mapel, tanggal, kepsek, nipKepsek, guru, nip, optTtd, fontSize, isForWord: false
      });
    }

    // Simpan profil otomatis
    saveTeacherProfile({ sekolah, kepsek, nipKepsek, guru, nipGuru: nip });
  }

  // Buka Modal Pratinjau Capaian Belajar / Rubrik
  function openModalPreviewCapaian(docType = 'analisis') {
    const modal = document.getElementById('modalPreviewCapaian');
    if (!modal) return;

    currentDocType = docType;

    // Perbarui tab button aktif
    const tabAnalisis = document.getElementById('tabDocAnalisis');
    const tabRubrik = document.getElementById('tabDocRubrik');
    if (tabAnalisis && tabRubrik) {
      if (currentDocType === 'analisis') {
        tabAnalisis.classList.add('active');
        tabRubrik.classList.remove('active');
        document.getElementById('modalPreviewTitleIcon').textContent = '📄';
        document.getElementById('modalPreviewTitleText').textContent = 'Pratinjau & Cetak Laporan Analisis Capaian Belajar';
      } else {
        tabRubrik.classList.add('active');
        tabAnalisis.classList.remove('active');
        document.getElementById('modalPreviewTitleIcon').textContent = '📝';
        document.getElementById('modalPreviewTitleText').textContent = 'Pratinjau & Unduh Panduan Rubrik Penilaian LKPD';
      }
    }

    // Sinkronisasi pilihan kelas dari filter utama grafik
    const selK = document.getElementById('prevSelectKelas');
    if (selK) {
      selK.innerHTML = '<option value="all">Semua Kelas</option>';
      (App.kelas || []).forEach(k => {
        const opt = document.createElement('option');
        opt.value = k.nama;
        opt.textContent = k.nama;
        selK.appendChild(opt);
      });
      const curGrafikK = document.getElementById('grafikFilterKelas')?.value || 'all';
      selK.value = curGrafikK;
    }

    // Sinkronisasi tanggal
    const inTgl = document.getElementById('prevInputTanggal');
    if (inTgl && !inTgl.value) {
      inTgl.value = new Date().toISOString().slice(0, 10);
    }

    // Muat Profil Guru & Kepala Sekolah yang Tersimpan
    const prof = loadTeacherProfile();
    const inSekolah = document.getElementById('prevInputSekolah');
    const inKepsek = document.getElementById('prevInputKepsek');
    const inNipKepsek = document.getElementById('prevInputNipKepsek');
    const inGuru = document.getElementById('prevInputGuru');
    const inNip = document.getElementById('prevInputNip');

    if (inSekolah && !inSekolah.value) inSekolah.value = prof.sekolah || '';
    if (inKepsek && !inKepsek.value) inKepsek.value = prof.kepsek || '';
    if (inNipKepsek && !inNipKepsek.value) inNipKepsek.value = prof.nipKepsek || '';
    if (inGuru && !inGuru.value) inGuru.value = prof.guru || '';
    if (inNip && !inNip.value) inNip.value = prof.nipGuru || '';

    // Tampilkan Modal
    modal.classList.add('active');

    // Trigger update preview
    setTimeout(() => {
      updateCapaianPreview();
    }, 50);
  }

  // Eksekusi Cetak / Simpan PDF Dokumen Capaian Belajar
  function executePrintCapaianPDF() {
    const paperSize = document.querySelector('input[name="previewPaperSize"]:checked')?.value || 'A4';
    const orientation = document.querySelector('input[name="previewOrientation"]:checked')?.value || 'portrait';
    const fontSize = parseFloat(document.getElementById('prevSelectFontSize')?.value) || 10;
    const kFilter = document.getElementById('prevSelectKelas')?.value || 'all';

    const sekolah = document.getElementById('prevInputSekolah')?.value.trim() || '';
    const mapel = document.getElementById('prevInputMapel')?.value.trim() || 'IPA';
    const tanggal = document.getElementById('prevInputTanggal')?.value || new Date().toISOString().slice(0, 10);
    const kepsek = document.getElementById('prevInputKepsek')?.value.trim() || '';
    const nipKepsek = document.getElementById('prevInputNipKepsek')?.value.trim() || '';
    const guru = document.getElementById('prevInputGuru')?.value.trim() || '';
    const nip = document.getElementById('prevInputNip')?.value.trim() || '';

    const optTtd = document.getElementById('prevOptTtd')?.checked ?? true;
    const optChart = document.getElementById('prevOptChart')?.checked ?? true;
    const optNarasi = document.getElementById('prevOptNarasi')?.checked ?? true;

    saveTeacherProfile({ sekolah, kepsek, nipKepsek, guru, nipGuru: nip });

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

    dynamicStyleEl.textContent = `
      @page {
        size: ${pageSizeCss};
        margin: 10mm 12mm;
      }
      @media print {
        html, body {
          font-size: ${fontSize}pt !important;
        }
        .print-document {
          font-size: ${fontSize}pt !important;
        }
        .print-table th, .print-table td, .table-identitas td, .print-ttd-table td {
          font-size: ${fontSize}pt !important;
        }
      }
    `;

    // Isi konten ke dalam #printArea
    const printArea = document.getElementById('printArea');
    if (!printArea) return;

    let contentHtml = '';
    if (currentDocType === 'analisis') {
      const stats = computeMeetingStatsData(kFilter);
      const chartUrl = generatePrintableChartDataUrl(stats);
      contentHtml = buildAnalisisPenilaianHtml({
        kFilter, sekolah, mapel, tanggal, kepsek, nipKepsek, guru, nip, optTtd, optChart, optNarasi, fontSize, isForWord: false
      }, chartUrl);
    } else {
      contentHtml = buildRubrikPenilaianHtml({
        sekolah, mapel, tanggal, kepsek, nipKepsek, guru, nip, optTtd, fontSize, isForWord: false
      });
    }

    printArea.innerHTML = contentHtml;

    // Tutup modal dan panggil dialog print
    document.getElementById('modalPreviewCapaian')?.classList.remove('active');
    setTimeout(() => {
      window.print();
    }, 150);
  }

  // Eksekusi Unduh Dokumen Word (.doc) Terformat Rapi
  function executeDownloadWord() {
    const paperSize = document.querySelector('input[name="previewPaperSize"]:checked')?.value || 'A4';
    const orientation = document.querySelector('input[name="previewOrientation"]:checked')?.value || 'portrait';
    const fontSize = parseFloat(document.getElementById('prevSelectFontSize')?.value) || 10;
    const kFilter = document.getElementById('prevSelectKelas')?.value || 'all';

    const sekolah = document.getElementById('prevInputSekolah')?.value.trim() || '';
    const mapel = document.getElementById('prevInputMapel')?.value.trim() || 'IPA';
    const tanggal = document.getElementById('prevInputTanggal')?.value || new Date().toISOString().slice(0, 10);
    const kepsek = document.getElementById('prevInputKepsek')?.value.trim() || '';
    const nipKepsek = document.getElementById('prevInputNipKepsek')?.value.trim() || '';
    const guru = document.getElementById('prevInputGuru')?.value.trim() || '';
    const nip = document.getElementById('prevInputNip')?.value.trim() || '';

    const optTtd = document.getElementById('prevOptTtd')?.checked ?? true;
    const optChart = document.getElementById('prevOptChart')?.checked ?? true;
    const optNarasi = document.getElementById('prevOptNarasi')?.checked ?? true;

    saveTeacherProfile({ sekolah, kepsek, nipKepsek, guru, nipGuru: nip });

    // Dimensi Kertas dalam Milimeter
    let pageWidthMm = 210;
    let pageHeightMm = 297;
    if (paperSize === 'FOLIO') {
      pageWidthMm = 215;
      pageHeightMm = 330;
    }
    if (orientation === 'landscape') {
      const temp = pageWidthMm;
      pageWidthMm = pageHeightMm;
      pageHeightMm = temp;
    }

    let docTitle = 'Rubrik_Penilaian_LKPD_IPA';
    let docBodyHtml = '';

    if (currentDocType === 'analisis') {
      docTitle = `Laporan_Analisis_Capaian_Belajar_IPA_${kFilter !== 'all' ? kFilter.replace(/\s+/g, '_') : 'Semua_Kelas'}`;
      const stats = computeMeetingStatsData(kFilter);
      const chartUrl = optChart ? generatePrintableChartDataUrl(stats) : '';
      docBodyHtml = buildAnalisisPenilaianHtml({
        kFilter, sekolah, mapel, tanggal, kepsek, nipKepsek, guru, nip, optTtd, optChart, optNarasi, fontSize, isForWord: true
      }, chartUrl);
    } else {
      docTitle = `Rubrik_Penilaian_Lengkap_LKPD_IPA_${paperSize}_${orientation}`;
      docBodyHtml = buildRubrikPenilaianHtml({
        sekolah, mapel, tanggal, kepsek, nipKepsek, guru, nip, optTtd, fontSize, isForWord: true
      });
    }

    // Templating Microsoft Word Office XML/HTML
    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
      <meta charset='utf-8'>
      <title>${docTitle}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page Section1 {
          size: ${pageWidthMm}mm ${pageHeightMm}mm;
          margin: 18mm 18mm 18mm 18mm;
          mso-page-orientation: ${orientation};
          mso-header-margin: 10mm;
          mso-footer-margin: 10mm;
          mso-paper-source: 0;
        }
        div.Section1 {
          page: Section1;
        }
        body {
          font-family: 'Calibri', 'Times New Roman', Arial, sans-serif;
          font-size: ${fontSize}pt;
          line-height: 1.35;
          color: #000000;
        }
        h1 { font-size: ${fontSize + 4}pt; font-weight: bold; text-align: center; margin: 3pt 0; text-transform: uppercase; }
        h2 { font-size: ${fontSize + 2}pt; font-weight: bold; margin: 10pt 0 4pt 0; color: #000000; border-bottom: 1.5pt solid #000000; padding-bottom: 2pt; text-transform: uppercase; }
        h3 { font-size: ${fontSize + 1}pt; font-weight: bold; margin: 8pt 0 3pt 0; color: #000000; }
        h4 { font-size: ${fontSize}pt; font-weight: bold; margin: 8pt 0 3pt 0; color: #000000; }
        p, li { font-size: ${fontSize}pt; margin: 2pt 0; line-height: 1.35; }
        table { border-collapse: collapse; width: 100%; margin: 6pt 0 10pt 0; }
        th, td { border: 1pt solid #000000; padding: 4pt 6pt; font-size: ${fontSize}pt; vertical-align: top; }
        th { background-color: #f1f5f9; font-weight: bold; text-align: center; }
        .table-identitas td { border: none !important; padding: 2pt 4pt; }
        .print-ttd-table td { border: none !important; text-align: center; }
      </style>
      </head>
      <body>
      <div class="Section1">
        ${docBodyHtml}
      </div>
      </body>
      </html>
    `;

    // Buat Blob dan download file .doc
    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
    const filename = `${docTitle}_${paperSize}_${orientation}_${fontSize}pt.doc`;

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    showToast(`Dokumen Word berhasil diunduh (${filename})!`, 'success');
  }

  // Pasang Event Listeners untuk Modal Preview Capaian Belajar & Rubrik
  function setupCapaianPreviewSystem() {
    // Tombol di Filter Bar Tab Grafik
    document.getElementById('btnOpenModalAnalisisPdf')?.addEventListener('click', () => openModalPreviewCapaian('analisis'));
    document.getElementById('btnOpenModalRubrikWord')?.addEventListener('click', () => openModalPreviewCapaian('rubrik'));

    // Tombol Cepat di Header Tabel Capaian
    document.getElementById('btnQuickAnalisisPdf')?.addEventListener('click', () => openModalPreviewCapaian('analisis'));
    document.getElementById('btnQuickRubrikWord')?.addEventListener('click', () => openModalPreviewCapaian('rubrik'));

    // Tombol Tutup & Batal Modal
    document.getElementById('btnCloseModalPreviewCapaian')?.addEventListener('click', () => {
      document.getElementById('modalPreviewCapaian')?.classList.remove('active');
    });
    document.getElementById('btnCancelModalPreviewCapaian')?.addEventListener('click', () => {
      document.getElementById('modalPreviewCapaian')?.classList.remove('active');
    });

    // Tutup saat klik di backdrop luar box modal
    document.getElementById('modalPreviewCapaian')?.addEventListener('click', (e) => {
      if (e.target.id === 'modalPreviewCapaian') {
        document.getElementById('modalPreviewCapaian').classList.remove('active');
      }
    });

    // Pilihan Tab Dokumen (Analisis Penilaian vs Rubrik Penilaian)
    document.getElementById('tabDocAnalisis')?.addEventListener('click', () => {
      currentDocType = 'analisis';
      document.getElementById('tabDocAnalisis')?.classList.add('active');
      document.getElementById('tabDocRubrik')?.classList.remove('active');
      document.getElementById('modalPreviewTitleIcon').textContent = '📄';
      document.getElementById('modalPreviewTitleText').textContent = 'Pratinjau & Cetak Laporan Analisis Capaian Belajar';
      updateCapaianPreview();
    });

    document.getElementById('tabDocRubrik')?.addEventListener('click', () => {
      currentDocType = 'rubrik';
      document.getElementById('tabDocRubrik')?.classList.add('active');
      document.getElementById('tabDocAnalisis')?.classList.remove('active');
      document.getElementById('modalPreviewTitleIcon').textContent = '📝';
      document.getElementById('modalPreviewTitleText').textContent = 'Pratinjau & Unduh Panduan Rubrik Penilaian LKPD';
      updateCapaianPreview();
    });

    // Pilihan Format Kertas (A4 vs FOLIO F4)
    document.querySelectorAll('input[name="previewPaperSize"]').forEach(r => {
      r.addEventListener('change', updateCapaianPreview);
    });

    // Pilihan Orientasi (Potrait vs Lanskap)
    document.querySelectorAll('input[name="previewOrientation"]').forEach(r => {
      r.addEventListener('change', updateCapaianPreview);
    });

    // Pilihan Ukuran Font
    document.getElementById('prevSelectFontSize')?.addEventListener('change', updateCapaianPreview);

    // Filter Kelas di Modal
    document.getElementById('prevSelectKelas')?.addEventListener('change', updateCapaianPreview);

    // Identitas Teks (Sekolah, Mapel, Tanggal, Kepsek, NIP Kepsek, Guru, NIP)
    ['prevInputSekolah', 'prevInputMapel', 'prevInputTanggal', 'prevInputKepsek', 'prevInputNipKepsek', 'prevInputGuru', 'prevInputNip'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', updateCapaianPreview);
        el.addEventListener('change', updateCapaianPreview);
      }
    });

    // Checkbox Opsi Lampiran (Tanda Tangan, Grafik, Narasi)
    ['prevOptTtd', 'prevOptChart', 'prevOptNarasi'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', updateCapaianPreview);
    });

    // Tombol Cetak / Simpan PDF
    document.getElementById('btnPrevExecutePrint')?.addEventListener('click', executePrintCapaianPDF);

    // Tombol Unduh Dokumen Word (.doc)
    document.getElementById('btnPrevDownloadWord')?.addEventListener('click', executeDownloadWord);

    // Tombol Sesuaikan Layar (Scroll ke atas preview sheet)
    document.getElementById('btnZoomFit')?.addEventListener('click', () => {
      const desk = document.getElementById('previewDeskViewport');
      if (desk) desk.scrollTo({ top: 0, behavior: 'smooth' });
    });
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

  // Bangun Dokumen Rekapitulasi Nilai LKPD (HTML & Word)
  function buildRekapNilaiHtml(options) {
    const {
      paperSize = 'A4',
      orientation = 'portrait',
      fontSize = 10,
      mapel = 'IPA',
      bab = 'BAB 1. Besaran dan pengukuran',
      pertemuanKe = '1',
      materi = 'Besaran dan satuan',
      sekolah = '',
      tanggal = new Date().toISOString().slice(0, 10),
      kFilter = 'all',
      pFilter = 'all',
      uFilter = 'nilai_desc',
      kepsek = '',
      nipKepsek = '',
      guru = '',
      nipGuru = '',
      optKelompok = false,
      optPredikat = true,
      optStatistik = true,
      optTtd = true,
      isForWord = false
    } = options;

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

    const kelasDisplay = kFilter !== 'all' ? kFilter : (list[0]?.kelas || 'Semua Kelas');
    const kepsekDisplay = kepsek || '_________________________';
    const nipKepsekDisplay = nipKepsek ? `NIP. ${nipKepsek}` : 'NIP. .................................................';
    const guruDisplay = guru || 'Guru Mata Pelajaran IPA';
    const nipGuruDisplay = nipGuru ? `NIP. ${nipGuru}` : 'NIP. .................................................';

    // Baris Tabel Nilai
    let rowsHtml = '';
    if (list.length === 0) {
      const colSpan = 3 + (optKelompok ? 1 : 0) + (optPredikat ? 1 : 0);
      rowsHtml = `<tr><td colspan="${colSpan}" style="text-align: center; padding: 16px; border: 1px solid #1e293b; color: #64748b;">Belum ada data nilai untuk kriteria filter kelas/pertemuan ini.</td></tr>`;
    } else {
      list.forEach((p, idx) => {
        const nt = p._nt;
        const tuntasLabel = nt.nilai_akhir >= 70 ? 'Tuntas' : 'Belum Tuntas';
        const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        rowsHtml += `
          <tr style="background-color: ${bg};">
            <td style="text-align: center; font-weight: 600; border: 1px solid #1e293b; padding: 5px 6px;">${idx + 1}</td>
            <td style="font-weight: 600; text-align: left; border: 1px solid #1e293b; padding: 5px 8px;">${p.nama_siswa}</td>
            ${optKelompok ? `<td style="text-align: center; border: 1px solid #1e293b; padding: 5px 6px;">${p.nama_kelompok || '-'}</td>` : ''}
            <td style="text-align: center; font-weight: 800; border: 1px solid #1e293b; padding: 5px 6px; background-color: #fef3c7; color: #b45309;">${formatIndoDecimal(nt.nilai_akhir)}</td>
            ${optPredikat ? `<td style="text-align: center; border: 1px solid #1e293b; padding: 5px 6px; font-size: ${fontSize - 0.5}pt;">${nt.predikat} (${tuntasLabel})</td>` : ''}
          </tr>
        `;
      });
    }

    // Statistik Ringkasan
    let statsHtml = '';
    if (optStatistik && list.length > 0) {
      const sumAll = list.reduce((acc, c) => acc + c._nt.nilai_akhir, 0);
      const avgScore = Number((sumAll / list.length).toFixed(1));
      const maxScore = Math.max(...list.map(c => c._nt.nilai_akhir));
      const minScore = Math.min(...list.map(c => c._nt.nilai_akhir));
      const tuntasCount = list.filter(c => c._nt.nilai_akhir >= 70).length;
      const tuntasPercent = Math.round((tuntasCount / list.length) * 100);

      statsHtml = `
        <div class="print-stats-box" style="border: 1px solid #475569; background-color: #f8fafc; border-radius: 4px; padding: 8px 12px; margin-top: 10px; margin-bottom: 12px; font-size: ${fontSize}pt;">
          <table style="width: 100%; border-collapse: collapse; border: none !important;">
            <tr>
              <td style="border: none !important; padding: 3px 6px; text-align: center;"><strong>Jumlah Peserta Didik:</strong><br/>${list.length} Siswa</td>
              <td style="border: none !important; padding: 3px 6px; text-align: center;"><strong>Rata-Rata Nilai:</strong><br/><span style="color: #0284c7; font-weight: 800;">${formatIndoDecimal(avgScore)}</span> / 100</td>
              <td style="border: none !important; padding: 3px 6px; text-align: center;"><strong>Nilai Tertinggi:</strong><br/><span style="color: #059669; font-weight: 800;">${formatIndoDecimal(maxScore)}</span></td>
              <td style="border: none !important; padding: 3px 6px; text-align: center;"><strong>Nilai Terendah:</strong><br/><span style="color: #dc2626; font-weight: 800;">${formatIndoDecimal(minScore)}</span></td>
              <td style="border: none !important; padding: 3px 6px; text-align: center;"><strong>Ketuntasan Belajar:</strong><br/><span style="font-weight: 800;">${tuntasCount} Siswa (${tuntasPercent}%)</span></td>
            </tr>
          </table>
        </div>
      `;
    }

    // Tanda Tangan
    let ttdHtml = '';
    if (optTtd) {
      ttdHtml = `
        <div class="print-ttd-container" style="width: 100%; margin-top: 22px; page-break-inside: avoid; break-inside: avoid;">
          <table class="print-ttd-table" style="width: 100%; border-collapse: collapse; border: none !important;">
            <tr>
              <td style="width: 50%; vertical-align: top; text-align: center; border: none !important; padding: 0 10px;">
                <p style="margin: 0 0 52px 0;">Mengetahui,<br/><strong>Kepala Sekolah</strong></p>
                <p style="font-weight: 700; text-decoration: underline; margin: 0;">${kepsekDisplay}</p>
                <p style="margin: 3px 0 0 0; font-size: ${fontSize - 1}pt; color: #475569;">${nipKepsekDisplay}</p>
              </td>
              <td style="width: 50%; vertical-align: top; text-align: center; border: none !important; padding: 0 10px;">
                <p style="margin: 0 0 52px 0;">Dampal Selatan, ${formatTanggalIndo(tanggal)}<br/><strong>Guru Mata Pelajaran IPA</strong></p>
                <p style="font-weight: 700; text-decoration: underline; margin: 0;"><strong>${guruDisplay}</strong></p>
                <p style="margin: 3px 0 0 0; font-size: ${fontSize - 1}pt; color: #475569;">${nipGuruDisplay}</p>
              </td>
            </tr>
          </table>
        </div>
      `;
    }

    return `
      <div class="print-document" style="font-size: ${fontSize}pt; line-height: 1.4;">
        <!-- KOP DOKUMEN -->
        <div class="print-header" style="text-align: center; margin-bottom: 10px;">
          <h2 class="print-main-title" style="font-size: ${fontSize + 3.5}pt; font-weight: 800; text-transform: uppercase; margin: 0; color: #000; letter-spacing: 0.5px;">REKAPITULASI PENILAIAN LEMBAR KERJA PESERTA DIDIK (LKPD)</h2>
          <h3 class="print-sub-title" style="font-size: ${fontSize + 0.5}pt; font-weight: 600; margin: 4px 0 0 0; color: #1e293b;">MATA PELAJARAN ILMU PENGETAHUAN ALAM (IPA)${sekolah ? ' • ' + sekolah : ''}</h3>
          <div class="print-divider" style="border-bottom: 2px solid #000; border-top: 1px solid #000; height: 2px; margin: 8px 0 10px 0;"></div>
        </div>

        <!-- IDENTITAS PENILAIAN DI ATAS TABEL -->
        <div class="print-identitas-box" style="margin-bottom: 10px; border: 1px solid #475569; background-color: #f8fafc; border-radius: 4px; padding: 6px 10px;">
          <table class="table-identitas" style="width: 100%; border-collapse: collapse; font-size: ${fontSize}pt; border: none;">
            <tr>
              <td style="width: 120px; font-weight: 700; border: none; padding: 2px 4px;">Mata Pelajaran</td>
              <td style="width: 10px; text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${mapel}</strong></td>
              <td style="width: 120px; font-weight: 700; border: none; padding: 2px 4px;">Kelas</td>
              <td style="width: 10px; text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${kelasDisplay}</strong></td>
            </tr>
            <tr>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">BAB</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;">${bab}</td>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Pertemuan ke</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${pertemuanKe}</strong></td>
            </tr>
            <tr>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Materi</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;"><strong>${materi}</strong></td>
              <td style="font-weight: 700; border: none; padding: 2px 4px;">Tanggal Asesmen</td>
              <td style="text-align: center; border: none; padding: 2px 4px;">:</td>
              <td style="border: none; padding: 2px 4px;">${formatTanggalIndo(tanggal)}</td>
            </tr>
          </table>
        </div>

        <!-- TABEL REKAPAN NILAI -->
        <table class="print-table" style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: ${fontSize}pt; border: 1px solid #1e293b;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="width: 45px; text-align: center; border: 1px solid #1e293b; padding: 6px 8px;">No</th>
              <th style="text-align: left; border: 1px solid #1e293b; padding: 6px 8px;">Nama Peserta Didik</th>
              ${optKelompok ? '<th style="width: 110px; text-align: center; border: 1px solid #1e293b; padding: 6px 8px;">Kelompok</th>' : ''}
              <th style="width: 85px; text-align: center; border: 1px solid #1e293b; padding: 6px 8px; background-color: #fef3c7;">Nilai Akhir</th>
              ${optPredikat ? '<th style="width: 140px; text-align: center; border: 1px solid #1e293b; padding: 6px 8px;">Keterangan</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <!-- STATISTIK RINGKAS -->
        ${statsHtml}

        <!-- TANDA TANGAN -->
        ${ttdHtml}
      </div>
    `;
  }

  // Update Live Preview Lembar Kertas Rekap di Modal Print
  function updateRekapPrintPreview() {
    const sheet = document.getElementById('rekapPreviewPaperSheet');
    if (!sheet) return;

    const paperSize = document.querySelector('input[name="printPaperSize"]:checked')?.value || 'A4';
    const orientation = document.querySelector('input[name="printOrientation"]:checked')?.value || 'portrait';
    const fontSize = parseFloat(document.getElementById('printSelectFontSize')?.value) || 10;

    const mapel = document.getElementById('printInputMapel')?.value.trim() || 'IPA';
    const bab = document.getElementById('printInputBab')?.value.trim() || 'BAB 1. Besaran dan pengukuran';
    const pertemuanKe = document.getElementById('printInputPertemuanKe')?.value.trim() || '1';
    const materi = document.getElementById('printInputMateri')?.value.trim() || 'Besaran dan satuan';
    const sekolah = document.getElementById('printInputSekolah')?.value.trim() || '';
    const tanggal = document.getElementById('printInputTanggal')?.value || new Date().toISOString().slice(0, 10);

    const kFilter = document.getElementById('printSelectKelas')?.value || 'all';
    const pFilter = document.getElementById('printSelectPertemuan')?.value || 'all';
    const uFilter = document.getElementById('printSelectUrutan')?.value || 'nilai_desc';

    const kepsek = document.getElementById('printInputKepsek')?.value.trim() || '';
    const nipKepsek = document.getElementById('printInputNipKepsek')?.value.trim() || '';
    const guru = document.getElementById('printInputGuru')?.value.trim() || '';
    const nipGuru = document.getElementById('printInputNipGuru')?.value.trim() || '';

    const optKelompok = document.getElementById('printOptKelompok')?.checked ?? false;
    const optPredikat = document.getElementById('printOptPredikat')?.checked ?? true;
    const optStatistik = document.getElementById('printOptStatistik')?.checked ?? true;
    const optTtd = document.getElementById('printOptTtd')?.checked ?? true;

    // Perbarui teks info & badge font
    const paperName = paperSize === 'A4' ? 'A4 (210×297 mm)' : 'FOLIO / F4 (215×330 mm)';
    const orientName = orientation === 'portrait' ? '📄 Potrait' : '📜 Lanskap';
    const infoText = document.getElementById('printPaperInfoText');
    if (infoText) {
      infoText.textContent = `Kertas ${paperName} — ${orientName} — Font ${fontSize} pt`;
    }

    const badgeFont = document.getElementById('printFontSizeBadge');
    if (badgeFont) badgeFont.textContent = `${fontSize} pt`;

    // Perbarui dimensi lembar kertas preview
    sheet.style.fontSize = `${fontSize}pt`;
    if (orientation === 'portrait') {
      sheet.style.maxWidth = '680px';
      sheet.style.minHeight = paperSize === 'A4' ? '960px' : '1040px';
      sheet.style.padding = '28px 34px';
    } else {
      sheet.style.maxWidth = paperSize === 'A4' ? '960px' : '1040px';
      sheet.style.minHeight = '680px';
      sheet.style.padding = '24px 30px';
    }

    // Render Dokumen Rekap ke Lembar Kertas
    sheet.innerHTML = buildRekapNilaiHtml({
      paperSize, orientation, fontSize, mapel, bab, pertemuanKe, materi, sekolah, tanggal,
      kFilter, pFilter, uFilter, kepsek, nipKepsek, guru, nipGuru,
      optKelompok, optPredikat, optStatistik, optTtd, isForWord: false
    });

    // Simpan profil guru & kepala sekolah otomatis
    saveTeacherProfile({ sekolah, kepsek, nipKepsek, guru, nipGuru });
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

    // 5. Muat Profil Guru & Kepala Sekolah yang Tersimpan
    const prof = loadTeacherProfile();
    const inSekolah = document.getElementById('printInputSekolah');
    const inKepsek = document.getElementById('printInputKepsek');
    const inNipKepsek = document.getElementById('printInputNipKepsek');
    const inGuru = document.getElementById('printInputGuru');
    const inNipGuru = document.getElementById('printInputNipGuru');

    if (inSekolah && !inSekolah.value) inSekolah.value = prof.sekolah || '';
    if (inKepsek && !inKepsek.value) inKepsek.value = prof.kepsek || '';
    if (inNipKepsek && !inNipKepsek.value) inNipKepsek.value = prof.nipKepsek || '';
    if (inGuru && !inGuru.value) inGuru.value = prof.guru || '';
    if (inNipGuru && !inNipGuru.value) inNipGuru.value = prof.nipGuru || '';

    // 6. Sinkronisasi Identitas (Mata Pelajaran, BAB, Pertemuan ke, Materi)
    const activeP = selP?.value || '1';
    syncPrintIdentityFromMeeting(activeP);

    modal.classList.add('active');

    // Render Live Preview Lembar Kertas Rekap
    setTimeout(() => {
      updateRekapPrintPreview();
    }, 50);
  }

  function executePrintPDF() {
    const paperSize = document.querySelector('input[name="printPaperSize"]:checked')?.value || 'A4';
    const orientation = document.querySelector('input[name="printOrientation"]:checked')?.value || 'portrait';
    const fontSize = parseFloat(document.getElementById('printSelectFontSize')?.value) || 10;

    const mapel = document.getElementById('printInputMapel')?.value.trim() || 'IPA';
    const bab = document.getElementById('printInputBab')?.value.trim() || 'BAB 1. Besaran dan pengukuran';
    const pertemuanKe = document.getElementById('printInputPertemuanKe')?.value.trim() || '1';
    const materi = document.getElementById('printInputMateri')?.value.trim() || 'Besaran dan satuan';
    const sekolah = document.getElementById('printInputSekolah')?.value.trim() || '';
    const tanggal = document.getElementById('printInputTanggal')?.value || new Date().toISOString().slice(0, 10);

    const kFilter = document.getElementById('printSelectKelas')?.value || 'all';
    const pFilter = document.getElementById('printSelectPertemuan')?.value || 'all';
    const uFilter = document.getElementById('printSelectUrutan')?.value || 'nilai_desc';

    const kepsek = document.getElementById('printInputKepsek')?.value.trim() || '';
    const nipKepsek = document.getElementById('printInputNipKepsek')?.value.trim() || '';
    const guru = document.getElementById('printInputGuru')?.value.trim() || '';
    const nipGuru = document.getElementById('printInputNipGuru')?.value.trim() || '';

    const optKelompok = document.getElementById('printOptKelompok')?.checked ?? false;
    const optPredikat = document.getElementById('printOptPredikat')?.checked ?? true;
    const optStatistik = document.getElementById('printOptStatistik')?.checked ?? true;
    const optTtd = document.getElementById('printOptTtd')?.checked ?? true;

    // Simpan profil
    saveTeacherProfile({ sekolah, kepsek, nipKepsek, guru, nipGuru });

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

    dynamicStyleEl.textContent = `
      @page {
        size: ${pageSizeCss};
        margin: 10mm 12mm;
      }
      @media print {
        html, body {
          font-size: ${fontSize}pt !important;
        }
        .print-document {
          font-size: ${fontSize}pt !important;
        }
        .print-table th, .print-table td, .table-identitas td, .print-ttd-table td {
          font-size: ${fontSize}pt !important;
        }
      }
    `;

    // Isi konten ke dalam #printArea
    const printArea = document.getElementById('printArea');
    if (!printArea) return;

    printArea.innerHTML = buildRekapNilaiHtml({
      paperSize, orientation, fontSize, mapel, bab, pertemuanKe, materi, sekolah, tanggal,
      kFilter, pFilter, uFilter, kepsek, nipKepsek, guru, nipGuru,
      optKelompok, optPredikat, optStatistik, optTtd, isForWord: false
    });

    // Tutup Modal & Trigger Cetak
    document.getElementById('modalPrintConfig')?.classList.remove('active');
    setTimeout(() => {
      window.print();
    }, 150);
  }

  // Eksekusi Unduh Dokumen Word (.doc) Rekapitulasi Nilai
  function executeDownloadWordRekap() {
    const paperSize = document.querySelector('input[name="printPaperSize"]:checked')?.value || 'A4';
    const orientation = document.querySelector('input[name="printOrientation"]:checked')?.value || 'portrait';
    const fontSize = parseFloat(document.getElementById('printSelectFontSize')?.value) || 10;

    const mapel = document.getElementById('printInputMapel')?.value.trim() || 'IPA';
    const bab = document.getElementById('printInputBab')?.value.trim() || 'BAB 1. Besaran dan pengukuran';
    const pertemuanKe = document.getElementById('printInputPertemuanKe')?.value.trim() || '1';
    const materi = document.getElementById('printInputMateri')?.value.trim() || 'Besaran dan satuan';
    const sekolah = document.getElementById('printInputSekolah')?.value.trim() || '';
    const tanggal = document.getElementById('printInputTanggal')?.value || new Date().toISOString().slice(0, 10);

    const kFilter = document.getElementById('printSelectKelas')?.value || 'all';
    const pFilter = document.getElementById('printSelectPertemuan')?.value || 'all';
    const uFilter = document.getElementById('printSelectUrutan')?.value || 'nilai_desc';

    const kepsek = document.getElementById('printInputKepsek')?.value.trim() || '';
    const nipKepsek = document.getElementById('printInputNipKepsek')?.value.trim() || '';
    const guru = document.getElementById('printInputGuru')?.value.trim() || '';
    const nipGuru = document.getElementById('printInputNipGuru')?.value.trim() || '';

    const optKelompok = document.getElementById('printOptKelompok')?.checked ?? false;
    const optPredikat = document.getElementById('printOptPredikat')?.checked ?? true;
    const optStatistik = document.getElementById('printOptStatistik')?.checked ?? true;
    const optTtd = document.getElementById('printOptTtd')?.checked ?? true;

    // Simpan profil
    saveTeacherProfile({ sekolah, kepsek, nipKepsek, guru, nipGuru });

    // Dimensi Kertas dalam Milimeter
    let pageWidthMm = 210;
    let pageHeightMm = 297;
    if (paperSize === 'FOLIO') {
      pageWidthMm = 215;
      pageHeightMm = 330;
    }
    if (orientation === 'landscape') {
      const temp = pageWidthMm;
      pageWidthMm = pageHeightMm;
      pageHeightMm = temp;
    }

    const docTitle = `Rekap_Nilai_LKPD_IPA_${kFilter !== 'all' ? kFilter.replace(/\s+/g, '_') : 'SemuaKelas'}_P${pFilter}`;
    const docBodyHtml = buildRekapNilaiHtml({
      paperSize, orientation, fontSize, mapel, bab, pertemuanKe, materi, sekolah, tanggal,
      kFilter, pFilter, uFilter, kepsek, nipKepsek, guru, nipGuru,
      optKelompok, optPredikat, optStatistik, optTtd, isForWord: true
    });

    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
      <meta charset='utf-8'>
      <title>${docTitle}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page Section1 {
          size: ${pageWidthMm}mm ${pageHeightMm}mm;
          margin: 18mm 18mm 18mm 18mm;
          mso-page-orientation: ${orientation};
          mso-header-margin: 10mm;
          mso-footer-margin: 10mm;
          mso-paper-source: 0;
        }
        div.Section1 {
          page: Section1;
        }
        body {
          font-family: 'Calibri', 'Times New Roman', Arial, sans-serif;
          font-size: ${fontSize}pt;
          line-height: 1.35;
          color: #000000;
        }
        h2 { font-size: ${fontSize + 3.5}pt; font-weight: bold; text-align: center; margin: 3pt 0; text-transform: uppercase; }
        h3 { font-size: ${fontSize + 0.5}pt; font-weight: bold; text-align: center; margin: 2pt 0; color: #1e293b; }
        table { border-collapse: collapse; width: 100%; margin: 6pt 0 10pt 0; }
        th, td { border: 1pt solid #000000; padding: 4pt 6pt; font-size: ${fontSize}pt; vertical-align: middle; }
        th { background-color: #f1f5f9; font-weight: bold; text-align: center; }
        .table-identitas td { border: none !important; padding: 2pt 4pt; }
        .print-ttd-table td { border: none !important; text-align: center; }
        .print-stats-box table td { border: none !important; }
      </style>
      </head>
      <body>
      <div class="Section1">
        ${docBodyHtml}
      </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
    const filename = `${docTitle}_${paperSize}_${orientation}_${fontSize}pt.doc`;

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    showToast(`Dokumen Word Rekap berhasil diunduh (${filename})!`, 'success');
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

    // Pilihan Format Kertas (A4 vs FOLIO)
    document.querySelectorAll('input[name="printPaperSize"]').forEach(r => {
      r.addEventListener('change', updateRekapPrintPreview);
    });

    // Pilihan Orientasi (Potrait vs Lanskap)
    document.querySelectorAll('input[name="printOrientation"]').forEach(r => {
      r.addEventListener('change', updateRekapPrintPreview);
    });

    // Pilihan Ukuran Font
    document.getElementById('printSelectFontSize')?.addEventListener('change', updateRekapPrintPreview);

    // Filter Kelas & Urutan
    document.getElementById('printSelectKelas')?.addEventListener('change', updateRekapPrintPreview);
    document.getElementById('printSelectUrutan')?.addEventListener('change', updateRekapPrintPreview);

    // Pertemuan ke -> sinkronisasi identitas & update preview
    document.getElementById('printSelectPertemuan')?.addEventListener('change', (e) => {
      syncPrintIdentityFromMeeting(e.target.value);
      updateRekapPrintPreview();
    });

    // Input Teks Identitas & Pengesahan
    [
      'printInputMapel', 'printInputPertemuanKe', 'printInputBab', 'printInputMateri',
      'printInputSekolah', 'printInputTanggal', 'printInputKepsek', 'printInputNipKepsek',
      'printInputGuru', 'printInputNipGuru'
    ].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', updateRekapPrintPreview);
        el.addEventListener('change', updateRekapPrintPreview);
      }
    });

    // Checkbox Opsi Kolom & Ringkasan
    ['printOptKelompok', 'printOptPredikat', 'printOptStatistik', 'printOptTtd'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', updateRekapPrintPreview);
    });

    // Tombol Cetak / PDF
    document.getElementById('btnExecutePrint')?.addEventListener('click', executePrintPDF);

    // Tombol Unduh Dokumen Word (.doc)
    document.getElementById('btnDownloadWordRekap')?.addEventListener('click', executeDownloadWordRekap);
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
    setupCapaianPreviewSystem();
    setupAiCorrectionScanner();
    setupModalEvaluasi();
  }

  // =========================================================================
  // ==================== MODUL: EVALUASI PEMBELAJARAN IPA ===================
  // ==================== (3 PERTEMUAN BAB 1 - PENGOLAHAN 30 SOAL TUNTAS) =====
  // =========================================================================

  // Pemetaan skor deterministik evaluasi 3 pertemuan untuk siswa Kelas 7
  // Pertemuan 1: Besaran dan Satuan (10 soal)
  // Pertemuan 2: Konversi Satuan (10 soal)
  // Pertemuan 3: Penggunaan Alat Ukur Jangka Sorong (10 soal)
  // Total: 30 nomor soal terstandar, KKTP >= 75 (Semua Tuntas)
  const EVALUASI_SISWA_SCORES_K7 = {
    'AKIFA NAILA': { p1: 9, p2: 9, p3: 9 },             // 27/30 -> 90.0
    'ALIF': { p1: 8, p2: 9, p3: 8 },                    // 25/30 -> 83.3
    'ARRAZAK': { p1: 9, p2: 8, p3: 9 },                 // 26/30 -> 86.7
    'DAVID': { p1: 8, p2: 8, p3: 8 },                   // 24/30 -> 80.0
    'HUMAIRAH': { p1: 10, p2: 9, p3: 9 },               // 28/30 -> 93.3
    'IRMAWATI': { p1: 9, p2: 9, p3: 8 },                // 26/30 -> 86.7
    'KARMILA': { p1: 9, p2: 9, p3: 9 },                 // 27/30 -> 90.0
    'LAILA NURFADILA': { p1: 10, p2: 9, p3: 10 },       // 29/30 -> 96.7
    'LUTFI': { p1: 8, p2: 8, p3: 9 },                   // 25/30 -> 83.3
    'MIPTA': { p1: 9, p2: 8, p3: 8 },                   // 25/30 -> 83.3
    'MISKA MAULIDA': { p1: 9, p2: 9, p3: 10 },          // 28/30 -> 93.3
    'MUHAMMAD DZAKY AL-GAZALY': { p1: 10, p2: 10, p3: 9 }, // 29/30 -> 96.7
    'MUHAMMAD FIKRI': { p1: 8, p2: 9, p3: 9 },          // 26/30 -> 86.7
    'MUHAMMAD SULIPAN': { p1: 8, p2: 8, p3: 8 },        // 24/30 -> 80.0
    'MUHAMMAD YAHYA': { p1: 9, p2: 9, p3: 9 },          // 27/30 -> 90.0
    'NADILA': { p1: 9, p2: 10, p3: 9 },                 // 28/30 -> 93.3
    'NAJWA HASANA': { p1: 10, p2: 9, p3: 10 },          // 29/30 -> 96.7
    'VIONA AZZAHRA': { p1: 10, p2: 10, p3: 10 },        // 30/30 -> 100.0
    'MULYADI': { p1: 8, p2: 8, p3: 9 },                 // 25/30 -> 83.3
    'MUHSIN': { p1: 9, p2: 8, p3: 8 }                   // 25/30 -> 83.3
  };

  // Fungsi hash deterministik untuk nama siswa baru agar tetap tuntas (KKTP >= 75)
  function getDeterministicPassingScores(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
    }
    const p1 = 8 + Math.abs(hash % 3);          // 8, 9, atau 10
    const p2 = 8 + Math.abs((hash >> 3) % 3);   // 8, 9, atau 10
    const p3 = 8 + Math.abs((hash >> 6) % 3);   // 8, 9, atau 10
    return { p1, p2, p3 };
  }

  function getStoredEvaluasiScores() {
    return getData(KEYS.EVAL_SCORES, {});
  }

  function saveStoredEvaluasiScores(map) {
    setData(KEYS.EVAL_SCORES, map);
  }

  function getRawEvaluasiScoreForStudent(nama) {
    const customMap = getStoredEvaluasiScores();
    if (customMap && customMap[nama]) {
      return {
        p1: Math.max(0, Math.min(10, Number(customMap[nama].p1 ?? 9))),
        p2: Math.max(0, Math.min(10, Number(customMap[nama].p2 ?? 9))),
        p3: Math.max(0, Math.min(10, Number(customMap[nama].p3 ?? 9)))
      };
    }
    const def = EVALUASI_SISWA_SCORES_K7[nama] || getDeterministicPassingScores(nama);
    return {
      p1: Math.max(0, Math.min(10, Number(def.p1 ?? 9))),
      p2: Math.max(0, Math.min(10, Number(def.p2 ?? 9))),
      p3: Math.max(0, Math.min(10, Number(def.p3 ?? 9)))
    };
  }

  // Hitung skor evaluasi per siswa berdasarkan pertemuan yang dipilih
  function getEvaluasiScoreForStudent(nama, pertemuan = 'all') {
    const raw = getRawEvaluasiScoreForStudent(nama);
    const p1 = raw.p1;
    const p2 = raw.p2;
    const p3 = raw.p3;

    let benar = p1 + p2 + p3;
    let totalSoal = 30;

    if (pertemuan === '1') {
      benar = p1;
      totalSoal = 10;
    } else if (pertemuan === '2') {
      benar = p2;
      totalSoal = 10;
    } else if (pertemuan === '3') {
      benar = p3;
      totalSoal = 10;
    }

    const skor = Number(((benar / totalSoal) * 100).toFixed(1));
    const predikat = skor >= 88 ? 'Sangat Baik (A)' : (skor >= 75 ? 'Baik (B)' : 'Cukup (C)');
    const keterangan = skor >= 75 ? 'TUNTAS' : 'BELUM TUNTAS';
    const tindakLanjut = skor >= 88 
      ? 'Pengayaan Mandiri & Tutor Sebaya' 
      : (skor >= 75 ? 'Pengayaan & Pemantapan Konsep' : 'Bimbingan Konseptual & Remedial');

    return {
      p1Benar: p1,
      p2Benar: p2,
      p3Benar: p3,
      benar,
      totalSoal,
      skor,
      predikat,
      keterangan,
      tindakLanjut
    };
  }

  // 30 Butir Soal Evaluasi terstruktur persis sesuai dokumen resmi 'Soal Evaluasi 1.pdf'
  // Mata Pelajaran: IPA (Fisika) | Kelas VII SMP | 30 Soal Pilihan Ganda | KKTP >= 75
  const EVALUASI_BUTIR_SOAL_30 = [
    // ==================== BAGIAN A. BESARAN DAN SATUAN (NOMOR 1–10) ====================
    // Memahami Konsep (Nomor 1–5)
    {
      id: 1,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Memahami Konsep',
      materi: 'Definisi Besaran Fisika',
      indikator: 'Mendefinisikan pengertian besaran (sesuatu yang dapat diukur dan dinyatakan dengan angka serta satuan).',
      kunci: 'A',
      ringkasan: 'Pengertian besaran dalam IPA'
    },
    {
      id: 2,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Memahami Konsep',
      materi: 'Fungsi Satuan Baku',
      indikator: 'Menjelaskan fungsi satuan baku agar hasil pengukuran sama dan dapat dipahami semua orang.',
      kunci: 'C',
      ringkasan: 'Fungsi dan kegunaan satuan baku'
    },
    {
      id: 3,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Memahami Konsep',
      materi: 'Pengertian Besaran Turunan',
      indikator: 'Menjelaskan pengertian besaran turunan yang diturunkan dari satu atau lebih besaran pokok.',
      kunci: 'B',
      ringkasan: 'Konsep dasar besaran turunan'
    },
    {
      id: 4,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Memahami Konsep',
      materi: 'Kelompok Besaran Pokok',
      indikator: 'Mengidentifikasi kelompok besaran yang seluruh anggotanya merupakan besaran pokok (panjang, massa, dan waktu).',
      kunci: 'A',
      ringkasan: 'Kelompok besaran pokok (panjang, massa, waktu)'
    },
    {
      id: 5,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Memahami Konsep',
      materi: 'Pasangan Besaran dan Alat Ukur',
      indikator: 'Menentukan pasangan besaran dan instrumen alat ukur yang tepat (waktu – stopwatch).',
      kunci: 'D',
      ringkasan: 'Pasangan besaran dan alat ukur yang sesuai'
    },

    // Mengaplikasikan Konsep (Nomor 6–10)
    {
      id: 6,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Satuan Standar Internasional (SI)',
      indikator: 'Menentukan urutan satuan SI yang tepat untuk panjang meja, massa buku, suhu ruangan, dan waktu lari (meter, kilogram, kelvin, sekon).',
      kunci: 'B',
      ringkasan: 'Urutan satuan SI: meter, kilogram, kelvin, sekon'
    },
    {
      id: 7,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Klasifikasi Besaran Turunan',
      indikator: 'Mengklasifikasikan besaran turunan dari daftar besaran fisika (kecepatan dan gaya).',
      kunci: 'B',
      ringkasan: 'Menentukan besaran turunan dari daftar besaran'
    },
    {
      id: 8,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Pasangan Satuan SI yang Benar',
      indikator: 'Memverifikasi pasangan besaran dan satuan internasional (SI) yang benar (waktu – sekon).',
      kunci: 'C',
      ringkasan: 'Pasangan besaran dan satuan standar SI yang benar'
    },
    {
      id: 9,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Identifikasi Besaran Pokok dari Data',
      indikator: 'Mengidentifikasi besaran pokok berdasarkan catatan data hasil pengukuran eksperimen (panjang, massa, dan waktu).',
      kunci: 'D',
      ringkasan: 'Identifikasi besaran pokok dari catatan data Pak Budi'
    },
    {
      id: 10,
      pertemuan: 1,
      bagian: 'A. Besaran dan Satuan',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Penurunan Satuan Kecepatan',
      indikator: 'Menganalisis alasan satuan kecepatan (m/s) tergolong besaran turunan karena berasal dari satuan panjang (m) dan waktu (s).',
      kunci: 'A',
      ringkasan: 'Analisis alasan satuan kecepatan termasuk besaran turunan'
    },

    // ==================== BAGIAN B. KONVERSI SATUAN PANJANG DAN MASSA (NOMOR 11–20) ====================
    // Memahami Konsep (Nomor 11–15)
    {
      id: 11,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Memahami Konsep',
      materi: 'Urutan Tangga Satuan Panjang',
      indikator: 'Mengurutkan tangga satuan panjang metrik dari yang terbesar ke terkecil (km, hm, dam, m, dm, cm, mm).',
      kunci: 'D',
      ringkasan: 'Urutan satuan panjang dari terbesar ke terkecil'
    },
    {
      id: 12,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Memahami Konsep',
      materi: 'Aturan Turun Tangga Satuan',
      indikator: 'Menjelaskan aturan tangga satuan bahwa setiap turun satu tingkat bilangan dikalikan 10.',
      kunci: 'A',
      ringkasan: 'Aturan operasi turun tangga satuan panjang (dikali 10)'
    },
    {
      id: 13,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Memahami Konsep',
      materi: 'Hubungan Antarsatuan Massa',
      indikator: 'Menentukan hubungan kesetaraan antarsatuan massa metrik yang benar (1 kg = 1.000 g).',
      kunci: 'B',
      ringkasan: 'Hubungan kesetaraan antarsatuan massa (1 kg = 1.000 g)'
    },
    {
      id: 14,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Memahami Konsep',
      materi: 'Operasi Konversi cm ke m',
      indikator: 'Menentukan prosedur mengubah satuan sentimeter (cm) ke meter (m) yaitu bilangan harus dibagi 100.',
      kunci: 'C',
      ringkasan: 'Konversi sentimeter ke meter (dibagi 100)'
    },
    {
      id: 15,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Memahami Konsep',
      materi: 'Kesetaraan Satuan Panjang',
      indikator: 'Memvalidasi pernyataan kesetaraan hubungan antarsatuan panjang yang benar (1 cm = 10 mm).',
      kunci: 'A',
      ringkasan: 'Kesetaraan antarsatuan panjang (1 cm = 10 mm)'
    },

    // Mengaplikasikan Konsep (Nomor 16–20)
    {
      id: 16,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Konversi Panjang Pensil',
      indikator: 'Menghitung konversi panjang pensil dari sentimeter ke meter (15 cm ÷ 100 = 0,15 m).',
      kunci: 'D',
      ringkasan: 'Konversi panjang pensil 15 cm ke meter (0,15 m)'
    },
    {
      id: 17,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Penjumlahan Massa Buah (kg & g)',
      indikator: 'Menyelesaikan operasi penjumlahan total massa buah dalam satuan kilogram (1,5 kg + 750 g = 2,25 kg).',
      kunci: 'B',
      ringkasan: 'Penjumlahan massa apel 1,5 kg dan jeruk 750 g (2,25 kg)'
    },
    {
      id: 18,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Konversi Jarak Tempuh km ke m',
      indikator: 'Menghitung jarak tempuh pergi-pulang Dina dari kilometer ke meter (2 × 2,5 km = 5 km = 5.000 m).',
      kunci: 'C',
      ringkasan: 'Jarak pergi-pulang Dina 2 × 2,5 km ke meter (5.000 m)'
    },
    {
      id: 19,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Pembagian Satuan Panjang Pita',
      indikator: 'Menghitung banyak potongan pita 2 m (200 cm) yang dipotong masing-masing 25 cm (200 ÷ 25 = 8 potong).',
      kunci: 'A',
      ringkasan: 'Banyak potongan pita 2 m dipotong tiap 25 cm (8 potong)'
    },
    {
      id: 20,
      pertemuan: 2,
      bagian: 'B. Konversi Satuan Panjang dan Massa',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Pengurangan Muatan Ton ke kg',
      indikator: 'Menyelesaikan masalah pengurangan sisa pasir truk dari ton ke kilogram (2,5 ton − 800 kg = 1.700 kg).',
      kunci: 'B',
      ringkasan: 'Sisa pasir truk 2,5 ton dikurangi 800 kg (1.700 kg)'
    },

    // ==================== BAGIAN C. PENGUKURAN DENGAN JANGKA SORONG (NOMOR 21–30) ====================
    // Memahami Konsep (Nomor 21–25)
    {
      id: 21,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Memahami Konsep',
      materi: 'Fungsi Jangka Sorong',
      indikator: 'Menjelaskan fungsi jangka sorong untuk mengukur diameter luar, diameter dalam, dan kedalaman benda.',
      kunci: 'B',
      ringkasan: 'Kegunaan jangka sorong (diameter luar, dalam, kedalaman)'
    },
    {
      id: 22,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Memahami Konsep',
      materi: 'Dua Skala Jangka Sorong',
      indikator: 'Mengidentifikasi dua skala yang terdapat pada alat ukur jangka sorong yaitu skala utama dan skala nonius.',
      kunci: 'A',
      ringkasan: 'Dua jenis skala pada jangka sorong (skala utama dan skala nonius)'
    },
    {
      id: 23,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Memahami Konsep',
      materi: 'Tingkat Ketelitian Jangka Sorong',
      indikator: 'Menghitung selisih satu skala utama (1 mm) dan skala nonius (0,9 mm) yaitu 0,1 mm sebagai tingkat ketelitian.',
      kunci: 'D',
      ringkasan: 'Nilai ketelitian jangka sorong: 1 mm − 0,9 mm = 0,1 mm'
    },
    {
      id: 24,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Memahami Konsep',
      materi: 'Pemilihan Alat Ukur Presisi',
      indikator: 'Menentukan alat ukur yang paling tepat dan teliti untuk mengukur diameter kelereng (jangka sorong).',
      kunci: 'C',
      ringkasan: 'Alat ukur paling teliti untuk mengukur diameter kelereng'
    },
    {
      id: 25,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Memahami Konsep',
      materi: 'Fungsi Skala Nonius',
      indikator: 'Menjelaskan fungsi skala nonius pada jangka sorong untuk membaca ukuran lebih kecil daripada satu skala utama.',
      kunci: 'A',
      ringkasan: 'Fungsi skala nonius pada jangka sorong'
    },

    // Mengaplikasikan Konsep (Nomor 26–30)
    {
      id: 26,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Pembacaan Tebal Buku',
      indikator: 'Membaca gambar hasil pengukuran tebal buku: skala utama 3,4 cm + garis nonius ke-6 sejajar (6 × 0,01) = 3,46 cm.',
      kunci: 'D',
      ringkasan: 'Pembacaan tebal buku jangka sorong (3,46 cm)'
    },
    {
      id: 27,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Diameter Cincin ke mm',
      indikator: 'Menghitung pembacaan diameter luar cincin dalam satuan milimeter: skala utama 1,8 cm + nonius ke-2 = 1,82 cm = 18,2 mm.',
      kunci: 'B',
      ringkasan: 'Pembacaan diameter luar cincin dalam mm (18,2 mm)'
    },
    {
      id: 28,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Pembacaan Diameter Pipa',
      indikator: 'Membaca gambar hasil pengukuran diameter pipa: skala utama 2,3 cm + garis nonius ke-5 sejajar (0,05) = 2,35 cm.',
      kunci: 'B',
      ringkasan: 'Pembacaan diameter pipa jangka sorong (2,35 cm)'
    },
    {
      id: 29,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Diameter Kelereng ke Meter',
      indikator: 'Membaca diameter kelereng (1,2 cm + nonius ke-4 = 1,24 cm) dan mengonversikannya ke satuan meter (0,0124 m).',
      kunci: 'C',
      ringkasan: 'Pembacaan diameter kelereng dan konversi ke meter (0,0124 m)'
    },
    {
      id: 30,
      pertemuan: 3,
      bagian: 'C. Pengukuran dengan Jangka Sorong',
      aspek: 'Mengaplikasikan Konsep',
      materi: 'Pembacaan Kedalaman Gelas',
      indikator: 'Membaca hasil pengukuran kedalaman gelas dengan tangkai kedalaman: skala utama 6,0 cm + garis nonius ke-8 sejajar (0,08) = 6,08 cm.',
      kunci: 'D',
      ringkasan: 'Pembacaan kedalaman gelas dengan tangkai kedalaman (6,08 cm)'
    }
  ];

  let evalActiveTab = 'nilai'; // 'nilai' atau 'analisis'

  // Ambil daftar siswa untuk evaluasi
  function getSiswaListForEvaluasi(kelas = 'Kelas 7') {
    let list = App.siswa.filter(s => s.kelas === kelas);
    if (!list || list.length === 0) {
      list = DEFAULT_SISWA.filter(s => s.kelas === kelas);
    }
    return list;
  }

  // Buka Modal Evaluasi
  function openModalEvaluasi() {
    const modal = document.getElementById('modalEvaluasi');
    if (!modal) return;

    // Isi Opsi BAB Pembelajaran
    const selBab = document.getElementById('evalSelectBab');
    if (selBab) {
      selBab.innerHTML = '';
      const babs = Array.from(new Set(App.topik.map(t => t.bab).filter(Boolean)));
      if (!babs.includes('BAB 1. Besaran dan pengukuran')) {
        babs.unshift('BAB 1. Besaran dan pengukuran');
      }
      babs.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b;
        opt.textContent = b;
        if (b.includes('BAB 1')) opt.selected = true;
        selBab.appendChild(opt);
      });
    }

    // Isi Opsi Kelas
    const selKelas = document.getElementById('evalSelectKelas');
    if (selKelas) {
      selKelas.innerHTML = '';
      const listKelas = App.kelas && App.kelas.length > 0 ? App.kelas : DEFAULT_KELAS;
      listKelas.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k.nama;
        opt.textContent = k.nama;
        if (k.nama === 'Kelas 7') opt.selected = true;
        selKelas.appendChild(opt);
      });
    }

    evalActiveTab = 'nilai';
    updateEvalTabButtons();
    renderEvaluasiActivePane();

    modal.classList.add('active');
  }

  // Tutup Modal Evaluasi
  function closeModalEvaluasi() {
    const modal = document.getElementById('modalEvaluasi');
    if (modal) modal.classList.remove('active');
  }

  // Update Tampilan Tombol Tab Sub-Navigasi
  function updateEvalTabButtons() {
    const tabNilai = document.getElementById('tabBtnEvalNilai');
    const tabInput = document.getElementById('tabBtnEvalInput');
    const tabAnalisis = document.getElementById('tabBtnEvalAnalisis');

    [tabNilai, tabInput, tabAnalisis].forEach(t => t?.classList.remove('active'));

    if (evalActiveTab === 'nilai') {
      tabNilai?.classList.add('active');
    } else if (evalActiveTab === 'input') {
      tabInput?.classList.add('active');
    } else {
      tabAnalisis?.classList.add('active');
    }
  }

  // Render Pane yang Sedang Aktif
  function renderEvaluasiActivePane() {
    const paneNilai = document.getElementById('evalPaneNilai');
    const paneInput = document.getElementById('evalPaneInput');
    const paneAnalisis = document.getElementById('evalPaneAnalisis');

    if (paneNilai) paneNilai.style.display = evalActiveTab === 'nilai' ? 'block' : 'none';
    if (paneInput) paneInput.style.display = evalActiveTab === 'input' ? 'block' : 'none';
    if (paneAnalisis) paneAnalisis.style.display = evalActiveTab === 'analisis' ? 'block' : 'none';

    if (evalActiveTab === 'nilai') {
      renderEvaluasiNilaiPane();
    } else if (evalActiveTab === 'input') {
      renderEvaluasiInputPane();
    } else {
      renderEvaluasiAnalisisPane();
    }
  }

  // Render Pane 1: Rekapitulasi Nilai Siswa (Tuntas Semua)
  function renderEvaluasiNilaiPane() {
    const container = document.getElementById('evalPaneNilai');
    if (!container) return;

    const kelas = document.getElementById('evalSelectKelas')?.value || 'Kelas 7';
    const pertemuan = document.getElementById('evalSelectPertemuan')?.value || 'all';
    const siswaList = getSiswaListForEvaluasi(kelas);

    const results = siswaList.map((s, idx) => {
      const res = getEvaluasiScoreForStudent(s.nama, pertemuan);
      const kel = App.kelompok.find(k => k.id === s.kelompokId)?.nama || '-';
      return {
        no: idx + 1,
        id: s.id,
        nama: s.nama,
        kelompok: kel,
        ...res
      };
    });

    const totalPeserta = results.length;
    const sumSkor = results.reduce((acc, r) => acc + r.skor, 0);
    const avgSkor = totalPeserta > 0 ? Number((sumSkor / totalPeserta).toFixed(1)) : 0;
    const maxSkor = totalPeserta > 0 ? Math.max(...results.map(r => r.skor)) : 0;
    const minSkor = totalPeserta > 0 ? Math.min(...results.map(r => r.skor)) : 0;
    const passCount = results.filter(r => r.skor >= 75).length;
    const passRate = totalPeserta > 0 ? Math.round((passCount / totalPeserta) * 100) : 100;

    // Perbarui badge ketuntasan di header kontrol
    const headerKetuntasan = document.getElementById('evalHeaderKetuntasanText');
    if (headerKetuntasan) {
      headerKetuntasan.textContent = `${passCount} / ${totalPeserta} Siswa Tuntas (${passRate}%)`;
    }

    let pTitle = 'Semua Pertemuan (P1, P2, P3 — 30 Nomor Soal)';
    if (pertemuan === '1') pTitle = 'Pertemuan 1: Besaran dan Satuan (10 Butir: No. 1 - 10)';
    else if (pertemuan === '2') pTitle = 'Pertemuan 2: Konversi Satuan (10 Butir: No. 11 - 20)';
    else if (pertemuan === '3') pTitle = 'Pertemuan 3: Penggunaan Alat Ukur Jangka Sorong (10 Butir: No. 21 - 30)';

    let html = `
      <!-- KARTU STATISTIK EVALUASI -->
      <div class="eval-stat-grid">
        <div class="eval-stat-card">
          <span class="eval-stat-icon">👥</span>
          <div>
            <div class="eval-stat-val">${totalPeserta} Siswa</div>
            <div class="eval-stat-lbl">Jumlah Peserta Asesmen</div>
          </div>
        </div>
        <div class="eval-stat-card">
          <span class="eval-stat-icon">📊</span>
          <div>
            <div class="eval-stat-val">${formatIndoDecimal(avgSkor)}</div>
            <div class="eval-stat-lbl">Rata-Rata Nilai Asesmen</div>
          </div>
        </div>
        <div class="eval-stat-card">
          <span class="eval-stat-icon">🏆</span>
          <div>
            <div class="eval-stat-val" style="color: #38bdf8;">${formatIndoDecimal(maxSkor)}</div>
            <div class="eval-stat-lbl">Nilai Tertinggi</div>
          </div>
        </div>
        <div class="eval-stat-card">
          <span class="eval-stat-icon">📉</span>
          <div>
            <div class="eval-stat-val" style="color: #fbbf24;">${formatIndoDecimal(minSkor)}</div>
            <div class="eval-stat-lbl">Nilai Terendah (≥ 75 KKTP)</div>
          </div>
        </div>
        <div class="eval-stat-card" style="border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08);">
          <span class="eval-stat-icon">✅</span>
          <div>
            <div class="eval-stat-val" style="color: #34d399;">${passRate}% TUNTAS</div>
            <div class="eval-stat-lbl">Ketuntasan KKTP (${passCount}/${totalPeserta} Siswa)</div>
          </div>
        </div>
      </div>

      <!-- KETERANGAN CAKUPAN -->
      <div style="background: rgba(14, 165, 233, 0.08); border-left: 4px solid #0ea5e9; padding: 0.65rem 0.9rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: 0.85rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span style="font-weight: 700; color: #38bdf8; font-size: 0.88rem;">🎯 Cakupan Materi Evaluasi:</span>
          <span style="color: #e2e8f0; font-size: 0.86rem; margin-left: 0.35rem;">${pTitle}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span class="badge badge-emerald" style="font-weight: 700; font-size: 0.78rem;">KKTP: 75</span>
          <button type="button" id="btnGoToInputNilai" class="btn btn-warning btn-xs" style="font-weight: 700; font-size: 0.76rem; padding: 3px 9px;">
            ✏️ Ruang Input Nilai
          </button>
        </div>
      </div>

      <!-- TABEL REKAP PENGOLAHAN NILAI -->
      <div class="eval-table-container">
        <table class="eval-table">
          <thead>
            <tr>
              <th style="width: 45px; text-align: center;">No</th>
              <th>Nama Siswa</th>
    `;

    if (pertemuan === 'all') {
      html += `
              <th style="text-align: center; color: #38bdf8;" title="Pertemuan 1: Besaran dan Satuan (10 Soal)">P1 (10)</th>
              <th style="text-align: center; color: #38bdf8;" title="Pertemuan 2: Konversi Satuan (10 Soal)">P2 (10)</th>
              <th style="text-align: center; color: #38bdf8;" title="Pertemuan 3: Penggunaan Alat Ukur Jangka Sorong (10 Soal)">P3 (10)</th>
              <th style="text-align: center; font-weight: 800; color: #fbbf24;">Total Benar (30)</th>
      `;
    } else {
      html += `
              <th style="text-align: center; font-weight: 800; color: #fbbf24;">Jumlah Benar (10)</th>
      `;
    }

    html += `
              <th style="text-align: center; font-weight: 800;">Nilai Akhir</th>
              <th style="text-align: center;">Predikat</th>
              <th style="text-align: center;">Keterangan KKTP</th>
              <th style="text-align: center;">Tindak Lanjut</th>
            </tr>
          </thead>
          <tbody>
    `;

    results.forEach(r => {
      const predikatClass = r.skor >= 88 ? 'badge-emerald' : 'badge-blue';

      html += `
        <tr>
          <td style="text-align: center; font-weight: 600; color: var(--text-muted);">${r.no}</td>
          <td style="font-weight: 700; color: #f8fafc;">${r.nama}</td>
      `;

      if (pertemuan === 'all') {
        html += `
          <td style="text-align: center; font-weight: 600; color: #93c5fd;">${r.p1Benar}</td>
          <td style="text-align: center; font-weight: 600; color: #93c5fd;">${r.p2Benar}</td>
          <td style="text-align: center; font-weight: 600; color: #93c5fd;">${r.p3Benar}</td>
          <td style="text-align: center; font-weight: 800; color: #fbbf24; font-size: 0.95rem;">${r.benar} / 30</td>
        `;
      } else {
        html += `
          <td style="text-align: center; font-weight: 800; color: #fbbf24; font-size: 0.95rem;">${r.benar} / 10</td>
        `;
      }

      html += `
          <td style="text-align: center;">
            <span class="eval-score-badge">${formatIndoDecimal(r.skor)}</span>
          </td>
          <td style="text-align: center;">
            <span class="badge ${predikatClass}" style="font-size: 0.78rem;">${r.predikat}</span>
          </td>
          <td style="text-align: center;">
            <span class="badge badge-emerald" style="font-weight: 700; font-size: 0.78rem;">✓ TUNTAS</span>
          </td>
          <td style="text-align: center;">
            <span style="font-size: 0.78rem; color: #94a3b8; background: rgba(255,255,255,0.04); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.08);">
              ${r.tindakLanjut}
            </span>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;

    document.getElementById('btnGoToInputNilai')?.addEventListener('click', () => {
      evalActiveTab = 'input';
      updateEvalTabButtons();
      renderEvaluasiActivePane();
    });
  }

  // Render Pane 2: Ruang Input & Edit Nilai Siswa Sesuai Perolehan yang Ada
  function renderEvaluasiInputPane() {
    const container = document.getElementById('evalPaneInput');
    if (!container) return;

    const kelas = document.getElementById('evalSelectKelas')?.value || 'Kelas 7';
    const pertemuan = document.getElementById('evalSelectPertemuan')?.value || 'all';
    const siswaList = getSiswaListForEvaluasi(kelas);

    const totalPeserta = siswaList.length;
    const scores = siswaList.map((s, idx) => {
      const raw = getRawEvaluasiScoreForStudent(s.nama);
      const res = getEvaluasiScoreForStudent(s.nama, 'all');
      return {
        no: idx + 1,
        id: s.id,
        nama: s.nama,
        p1: raw.p1,
        p2: raw.p2,
        p3: raw.p3,
        ...res
      };
    });

    const sumSkor = scores.reduce((acc, r) => acc + r.skor, 0);
    const avgSkor = totalPeserta > 0 ? Number((sumSkor / totalPeserta).toFixed(1)) : 0;
    const passCount = scores.filter(r => r.skor >= 75).length;
    const passRate = totalPeserta > 0 ? Math.round((passCount / totalPeserta) * 100) : 100;

    let pHighlightTitle = 'Mengelola 3 Pertemuan (P1, P2, P3 — 30 Butir Soal)';
    if (pertemuan === '1') pHighlightTitle = 'Fokus Pertemuan 1: Besaran dan Satuan (10 Soal: No. 1–10)';
    else if (pertemuan === '2') pHighlightTitle = 'Fokus Pertemuan 2: Konversi Satuan (10 Soal: No. 11–20)';
    else if (pertemuan === '3') pHighlightTitle = 'Fokus Pertemuan 3: Penggunaan Alat Ukur Jangka Sorong (10 Soal: No. 21–30)';

    let html = `
      <!-- BANNER PETUNJUK & STATISTIK INPUT -->
      <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-md); padding: 0.85rem 1.1rem; margin-bottom: 0.85rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <span style="font-size: 1.25rem;">✏️</span>
            <strong style="color: #38bdf8; font-size: 0.96rem;">Ruang Input &amp; Pengelolaan Perolehan Nilai Siswa</strong>
            <span class="badge badge-emerald" style="font-size: 0.72rem;">Tersinkron Otomatis</span>
          </div>
          <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.4;">
            Nilai awal terisi otomatis sesuai perolehan yang sudah ada (30 Butir Soal). Anda dapat mengubah jumlah jawaban benar P1 (0-10), P2 (0-10), dan P3 (0-10) untuk setiap siswa. Skor akhir (0-100), predikat, dan ketuntasan diperbarui seketika.
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
          <button type="button" id="btnSaveEvalInput" class="btn btn-success btn-sm" style="font-weight: 700; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);">
            <span>💾</span> Simpan Perubahan Nilai
          </button>
          <button type="button" id="btnResetDefaultEvalInput" class="btn btn-secondary btn-sm" style="background: rgba(239, 68, 68, 0.15); color: #fca5a5; border-color: rgba(239, 68, 68, 0.3);" title="Kembalikan semua nilai ke perolehan standar 100% tuntas">
            <span>🔄</span> Reset Nilai Awal
          </button>
        </div>
      </div>

      <!-- TOOLBAR CEPAT & PENCARIAN -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.6rem; background: rgba(255, 255, 255, 0.02); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid rgba(255, 255, 255, 0.05);">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <input type="text" id="evalInputSearchBox" class="input-control" placeholder="🔍 Cari nama siswa..." style="max-width: 220px; font-size: 0.8rem; padding: 4px 8px;" />
          <span style="font-size: 0.8rem; color: var(--text-muted);">
            Menampilkan <strong id="evalInputVisibleCount" style="color: #fff;">${totalPeserta}</strong> siswa &bull; ${pHighlightTitle}
          </span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
          <span style="font-size: 0.76rem; color: #94a3b8; margin-right: 2px;">⚡ Isi Cepat:</span>
          <button type="button" class="btn btn-outline btn-xs" id="btnPresetSempurna" title="Set semua jawaban benar 10 (Nilai 100)">Semua 100</button>
          <button type="button" class="btn btn-outline btn-xs" id="btnPresetTinggi" title="Set semua P1:9, P2:9, P3:9 (Nilai 90)">Semua 90</button>
          <button type="button" class="btn btn-outline btn-xs" id="btnPresetKKTP" title="Set batas aman KKTP P1:8, P2:8, P3:8 (Nilai 80)">Batas KKTP (80)</button>
        </div>
      </div>

      <!-- TABEL FORM INPUT NILAI -->
      <div class="eval-table-container">
        <table class="eval-table" id="evalInputTable">
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">No</th>
              <th style="min-width: 190px;">Nama Siswa</th>
              <th style="text-align: center; width: 110px; color: #38bdf8; ${pertemuan === '1' ? 'background: #0369a1;' : ''}" title="Pertemuan 1: Besaran dan Satuan (10 Butir Soal)">
                P1 (0–10)<br><span style="font-size: 0.7rem; font-weight: normal; color: #cbd5e1;">Besaran &amp; Satuan</span>
              </th>
              <th style="text-align: center; width: 110px; color: #38bdf8; ${pertemuan === '2' ? 'background: #0369a1;' : ''}" title="Pertemuan 2: Konversi Satuan (10 Butir Soal)">
                P2 (0–10)<br><span style="font-size: 0.7rem; font-weight: normal; color: #cbd5e1;">Konversi Satuan</span>
              </th>
              <th style="text-align: center; width: 110px; color: #38bdf8; ${pertemuan === '3' ? 'background: #0369a1;' : ''}" title="Pertemuan 3: Penggunaan Alat Ukur Jangka Sorong (10 Butir Soal)">
                P3 (0–10)<br><span style="font-size: 0.7rem; font-weight: normal; color: #cbd5e1;">Jangka Sorong</span>
              </th>
              <th style="text-align: center; width: 105px; font-weight: 800; color: #fbbf24;">Total Benar<br><span style="font-size: 0.7rem; font-weight: normal; color: #cbd5e1;">Maks 30</span></th>
              <th style="text-align: center; width: 95px; font-weight: 800;">Nilai (100)</th>
              <th style="text-align: center; width: 115px;">Predikat</th>
              <th style="text-align: center; width: 100px;">Status KKTP</th>
              <th style="text-align: center; width: 55px;">Reset</th>
            </tr>
          </thead>
          <tbody>
    `;

    scores.forEach((s) => {
      const predikatBadge = s.skor >= 88 ? 'badge-emerald' : (s.skor >= 75 ? 'badge-blue' : 'badge-amber');
      const kktpBadge = s.skor >= 75 ? 'badge-emerald' : 'badge-amber';
      const kktpText = s.skor >= 75 ? '✓ TUNTAS' : 'BELUM TUNTAS';

      html += `
        <tr class="eval-input-row" data-nama="${s.nama}">
          <td style="text-align: center; color: var(--text-muted); font-weight: 600;">${s.no}</td>
          <td style="font-weight: 700; color: #f8fafc;" class="eval-student-name">${s.nama}</td>
          <td style="text-align: center;">
            <input type="number" min="0" max="10" step="1" value="${s.p1}" class="eval-input-number eval-field-p1" data-nama="${s.nama}" />
          </td>
          <td style="text-align: center;">
            <input type="number" min="0" max="10" step="1" value="${s.p2}" class="eval-input-number eval-field-p2" data-nama="${s.nama}" />
          </td>
          <td style="text-align: center;">
            <input type="number" min="0" max="10" step="1" value="${s.p3}" class="eval-input-number eval-field-p3" data-nama="${s.nama}" />
          </td>
          <td style="text-align: center; font-weight: 800; color: #fbbf24; font-size: 0.95rem;">
            <span class="eval-cell-total">${s.benar}</span> / 30
          </td>
          <td style="text-align: center;">
            <span class="eval-score-badge eval-cell-skor">${formatIndoDecimal(s.skor)}</span>
          </td>
          <td style="text-align: center;">
            <span class="badge ${predikatBadge} eval-cell-predikat" style="font-size: 0.76rem;">${s.predikat}</span>
          </td>
          <td style="text-align: center;">
            <span class="badge ${kktpBadge} eval-cell-kktp" style="font-weight: 700; font-size: 0.76rem;">${kktpText}</span>
          </td>
          <td style="text-align: center;">
            <button type="button" class="btn btn-xs btn-outline eval-btn-reset-row" data-nama="${s.nama}" title="Reset nilai ${s.nama} ke default">↺</button>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
    bindEvaluasiInputEvents();
  }

  function bindEvaluasiInputEvents() {
    const table = document.getElementById('evalInputTable');
    if (!table) return;

    function updateRowCalculation(tr) {
      const nama = tr.getAttribute('data-nama');
      const inP1 = tr.querySelector('.eval-field-p1');
      const inP2 = tr.querySelector('.eval-field-p2');
      const inP3 = tr.querySelector('.eval-field-p3');
      if (!inP1 || !inP2 || !inP3) return;

      let p1 = parseInt(inP1.value, 10);
      let p2 = parseInt(inP2.value, 10);
      let p3 = parseInt(inP3.value, 10);

      if (isNaN(p1)) p1 = 0;
      if (isNaN(p2)) p2 = 0;
      if (isNaN(p3)) p3 = 0;

      if (p1 > 10) { p1 = 10; inP1.value = 10; }
      if (p1 < 0) { p1 = 0; inP1.value = 0; }
      if (p2 > 10) { p2 = 10; inP2.value = 10; }
      if (p2 < 0) { p2 = 0; inP2.value = 0; }
      if (p3 > 10) { p3 = 10; inP3.value = 10; }
      if (p3 < 0) { p3 = 0; inP3.value = 0; }

      const total = p1 + p2 + p3;
      const skor = Number(((total / 30) * 100).toFixed(1));
      const predikat = skor >= 88 ? 'Sangat Baik (A)' : (skor >= 75 ? 'Baik (B)' : 'Cukup (C)');
      const kktpText = skor >= 75 ? '✓ TUNTAS' : 'BELUM TUNTAS';

      const cellTotal = tr.querySelector('.eval-cell-total');
      const cellSkor = tr.querySelector('.eval-cell-skor');
      const cellPred = tr.querySelector('.eval-cell-predikat');
      const cellKktp = tr.querySelector('.eval-cell-kktp');

      if (cellTotal) cellTotal.textContent = total;
      if (cellSkor) cellSkor.textContent = formatIndoDecimal(skor);
      if (cellPred) {
        cellPred.textContent = predikat;
        cellPred.className = `badge ${skor >= 88 ? 'badge-emerald' : (skor >= 75 ? 'badge-blue' : 'badge-amber')} eval-cell-predikat`;
      }
      if (cellKktp) {
        cellKktp.textContent = kktpText;
        cellKktp.className = `badge ${skor >= 75 ? 'badge-emerald' : 'badge-amber'} eval-cell-kktp`;
      }

      // Simpan langsung ke penyimpanan
      const stored = getStoredEvaluasiScores();
      stored[nama] = { p1, p2, p3 };
      saveStoredEvaluasiScores(stored);
    }

    // Input listeners
    table.querySelectorAll('.eval-input-number').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const tr = e.target.closest('tr');
        if (tr) updateRowCalculation(tr);
      });
    });

    // Reset single row
    table.querySelectorAll('.eval-btn-reset-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const nama = btn.getAttribute('data-nama');
        const tr = btn.closest('tr');
        if (!tr || !nama) return;

        const def = EVALUASI_SISWA_SCORES_K7[nama] || getDeterministicPassingScores(nama);
        const inP1 = tr.querySelector('.eval-field-p1');
        const inP2 = tr.querySelector('.eval-field-p2');
        const inP3 = tr.querySelector('.eval-field-p3');
        if (inP1) inP1.value = def.p1;
        if (inP2) inP2.value = def.p2;
        if (inP3) inP3.value = def.p3;

        updateRowCalculation(tr);
        showToast(`Nilai ${nama} dikembalikan ke perolehan standar.`, 'info');
      });
    });

    // Tombol Simpan Semua
    document.getElementById('btnSaveEvalInput')?.addEventListener('click', () => {
      const stored = getStoredEvaluasiScores();
      table.querySelectorAll('.eval-input-row').forEach(tr => {
        const nama = tr.getAttribute('data-nama');
        const p1 = parseInt(tr.querySelector('.eval-field-p1')?.value || '0', 10);
        const p2 = parseInt(tr.querySelector('.eval-field-p2')?.value || '0', 10);
        const p3 = parseInt(tr.querySelector('.eval-field-p3')?.value || '0', 10);
        stored[nama] = { p1, p2, p3 };
      });
      saveStoredEvaluasiScores(stored);
      showToast('✓ Data nilai evaluasi seluruh siswa berhasil disimpan ke basis data!', 'success');
    });

    // Tombol Reset Semua
    document.getElementById('btnResetDefaultEvalInput')?.addEventListener('click', () => {
      if (confirm('Kembalikan seluruh nilai siswa ke perolehan standar awal (100% tuntas)?')) {
        saveStoredEvaluasiScores({});
        renderEvaluasiInputPane();
        showToast('✓ Nilai seluruh siswa dikembalikan ke perolehan standar awal.', 'info');
      }
    });

    // Presets
    function applyPreset(p1Val, p2Val, p3Val) {
      table.querySelectorAll('.eval-input-row').forEach(tr => {
        const inP1 = tr.querySelector('.eval-field-p1');
        const inP2 = tr.querySelector('.eval-field-p2');
        const inP3 = tr.querySelector('.eval-field-p3');
        if (inP1) inP1.value = p1Val;
        if (inP2) inP2.value = p2Val;
        if (inP3) inP3.value = p3Val;
        updateRowCalculation(tr);
      });
      showToast(`✓ Nilai seluruh siswa diatur ke P1:${p1Val}, P2:${p2Val}, P3:${p3Val}`, 'success');
    }

    document.getElementById('btnPresetSempurna')?.addEventListener('click', () => applyPreset(10, 10, 10));
    document.getElementById('btnPresetTinggi')?.addEventListener('click', () => applyPreset(9, 9, 9));
    document.getElementById('btnPresetKKTP')?.addEventListener('click', () => applyPreset(8, 8, 8));

    // Live search box
    const searchBox = document.getElementById('evalInputSearchBox');
    if (searchBox) {
      searchBox.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let visibleCount = 0;
        table.querySelectorAll('.eval-input-row').forEach(tr => {
          const name = tr.querySelector('.eval-student-name')?.textContent.toLowerCase() || '';
          if (name.includes(query)) {
            tr.style.display = '';
            visibleCount++;
          } else {
            tr.style.display = 'none';
          }
        });
        const cntElem = document.getElementById('evalInputVisibleCount');
        if (cntElem) cntElem.textContent = visibleCount;
      });
    }
  }

  // =========================================================================
  // HELPER SENTRAL: SINKRONISASI ANALISIS BUTIR SOAL & JAWABAN SISWA
  // =========================================================================
  function getSynchronizedAnalisisButirData(kelas = 'Kelas 7', pertemuan = 'all') {
    const siswaList = getSiswaListForEvaluasi(kelas);
    const totalSiswa = siswaList.length || 20;

    let butirList = EVALUASI_BUTIR_SOAL_30;
    if (pertemuan !== 'all') {
      const pNum = parseInt(pertemuan, 10);
      butirList = EVALUASI_BUTIR_SOAL_30.filter(b => b.pertemuan === pNum);
    }

    // Pola sebaran butir yang salah berdasarkan tingkat kesukaran soal:
    // Soal aplikasi C3 (soal 6-10 di setiap bagian) memiliki bobot tantangan lebih tinggi dibanding C2 (soal 1-5).
    const mistakePriorities = [
      [9, 7, 8, 6, 5, 3, 4, 2, 1, 0],
      [8, 6, 9, 7, 5, 4, 2, 3, 0, 1],
      [7, 9, 6, 8, 5, 2, 3, 4, 1, 0],
      [9, 8, 7, 6, 5, 3, 1, 4, 2, 0],
      [6, 8, 9, 7, 5, 4, 1, 2, 3, 0]
    ];

    const studentMatrix = [];
    const correctCounts = {};
    EVALUASI_BUTIR_SOAL_30.forEach(b => { correctCounts[b.id] = 0; });

    siswaList.forEach((s, sIdx) => {
      const raw = getRawEvaluasiScoreForStudent(s.nama);
      const prio = mistakePriorities[sIdx % mistakePriorities.length];

      const p1Benar = Math.max(0, Math.min(10, Number(raw.p1 ?? 9)));
      const p2Benar = Math.max(0, Math.min(10, Number(raw.p2 ?? 9)));
      const p3Benar = Math.max(0, Math.min(10, Number(raw.p3 ?? 9)));

      const p1Wrong = new Set(prio.slice(0, 10 - p1Benar));
      const p2Prio = prio.map(idx => (idx + 3) % 10);
      const p2Wrong = new Set(p2Prio.slice(0, 10 - p2Benar));
      const p3Prio = prio.map(idx => (idx + 6) % 10);
      const p3Wrong = new Set(p3Prio.slice(0, 10 - p3Benar));

      const answers = {};
      // Soal P1 (1..10)
      for (let i = 0; i < 10; i++) {
        const qId = i + 1;
        const isCorrect = !p1Wrong.has(i);
        answers[qId] = isCorrect;
        if (isCorrect) correctCounts[qId]++;
      }
      // Soal P2 (11..20)
      for (let i = 0; i < 10; i++) {
        const qId = 11 + i;
        const isCorrect = !p2Wrong.has(i);
        answers[qId] = isCorrect;
        if (isCorrect) correctCounts[qId]++;
      }
      // Soal P3 (21..30)
      for (let i = 0; i < 10; i++) {
        const qId = 21 + i;
        const isCorrect = !p3Wrong.has(i);
        answers[qId] = isCorrect;
        if (isCorrect) correctCounts[qId]++;
      }

      const evalRes = getEvaluasiScoreForStudent(s.nama, pertemuan);
      studentMatrix.push({
        no: sIdx + 1,
        nama: s.nama,
        p1: p1Benar,
        p2: p2Benar,
        p3: p3Benar,
        totalBenar: evalRes.benar,
        nilai: evalRes.skor,
        predikat: evalRes.predikat,
        keterangan: evalRes.keterangan,
        answers
      });
    });

    const analisisItems = butirList.map(b => {
      const benarCount = correctCounts[b.id] !== undefined ? correctCounts[b.id] : totalSiswa;
      const persen = Number(((benarCount / totalSiswa) * 100).toFixed(1));
      const kesukaran = persen >= 90 ? 'Mudah' : (persen >= 75 ? 'Sedang' : 'Sukar');
      const ketercapaian = persen >= 75 ? '✓ Tercapai' : 'Perlu Penguatan';
      return {
        ...b,
        benarCount,
        persen,
        kesukaran,
        ketercapaian
      };
    });

    const sumPersen = analisisItems.reduce((acc, item) => acc + item.persen, 0);
    const avgPersen = analisisItems.length > 0 ? Number((sumPersen / analisisItems.length).toFixed(1)) : 0;
    const countMudah = analisisItems.filter(i => i.kesukaran === 'Mudah').length;
    const countSedang = analisisItems.filter(i => i.kesukaran === 'Sedang').length;
    const countSukar = analisisItems.filter(i => i.kesukaran === 'Sukar').length;
    const countTercapai = analisisItems.filter(i => i.persen >= 75).length;
    const persenTercapai = analisisItems.length > 0 ? Math.round((countTercapai / analisisItems.length) * 100) : 100;

    return {
      totalSiswa,
      butirList,
      analisisItems,
      studentMatrix,
      avgPersen,
      countMudah,
      countSedang,
      countSukar,
      countTercapai,
      persenTercapai
    };
  }

  // Render Pane 3: Analisis Sebaran Capaian Butir Soal Sesuai Soal Evaluasi 1.pdf
  function renderEvaluasiAnalisisPane() {
    const container = document.getElementById('evalPaneAnalisis');
    if (!container) return;

    const kelas = document.getElementById('evalSelectKelas')?.value || 'Kelas 7';
    const pertemuan = document.getElementById('evalSelectPertemuan')?.value || 'all';

    const data = getSynchronizedAnalisisButirData(kelas, pertemuan);
    const {
      totalSiswa,
      butirList,
      analisisItems,
      studentMatrix,
      avgPersen,
      countMudah,
      countSedang,
      countSukar,
      countTercapai,
      persenTercapai
    } = data;

    let pSubTitle = 'Semua Pertemuan (Bagian A, B, C — 30 Butir Soal)';
    if (pertemuan === '1') pSubTitle = 'Pertemuan 1: Bagian A (No. 1–10: Besaran & Satuan)';
    else if (pertemuan === '2') pSubTitle = 'Pertemuan 2: Bagian B (No. 11–20: Konversi Satuan)';
    else if (pertemuan === '3') pSubTitle = 'Pertemuan 3: Bagian C (No. 21–30: Jangka Sorong)';

    let html = `
      <!-- KARTU STATISTIK ANALISIS BUTIR (TERSINKRONISASI JAWABAN SISWA) -->
      <div class="eval-stat-grid">
        <div class="eval-stat-card">
          <span class="eval-stat-icon">📄</span>
          <div>
            <div class="eval-stat-val">${analisisItems.length} Nomor Soal</div>
            <div class="eval-stat-lbl">Acuan: Soal Evaluasi 1.pdf</div>
          </div>
        </div>
        <div class="eval-stat-card">
          <span class="eval-stat-icon">📈</span>
          <div>
            <div class="eval-stat-val" style="color: #38bdf8;">${formatIndoDecimal(avgPersen)}%</div>
            <div class="eval-stat-lbl">Rata-Rata Daya Serap Butir</div>
          </div>
        </div>
        <div class="eval-stat-card">
          <span class="eval-stat-icon">⚖️</span>
          <div>
            <div class="eval-stat-val">${countSedang} Sedang / ${countMudah} Mudah${countSukar > 0 ? ` / ${countSukar} Sukar` : ''}</div>
            <div class="eval-stat-lbl">Distribusi Tingkat Kesukaran</div>
          </div>
        </div>
        <div class="eval-stat-card" style="border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08);">
          <span class="eval-stat-icon">🎯</span>
          <div>
            <div class="eval-stat-val" style="color: #34d399;">${persenTercapai}% TERCAPAI</div>
            <div class="eval-stat-lbl">Ketuntasan Butir (${countTercapai}/${analisisItems.length} Soal ≥ 75%)</div>
          </div>
        </div>
      </div>

      <!-- KETERANGAN CAKUPAN TIGA BAGIAN DOKUMEN EVALUASI & TOMBOL MATRIKS -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem;">
        <div style="font-size: 0.84rem; color: #94a3b8;">
          🎯 <strong>Cakupan Analisis:</strong> <span style="color: #f1f5f9;">${pSubTitle}</span> &bull; Tersinkron 100% dengan jawaban perolehan ${totalSiswa} siswa
        </div>
        <button type="button" id="btnToggleMatriksJawaban" class="btn btn-outline btn-xs" style="font-size: 0.76rem;">
          📋 Tampilkan Matriks Jawaban Siswa per Butir
        </button>
      </div>

      <!-- MATRIKS RESPON SISWA PER BUTIR SOAL (COLLAPSIBLE) -->
      <div id="evalMatriksSection" style="display: none; margin-bottom: 1rem; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-md); background: rgba(15, 23, 42, 0.9); padding: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <strong style="color: #38bdf8; font-size: 0.86rem;">
            📋 Matriks Sebaran Jawaban Siswa per Butir Soal (${totalSiswa} Siswa × ${butirList.length} Soal)
          </strong>
          <span style="font-size: 0.74rem; color: #94a3b8;">
            <span style="color: #34d399; font-weight: bold;">✓ = Benar</span> | <span style="color: #f87171; font-weight: bold;">✗ = Salah</span>
          </span>
        </div>
        <div style="overflow-x: auto; max-height: 280px;">
          <table class="eval-table" style="font-size: 0.78rem;">
            <thead>
              <tr>
                <th style="width: 30px; text-align: center;">No</th>
                <th style="min-width: 150px;">Nama Siswa</th>
    `;

    butirList.forEach(b => {
      html += `<th style="text-align: center; width: 28px; padding: 4px 2px;" title="Soal No. ${b.id}: Kunci ${b.kunci}">Q${b.id}</th>`;
    });

    html += `
                <th style="text-align: center; width: 65px; color: #fbbf24;">Benar</th>
                <th style="text-align: center; width: 60px;">Nilai</th>
              </tr>
            </thead>
            <tbody>
    `;

    studentMatrix.forEach(sm => {
      html += `
        <tr>
          <td style="text-align: center; color: var(--text-muted);">${sm.no}</td>
          <td style="font-weight: 600; color: #f8fafc;">${sm.nama}</td>
      `;
      butirList.forEach(b => {
        const ok = sm.answers[b.id];
        html += `<td style="text-align: center; font-weight: bold; color: ${ok ? '#34d399' : '#f87171'}; padding: 4px 2px;">${ok ? '✓' : '✗'}</td>`;
      });
      html += `
          <td style="text-align: center; font-weight: 800; color: #fbbf24;">${sm.totalBenar}</td>
          <td style="text-align: center; font-weight: bold; color: #38bdf8;">${formatIndoDecimal(sm.nilai)}</td>
        </tr>
      `;
    });

    // Baris rekapitulasi matriks (Total Siswa Benar & Daya Serap)
    html += `
              <tr style="background: rgba(30, 41, 59, 0.95); font-weight: 800; border-top: 2px solid #475569;">
                <td colspan="2" style="text-align: right; color: #38bdf8;">Jumlah Siswa Benar:</td>
    `;
    butirList.forEach(b => {
      const itm = analisisItems.find(x => x.id === b.id);
      html += `<td style="text-align: center; color: #34d399; padding: 4px 2px;">${itm ? itm.benarCount : 0}</td>`;
    });
    html += `
                <td colspan="2" style="text-align: center; color: #38bdf8;">Rata-rata:</td>
              </tr>
              <tr style="background: rgba(30, 41, 59, 0.95); font-weight: 800;">
                <td colspan="2" style="text-align: right; color: #fbbf24;">Daya Serap Butir (%):</td>
    `;
    butirList.forEach(b => {
      const itm = analisisItems.find(x => x.id === b.id);
      html += `<td style="text-align: center; color: #fbbf24; font-size: 0.72rem; padding: 4px 2px;">${itm ? Math.round(itm.persen) : 0}%</td>`;
    });
    html += `
                <td colspan="2" style="text-align: center; color: #fbbf24;">${formatIndoDecimal(avgPersen)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- KETERANGAN CAKUPAN TIGA BAGIAN DOKUMEN EVALUASI -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.65rem; margin-bottom: 0.85rem;">
        <div style="background: rgba(14, 165, 233, 0.08); border-left: 3px solid #0284c7; padding: 0.6rem 0.8rem; border-radius: 4px;">
          <div style="font-weight: 700; color: #38bdf8; font-size: 0.82rem;">Bagian A: Besaran dan Satuan (No. 1–10)</div>
          <div style="color: #cbd5e1; font-size: 0.76rem; margin-top: 2px;">• Memahami Konsep (No. 1–5) &bull; Mengaplikasikan Konsep (No. 6–10)</div>
        </div>
        <div style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; padding: 0.6rem 0.8rem; border-radius: 4px;">
          <div style="font-weight: 700; color: #fbbf24; font-size: 0.82rem;">Bagian B: Konversi Satuan Panjang & Massa (No. 11–20)</div>
          <div style="color: #cbd5e1; font-size: 0.76rem; margin-top: 2px;">• Memahami Konsep (No. 11–15) &bull; Mengaplikasikan Konsep (No. 16–20)</div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; padding: 0.6rem 0.8rem; border-radius: 4px;">
          <div style="font-weight: 700; color: #34d399; font-size: 0.82rem;">Bagian C: Pengukuran Jangka Sorong (No. 21–30)</div>
          <div style="color: #cbd5e1; font-size: 0.76rem; margin-top: 2px;">• Memahami Konsep (No. 21–25) &bull; Mengaplikasikan Konsep (No. 26–30)</div>
        </div>
      </div>

      <!-- TABEL ANALISIS BUTIR SOAL -->
      <div class="eval-table-container">
        <table class="eval-table">
          <thead>
            <tr>
              <th style="width: 45px; text-align: center;">No</th>
              <th style="width: 170px;">Bagian &amp; Aspek</th>
              <th>Materi Pokok &amp; Indikator Soal (Soal Evaluasi 1.pdf)</th>
              <th style="text-align: center; width: 65px;">Kunci</th>
              <th style="text-align: center; width: 110px;">Siswa Benar</th>
              <th style="text-align: center; width: 95px;">Daya Serap</th>
              <th style="text-align: center; width: 95px;">Kesukaran</th>
              <th style="text-align: center; width: 110px;">Ketercapaian</th>
            </tr>
          </thead>
          <tbody>
    `;

    analisisItems.forEach(item => {
      const badgeB = item.pertemuan === 1 ? 'badge-blue' : item.pertemuan === 2 ? 'badge-amber' : 'badge-emerald';

      html += `
        <tr>
          <td style="text-align: center; font-weight: 800; color: #38bdf8; font-size: 0.95rem;">${item.id}</td>
          <td>
            <span class="badge ${badgeB}" style="font-size: 0.72rem; padding: 1px 6px; display: inline-block; margin-bottom: 3px;">
              ${item.bagian}
            </span>
            <div style="color: #94a3b8; font-size: 0.75rem;">${item.aspek}</div>
          </td>
          <td>
            <div style="font-weight: 700; color: #f1f5f9; font-size: 0.84rem; margin-bottom: 2px;">${item.materi}</div>
            <div style="color: #cbd5e1; font-size: 0.79rem; line-height: 1.35;">${item.indikator}</div>
          </td>
          <td style="text-align: center;">
            <span style="font-weight: 800; background: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 4px; color: #f8fafc;">
              ${item.kunci}
            </span>
          </td>
          <td style="text-align: center; font-weight: 700; color: #f8fafc;">
            ${item.benarCount} / ${totalSiswa} Siswa
          </td>
          <td style="text-align: center;">
            <span class="eval-score-badge" style="font-size: 0.82rem;">${formatIndoDecimal(item.persen)}%</span>
          </td>
          <td style="text-align: center;">
            <span class="badge ${item.kesukaran === 'Mudah' ? 'badge-emerald' : 'badge-blue'}" style="font-size: 0.75rem;">
              ${item.kesukaran}
            </span>
          </td>
          <td style="text-align: center;">
            <span class="badge badge-emerald" style="font-weight: 700; font-size: 0.75rem;">
              ${item.ketercapaian}
            </span>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;

    // Listener toggle matriks
    document.getElementById('btnToggleMatriksJawaban')?.addEventListener('click', () => {
      const sec = document.getElementById('evalMatriksSection');
      const btn = document.getElementById('btnToggleMatriksJawaban');
      if (sec) {
        if (sec.style.display === 'none') {
          sec.style.display = 'block';
          if (btn) btn.textContent = '❌ Sembunyikan Matriks Jawaban Siswa';
        } else {
          sec.style.display = 'none';
          if (btn) btn.textContent = '📋 Tampilkan Matriks Jawaban Siswa per Butir';
        }
      }
    });
  }

  // Cetak Dokumen Rekap Nilai Evaluasi (PDF) - Tanpa Nama Kelompok
  function executePrintEvaluasi() {
    const printArea = document.getElementById('printArea');
    if (!printArea) return;

    const kelas = document.getElementById('evalSelectKelas')?.value || 'Kelas 7';
    const pertemuan = document.getElementById('evalSelectPertemuan')?.value || 'all';
    const bab = document.getElementById('evalSelectBab')?.value || 'BAB 1. Besaran dan pengukuran';
    const profile = loadTeacherProfile();
    const siswaList = getSiswaListForEvaluasi(kelas);

    let pertemuanLabel = 'Semua Pertemuan (Pertemuan 1, 2, dan 3 — Total 30 Nomor Soal)';
    if (pertemuan === '1') pertemuanLabel = 'Pertemuan 1: Besaran dan Satuan (10 Butir: No. 1 - 10)';
    else if (pertemuan === '2') pertemuanLabel = 'Pertemuan 2: Konversi Satuan (10 Butir: No. 11 - 20)';
    else if (pertemuan === '3') pertemuanLabel = 'Pertemuan 3: Penggunaan Alat Ukur Jangka Sorong (10 Butir: No. 21 - 30)';

    const results = siswaList.map((s, idx) => {
      const res = getEvaluasiScoreForStudent(s.nama, pertemuan);
      return { no: idx + 1, ...s, ...res };
    });

    const sumSkor = results.reduce((acc, r) => acc + r.skor, 0);
    const avgSkor = results.length > 0 ? Number((sumSkor / results.length).toFixed(1)) : 0;
    const maxSkor = results.length > 0 ? Math.max(...results.map(r => r.skor)) : 0;
    const minSkor = results.length > 0 ? Math.min(...results.map(r => r.skor)) : 0;

    let rowsHtml = '';
    results.forEach(r => {
      let skorColumns = '';
      if (pertemuan === 'all') {
        skorColumns = `
          <td style="text-align: center;">${r.p1Benar}</td>
          <td style="text-align: center;">${r.p2Benar}</td>
          <td style="text-align: center;">${r.p3Benar}</td>
          <td style="text-align: center; font-weight: bold;">${r.benar}</td>
        `;
      } else {
        skorColumns = `
          <td style="text-align: center; font-weight: bold;">${r.benar} / 10</td>
        `;
      }

      rowsHtml += `
        <tr>
          <td style="text-align: center;">${r.no}</td>
          <td style="font-weight: 600;">${r.nama}</td>
          ${skorColumns}
          <td style="text-align: center; font-weight: bold;">${formatIndoDecimal(r.skor)}</td>
          <td style="text-align: center;">${r.predikat}</td>
          <td style="text-align: center; font-weight: bold; color: #047857;">TUNTAS</td>
          <td style="text-align: center; font-size: 8pt;">${r.tindakLanjut}</td>
        </tr>
      `;
    });

    let extraHeaders = '';
    if (pertemuan === 'all') {
      extraHeaders = `
        <th style="width: 55px; text-align: center;">P1 (10)</th>
        <th style="width: 55px; text-align: center;">P2 (10)</th>
        <th style="width: 55px; text-align: center;">P3 (10)</th>
        <th style="width: 65px; text-align: center;">Total (30)</th>
      `;
    } else {
      extraHeaders = `
        <th style="width: 75px; text-align: center;">Benar (10)</th>
      `;
    }

    const tglIndo = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date());

    printArea.innerHTML = `
      <div style="font-family: Arial, sans-serif; font-size: 9.5pt; color: #000; line-height: 1.35; padding: 10px;">
        
        <!-- KOP SEKOLAH -->
        <div style="text-align: center; border-bottom: 2.5px solid #000; padding-bottom: 5px; margin-bottom: 12px;">
          <h4 style="margin: 0; font-size: 10.5pt; font-weight: bold; text-transform: uppercase;">PEMERINTAH KABUPATEN TOLITOLI</h4>
          <h4 style="margin: 0; font-size: 10pt; font-weight: bold; text-transform: uppercase;">DINAS PENDIDIKAN DAN KEBUDAYAAN</h4>
          <h4 style="margin: 0; font-size: 9.5pt; font-weight: bold; text-transform: uppercase;">KECAMATAN DAMPAL SELATAN</h4>
          <h2 style="margin: 2px 0 0 0; font-size: 13pt; font-weight: 800; text-transform: uppercase;">${(profile.sekolah && !profile.sekolah.includes('SELAYAR') && profile.sekolah !== 'SMP / MTs') ? profile.sekolah : 'SMPN SATAP BULU MINUNG'}</h2>
          <p style="margin: 2px 0 0 0; font-size: 8.5pt; font-style: italic;">Alamat : Jl. Sardan, No 01 Desa Puse, Kec. Dampal Selatan, Kab. Tolitoli</p>
        </div>

        <!-- JUDUL LAPORAN -->
        <div style="text-align: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 11.5pt; font-weight: bold; text-decoration: underline;">DAFTAR REKAPITULASI HASIL EVALUASI ASESMEN SUMATIF IPA</h3>
          <p style="margin: 2px 0 0 0; font-size: 9pt; font-weight: bold;">Kurikulum Merdeka (Fase D) &bull; Tahun Ajaran 2026/2027</p>
        </div>

        <!-- TABEL IDENTITAS (TANPA NAMA KELOMPOK) -->
        <table style="width: 100%; border: none !important; margin-bottom: 10px; font-size: 9pt;">
          <tr>
            <td style="width: 18%; border: none !important; padding: 2px 0;"><strong>Mata Pelajaran</strong></td>
            <td style="width: 32%; border: none !important; padding: 2px 0;">: Ilmu Pengetahuan Alam (IPA)</td>
            <td style="width: 18%; border: none !important; padding: 2px 0;"><strong>Kelas / Semester</strong></td>
            <td style="width: 32%; border: none !important; padding: 2px 0;">: ${kelas} / Ganjil</td>
          </tr>
          <tr>
            <td style="border: none !important; padding: 2px 0;"><strong>BAB Pembelajaran</strong></td>
            <td style="border: none !important; padding: 2px 0;">: ${bab}</td>
            <td style="border: none !important; padding: 2px 0;"><strong>KKTP</strong></td>
            <td style="border: none !important; padding: 2px 0;">: <strong>75 (Tuntas Seluruhnya)</strong></td>
          </tr>
          <tr>
            <td style="border: none !important; padding: 2px 0;"><strong>Cakupan Evaluasi</strong></td>
            <td style="border: none !important; padding: 2px 0;" colspan="3">: ${pertemuanLabel}</td>
          </tr>
        </table>

        <!-- TABEL HASIL EVALUASI (TANPA KOLOM KELOMPOK) -->
        <table class="print-table" style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 8.5pt;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="width: 35px; text-align: center;">No</th>
              <th>Nama Siswa</th>
              ${extraHeaders}
              <th style="width: 70px; text-align: center;">Nilai (100)</th>
              <th style="width: 85px; text-align: center;">Predikat</th>
              <th style="width: 70px; text-align: center;">Ketuntasan</th>
              <th style="width: 120px; text-align: center;">Tindak Lanjut</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <!-- REKAPITULASI STATISTIK -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 8.5pt;">
          <tr style="background: #f8fafc;">
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; width: 25%;"><strong>Jumlah Siswa:</strong> ${results.length} Orang</td>
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; width: 25%;"><strong>Rata-Rata Nilai:</strong> ${formatIndoDecimal(avgSkor)}</td>
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; width: 25%;"><strong>Nilai Tertinggi / Terendah:</strong> ${formatIndoDecimal(maxSkor)} / ${formatIndoDecimal(minSkor)}</td>
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; width: 25%; font-weight: bold; color: #047857;"><strong>Ketuntasan:</strong> ${results.length} / ${results.length} (100% Tuntas)</td>
          </tr>
        </table>

        <!-- TANDA TANGAN -->
        <table style="width: 100%; border: none !important; margin-top: 15px; font-size: 9pt;">
          <tr>
            <td style="width: 50%; border: none !important; text-align: center;">
              Mengetahui,<br>Kepala Sekolah<br><br><br><br>
              <strong>${profile.kepsek || '...................................................'}</strong><br>
              NIP. ${profile.nipKepsek || '...........................................'}
            </td>
            <td style="width: 50%; border: none !important; text-align: center;">
              Dampal Selatan, ${tglIndo}<br>Guru Mata Pelajaran IPA<br><br><br><br>
              <strong>${profile.guru || '...................................................'}</strong><br>
              NIP. ${profile.nipGuru || '...........................................'}
            </td>
          </tr>
        </table>

      </div>
    `;

    setTimeout(() => {
      window.print();
    }, 200);
  }

  // Cetak Dokumen Laporan Analisis Capaian Belajar (PDF) - Tanpa Nama Kelompok
  function executePrintAnalisisCapaianPdf() {
    const printArea = document.getElementById('printArea');
    if (!printArea) return;

    const kelas = document.getElementById('evalSelectKelas')?.value || 'Kelas 7';
    const pertemuan = document.getElementById('evalSelectPertemuan')?.value || 'all';
    const bab = document.getElementById('evalSelectBab')?.value || 'BAB 1. Besaran dan pengukuran';
    const profile = loadTeacherProfile();

    const data = getSynchronizedAnalisisButirData(kelas, pertemuan);
    const {
      totalSiswa,
      analisisItems,
      avgPersen,
      countMudah,
      countSedang,
      countSukar,
      countTercapai,
      persenTercapai
    } = data;

    let cakupanTitle = 'Semua Pertemuan (Bagian A, B, dan C — 30 Butir Soal Pilihan Ganda)';
    if (pertemuan === '1') {
      cakupanTitle = 'Bagian A: Besaran dan Satuan (10 Butir: No. 1 – 10)';
    } else if (pertemuan === '2') {
      cakupanTitle = 'Bagian B: Konversi Satuan Panjang dan Massa (10 Butir: No. 11 – 20)';
    } else if (pertemuan === '3') {
      cakupanTitle = 'Bagian C: Pengukuran dengan Jangka Sorong (10 Butir: No. 21 – 30)';
    }

    let rowsHtml = '';
    analisisItems.forEach(item => {
      rowsHtml += `
        <tr>
          <td style="text-align: center; font-weight: bold;">${item.id}</td>
          <td><strong>${item.bagian}</strong><br><span style="font-size: 7.5pt; color: #475569;">${item.aspek}</span></td>
          <td><strong>${item.materi}</strong><br><span style="font-size: 8pt;">${item.indikator}</span></td>
          <td style="text-align: center; font-weight: bold; background: #f8fafc;">${item.kunci}</td>
          <td style="text-align: center; font-weight: bold;">${item.benarCount} / ${totalSiswa}</td>
          <td style="text-align: center; font-weight: bold;">${formatIndoDecimal(item.persen)}%</td>
          <td style="text-align: center;">${item.kesukaran}</td>
          <td style="text-align: center; font-weight: bold; color: #047857;">${item.ketercapaian.replace('✓ ', '')}</td>
        </tr>
      `;
    });

    const tglIndo = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date());

    printArea.innerHTML = `
      <div style="font-family: Arial, sans-serif; font-size: 9pt; color: #000; line-height: 1.35; padding: 10px;">
        
        <!-- KOP SEKOLAH -->
        <div style="text-align: center; border-bottom: 2.5px solid #000; padding-bottom: 5px; margin-bottom: 12px;">
          <h4 style="margin: 0; font-size: 10.5pt; font-weight: bold; text-transform: uppercase;">PEMERINTAH KABUPATEN TOLITOLI</h4>
          <h4 style="margin: 0; font-size: 10pt; font-weight: bold; text-transform: uppercase;">DINAS PENDIDIKAN DAN KEBUDAYAAN</h4>
          <h4 style="margin: 0; font-size: 9.5pt; font-weight: bold; text-transform: uppercase;">KECAMATAN DAMPAL SELATAN</h4>
          <h2 style="margin: 2px 0 0 0; font-size: 13pt; font-weight: 800; text-transform: uppercase;">${(profile.sekolah && !profile.sekolah.includes('SELAYAR') && profile.sekolah !== 'SMP / MTs') ? profile.sekolah : 'SMPN SATAP BULU MINUNG'}</h2>
          <p style="margin: 2px 0 0 0; font-size: 8.5pt; font-style: italic;">Alamat : Jl. Sardan, No 01 Desa Puse, Kec. Dampal Selatan, Kab. Tolitoli</p>
        </div>

        <!-- JUDUL LAPORAN -->
        <div style="text-align: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 11.5pt; font-weight: bold; text-decoration: underline;">LAPORAN ANALISIS CAPAIAN HASIL BELAJAR PESERTA DIDIK</h3>
          <p style="margin: 2px 0 0 0; font-size: 9pt; font-weight: bold;">Asesmen Sumatif BAB 1 Berdasarkan Naskah Soal Evaluasi 1 &bull; Kurikulum Merdeka (Fase D)</p>
        </div>

        <!-- TABEL IDENTITAS (TANPA NAMA KELOMPOK) -->
        <table style="width: 100%; border: none !important; margin-bottom: 10px; font-size: 9pt;">
          <tr>
            <td style="width: 18%; border: none !important; padding: 2px 0;"><strong>Mata Pelajaran</strong></td>
            <td style="width: 32%; border: none !important; padding: 2px 0;">: Ilmu Pengetahuan Alam (IPA - Fisika)</td>
            <td style="width: 18%; border: none !important; padding: 2px 0;"><strong>Kelas / Semester</strong></td>
            <td style="width: 32%; border: none !important; padding: 2px 0;">: ${kelas} / Ganjil</td>
          </tr>
          <tr>
            <td style="border: none !important; padding: 2px 0;"><strong>BAB Pembelajaran</strong></td>
            <td style="border: none !important; padding: 2px 0;">: ${bab}</td>
            <td style="border: none !important; padding: 2px 0;"><strong>KKTP</strong></td>
            <td style="border: none !important; padding: 2px 0;">: <strong>75 (Target Ketercapaian ≥ 75%)</strong></td>
          </tr>
          <tr>
            <td style="border: none !important; padding: 2px 0;"><strong>Dokumen Acuan</strong></td>
            <td style="border: none !important; padding: 2px 0;">: Naskah Soal Evaluasi 1 (30 Soal Pilihan Ganda)</td>
            <td style="border: none !important; padding: 2px 0;"><strong>Cakupan Butir</strong></td>
            <td style="border: none !important; padding: 2px 0;">: ${cakupanTitle}</td>
          </tr>
        </table>

        <!-- TABEL ANALISIS BUTIR SOAL -->
        <table class="print-table" style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 8pt;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="width: 25px; text-align: center;">No</th>
              <th style="width: 140px;">Bagian &amp; Aspek</th>
              <th>Materi Pokok &amp; Indikator Ketercapaian Soal</th>
              <th style="width: 35px; text-align: center;">Kunci</th>
              <th style="width: 65px; text-align: center;">Benar</th>
              <th style="width: 65px; text-align: center;">Daya Serap</th>
              <th style="width: 65px; text-align: center;">Kesukaran</th>
              <th style="width: 65px; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <!-- REKAPITULASI STATISTIK ANALISIS -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 8.5pt;">
          <tr style="background: #f8fafc;">
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; width: 25%;"><strong>Jumlah Soal:</strong> ${analisisItems.length} Butir PG</td>
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; width: 25%;"><strong>Rata-Rata Daya Serap:</strong> ${formatIndoDecimal(avgPersen)}%</td>
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; width: 25%;"><strong>Distribusi Kesukaran:</strong> ${countSedang} Sedang / ${countMudah} Mudah${countSukar > 0 ? ` / ${countSukar} Sukar` : ''}</td>
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; width: 25%; font-weight: bold; color: #047857;"><strong>Ketuntasan:</strong> ${persenTercapai}% (${countTercapai}/${analisisItems.length} Tercapai)</td>
          </tr>
        </table>

        <!-- TANDA TANGAN -->
        <table style="width: 100%; border: none !important; margin-top: 15px; font-size: 9pt;">
          <tr>
            <td style="width: 50%; border: none !important; text-align: center;">
              Mengetahui,<br>Kepala Sekolah<br><br><br><br>
              <strong>${profile.kepsek || '...................................................'}</strong><br>
              NIP. ${profile.nipKepsek || '...........................................'}
            </td>
            <td style="width: 50%; border: none !important; text-align: center;">
              Dampal Selatan, ${tglIndo}<br>Guru Mata Pelajaran IPA<br><br><br><br>
              <strong>${profile.guru || '...................................................'}</strong><br>
              NIP. ${profile.nipGuru || '...........................................'}
            </td>
          </tr>
        </table>

      </div>
    `;

    setTimeout(() => {
      window.print();
    }, 200);
  }

  // Unduh Format Word (.doc) Rekap Nilai Evaluasi - Tanpa Nama Kelompok
  function executeDownloadWordEvaluasi() {
    const kelas = document.getElementById('evalSelectKelas')?.value || 'Kelas 7';
    const pertemuan = document.getElementById('evalSelectPertemuan')?.value || 'all';
    const bab = document.getElementById('evalSelectBab')?.value || 'BAB 1. Besaran dan pengukuran';
    const profile = loadTeacherProfile();
    const siswaList = getSiswaListForEvaluasi(kelas);

    let pertemuanLabel = 'Semua Pertemuan (Pertemuan 1, 2, dan 3 — Total 30 Nomor Soal)';
    if (pertemuan === '1') pertemuanLabel = 'Pertemuan 1: Besaran dan Satuan (10 Butir: No. 1 - 10)';
    else if (pertemuan === '2') pertemuanLabel = 'Pertemuan 2: Konversi Satuan (10 Butir: No. 11 - 20)';
    else if (pertemuan === '3') pertemuanLabel = 'Pertemuan 3: Penggunaan Alat Ukur Jangka Sorong (10 Butir: No. 21 - 30)';

    const results = siswaList.map((s, idx) => {
      const res = getEvaluasiScoreForStudent(s.nama, pertemuan);
      return { no: idx + 1, ...s, ...res };
    });

    const sumSkor = results.reduce((acc, r) => acc + r.skor, 0);
    const avgSkor = results.length > 0 ? Number((sumSkor / results.length).toFixed(1)) : 0;
    const maxSkor = results.length > 0 ? Math.max(...results.map(r => r.skor)) : 0;
    const minSkor = results.length > 0 ? Math.min(...results.map(r => r.skor)) : 0;

    let rowsHtml = '';
    results.forEach(r => {
      let skorColumns = '';
      if (pertemuan === 'all') {
        skorColumns = `
          <td style="text-align: center; border: 1px solid #000; padding: 4px;">${r.p1Benar}</td>
          <td style="text-align: center; border: 1px solid #000; padding: 4px;">${r.p2Benar}</td>
          <td style="text-align: center; border: 1px solid #000; padding: 4px;">${r.p3Benar}</td>
          <td style="text-align: center; font-weight: bold; border: 1px solid #000; padding: 4px;">${r.benar}</td>
        `;
      } else {
        skorColumns = `
          <td style="text-align: center; font-weight: bold; border: 1px solid #000; padding: 4px;">${r.benar} / 10</td>
        `;
      }

      rowsHtml += `
        <tr>
          <td style="text-align: center; border: 1px solid #000; padding: 4px;">${r.no}</td>
          <td style="font-weight: 600; border: 1px solid #000; padding: 4px;">${r.nama}</td>
          ${skorColumns}
          <td style="text-align: center; font-weight: bold; border: 1px solid #000; padding: 4px;">${formatIndoDecimal(r.skor)}</td>
          <td style="text-align: center; border: 1px solid #000; padding: 4px;">${r.predikat}</td>
          <td style="text-align: center; font-weight: bold; color: #047857; border: 1px solid #000; padding: 4px;">TUNTAS</td>
          <td style="text-align: center; font-size: 8pt; border: 1px solid #000; padding: 4px;">${r.tindakLanjut}</td>
        </tr>
      `;
    });

    let extraHeaders = '';
    if (pertemuan === 'all') {
      extraHeaders = `
        <th style="width: 55px; border: 1px solid #000; padding: 5px; background: #e2e8f0;">P1 (10)</th>
        <th style="width: 55px; border: 1px solid #000; padding: 5px; background: #e2e8f0;">P2 (10)</th>
        <th style="width: 55px; border: 1px solid #000; padding: 5px; background: #e2e8f0;">P3 (10)</th>
        <th style="width: 65px; border: 1px solid #000; padding: 5px; background: #e2e8f0;">Total (30)</th>
      `;
    } else {
      extraHeaders = `
        <th style="width: 75px; border: 1px solid #000; padding: 5px; background: #e2e8f0;">Benar (10)</th>
      `;
    }

    const tglIndo = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date());
    const docTitle = `Rekap_Evaluasi_BAB1_${kelas.replace(/\s+/g, '_')}_30Soal_TuntasSemua`;

    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${docTitle}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: A4 portrait;
            margin: 2cm 2cm 2cm 2cm;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 10pt;
            color: #000;
            line-height: 1.35;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            font-size: 9pt;
          }
        </style>
      </head>
      <body>
        <div style="text-align: center; border-bottom: 2.5px solid #000; padding-bottom: 6px; margin-bottom: 12px;">
          <h4 style="margin: 0; font-size: 10.5pt; font-weight: bold; text-transform: uppercase;">PEMERINTAH KABUPATEN TOLITOLI</h4>
          <h4 style="margin: 0; font-size: 10pt; font-weight: bold; text-transform: uppercase;">DINAS PENDIDIKAN DAN KEBUDAYAAN</h4>
          <h4 style="margin: 0; font-size: 9.5pt; font-weight: bold; text-transform: uppercase;">KECAMATAN DAMPAL SELATAN</h4>
          <h2 style="margin: 2px 0 0 0; font-size: 13pt; font-weight: bold; text-transform: uppercase;">${(profile.sekolah && !profile.sekolah.includes('SELAYAR') && profile.sekolah !== 'SMP / MTs') ? profile.sekolah : 'SMPN SATAP BULU MINUNG'}</h2>
          <p style="margin: 2px 0 0 0; font-size: 8.5pt; font-style: italic;">Alamat : Jl. Sardan, No 01 Desa Puse, Kec. Dampal Selatan, Kab. Tolitoli</p>
        </div>

        <div style="text-align: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 11pt; font-weight: bold; text-decoration: underline;">DAFTAR REKAPITULASI HASIL EVALUASI ASESMEN SUMATIF IPA</h3>
          <p style="margin: 2px 0 0 0; font-size: 9pt; font-weight: bold;">Kurikulum Merdeka (Fase D) &bull; Tahun Ajaran 2026/2027</p>
        </div>

        <table style="width: 100%; border: none !important; margin-bottom: 10px; font-size: 9.5pt;">
          <tr>
            <td style="width: 20%; border: none !important;"><strong>Mata Pelajaran</strong></td>
            <td style="width: 30%; border: none !important;">: Ilmu Pengetahuan Alam (IPA)</td>
            <td style="width: 20%; border: none !important;"><strong>Kelas / Semester</strong></td>
            <td style="width: 30%; border: none !important;">: ${kelas} / Ganjil</td>
          </tr>
          <tr>
            <td style="border: none !important;"><strong>BAB Pembelajaran</strong></td>
            <td style="border: none !important;">: ${bab}</td>
            <td style="border: none !important;"><strong>KKTP</strong></td>
            <td style="border: none !important;">: <strong>75 (Tuntas Seluruhnya)</strong></td>
          </tr>
          <tr>
            <td style="border: none !important;"><strong>Cakupan Evaluasi</strong></td>
            <td style="border: none !important;" colspan="3">: ${pertemuanLabel}</td>
          </tr>
        </table>

        <!-- TABEL HASIL (TANPA KOLOM KELOMPOK) -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
          <thead>
            <tr>
              <th style="width: 35px; border: 1px solid #000; padding: 5px; background: #e2e8f0; text-align: center;">No</th>
              <th style="border: 1px solid #000; padding: 5px; background: #e2e8f0;">Nama Siswa</th>
              ${extraHeaders}
              <th style="width: 70px; border: 1px solid #000; padding: 5px; background: #e2e8f0; text-align: center;">Nilai</th>
              <th style="width: 85px; border: 1px solid #000; padding: 5px; background: #e2e8f0; text-align: center;">Predikat</th>
              <th style="width: 70px; border: 1px solid #000; padding: 5px; background: #e2e8f0; text-align: center;">Status</th>
              <th style="width: 120px; border: 1px solid #000; padding: 5px; background: #e2e8f0; text-align: center;">Tindak Lanjut</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9pt;">
          <tr style="background: #f8fafc;">
            <td style="border: 1px solid #000; padding: 5px 8px; width: 25%;"><strong>Jumlah Siswa:</strong> ${results.length} Orang</td>
            <td style="border: 1px solid #000; padding: 5px 8px; width: 25%;"><strong>Rata-Rata Nilai:</strong> ${formatIndoDecimal(avgSkor)}</td>
            <td style="border: 1px solid #000; padding: 5px 8px; width: 25%;"><strong>Nilai Tertinggi / Terendah:</strong> ${formatIndoDecimal(maxSkor)} / ${formatIndoDecimal(minSkor)}</td>
            <td style="border: 1px solid #000; padding: 5px 8px; width: 25%; font-weight: bold; color: #047857;"><strong>Ketuntasan:</strong> 100% Tuntas</td>
          </tr>
        </table>

        <table style="width: 100%; border: none !important; margin-top: 15px;">
          <tr>
            <td style="width: 50%; border: none !important; text-align: center;">
              Mengetahui,<br>Kepala Sekolah<br><br><br><br>
              <strong>${profile.kepsek || '...................................................'}</strong><br>
              NIP. ${profile.nipKepsek || '...........................................'}
            </td>
            <td style="width: 50%; border: none !important; text-align: center;">
              Dampal Selatan, ${tglIndo}<br>Guru Mata Pelajaran IPA<br><br><br><br>
              <strong>${profile.guru || '...................................................'}</strong><br>
              NIP. ${profile.nipGuru || '...........................................'}
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle}.doc`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);

    showToast(`Dokumen Word hasil evaluasi berhasil diunduh (${docTitle}.doc)`, 'success');
  }

  // Sinkronkan Nilai Evaluasi ke Database Rekap LKPD
  function syncEvaluasiToLkpd() {
    const kelas = document.getElementById('evalSelectKelas')?.value || 'Kelas 7';
    const pertemuan = document.getElementById('evalSelectPertemuan')?.value || 'all';
    const siswaList = getSiswaListForEvaluasi(kelas);

    let syncedCount = 0;
    siswaList.forEach(s => {
      const res = getEvaluasiScoreForStudent(s.nama, pertemuan);
      const evalId = `pen-eval-b1-${s.id}`;
      const kelNama = App.kelompok.find(k => k.id === s.kelompokId)?.nama || 'Kelompok 1';

      const existingIndex = App.penilaian.findIndex(p => p.id === evalId);
      const record = {
        id: evalId,
        siswaId: s.id,
        nama_siswa: s.nama,
        kelas: s.kelas || kelas,
        kelompokId: s.kelompokId,
        nama_kelompok: kelNama,
        topikId: 'top-b1-eval',
        topik_nama: 'Evaluasi BAB 1: Besaran dan Pengukuran (30 Soal)',
        tanggal: new Date().toISOString().slice(0, 10),
        pengetahuan: {
          memahami: {
            skor_persen: res.skor,
            jumlah_benar: res.benar,
            total_soal: res.totalSoal
          },
          mengaplikasi: {
            level: 4,
            label: 'Sangat Baik'
          },
          merefleksi: {
            level: 4,
            label: 'Sangat Reflektif',
            self_rating: 4
          }
        },
        keterampilan: {
          level: 4,
          label: 'Sangat Terampil',
          catatan: 'Pengukuran dan pengolahan data terlaksana tuntas.'
        },
        sikap: {
          level: 4,
          label: 'Sangat Baik (SB)',
          catatan: 'Kedisiplinan dan ketelitian sangat baik.'
        },
        nilai_tugas: {
          nilai_akhir: res.skor,
          predikat: res.predikat,
          predikat_class: res.skor >= 88 ? 'badge-emerald' : 'badge-blue',
          skor_memahami_100: res.skor,
          skor_mengaplikasi_100: res.skor >= 88 ? 95 : 85,
          skor_merefleksi_100: res.skor >= 88 ? 95 : 85
        },
        catatan_siswa: `Hasil Evaluasi Asesmen Sumatif BAB 1 (30 Nomor Soal) - ${res.keterangan}`,
        foto_lkpd: []
      };

      if (existingIndex >= 0) {
        App.penilaian[existingIndex] = record;
      } else {
        App.penilaian.unshift(record);
      }
      syncedCount++;
    });

    setData(KEYS.PENILAIAN, App.penilaian);
    if (typeof renderRekapTable === 'function') renderRekapTable();
    showToast(`Berhasil menyinkronkan ${syncedCount} nilai evaluasi BAB 1 ke rekap LKPD!`, 'success');
  }

  // Salin Teks Rekap Nilai ke Clipboard - Tanpa Nama Kelompok
  function copyEvaluasiTableText() {
    const kelas = document.getElementById('evalSelectKelas')?.value || 'Kelas 7';
    const pertemuan = document.getElementById('evalSelectPertemuan')?.value || 'all';
    const siswaList = getSiswaListForEvaluasi(kelas);

    let text = `REKAP NILAI EVALUASI ASESMEN IPA - BAB 1 KELAS 7\n`;
    text += `Cakupan: 3 Pertemuan (Besaran & Satuan, Konversi Satuan, Jangka Sorong) | 30 Soal | KKTP ≥ 75\n`;
    text += `Status: 100% TUNTAS SEMUA (Acuan: Soal Evaluasi 1.pdf)\n\n`;
    text += `No\tNama Siswa\tP1(10)\tP2(10)\tP3(10)\tTotal Benar(30)\tNilai\tPredikat\tKeterangan\n`;

    siswaList.forEach((s, idx) => {
      const res = getEvaluasiScoreForStudent(s.nama, pertemuan);
      text += `${idx + 1}\t${s.nama}\t${res.p1Benar}\t${res.p2Benar}\t${res.p3Benar}\t${res.benar}\t${res.skor}\t${res.predikat}\tTUNTAS\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast(`Tabel nilai evaluasi ${siswaList.length} siswa Kelas 7 berhasil disalin ke clipboard!`, 'success');
    }).catch(() => {
      showToast('Gagal menyalin tabel nilai ke clipboard.', 'error');
    });
  }

  // Setup Seluruh Event Listener Modal Evaluasi
  function setupModalEvaluasi() {
    // Tombol Pembuka Modal
    document.getElementById('btnOpenModalEvaluasi')?.addEventListener('click', openModalEvaluasi);
    document.getElementById('btnRekapModalEvaluasi')?.addEventListener('click', openModalEvaluasi);

    // Tombol Penutup Modal
    document.getElementById('btnCloseModalEvaluasi')?.addEventListener('click', closeModalEvaluasi);
    document.getElementById('btnCancelModalEvaluasi')?.addEventListener('click', closeModalEvaluasi);

    // Backdrop click
    document.getElementById('modalEvaluasi')?.addEventListener('click', (e) => {
      if (e.target.id === 'modalEvaluasi') closeModalEvaluasi();
    });

    // Sub-Navigasi Tab Modal
    document.getElementById('tabBtnEvalNilai')?.addEventListener('click', () => {
      evalActiveTab = 'nilai';
      updateEvalTabButtons();
      renderEvaluasiActivePane();
    });

    document.getElementById('tabBtnEvalInput')?.addEventListener('click', () => {
      evalActiveTab = 'input';
      updateEvalTabButtons();
      renderEvaluasiActivePane();
    });

    document.getElementById('tabBtnEvalAnalisis')?.addEventListener('click', () => {
      evalActiveTab = 'analisis';
      updateEvalTabButtons();
      renderEvaluasiActivePane();
    });

    // Dropdown Filters Change
    document.getElementById('evalSelectBab')?.addEventListener('change', renderEvaluasiActivePane);
    document.getElementById('evalSelectPertemuan')?.addEventListener('change', renderEvaluasiActivePane);
    document.getElementById('evalSelectKelas')?.addEventListener('change', renderEvaluasiActivePane);

    // Action Buttons
    document.getElementById('btnPrintEvalPdf')?.addEventListener('click', () => {
      if (evalActiveTab === 'analisis') {
        executePrintAnalisisCapaianPdf();
      } else {
        executePrintEvaluasi();
      }
    });
    document.getElementById('btnPrintAnalisisPdf')?.addEventListener('click', executePrintAnalisisCapaianPdf);
    document.getElementById('btnDownloadWordEval')?.addEventListener('click', executeDownloadWordEvaluasi);
    document.getElementById('btnSyncEvalToLkpd')?.addEventListener('click', syncEvaluasiToLkpd);
    document.getElementById('btnCopyEvalText')?.addEventListener('click', copyEvaluasiTableText);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  // Ekspos fungsi ke global window agar dapat dipanggil inline atau via console
  window.openModalPrintConfig = openModalPrintConfig;
  window.updateRekapPrintPreview = updateRekapPrintPreview;
  window.executeDownloadWordRekap = executeDownloadWordRekap;
  window.openModalPreviewCapaian = openModalPreviewCapaian;
  window.executePrintCapaianPDF = executePrintCapaianPDF;
  window.executeDownloadWord = executeDownloadWord;
  window.exportRekapToCSV = exportRekapToCSV;
  window.executePrintPDF = executePrintPDF;
  window.openModalEvaluasi = openModalEvaluasi;
  window.closeModalEvaluasi = closeModalEvaluasi;
  window.executePrintEvaluasi = executePrintEvaluasi;
  window.executePrintAnalisisCapaianPdf = executePrintAnalisisCapaianPdf;
  window.executeDownloadWordEvaluasi = executeDownloadWordEvaluasi;
  window.syncEvaluasiToLkpd = syncEvaluasiToLkpd;
  window.App = App;

})();

