/**
 * js/db.js
 * Manajemen Basis Data Lokal Persisten (IndexedDB dengan Fallback LocalStorage)
 * Menyimpan data nilai 3 dimensi, topik, kelompok, dan pengaturan rubrik.
 */

import { SAMPLE_DATA } from './sample-data.js';
import { DEFAULT_TOPIK_LIST, DEFAULT_KELOMPOK_LIST } from './rubrik.js';

const DB_NAME = 'wardipa_rubrik_db';
const DB_VERSION = 1;

let dbInstance = null;
let useLocalStorageFallback = false;

// Membuka atau membuat IndexedDB
export async function initDB() {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      console.warn('IndexedDB tidak didukung, menggunakan LocalStorage fallback.');
      useLocalStorageFallback = true;
      initLocalStorageFallback();
      return resolve(null);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store: Penilaian LKPD
      if (!db.objectStoreNames.contains('penilaian')) {
        const penStore = db.createObjectStore('penilaian', { keyPath: 'id' });
        penStore.createIndex('topik_id', 'topik_id', { unique: false });
        penStore.createIndex('id_kelompok', 'id_kelompok', { unique: false });
        penStore.createIndex('pertemuan_ke', 'pertemuan_ke', { unique: false });
        penStore.createIndex('topik_pertemuan', ['topik_id', 'pertemuan_ke'], { unique: false });
      }

      // Store: Topik IPA
      if (!db.objectStoreNames.contains('topik')) {
        db.createObjectStore('topik', { keyPath: 'id' });
      }

      // Store: Kelompok Siswa
      if (!db.objectStoreNames.contains('kelompok')) {
        db.createObjectStore('kelompok', { keyPath: 'id' });
      }

      // Store: Pengaturan Aplikasi
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };

    request.onsuccess = async (event) => {
      dbInstance = event.target.result;
      await seedInitialDataIfEmpty(dbInstance);
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      useLocalStorageFallback = true;
      initLocalStorageFallback();
      resolve(null);
    };
  });
}

// Inisialisasi Fallback LocalStorage jika IndexedDB tidak tersedia
function initLocalStorageFallback() {
  if (!localStorage.getItem('wardipa_penilaian')) {
    localStorage.setItem('wardipa_penilaian', JSON.stringify(SAMPLE_DATA));
  }
  if (!localStorage.getItem('wardipa_topik')) {
    localStorage.setItem('wardipa_topik', JSON.stringify(DEFAULT_TOPIK_LIST));
  }
  if (!localStorage.getItem('wardipa_kelompok')) {
    localStorage.setItem('wardipa_kelompok', JSON.stringify(DEFAULT_KELOMPOK_LIST));
  }
  if (!localStorage.getItem('wardipa_settings')) {
    const defaultSettings = {
      compositeWeights: { memahami: 40, mengaplikasi: 30, merefleksi: 30 },
      showComposite: false,
      geminiApiKey: '',
      enableAiScan: true
    };
    localStorage.setItem('wardipa_settings', JSON.stringify(defaultSettings));
  }
}

// Mengisi data awal realistis jika database masih kosong
async function seedInitialDataIfEmpty(db) {
  try {
    const count = await getCount(db, 'penilaian');
    if (count === 0) {
      console.log('Database kosong, menyemai data sampel LKPD WARDIPA...');
      const tx = db.transaction(['penilaian', 'topik', 'kelompok', 'settings'], 'readwrite');
      
      const penStore = tx.objectStore('penilaian');
      SAMPLE_DATA.forEach(item => penStore.put(item));

      const topikStore = tx.objectStore('topik');
      DEFAULT_TOPIK_LIST.forEach(item => topikStore.put(item));

      const kelStore = tx.objectStore('kelompok');
      DEFAULT_KELOMPOK_LIST.forEach(item => kelStore.put(item));

      const setStore = tx.objectStore('settings');
      setStore.put({
        key: 'app_config',
        compositeWeights: { memahami: 40, mengaplikasi: 30, merefleksi: 30 },
        showComposite: false,
        geminiApiKey: '',
        enableAiScan: true
      });

      await new Promise((res, rej) => {
        tx.oncomplete = res;
        tx.onerror = () => rej(tx.error);
      });
    }
  } catch (err) {
    console.warn('Gagal seeding data:', err);
  }
}

function getCount(db, storeName) {
  return new Promise((resolve) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).count();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(0);
  });
}

/* ==================== CRUD PENILAIAN ==================== */

