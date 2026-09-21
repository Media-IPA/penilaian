# WARDIPA - Aplikasi Pengelola Rubrik Penilaian LKPD IPA

Aplikasi web PWA (*Progressive Web App*) untuk mengelola, merekap, dan menganalisis capaian belajar peserta didik pada Lembar Kerja Peserta Didik (LKPD) IPA berbasis rubrik 3 dimensi terpisah.

Aplikasi ini secara khusus dikembangkan untuk guru IPA SMP guna menjaga objektivitas penilaian dan mengungkap informasi pedagogis penting yang kerap tersembunyi jika nilai dirata-ratakan secara mentah.

---

## 🌟 Prinsip Utama Penilaian

1. **3 Dimensi Terpisah (Bukan Rata-Rata Tunggal)**
   - **Memahami (Objektif — Biner)**: Dihitung otomatis dalam persentase murni (\(0-100\%\)) dari soal isian singkat, benar-salah, atau menjodohkan.
   - **Mengaplikasi (Rubrik Deskriptif 1–4)**: Menilai ketepatan identifikasi besaran, rumus, dan penalaran logis fenomena IPA.
   - **Merefleksi (Kualitatif 1–4 + Self-Rating Siswa 1–5 Bintang)**: Menilai kedalaman kesadaran diri dan kejujuran mengenali kesulitan, berdampingan dengan persepsi mandiri siswa.
2. **Penelusuran Tren Individual Per Kelompok**: Memantau perkembangan kelompok lintas pertemuan melalui 3 grafik garis independen.
3. **Deteksi Flag Otomatis**:
   - 🚩 **Anomali Kognitif-Reflektif**: Memahami tinggi (>80%) tetapi Merefleksi rendah (≤ Level 2) dalam 2 pertemuan berurutan.
   - 📉 **Tren Menurun**: Penurunan performa pada dimensi tertentu 2 pertemuan berurutan.
   - 💡 **Disparitas Persepsi**: Mendeteksi kelompok yang *overconfident* atau *underconfident* terhadap penilaian guru.
4. **Skor Komposit Non-Default**: Pilihan skor gabungan dengan bobot transparan yang dapat diatur guru (default: nonaktif).
5. **Kamera Scan & Asistensi AI (Berprinsip Konfirmasi Guru)**: Membaca tulisan tangan siswa dan merekomendasikan level rubrik. **AI hanya menyarankan, nilai hanya tersimpan setelah guru menekan konfirmasi**.

---

## 🚀 Cara Menjalankan & Menginstal Aplikasi

### 1. Membuka di Browser Komputer / Laptop
Cukup buka file `index.html` menggunakan browser modern (Google Chrome, Microsoft Edge, atau Mozilla Firefox) atau jalankan melalui web server lokal.

### 2. Menginstal sebagai PWA di HP Android (Google Chrome)
1. Buka aplikasi melalui browser Chrome di smartphone Android.
2. Ketuk ikon titik tiga (⋮) di pojok kanan atas browser.
3. Pilih **"Tambahkan ke Layar Utama"** (*Add to Home screen*) atau **"Instal Aplikasi"**.
4. Ikon aplikasi **WARDIPA** akan muncul di beranda HP Anda dan dapat digunakan secara *offline* layaknya aplikasi Android bawaan!

---

## 📂 Struktur File

```
d:\MEDIA IPA\PENILAIAN\LKPD\
├── index.html              # Halaman antarmuka SPA
├── manifest.json           # Konfigurasi PWA Standalone
├── sw.js                   # Service Worker untuk offline caching
├── icons/
│   ├── icon-192.png        # Ikon PWA standar Android
│   ├── icon-512.png        # Ikon PWA HD
│   └── icon.svg            # Ikon vektor resolusi tinggi
├── css/
│   ├── app.css             # Desain antarmuka modern & responsif
│   └── print.css           # Format cetak resmi ramah kertas
├── js/
│   ├── app.js              # Controller utama & router navigasi
│   ├── db.js               # Basis data persisten IndexedDB + LocalStorage fallback
│   ├── rubrik.js           # Deskriptor rubrik 3 dimensi & pembantu kalkulasi
│   ├── flags.js            # Algoritma pendeteksi anomali & tren
│   ├── charts.js           # Mesin grafik HTML5 Canvas mandiri
│   ├── export.js           # Ekspor Excel/CSV UTF-8 BOM, gambar PNG, dan PDF
│   ├── ai-scanner.js       # Modul kamera, OCR, dan integrasi Google Gemini
│   └── sample-data.js      # Data awal realistis 5 kelompok (3 pertemuan)
└── README.md               # Panduan lengkap guru
```

