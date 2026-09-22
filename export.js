/**
 * js/export.js
 * Modul Ekspor Data (CSV/Excel, Laporan Cetak Ramah PDF, dan Backup Database)
 */

import { getMengaplikasiInfo, getMerefleksiInfo } from './rubrik.js';
import { getEntryFlags } from './flags.js';

/**
 * Mengonversi daftar penilaian menjadi string CSV dengan UTF-8 BOM agar terbaca sempurna di Microsoft Excel
 */
export function exportToCSV(penilaianList, options = {}) {
  const headers = [
    'No',
    'Pertemuan Ke',
    'Tanggal',
    'Topik Pembelajaran',
    'Nama Kelompok',
    'Anggota Kelompok',
    // Dimensi 1: Memahami
    'Memahami (Benar)',
    'Memahami (Total Soal)',
    'Memahami (Skor %)',
    // Dimensi 2: Mengaplikasi
    'Mengaplikasi (Level 1-4)',
    'Mengaplikasi (Deskripsi Kategori)',
    'Mengaplikasi (Catatan Guru)',
    // Dimensi 3: Merefleksi
    'Merefleksi (Level Guru 1-4)',
    'Merefleksi (Kategori Guru)',
    'Merefleksi (Self-Rating Siswa 1-5 Bintang)',
    'Merefleksi (Teks Refleksi Siswa)',
    'Merefleksi (Catatan Guru)',
    // Analisis Pedagogis
    'Flag Anomali Pembelajaran',
    'Skor Komposit (Opsional)'
  ];

  const rows = [headers];

  penilaianList.forEach((entry, idx) => {
    const aplInfo = getMengaplikasiInfo(entry.mengaplikasi?.level);
    const refInfo = getMerefleksiInfo(entry.merefleksi?.level);
    const flags = getEntryFlags(entry, penilaianList);
    const flagStr = flags.map(f => `${f.icon} ${f.judul}`).join('; ');

    const kompositVal = entry.komposit?.skor !== undefined ? entry.komposit.skor.toFixed(1) : '-';

    const row = [
      idx + 1,
      `Pertemuan ${entry.pertemuan_ke}`,
      entry.tanggal || '-',
      `"${(entry.topik_nama || '').replace(/"/g, '""')}"`,
      `"${(entry.nama_kelompok || '').replace(/"/g, '""')}"`,
      `"${(entry.anggota || '').replace(/"/g, '""')}"`,
      entry.memahami?.jumlah_benar ?? 0,
      entry.memahami?.total_soal ?? 0,
      `${entry.memahami?.skor_persen ?? 0}%`,
      entry.mengaplikasi?.level ?? 1,
      `"${aplInfo.label}"`,
      `"${(entry.mengaplikasi?.catatan_guru || '').replace(/"/g, '""')}"`,
      entry.merefleksi?.level ?? 1,
      `"${refInfo.label}"`,
      `${entry.merefleksi?.self_rating_siswa ?? 1} Bintang`,
      `"${(entry.merefleksi?.teks_jawaban || '').replace(/"/g, '""')}"`,
      `"${(entry.merefleksi?.catatan_guru || '').replace(/"/g, '""')}"`,
      `"${flagStr.replace(/"/g, '""')}"`,
      kompositVal
    ];
    rows.push(row);
  });

  const csvContent = rows.map(r => r.join(',')).join('\r\n');
  
  // Menambahkan UTF-8 BOM (\uFEFF) agar Microsoft Excel membaca karakter Indonesia dan simbol secara tepat
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const filename = `Rekap_Rubrik_LKPD_WARDIPA_${new Date().toISOString().slice(0, 10)}.csv`;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Mencetak Lembar Rekapitulasi Rapi untuk Laporan / Portofolio Lomba
 */
export function triggerPrintReport() {
  window.print();
}

/**
 * Mengunduh cadangan database lengkap dalam format JSON
 */
export function downloadJsonBackup(backupObject) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObject, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `Backup_WARDIPA_Rubrik_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