export async function getAllPenilaian() {
  if (useLocalStorageFallback || !dbInstance) {
    const raw = localStorage.getItem('wardipa_penilaian') || '[]';
    return JSON.parse(raw);
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('penilaian', 'readonly');
    const store = tx.objectStore('penilaian');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function getPenilaianFiltered({ topik_id = null, pertemuan_ke = null, id_kelompok = null } = {}) {
  const all = await getAllPenilaian();
  return all.filter(item => {
    if (topik_id && item.topik_id !== topik_id) return false;
    if (pertemuan_ke !== null && Number(item.pertemuan_ke) !== Number(pertemuan_ke)) return false;
    if (id_kelompok && item.id_kelompok !== id_kelompok) return false;
    return true;
  });
}

export async function getPenilaianById(id) {
  if (useLocalStorageFallback || !dbInstance) {
    const list = await getAllPenilaian();
    return list.find(i => i.id === id) || null;
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('penilaian', 'readonly');
    const store = tx.objectStore('penilaian');
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function savePenilaian(entry) {
  if (!entry.id) {
    entry.id = 'pen-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
  }
  const now = new Date().toISOString();
  if (!entry.created_at) entry.created_at = now;
  entry.updated_at = now;

  // Pastikan perhitungan skor persen Memahami valid
  if (entry.memahami && entry.memahami.total_soal > 0) {
    entry.memahami.skor_persen = Math.round((entry.memahami.jumlah_benar / entry.memahami.total_soal) * 100);
  }

  if (useLocalStorageFallback || !dbInstance) {
    const list = await getAllPenilaian();
    const idx = list.findIndex(i => i.id === entry.id);
    if (idx >= 0) {
      list[idx] = entry;
    } else {
      list.push(entry);
    }
    localStorage.setItem('wardipa_penilaian', JSON.stringify(list));
    return entry;
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('penilaian', 'readwrite');
    const store = tx.objectStore('penilaian');
    const req = store.put(entry);
    req.onsuccess = () => resolve(entry);
    req.onerror = () => reject(req.error);
  });
}

export async function deletePenilaian(id) {
  if (useLocalStorageFallback || !dbInstance) {
    let list = await getAllPenilaian();
    list = list.filter(i => i.id !== id);
    localStorage.setItem('wardipa_penilaian', JSON.stringify(list));
    return true;
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('penilaian', 'readwrite');
    const store = tx.objectStore('penilaian');
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

export async function getGroupHistory(id_kelompok, topik_id = null) {
  const all = await getAllPenilaian();
  return all
    .filter(item => item.id_kelompok === id_kelompok && (!topik_id || item.topik_id === topik_id))
    .sort((a, b) => Number(a.pertemuan_ke) - Number(b.pertemuan_ke));
}

/* ==================== CRUD TOPIK ==================== */

export async function getAllTopik() {
  if (useLocalStorageFallback || !dbInstance) {
    const raw = localStorage.getItem('wardipa_topik') || JSON.stringify(DEFAULT_TOPIK_LIST);
    return JSON.parse(raw);
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('topik', 'readonly');
    const store = tx.objectStore('topik');
    const req = store.getAll();
    req.onsuccess = () => {
      const res = req.result || [];
      resolve(res.length > 0 ? res : DEFAULT_TOPIK_LIST);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveTopik(topik) {
  if (!topik.id) {
    topik.id = 'topik-' + Date.now();
  }

  if (useLocalStorageFallback || !dbInstance) {
    const list = await getAllTopik();
    const idx = list.findIndex(i => i.id === topik.id);
    if (idx >= 0) list[idx] = topik; else list.push(topik);
    localStorage.setItem('wardipa_topik', JSON.stringify(list));
    return topik;
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('topik', 'readwrite');
    const store = tx.objectStore('topik');
    const req = store.put(topik);
    req.onsuccess = () => resolve(topik);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteTopik(id) {
  if (useLocalStorageFallback || !dbInstance) {
    let list = await getAllTopik();
    list = list.filter(i => i.id !== id);
    localStorage.setItem('wardipa_topik', JSON.stringify(list));
    return true;
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('topik', 'readwrite');
    const store = tx.objectStore('topik');
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

/* ==================== CRUD KELOMPOK ==================== */

export async function getAllKelompok() {
  if (useLocalStorageFallback || !dbInstance) {
    const raw = localStorage.getItem('wardipa_kelompok') || JSON.stringify(DEFAULT_KELOMPOK_LIST);
    return JSON.parse(raw);
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('kelompok', 'readonly');
    const store = tx.objectStore('kelompok');
    const req = store.getAll();
    req.onsuccess = () => {
      const res = req.result || [];
      resolve(res.length > 0 ? res : DEFAULT_KELOMPOK_LIST);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveKelompok(kelompok) {
  if (!kelompok.id) {
    kelompok.id = 'k-' + Date.now();
  }

  if (useLocalStorageFallback || !dbInstance) {
    const list = await getAllKelompok();
    const idx = list.findIndex(i => i.id === kelompok.id);
    if (idx >= 0) list[idx] = kelompok; else list.push(kelompok);
    localStorage.setItem('wardipa_kelompok', JSON.stringify(list));
    return kelompok;
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('kelompok', 'readwrite');
    const store = tx.objectStore('kelompok');
    const req = store.put(kelompok);
    req.onsuccess = () => resolve(kelompok);
    req.onerror = () => reject(req.error);
  });
}

/* ==================== PENGATURAN & SKOR KOMPOSIT ==================== */

export async function getSettings() {
  const defaults = {
    key: 'app_config',
    compositeWeights: { memahami: 40, mengaplikasi: 30, merefleksi: 30 },
    showComposite: false,
    geminiApiKey: '',
    enableAiScan: true,
    customRubrik: null
  };

  if (useLocalStorageFallback || !dbInstance) {
    const raw = localStorage.getItem('wardipa_settings');
    if (!raw) return defaults;
    try {
      return { ...defaults, ...JSON.parse(raw) };
    } catch {
      return defaults;
    }
  }

  return new Promise((resolve) => {
    const tx = dbInstance.transaction('settings', 'readonly');
    const store = tx.objectStore('settings');
    const req = store.get('app_config');
    req.onsuccess = () => {
      if (req.result) {
        resolve({ ...defaults, ...req.result });
      } else {
        resolve(defaults);
      }
    };
    req.onerror = () => resolve(defaults);
  });
}

export async function saveSettings(newSettings) {
  const current = await getSettings();
  const merged = { ...current, ...newSettings, key: 'app_config' };

  if (useLocalStorageFallback || !dbInstance) {
    localStorage.setItem('wardipa_settings', JSON.stringify(merged));
    return merged;
  }

  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction('settings', 'readwrite');
    const store = tx.objectStore('settings');
    const req = store.put(merged);
    req.onsuccess = () => resolve(merged);
    req.onerror = () => reject(req.error);
  });
}

/* ==================== BACKUP & RESTORE ==================== */

export async function exportFullDatabase() {
  const penilaian = await getAllPenilaian();
  const topik = await getAllTopik();
  const kelompok = await getAllKelompok();
  const settings = await getSettings();

  return {
    app: 'WARDIPA_LKPD_RUBRIK',
    version: '1.0.0',
    export_date: new Date().toISOString(),
    data: {
      penilaian,
      topik,
      kelompok,
      settings
    }
  };
}

export async function importFullDatabase(imported) {
  if (!imported?.data || imported.app !== 'WARDIPA_LKPD_RUBRIK') {
    throw new Error('Format file cadangan tidak valid untuk WARDIPA Rubrik LKPD.');
  }

  const { penilaian, topik, kelompok, settings } = imported.data;

  if (useLocalStorageFallback || !dbInstance) {
    if (penilaian) localStorage.setItem('wardipa_penilaian', JSON.stringify(penilaian));
    if (topik) localStorage.setItem('wardipa_topik', JSON.stringify(topik));
    if (kelompok) localStorage.setItem('wardipa_kelompok', JSON.stringify(kelompok));
    if (settings) localStorage.setItem('wardipa_settings', JSON.stringify(settings));
    return true;
  }

  const tx = dbInstance.transaction(['penilaian', 'topik', 'kelompok', 'settings'], 'readwrite');
  
  if (penilaian) {
    const penStore = tx.objectStore('penilaian');
    penStore.clear();
    penilaian.forEach(item => penStore.put(item));
  }

  if (topik) {
    const topikStore = tx.objectStore('topik');
    topikStore.clear();
    topik.forEach(item => topikStore.put(item));
  }

  if (kelompok) {
    const kelStore = tx.objectStore('kelompok');
    kelStore.clear();
    kelompok.forEach(item => kelStore.put(item));
  }

  if (settings) {
    const setStore = tx.objectStore('settings');
    setStore.put({ ...settings, key: 'app_config' });
  }

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function resetDatabase() {
  if (useLocalStorageFallback || !dbInstance) {
    localStorage.removeItem('wardipa_penilaian');
    localStorage.removeItem('wardipa_topik');
    localStorage.removeItem('wardipa_kelompok');
    localStorage.removeItem('wardipa_settings');
    initLocalStorageFallback();
    return true;
  }

  const tx = dbInstance.transaction(['penilaian', 'topik', 'kelompok', 'settings'], 'readwrite');
  tx.objectStore('penilaian').clear();
  tx.objectStore('topik').clear();
  tx.objectStore('kelompok').clear();
  tx.objectStore('settings').clear();

  SAMPLE_DATA.forEach(item => tx.objectStore('penilaian').put(item));
  DEFAULT_TOPIK_LIST.forEach(item => tx.objectStore('topik').put(item));
  DEFAULT_KELOMPOK_LIST.forEach(item => tx.objectStore('kelompok').put(item));
  tx.objectStore('settings').put({
    key: 'app_config',
    compositeWeights: { memahami: 40, mengaplikasi: 30, merefleksi: 30 },
    showComposite: false,
    geminiApiKey: '',
    enableAiScan: true
  });

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
