/**
 * js/ai-scanner.js
 * Fitur Scan LKPD & Asistensi AI (Vision + OCR + Analisis Pedagogis)
 * 
 * PRINSIP MUTLAK:
 * 1. AI hanya memberikan REKOMENDASI/SARAN.
 * 2. Guru memegang kendali 100% dan wajib melakukan KONFIRMASI manual.
 * 3. Teks hasil OCR dapat diedit bebas oleh guru untuk mengoreksi salah baca tulisan tangan.
 * 4. Skor TIDAK PERNAH tersimpan otomatis tanpa persetujuan eksplisit guru.
 */

import { DEFAULT_RUBRIK } from './rubrik.js';

let activeMediaStream = null;

/**
 * Membuka aliran video kamera perangkat
 * @param {HTMLVideoElement} videoElement
 */
export async function startCamera(videoElement) {
  try {
    stopCamera();
    const constraints = {
      video: {
        facingMode: { ideal: 'environment' }, // Utamakan kamera belakang HP
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    };
    activeMediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = activeMediaStream;
    await videoElement.play();
    return true;
  } catch (err) {
    console.warn('Gagal membuka kamera langsung via getUserMedia:', err);
    throw err;
  }
}

/**
 * Menghentikan aliran kamera
 */
export function stopCamera() {
  if (activeMediaStream) {
    activeMediaStream.getTracks().forEach(track => track.stop());
    activeMediaStream = null;
  }
}

/**
 * Mengambil foto snapshot dari elemen video ke Canvas dan mengembalikannya sebagai DataURL Base64
 * @param {HTMLVideoElement} videoElement
 * @returns {string} Base64 Data URL
 */
export function capturePhotoFromVideo(videoElement) {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth || 1280;
  canvas.height = videoElement.videoHeight || 720;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.85);
}

/**
 * Mengubah file gambar yang diunggah menjadi Base64 DataURL
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Menganalisis gambar LKPD dengan Google Gemini Vision API atau Mode Analisis Cerdas Lokal
 * @param {string} base64DataUrl - Foto LKPD dalam format DataURL
 * @param {string} apiKey - Kunci API Gemini pengguna (opsional)
 * @param {Object} context - Info topik & nomor pertemuan
 */
export async function analyzeLkpdImage(base64DataUrl, apiKey = '', context = {}) {
  // Jika ada API Key, panggil endpoint Gemini Vision resmi
  if (apiKey && apiKey.trim().length > 10) {
    try {
      return await callGeminiVisionAPI(base64DataUrl, apiKey.trim(), context);
    } catch (apiError) {
      console.warn('Gemini API Error, beralih ke analisis cerdas terpandu:', apiError);
      // Jika API error (kuota habis/key salah), fallback ke analisis terpandu dengan peringatan
      const fallbackResult = generateSimulatedOcrAnalysis(context);
      fallbackResult.warning = `Panggilan Gemini API gagal (${apiError.message}). Menampilkan simulasi OCR agar pekerjaan guru tidak terhenti.`;
      return fallbackResult;
    }
  }

  // Jika belum memasukkan API Key, jalankan mode simulasi cerdas terpandu
  return generateSimulatedOcrAnalysis(context);
}

/**
 * Panggilan langsung ke REST API Gemini 1.5 Flash / Gemini Pro Vision
 */