---

## 📋 Panduan Penggunaan Menu

1. **Dashboard Rekap**:
   - Memilih topik materi dan nomor pertemuan.
   - Meninjau 3 pilar per kelompok berdampingan.
   - Membaca kutipan refleksi otentik siswa.
   - Memeriksa alert anomali otomatis.
2. **Input Nilai**:
   - Input cepat: stepper jumlah benar (otomatis terhitung %), klik level mengaplikasi (1–4), klik level refleksi (1–4), dan pilih bintang self-rating siswa.
   - Gunakan tombol **"Simpan & Lanjut Kelompok Berikutnya"** untuk menilai seluruh kelas dalam &lt; 5 menit.
3. **Tren & Grafik**:
   - Menampilkan 3 grafik terpisah untuk memantau kemajuan kelompok.
   - Menampilkan diagram komparasi persepsi siswa vs guru.
   - Unduh grafik sebagai file gambar PNG beresolusi tinggi untuk slide presentasi atau naskah lomba.
4. **Detail Kelompok**:
   - Rekam jejak utuh satu kelompok dari pertemuan awal hingga akhir, dilengkapi rata-rata performa dan kutipan refleksi.
5. **Topik & Rubrik**:
   - Menambah topik pembelajaran IPA baru.
   - Mengubah deskriptor rubrik level 1–4.
   - Mengisi Google Gemini API Key untuk scan kamera AI live.
   - Cadangkan atau pulihkan data JSON.
6. **Ekspor & Cetak**:
   - Ekspor rekap nilai ke Microsoft Excel/CSV dengan format UTF-8 rapi.
   - Cetak langsung lembar rekapitulasi penilaian untuk pelaporan resmi sekolah.

---

## 📈 Grafik Capaian Belajar Siswa (Tab 3)

Tab Grafik menyajikan visualisasi perkembangan capaian belajar IPA antar pertemuan (P1, P2, P3, dst.) yang berfokus pada 3 aspek utama:

1. **Skor Memahami (0–100%)**:
   - Dihitung dari: `(Jumlah Benar ÷ 15 Soal) × 100%`.
   - Mengukur penguasaan konsep materi sains siswa melalui tes objektif LKPD (isian singkat, benar/salah, dan menjodohkan).
   - Kategori: `≥ 85%` (Sangat Baik), `70% – 84%` (Baik), `55% – 69%` (Cukup), `< 55%` (Perlu Bimbingan).

2. **Skor Mengaplikasi (Skala 1,0–4,0)**:
   - Rata-rata dari skor rubrik guru skala 1,0–4,0.
   - Mengukur kemampuan bernalar siswa dalam menerapkan konsep materi ke dalam kegiatan praktikum/analisis nyata LKPD.
   - Kategori Rubrik:
     - **Level 4 (Sangat Baik)**: Penerapan konsep tepat pada semua kegiatan, analisis mendalam, alasan logis.
     - **Level 3 (Baik)**: Penerapan konsep tepat pada sebagian besar kegiatan, penjelasan cukup jelas.
     - **Level 2 (Cukup)**: Penerapan konsep masih sebagian tepat, terdapat beberapa kekeliruan analisis.
     - **Level 1 (Perlu Bimbingan)**: Belum mampu menerapkan konsep materi, jawaban keliru/banyak kosong.

3. **Skor Merefleksi (Rubrik Guru Level L1–L4)**:
   - Rata-rata skor rubrik observasi guru skala 1,0–4,0 terhadap kejujuran dan kedalaman refleksi tertulis proses belajar siswa (bukan dinilai dari pemberian bintang).
   - Deskriptor Rubrik:
     - **L4: Sangat Reflektif**: Mengidentifikasi pemahaman baru, kendala, dan contoh penerapan dengan spesifik.
     - **L3: Reflektif**: Menyampaikan pemahaman baru dan proses belajar secara relevan dan cukup jelas.
     - **L2: Kurang Reflektif**: Refleksi masih sangat singkat atau umum (hanya menulis seru/senang/paham tanpa rincian).
     - **L1: Belum Reflektif**: Belum mampu merefleksikan proses belajar (kolom kosong atau tidak relevan).

Fitur Tab 3 mencakup:
- **3 Kartu Ringkasan Capaian**: Nilai terkini dan perbandingan delta kenaikan vs pertemuan awal (P1).
- **Grafik Interaktif (Canvas)**: Kurva pergerakan skor Memahami, Mengaplikasi, dan Merefleksi dengan filter fokus aspek.
- **Tabel Capaian per Pertemuan**: Rekapitulasi per pertemuan disertai topik materi, rubrik, dan **Rata-rata Nilai Tugas Kelas (0–100)**.
- **Narasi Analisis Otomatis**: Ringkasan deskriptif perkembangan capaian belajar yang dapat disalin langsung ke clipboard.
- **Ekspor Grafik PNG**: Mengunduh diagram kurva capaian belajar dalam format gambar beresolusi tajam.

---

## 🎯 Konversi Nilai Tugas Pertemuan (Skala 0–100 per Siswa)

Untuk memfasilitasi pengisian buku nilai/ledger tugas kurikulum merdeka maupun K13, aplikasi secara otomatis mengonversi gabungan 3 dimensi menjadi satu angka **Nilai Tugas Pertemuan (0–100)** per siswa:

1. **Memahami ($M$)**: `(Jumlah Benar ÷ 15) × 100` (Presisi 1 desimal, misal: 13 benar = `86,7%`)
2. **Mengaplikasi ($A_{100}$)**: `(Level ÷ 4) × 100` $\rightarrow$ Level 4: 100, Level 3: 75, Level 2: 50, Level 1: 25
3. **Merefleksi ($R_{100}$)**: `(Level ÷ 4) × 100` $\rightarrow$ L4: 100, L3: 75, L2: 50, L1: 25
4. **Nilai Tugas Siswa ($N_{\text{tugas}}$)**: `((M + A_100 + R_100) ÷ 3)` (Presisi 1 desimal format koma Indonesia, misal: `87,2`, `78,9`, `100,0`)

**Predikat Nilai Tugas:**
- $\ge 85$: **Sangat Baik (A)**
- $70,0 - 84,9$: **Baik (B)**
- $55,0 - 69,9$: **Cukup (C)**
- $< 55,0$: **Perlu Bimbingan (D)**

Nilai ini tampil langsung secara real-time pada:
- **Form Penilaian (Tab 1)**: Banner nilai besar lengkap dengan tombol salin (copy) ke clipboard.
- **Tabel Rekap (Tab 2)**: Kolom khusus nilai tugas (0–100) dan rincian konversinya.
- **Ekspor Excel (CSV)**: Kolom nilai tugas pertemuan & konversi dimensi siap olah di spreadsheet.
- **Tabel Capaian (Tab 3)**: Kolom rata-rata nilai tugas kelas per pertemuan.

---

## 🏆 Papan Peringkat Nilai Siswa per Pertemuan (Leaderboard)

Guru dapat memantau urutan siswa dari peraih nilai tertinggi hingga terendah untuk setiap pertemuan pada **Tab Rekap Nilai (Tab 2)**:

1. **Tombol Toggle Tampilan**:
   - `[📋 Tabel Rekapitulasi Lengkap]`: Menampilkan seluruh indikator Pengetahuan, Keterampilan, Sikap, dan Refleksi.
   - `[🏆 Papan Peringkat Nilai]`: Beralih ke tampilan khusus leaderboard yang terfokus pada urutan ranking nilai siswa.
2. **Statistik Pertemuan**:
   - 🥇 Skor Tertinggi (Maksimal) & nama siswa peraihnya.
   - 📉 Skor Terendah (Minimal) untuk pemantauan kebutuhan remedial.
   - 🎯 Rata-rata Nilai Tugas Kelas.
   - 🟢 Rasio & Persentase Ketuntasan Belajar ($\ge 70$).
3. **Podium Top 3**:
   - Kartu Juara 1 (Emas 🥇), Juara 2 (Perak 🥈), dan Juara 3 (Perunggu 🥉).
4. **Tabel Peringkat 1 s.d. Terakhir**:
   - Medali & nomor peringkat, nama siswa, nilai tugas emas, bilah visual kemajuan (*progress bar*), predikat, dan lencana status (`✅ Tuntas` / `⚠️ Remedial`).
5. **Tombol Salin Peringkat**:
   - Menyalin ringkasan teks daftar juara dan peringkat kelas ke clipboard dalam satu klik.
6. **Ekspor CSV Terurut**:
   - Mengunduh file Excel/CSV dengan susunan baris terurut dari peringkat 1 hingga terakhir serta memuat kolom peringkat dan status ketuntasan.