async function callGeminiVisionAPI(base64DataUrl, apiKey, context) {
  const base64Data = base64DataUrl.split(',')[1];
  const mimeType = base64DataUrl.substring(base64DataUrl.indexOf(':') + 1, base64DataUrl.indexOf(';')) || 'image/jpeg';

  const systemInstruction = `
Kamu adalah asisten penilai rubrik LKPD IPA SMP WARDIPA.
Tugasmu:
1. Baca tulisan tangan siswa pada foto LKPD untuk 2 bagian kualitatif:
   - Bagian "Mengaplikasi" (penyelesaian masalah / hitungan / penjelasan konsep IPA).
   - Bagian "Merefleksi" (ungkapan refleksi pengalaman belajar, kendala, atau pemahaman).
2. Taksir tingkat self-rating bintang siswa (1-5) jika ada yang dilingkari/dicentang di LKPD.
3. Berikan saran penilaian Level (1-4) berdasarkan rubrik berikut:

Rubrik Mengaplikasi:
Level 4: Identifikasi besaran/konsep tepat semua; alasan logis dan sistematis.
Level 3: Identifikasi tepat sebagian besar; alasan cukup jelas.
Level 2: Banyak keliru; jawaban dangkal atau hanya menyalin soal.
Level 1: Banyak kosong atau tidak relevan.

Rubrik Merefleksi:
Level 4: Spesifik, jujur mengakui kesulitan, menghubungkan konsep ke pengalaman pribadi.
Level 3: Relevan tapi agak umum/normatif.
Level 2: Singkat, tidak spesifik (hanya "seru/paham"), tidak menggali kendala.
Level 1: Tidak dijawab / tidak nyambung.

KEMBALIKAN HANYA FORMAT JSON MURNI TANPA MARKDOWN BACKTICKS:
{
  "teks_mengaplikasi": "teks hasil transkripsi tulisan tangan siswa bagian mengaplikasi",
  "saran_mengaplikasi_level": 1-4,
  "alasan_mengaplikasi": "alasan pedagogis singkat pemilihan level",
  "teks_merefleksi": "teks hasil transkripsi tulisan tangan siswa bagian merefleksi",
  "saran_merefleksi_level": 1-4,
  "alasan_merefleksi": "alasan pedagogis singkat pemilihan level",
  "self_rating_terdeteksi": 1-5,
  "kualitas_gambar": "Jelas / Cukup / Kurang Jelas"
}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            { text: systemInstruction },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

  const result = await response.json();
  const textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) throw new Error('Tidak menerima respon teks dari model AI.');

  return JSON.parse(textOutput);
}

/**
 * Mode Simulasi Asistensi Cerdas (Bekerja 100% Offline tanpa API Key)
 * Sangat berguna saat demo, uji coba tanpa kuota, atau di kelas minim sinyal
 */
function generateSimulatedOcrAnalysis(context = {}) {
  const samples = [
    {
      teks_mengaplikasi: 'Diketahui m = 158 gram, V = 20 mL = 20 cm3. Rumus rho = m / V = 158 / 20 = 7,9 g/cm3. Dari tabel massa jenis, benda ini adalah besi karena nilai massa jenisnya persis sama.',
      saran_mengaplikasi_level: 4,
      alasan_mengaplikasi: 'Identifikasi besaran massa dan volume lengkap dengan satuan, substitusi rumus tepat, serta menarik kesimpulan jenis materi dengan logis.',
      teks_merefleksi: 'Kami awalnya bingung cara mencari volume batu yang bentuknya tidak teratur. Tapi setelah memakai gelas berpancuran dan melihat air yang tumpah, kami jadi mengerti konsep volume zat cair yang dipindahkan.',
      saran_merefleksi_level: 4,
      alasan_merefleksi: 'Refleksi sangat jujur mengakui kebingungan awal dan menguraikan proses penemuan pemahaman melalui percobaan nyata.',
      self_rating_terdeteksi: 4,
      kualitas_gambar: 'Jelas (Simulasi Terpandu)'
    },
    {
      teks_mengaplikasi: 'm = 50 g, V = 10 cm3. rho = 50 / 10 = 5. Benda tenggelam di air karena berat.',
      saran_mengaplikasi_level: 3,
      alasan_mengaplikasi: 'Hitungan massa jenis benar (5 g/cm3), namun alasan tenggelam belum mengaitkan massa jenis benda terhadap massa jenis air (1 g/cm3).',
      teks_merefleksi: 'Praktikum hari ini seru dan kami bisa bekerja sama membagi tugas kelompok.',
      saran_merefleksi_level: 2,
      alasan_merefleksi: 'Pernyataan refleksi masih bersifat umum ("seru dan membagi tugas"), belum menyentuh kesulitan materi konsep IPA.',
      self_rating_terdeteksi: 4,
      kualitas_gambar: 'Cukup Jelas (Simulasi Terpandu)'
    }
  ];

  const picked = samples[Math.floor(Math.random() * samples.length)];
  return {
    ...picked,
    is_simulated: true,
    info_mode: 'Mode Asistensi Simulasi Lokal (Aktifkan Gemini API Key di menu Pengaturan untuk OCR AI live).'
  };
}
