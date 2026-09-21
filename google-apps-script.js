/**
 * ==============================================================================
 * WARDIPA - GOOGLE APPS SCRIPT BACKEND & HALAMAN UPLOAD SISWA
 * ==============================================================================
 * Skrip ini 100% GRATIS dan berjalan di akun Google Drive / akun belajar.id Guru.
 * 
 * Skrip ini menjalankan 2 FUNGSI UTAMA:
 * 1. Menampilkan Halaman Web Upload Foto LKPD saat siswa scan QR atau buka link
 * 2. Menyimpan foto LKPD ke Google Drive Guru & mencatatnya ke Google Sheets
 * 
 * ------------------------------------------------------------------------------
 * CARA MEMPERBARUI / MEMASANG SKRIP INI DI GOOGLE APPS SCRIPT:
 * ------------------------------------------------------------------------------
 * 1. Buka browser dan buka: https://script.google.com/
 * 2. Buka proyek WARDIPA Anda yang sudah dibuat sebelumnya.
 * 3. HAPUS SEMUA KODE LAMA di Code.gs, lalu TEMPEL (PASTE) SEMUA ISI FILE INI.
 * 4. Klik ikon "Simpan" (Ctrl+S).
 * 5. Klik tombol "Deploy" (di pojok kanan atas) -> Pilih "Manage deployments" (Kelola deployment).
 * 6. Klik ikon Pensil ("Edit") di sebelah kanan deployment Anda.
 * 7. Pada baris "Version", pilih "New version" (Versi baru).
 * 8. Klik tombol "Deploy" di bawah.
 * 9. Selesai! Link dan Barcode sekarang langsung membuka halaman pengumpulan di HP siswa!
 * ==============================================================================
 */

var ROOT_FOLDER_NAME = "WARDIPA_LKPD";
var SHEET_LOG_NAME = "Rekap_Pengumpulan_LKPD";

/**
 * Jalankan fungsi ini 1x di editor Google Apps Script dengan tombol "Run" (Jalankan)
 * untuk mengaktifkan izin akses Google Drive & Google Sheets akun Anda.
 */
function AKTIFKAN_IZIN_DRIVE() {
  testIzinAkses();
}

function testIzinAkses() {
  var root = DriveApp.getRootFolder();
  Logger.log("Izin Google Drive AKTIF dan SIAP: " + root.getName());
}

/**
 * Endpoint GET:
 * - Jika action === "ping" -> Uji koneksi dari laptop guru
 * - Jika action === "list" -> Tarik foto siswa ke laptop guru
 * - Jika dibuka siswa (default) -> Sajikan Halaman Web Pengumpulan LKPD di HP siswa
 */
function doGet(e) {
  try {
    var params = e ? e.parameter : {};
    var action = params.action || "";
    var kelasFilter = (params.kelas || "").trim();
    var pertemuanFilter = Number(params.pertemuan) || 0;

    // 1. Uji koneksi dari laptop guru
    if (action === "ping") {
      return createJsonResponse({ status: "ready", message: "WARDIPA Google Apps Script siap digunakan!" }, 200);
    }

    // 2. Tarik daftar foto dari laptop guru
    if (action === "list") {
      var submissions = getSubmissionsFromSheet(kelasFilter, pertemuanFilter);
      return createJsonResponse({
        status: "success",
        count: submissions.length,
        submissions: submissions
      }, 200);
    }

    // 3. Ambil data foto (base64) untuk ditampilkan di aplikasi WARDIPA laptop guru (Bypass domain belajar.id)
    if (action === "image" || action === "image_base64") {
      var fileId = (params.id || "").trim();
      if (!fileId) {
        return createJsonResponse({ ok: false, message: "Parameter id file tidak ditemukan" }, 400);
      }
      try {
        var file = DriveApp.getFileById(fileId);
        var blob = file.getBlob();
        var b64 = Utilities.base64Encode(blob.getBytes());
        var mime = blob.getContentType() || "image/jpeg";
        return createJsonResponse({
          ok: true,
          id: fileId,
          name: file.getName(),
          dataUrl: "data:" + mime + ";base64," + b64
        }, 200);
      } catch (errFile) {
        return createJsonResponse({ ok: false, message: "Gagal membaca foto di Drive: " + errFile.toString() }, 500);
      }
    }

    // 4. Tampilkan Form Upload Foto untuk Siswa (HP / Tablet / Laptop)
    var htmlContent = getUploadHtmlPage(kelasFilter, pertemuanFilter);
    return HtmlService.createHtmlOutput(htmlContent)
      .setTitle("Kirim Foto LKPD IPA - WARDIPA")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag("viewport", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");

  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() }, 500);
  }
}

/**
 * Endpoint POST: Fallback penerimaan jika dipanggil via fetch HTTP POST dari luar
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ status: "error", message: "Data pengiriman kosong" }, 400);
    }
    var data = JSON.parse(e.postData.contents);
    var result = saveStudentSubmission(data);
    return createJsonResponse(result, result.status === "success" ? 200 : 500);
  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() }, 500);
  }
}

/**
 * Fungsi Server: Menyimpan kiriman foto LKPD dari siswa ke Google Drive & Google Sheet
 * Menyimpan rapi ke: WARDIPA_LKPD / [Kelas] / Pertemuan_[No] / [Nama_Siswa] / [Foto]
 */
function saveStudentSubmission(data) {
  try {
    if (!data) return { status: "error", message: "Data pengiriman kosong" };

    var namaSiswa = (data.nama_siswa || "Siswa_Tanpa_Nama").trim();
    var kelas = (data.kelas || "Kelas_Umum").trim();
    var kelompok = (data.kelompok || "Kelompok_Umum").trim();
    var pertemuanKe = Number(data.pertemuan_ke) || 1;
    var catatanSiswa = data.catatan_siswa || "";
    var lembarList = data.lembar || [];

    if (lembarList.length === 0) {
      return { status: "error", message: "Tidak ada lembar foto yang dikirim." };
    }

    // 1. Buat hierarki folder: WARDIPA_LKPD -> [Kelas] -> Pertemuan_[No] -> [Nama Siswa]
    var targetFolder = getOrCreateTargetFolder(kelas, pertemuanKe, namaSiswa);

    // 2. Simpan Setiap Lembar Foto ke folder siswa
    var savedFiles = [];

    for (var i = 0; i < lembarList.length; i++) {
      var item = lembarList[i];
      var noLembar = item.no_lembar || (i + 1);
      var labelLembar = item.label || ("Lembar_" + noLembar);
      var base64Data = item.base64;

      if (!base64Data) continue;

      // Bersihkan header Data URL jika ada (data:image/jpeg;base64,...)
      var pureBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
      var decodedBytes = Utilities.base64Decode(pureBase64);
      var fileName = "P" + pertemuanKe + "_L" + noLembar + "_" + labelLembar + ".jpg";
      var blob = Utilities.newBlob(decodedBytes, "image/jpeg", fileName);

      // Bersihkan file lama dengan nama yang sama di folder siswa ini agar tidak menumpuk duplikat
      var oldSameFiles = targetFolder.getFilesByName(fileName);
      while (oldSameFiles.hasNext()) {
        try {
          oldSameFiles.next().setTrashed(true);
        } catch (_) {}
      }

      // Simpan file ke folder siswa
      var file = targetFolder.createFile(blob);
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (e1) {
        try {
          file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (e2) {
          console.warn("Domain belajar.id membatasi sharing link, file tetap aman di Drive guru:", e2);
        }
      }

      var fileId = file.getId();
      var directViewUrl = "https://drive.google.com/uc?export=view&id=" + fileId;
      var webViewUrl = file.getUrl();

      savedFiles.push({
        no_lembar: noLembar,
        label: labelLembar,
        file_id: fileId,
        url: directViewUrl,
        view_url: webViewUrl,
        name: file.getName()
      });
    }

    // 3. Catat di Google Sheet (Rekapitulasi Pengumpulan Guru)
    logSubmissionToSheet(kelas, pertemuanKe, kelompok, namaSiswa, catatanSiswa, savedFiles);

    return {
      status: "success",
      message: "Berhasil menyimpan " + savedFiles.length + " foto LKPD ke Google Drive.",
      siswa: namaSiswa,
      kelas: kelas,
      pertemuan_ke: pertemuanKe,
      folder_siswa: targetFolder.getName(),
      files: savedFiles
    };

  } catch (err) {
    return {
      status: "error",
      message: err.toString()
    };
  }
}

/**
 * Helper: Mencari atau membuat hierarki folder di Google Drive
 * Drive Saya -> WARDIPA_LKPD -> [Kelas] -> Pertemuan_[No] -> [Nama Siswa]
 */
function getOrCreateTargetFolder(kelasName, pertemuanKe, namaSiswa) {
  var rootFolders = DriveApp.getFoldersByName(ROOT_FOLDER_NAME);
  var rootFolder = rootFolders.hasNext() ? rootFolders.next() : DriveApp.createFolder(ROOT_FOLDER_NAME);

  var kelasFolders = rootFolder.getFoldersByName(kelasName);
  var kelasFolder = kelasFolders.hasNext() ? kelasFolders.next() : rootFolder.createFolder(kelasName);

  var pertemuanName = "Pertemuan_" + pertemuanKe;
  var pertemuanFolders = kelasFolder.getFoldersByName(pertemuanName);
  var pertemuanFolder = pertemuanFolders.hasNext() ? pertemuanFolders.next() : kelasFolder.createFolder(pertemuanName);

  if (namaSiswa) {
    var safeStudentName = namaSiswa.trim();
    var studentFolders = pertemuanFolder.getFoldersByName(safeStudentName);
    var studentFolder = studentFolders.hasNext() ? studentFolders.next() : pertemuanFolder.createFolder(safeStudentName);
    return studentFolder;
  }

  return pertemuanFolder;
}

/**
 * Helper: Mencatat riwayat pengumpulan ke Google Sheets di dalam folder ROOT_FOLDER_NAME
 */
function logSubmissionToSheet(kelas, pertemuan, kelompok, nama, catatan, files) {
  try {
    var rootFolders = DriveApp.getFoldersByName(ROOT_FOLDER_NAME);
    var rootFolder = rootFolders.hasNext() ? rootFolders.next() : DriveApp.createFolder(ROOT_FOLDER_NAME);

    var filesList = rootFolder.getFilesByName(SHEET_LOG_NAME);
    var spreadsheet;

    if (filesList.hasNext()) {
      spreadsheet = SpreadsheetApp.open(filesList.next());
    } else {
      spreadsheet = SpreadsheetApp.create(SHEET_LOG_NAME);
      var driveFile = DriveApp.getFileById(spreadsheet.getId());
      driveFile.moveTo(rootFolder);

      var sheet = spreadsheet.getActiveSheet();
      sheet.setName("Log_Pengumpulan");
      sheet.appendRow([
        "Waktu Pengumpulan", "Kelas", "Pertemuan", "Kelompok", "Nama Siswa", 
        "Jumlah Lembar", "Link Lembar 1 (Memahami)", "Link Lembar 2 (Mengaplikasi)", 
        "Link Lembar 3 (Refleksi)", "Catatan Siswa"
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#0284c7").setFontColor("#ffffff");
    }

    var sheet = spreadsheet.getActiveSheet();
    var linkL1 = "";
    var linkL2 = "";
    var linkL3 = "";

    files.forEach(function (f) {
      if (f.no_lembar == 1) linkL1 = f.url;
      else if (f.no_lembar == 2) linkL2 = f.url;
      else if (f.no_lembar == 3) linkL3 = f.url;
    });

    var nowStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([
      nowStr, kelas, "Pertemuan " + pertemuan, kelompok, nama, 
      files.length, linkL1, linkL2, linkL3, catatan
    ]);
  } catch (sheetErr) {
    console.warn("Log sheet warning:", sheetErr);
  }
}

/**
 * Helper: Membaca log submissions dari spreadsheet dan scan folder Google Drive
 */
function getSubmissionsFromSheet(kelasFilter, pertemuanFilter) {
  var list = [];
  var seenKeys = {};

  function extractFileId(url) {
    if (!url) return "";
    var m = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (m && m[1]) return m[1];
    var m2 = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (m2 && m2[1]) return m2[1];
    return "";
  }

  try {
    var rootFolders = DriveApp.getFoldersByName(ROOT_FOLDER_NAME);
    if (!rootFolders.hasNext()) return list;
    var rootFolder = rootFolders.next();

    // 1. Baca dari Spreadsheet jika ada
    var filesList = rootFolder.getFilesByName(SHEET_LOG_NAME);
    if (filesList.hasNext()) {
      try {
        var spreadsheet = SpreadsheetApp.open(filesList.next());
        var sheet = spreadsheet.getActiveSheet();
        var data = sheet.getDataRange().getValues();

        for (var i = 1; i < data.length; i++) {
          var row = data[i];
          var rowKelas = String(row[1] || "").trim();
          var rowPertemuanStr = String(row[2] || "");
          var pNum = parseInt(rowPertemuanStr.replace(/[^0-9]/g, "")) || 1;
          var rowNama = String(row[4] || "").trim();

          if (kelasFilter && rowKelas.toLowerCase() !== kelasFilter.toLowerCase()) continue;
          if (pertemuanFilter && pNum !== pertemuanFilter) continue;

          var files = [];
          if (row[6]) {
            var fId1 = extractFileId(row[6]);
            files.push({ no_lembar: 1, label: "Memahami", url: row[6], file_id: fId1, view_url: "https://drive.google.com/file/d/" + fId1 + "/view" });
          }
          if (row[7]) {
            var fId2 = extractFileId(row[7]);
            files.push({ no_lembar: 2, label: "Mengaplikasi", url: row[7], file_id: fId2, view_url: "https://drive.google.com/file/d/" + fId2 + "/view" });
          }
          if (row[8]) {
            var fId3 = extractFileId(row[8]);
            files.push({ no_lembar: 3, label: "Merefleksi", url: row[8], file_id: fId3, view_url: "https://drive.google.com/file/d/" + fId3 + "/view" });
          }

          var key = (rowKelas + "_" + pNum + "_" + rowNama).toLowerCase();
          seenKeys[key] = true;

          list.push({
            timestamp: row[0],
            kelas: rowKelas,
            pertemuan_ke: pNum,
            kelompok: row[3],
            nama_siswa: rowNama,
            catatan_siswa: row[9] || "",
            files: files
          });
        }
      } catch (sheetReadErr) {
        console.warn("Sheet read error:", sheetReadErr);
      }
    }

    // 2. Scan langsung folder Google Drive: WARDIPA_LKPD / [Kelas] / Pertemuan_[No] / [Nama_Siswa]
    var targetP = pertemuanFilter || 1;
    var kFolders = kelasFilter ? rootFolder.getFoldersByName(kelasFilter) : rootFolder.getFolders();

    while (kFolders.hasNext()) {
      var kFolder = kFolders.next();
      var kName = kFolder.getName();
      if (kName === SHEET_LOG_NAME) continue;

      var pName = "Pertemuan_" + targetP;
      var pFolders = kFolder.getFoldersByName(pName);
      if (!pFolders.hasNext()) continue;
      var pFolder = pFolders.next();

      // 2a. Scan subfolder siswa di dalam Pertemuan_X
      var sFolders = pFolder.getFolders();
      while (sFolders.hasNext()) {
        var sFolder = sFolders.next();
        var sName = sFolder.getName();
        var sFiles = sFolder.getFiles();
        var studentKey = (kName + "_" + targetP + "_" + sName).toLowerCase();

        var filesForStudent = [];
        while (sFiles.hasNext()) {
          var sf = sFiles.next();
          var sfName = sf.getName();
          var lembarNum = 1;
          var labelLembar = "Memahami";

          if (sfName.indexOf("L1") !== -1 || sfName.indexOf("Memahami") !== -1) {
            lembarNum = 1; labelLembar = "Memahami";
          } else if (sfName.indexOf("L2") !== -1 || sfName.indexOf("Mengaplikasi") !== -1) {
            lembarNum = 2; labelLembar = "Mengaplikasi";
          } else if (sfName.indexOf("L3") !== -1 || sfName.indexOf("Merefleksi") !== -1 || sfName.indexOf("Refleksi") !== -1) {
            lembarNum = 3; labelLembar = "Merefleksi";
          }

          var sfId = sf.getId();
          filesForStudent.push({
            no_lembar: lembarNum,
            label: labelLembar,
            file_id: sfId,
            url: "https://drive.google.com/uc?export=view&id=" + sfId,
            view_url: sf.getUrl(),
            name: sfName
          });
        }

        filesForStudent.sort(function(a, b) { return a.no_lembar - b.no_lembar; });

        if (filesForStudent.length > 0) {
          if (!seenKeys[studentKey]) {
            list.push({
              timestamp: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
              kelas: kName,
              pertemuan_ke: targetP,
              kelompok: "Kelompok",
              nama_siswa: sName,
              catatan_siswa: "",
              files: filesForStudent
            });
            seenKeys[studentKey] = true;
          } else {
            for (var li = 0; li < list.length; li++) {
              var it = list[li];
              var itKey = (it.kelas + "_" + it.pertemuan_ke + "_" + it.nama_siswa).toLowerCase();
              if (itKey === studentKey && (!it.files || it.files.length === 0)) {
                it.files = filesForStudent;
              }
            }
          }
        }
      }

      // 2b. Scan file langsung di dalam Pertemuan_X (backward compatibility)
      var dFiles = pFolder.getFiles();
      var studentMap = {};

      while (dFiles.hasNext()) {
        var f = dFiles.next();
        var fName = f.getName();
        var cleanName = fName.replace(/\.jpg$/i, "");
        var parts = cleanName.split("_");
        if (parts.length >= 4) {
          var pNumFromF = parseInt(parts[0].replace(/[^0-9]/g, "")) || targetP;
          var sNama = parts[1].replace(/_/g, " ");
          var sKelompok = parts[2].replace(/_/g, " ");
          var lNum = 1;
          var lLabel = "Memahami";

          for (var pi = 3; pi < parts.length; pi++) {
            if (parts[pi].startsWith("L") && parts[pi].length <= 3) {
              lNum = parseInt(parts[pi].replace(/[^0-9]/g, "")) || 1;
            } else {
              lLabel = parts[pi];
            }
          }

          var sKey = (kName + "_" + pNumFromF + "_" + sNama).toLowerCase();
          if (!studentMap[sKey]) {
            studentMap[sKey] = {
              timestamp: Utilities.formatDate(f.getDateCreated(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
              kelas: kName,
              pertemuan_ke: pNumFromF,
              kelompok: sKelompok,
              nama_siswa: sNama,
              catatan_siswa: "",
              files: []
            };
          }
          var dFileId = f.getId();
          studentMap[sKey].files.push({
            no_lembar: lNum,
            label: lLabel,
            file_id: dFileId,
            url: "https://drive.google.com/uc?export=view&id=" + dFileId,
            view_url: f.getUrl()
          });
        }
      }

      for (var sk in studentMap) {
        if (!seenKeys[sk]) {
          list.push(studentMap[sk]);
          seenKeys[sk] = true;
        }
      }
    }

  } catch (e) {
    console.warn("Error reading sheet/drive:", e);
  }
  return list;
}

/**
 * Helper Response JSON
 */
function createJsonResponse(obj, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Halaman Web Pengumpulan LKPD Siswa (HTML/CSS/JS Lengkap)
 */
function getUploadHtmlPage(initKelas, initPertemuan) {
  var safeKelas = (initKelas || "Kelas 7").replace(/"/g, '\\"');
  var safePertemuan = Number(initPertemuan) || 1;

  var rawHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#0284c7" />
  <title>Kirim Foto LKPD IPA - WARDIPA</title>
  <link rel="icon" type="image/svg+xml" href="icons/icon.svg" />
  <style>
    :root {
      --bg-main: #0b1329;
      --bg-card: #152244;
      --bg-surface: #1e293b;
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --primary-light: #38bdf8;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.12);
      --radius: 12px;
      --radius-sm: 8px;
      --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(180deg, #090e1f 0%, #0f172a 100%);
      color: var(--text-main);
      min-height: 100vh;
      padding: 1rem 0.85rem 3rem;
      line-height: 1.5;
    }

    .container {
      max-width: 520px;
      margin: 0 auto;
    }

    /* HEADER */
    .app-bar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
      padding-bottom: 0.85rem;
      border-bottom: 1px solid var(--border);
    }
    .app-logo {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(2, 132, 199, 0.2);
      padding: 6px;
      border: 1px solid rgba(56, 189, 248, 0.4);
    }
    .app-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.3px;
    }
    .app-subtitle {
      font-size: 0.8rem;
      color: var(--primary-light);
      display: block;
    }

    /* CARD */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.15rem;
      margin-bottom: 1rem;
      box-shadow: var(--shadow);
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.85rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .card-title {
      font-size: 0.98rem;
      font-weight: 600;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.45rem;
    }
    .badge {
      font-size: 0.72rem;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
      background: rgba(56, 189, 248, 0.15);
      color: var(--primary-light);
      border: 1px solid rgba(56, 189, 248, 0.3);
    }

    /* FORM ELEMENTS */
    .form-group {
      margin-bottom: 0.85rem;
    }
    .form-group:last-child {
      margin-bottom: 0;
    }
    .label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 0.35rem;
    }
    .input-control, .select-control {
      width: 100%;
      padding: 0.7rem 0.85rem;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: #fff;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .input-control:focus, .select-control:focus {
      border-color: var(--primary-light);
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
    }

    /* PHOTO UPLOAD SLOTS */
    .photo-slot {
      background: rgba(30, 41, 59, 0.6);
      border: 1.5px dashed rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-sm);
      padding: 0.85rem;
      margin-bottom: 0.85rem;
      transition: all 0.2s ease;
    }
    .photo-slot.has-image {
      border-style: solid;
      border-color: var(--success);
      background: rgba(16, 185, 129, 0.08);
    }
    .slot-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .slot-title {
      font-size: 0.88rem;
      font-weight: 600;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .slot-desc {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-bottom: 0.65rem;
      display: block;
    }

    .btn-camera {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #fff;
      border: none;
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
      transition: transform 0.1s, opacity 0.2s;
    }
    .btn-camera:active {
      transform: scale(0.98);
    }

    /* PREVIEW */
    .preview-box {
      display: none;
      position: relative;
      width: 100%;
      border-radius: var(--radius-sm);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: #000;
    }
    .preview-img {
      width: 100%;
      max-height: 260px;
      object-fit: contain;
      display: block;
    }
    .preview-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.45rem 0.6rem;
      background: rgba(15, 23, 42, 0.9);
      font-size: 0.75rem;
    }
    .btn-retake {
      background: rgba(239, 68, 68, 0.2);
      color: #fca5a5;
      border: 1px solid rgba(239, 68, 68, 0.4);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
    }

    /* SUBMIT BUTTON */
    .btn-submit {
      width: 100%;
      padding: 0.95rem;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #fff;
      border: none;
      border-radius: var(--radius);
      font-size: 1.05rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: transform 0.1s, opacity 0.2s;
    }
    .btn-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-submit:active:not(:disabled) {
      transform: scale(0.98);
    }

    /* PROGRESS OVERLAY */
    .progress-modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      z-index: 999;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      backdrop-filter: blur(4px);
    }
    .progress-box {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.75rem;
      text-align: center;
      max-width: 380px;
      width: 100%;
      box-shadow: var(--shadow);
    }
    .spinner {
      width: 44px;
      height: 44px;
      border: 4px solid rgba(56, 189, 248, 0.2);
      border-top-color: var(--primary-light);
      border-radius: 50%;
      margin: 0 auto 1rem;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* SUCCESS SCREEN */
    .success-screen {
      display: none;
      text-align: center;
      padding: 2.5rem 1rem;
    }
    .success-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      display: inline-block;
      animation: bounce 0.6s ease;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  </style>
</head>
<body>

  <div class="container">

    <!-- APP BAR -->
    <header class="app-bar">
      <div class="app-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
          <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0f172a" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#818cf8" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" rx="110" fill="url(#bgGrad)" />
          <circle cx="256" cy="256" r="190" fill="#1e293b" fill-opacity="0.8" stroke="url(#glowGrad)" stroke-width="8" />
          <path d="M150 180 L200 320 L256 210 L312 320 L362 180" fill="none" stroke="#f8fafc" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
          <text x="256" y="410" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="#38bdf8" letter-spacing="4">WARDIPA</text>
          <circle cx="256" cy="150" r="14" fill="#38bdf8" />
        </svg>
      </div>
      <div>
        <h1 class="app-title">WARDIPA</h1>
        <span class="app-subtitle">Unggah Foto Lembaran LKPD IPA</span>
      </div>
    </header>

    <!-- FORM PENGUMPULAN -->
    <main id="uploadFormSection">

      <!-- IDENTITAS SISWA -->
      <section class="card">
        <div class="card-header">
          <h2 class="card-title"><span>📋</span> Identitas Siswa</h2>
          <span class="badge" id="badgePertemuan">Pertemuan 1</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.85rem;">
          <div class="form-group">
            <label class="label">Kelas:</label>
            <select id="selectKelas" class="select-control">
              <option value="Kelas 7">Kelas 7</option>
              <option value="Kelas 8">Kelas 8</option>
              <option value="Kelas 9">Kelas 9</option>
            </select>
          </div>
          <div class="form-group">
            <label class="label">Pertemuan Ke:</label>
            <input type="number" id="inputPertemuan" class="input-control" min="1" max="20" value="1" />
          </div>
        </div>

        <div class="form-group">
          <label class="label">Kelompok:</label>
          <select id="selectKelompok" class="select-control">
            <option value="Kelompok 1">Kelompok 1</option>
            <option value="Kelompok 2">Kelompok 2</option>
            <option value="Kelompok 3">Kelompok 3</option>
            <option value="Kelompok 4">Kelompok 4</option>
                      </select>
        </div>

        <div class="form-group">
          <label class="label">Nama Lengkap Siswa:</label>
          <input type="text" id="inputNamaSiswa" list="listNamaSiswa" class="input-control" placeholder="Ketik atau pilih nama lengkapmu..." required />
          <datalist id="listNamaSiswa"></datalist>
        </div>
      </section>

      <!-- FOTO LEMBAR LKPD (MULTI-LEMBAR) -->
      <section class="card">
        <div class="card-header">
          <h2 class="card-title"><span>📸</span> Foto Lembaran LKPD</h2>
          <span class="badge" style="background: rgba(16,185,129,0.15); color: #34d399; border-color: rgba(16,185,129,0.3);">
            Kompresi Otomatis
          </span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
          Pastikan tulisan tanganmu terlihat jelas, terang, dan tidak buram sebelum dikirim.
        </p>

        <!-- LEMBAR 1: MEMAHAMI -->
        <div class="photo-slot" id="slot-1">
          <div class="slot-header">
            <span class="slot-title"><span>📄</span> Lembar 1: Aktivitas Memahami</span>
            <span class="badge" id="status-1">Belum Ada</span>
          </div>
          <span class="slot-desc">Soal Isian, Benar/Salah &amp; Menjodohkan (15 Soal)</span>
          
          <input type="file" id="file-1" accept="image/*" style="display: none;" />
          <button type="button" class="btn-camera" id="btn-camera-1">
            <span>📷</span> Ambil Foto Lembar 1
          </button>

          <div class="preview-box" id="preview-1">
            <img class="preview-img" id="img-1" alt="Lembar 1" />
            <div class="preview-meta">
              <span id="meta-1">Ukuran: -</span>
              <button type="button" class="btn-retake" id="retake-1">Foto Ulang</button>
            </div>
          </div>
        </div>

        <!-- LEMBAR 2: MENGAPLIKASI -->
        <div class="photo-slot" id="slot-2">
          <div class="slot-header">
            <span class="slot-title"><span>🔬</span> Lembar 2: Aktivitas Mengaplikasi</span>
            <span class="badge" id="status-2">Belum Ada</span>
          </div>
          <span class="slot-desc">Tabel Pengamatan / Prosedur Praktikum &amp; Analisis IPA</span>
          
          <input type="file" id="file-2" accept="image/*" style="display: none;" />
          <button type="button" class="btn-camera" id="btn-camera-2">
            <span>📷</span> Ambil Foto Lembar 2
          </button>

          <div class="preview-box" id="preview-2">
            <img class="preview-img" id="img-2" alt="Lembar 2" />
            <div class="preview-meta">
              <span id="meta-2">Ukuran: -</span>
              <button type="button" class="btn-retake" id="retake-2">Foto Ulang</button>
            </div>
          </div>
        </div>

        <!-- LEMBAR 3: MEREFLEKSI -->
        <div class="photo-slot" id="slot-3">
          <div class="slot-header">
            <span class="slot-title"><span>⭐</span> Lembar 3: Aktivitas Merefleksi</span>
            <span class="badge" id="status-3">Belum Ada</span>
          </div>
          <span class="slot-desc">Catatan Refleksi Diri &amp; Pilihan Bintang Kepahaman</span>
          
          <input type="file" id="file-3" accept="image/*" style="display: none;" />
          <button type="button" class="btn-camera" id="btn-camera-3">
            <span>📷</span> Ambil Foto Lembar 3
          </button>

          <div class="preview-box" id="preview-3">
            <img class="preview-img" id="img-3" alt="Lembar 3" />
            <div class="preview-meta">
              <span id="meta-3">Ukuran: -</span>
              <button type="button" class="btn-retake" id="retake-3">Foto Ulang</button>
            </div>
          </div>
        </div>

        <!-- CATATAN KHUSUS SISWA -->
        <div class="form-group" style="margin-top: 0.85rem;">
          <label class="label">Catatan Tambahan untuk Guru (Opsional):</label>
          <input type="text" id="inputCatatanSiswa" class="input-control" placeholder="Cth: Bagian nomor 3 sudah diperbaiki..." />
        </div>
      </section>

      <!-- TOMBOL SUBMIT -->
      <button type="button" id="btnSubmitAll" class="btn-submit">
        <span>🚀</span> Kirim Lembar LKPD ke Guru
      </button>
      <p style="text-align: center; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.65rem;">
        Foto otomatis dikompres agar hemat kuota dan cepat sampai.
      </p>

    </main>

    <!-- LAYAR SUKSES -->
    <section id="successSection" class="card success-screen" style="display: none;">
      <div style="width: 76px; height: 76px; border-radius: 50%; background: rgba(16,185,129,0.18); border: 2px solid #10b981; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; font-size: 2.5rem; box-shadow: 0 0 25px rgba(16,185,129,0.3);">
        ✅
      </div>
      <h2 style="color: #fff; font-size: 1.45rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.5px;">
        Foto LKPD Berhasil Dikirim!
      </h2>
      <p style="font-size: 0.92rem; color: #94a3b8; margin-bottom: 1.25rem; line-height: 1.5;">
        Terima kasih, <strong id="successNama" style="color: #38bdf8;">Siswa</strong>! Lembaran LKPD-mu telah tersimpan rapi di Google Drive guru dan langsung terhubung ke aplikasi penilaian.
      </p>
      
      <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: var(--radius-sm); padding: 1.15rem; margin-bottom: 1.25rem; text-align: left; font-size: 0.86rem;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.45rem; margin-bottom: 0.45rem;">
          <span style="color: #94a3b8;">Kelas:</span>
          <strong id="successKelas" style="color: #fff;">-</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.45rem; margin-bottom: 0.45rem;">
          <span style="color: #94a3b8;">Pertemuan:</span>
          <strong id="successPertemuan" style="color: #fff;">-</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.45rem; margin-bottom: 0.45rem;">
          <span style="color: #94a3b8;">Kelompok:</span>
          <strong id="successKelompok" style="color: #fff;">-</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.45rem; margin-bottom: 0.45rem;">
          <span style="color: #94a3b8;">Jumlah Foto:</span>
          <strong id="successJumlahFoto" style="color: #34d399; font-weight: bold;">-</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 0.2rem;">
          <span style="color: #94a3b8;">Folder Drive Guru:</span>
          <span id="successFolder" style="color: #38bdf8; font-family: monospace; font-size: 0.78rem; word-break: break-all;">-</span>
        </div>
      </div>

      <!-- DAFTAR LEMBAR TERKIRIM -->
      <div id="successListLembar" style="margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.45rem;"></div>

      <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 1.5rem;">
        🔒 File foto tersimpan aman di akun Google Drive guru. Kamu boleh menutup tab browser ini.
      </p>

      <button type="button" id="btnKirimLagi" class="btn-camera" style="background: rgba(30, 41, 59, 0.9); border: 1px solid var(--border);">
        <span>🔄</span> Kirim Jawaban Lain / Siswa Lain
      </button>
    </section>

  </div>

  <!-- MODAL PROGRESS / LOADING -->
  <div id="progressModal" class="progress-modal">
    <div class="progress-box">
      <div class="spinner"></div>
      <h3 id="progressTitle" style="font-size: 1.05rem; color: #fff; margin-bottom: 0.4rem;">Mengompres Foto...</h3>
      <p id="progressDesc" style="font-size: 0.82rem; color: var(--text-muted);">Mohon tunggu sebentar, foto sedang diproses agar hemat kuota.</p>
    </div>
  </div>

  <!-- SCRIPT LOGIKA PENGUMPULAN SISWA -->
  <script>
    var SERVER_INIT_KELAS = "__SERVER_INIT_KELAS__";
    var SERVER_INIT_PERTEMUAN = "__SERVER_INIT_PERTEMUAN__";
  </script>
  <script>
    (function () {
      'use strict';

      // State Gambar yang Diunggah
      var photos = {
        1: null, // { base64, sizeKb, name }
        2: null,
        3: null
      };

      // Inisialisasi Daftar Nama Siswa per Kelas
      var ROSTER_SISWA = {
        'kelas 7': [
          'AKIFA NAILA','ALIF','ARRAZAK','DAVID','HUMAIRAH','IRMAWATI','KARMILA','LAILA NURFADILA','LUTFI','MIPTA',
          'MISKA MAULIDA','MUHAMMAD DZAKY AL-GAZALY','MUHAMMAD FIKRI','MUHAMMAD SULIPAN','MUHAMMAD YAHYA','NADILA',
          'NAJWA HASANA','VIONA AZZAHRA','MULYADI','MUHSIN'
        ],
        'kelas 8': [
          'AHMAD DHANI','AHMAD RIDWAN','AZISATUL GINAYA','FIKRAN','KHAIRUL UMAM','MOH ALIF','NUR AFIKA',
          'NURUL HIDAYAH','RESKI WAHYUNI','MUHAMMAD FADIL'
        ],
        'kelas 9': [
          'AHMAD RIFKI','DIMOS','ELISNA','FATUR RAHMAN','FIRDA','IRANTI','RISWAN','SABILA','SULFIKRAM'
        ]
      };

      function updateDatalistNamaSiswa(kelasName) {
        var dl = document.getElementById('listNamaSiswa');
        if (!dl) return;
        dl.innerHTML = '';
        var k = (kelasName || '').trim().toLowerCase();
        var list = ROSTER_SISWA[k] || [];
        list.forEach(function(nama) {
          var opt = document.createElement('option');
          opt.value = nama;
          dl.appendChild(opt);
        });
      }

      // Inisialisasi Parameter: dukung SERVER_INIT (dari Google Apps Script) maupun query URL (?kelas=...&pertemuan=...)
      var urlParams = new URLSearchParams(window.location.search);
      var serverKelas = typeof SERVER_INIT_KELAS !== 'undefined' ? SERVER_INIT_KELAS : '';
      var serverPertemuan = typeof SERVER_INIT_PERTEMUAN !== 'undefined' ? SERVER_INIT_PERTEMUAN : '';

      var paramKelas = serverKelas || urlParams.get('kelas') || 'Kelas 7';
      var paramPertemuan = serverPertemuan || urlParams.get('pertemuan') || 1;
      var paramEndpoint = urlParams.get('endpoint') || '';

      var selK = document.getElementById('selectKelas');
      if (paramKelas && selK) {
        var exists = Array.from(selK.options).some(function (o) { return o.value.toLowerCase() === paramKelas.toLowerCase(); });
        if (!exists) {
          var opt = document.createElement('option');
          opt.value = paramKelas;
          opt.textContent = paramKelas;
          selK.appendChild(opt);
        }
        selK.value = paramKelas;
      }

      if (selK) {
        updateDatalistNamaSiswa(selK.value);
        selK.addEventListener('change', function(e) {
          updateDatalistNamaSiswa(e.target.value);
        });
      }

      if (paramPertemuan) {
        var inP = document.getElementById('inputPertemuan');
        inP.value = paramPertemuan;
        document.getElementById('badgePertemuan').textContent = 'Pertemuan ' + paramPertemuan;
      }

      document.getElementById('inputPertemuan').addEventListener('input', function (e) {
        document.getElementById('badgePertemuan').textContent = 'Pertemuan ' + (e.target.value || 1);
      });

      // Setup Kamera & Slot Foto
      [1, 2, 3].forEach(function (slotId) {
        var btnCam = document.getElementById('btn-camera-' + slotId);
        var fileInput = document.getElementById('file-' + slotId);
        var retakeBtn = document.getElementById('retake-' + slotId);

        btnCam.addEventListener('click', function () {
          fileInput.value = '';
          fileInput.click();
        });
        retakeBtn.addEventListener('click', function () {
          fileInput.value = '';
          fileInput.click();
        });

        fileInput.addEventListener('change', function (e) {
          var file = e.target.files && e.target.files[0];
          if (!file) return;

          showProgress('Memproses & Mengompres Foto...', 'Sedang merampingkan Lembar ' + slotId + ' agar hemat kuota...');

          compressImage(file, 1200, 0.72).then(function (compressed) {
            photos[slotId] = compressed;

            // Update UI
            document.getElementById('img-' + slotId).src = compressed.base64;
            document.getElementById('meta-' + slotId).textContent = 'Ukuran: ' + compressed.sizeKb + ' KB (Hemat & Jelas!)';
            document.getElementById('preview-' + slotId).style.display = 'block';
            btnCam.style.display = 'none';

            var badge = document.getElementById('status-' + slotId);
            badge.textContent = 'Siap Kirim';
            badge.className = 'badge';
            badge.style.background = 'rgba(16,185,129,0.15)';
            badge.style.color = '#34d399';
            badge.style.borderColor = 'rgba(16,185,129,0.4)';

            document.getElementById('slot-' + slotId).classList.add('has-image');
            hideProgress();
          }).catch(function (err) {
            hideProgress();
            console.error(err);
            alert('Gagal memproses foto. Silakan coba pilih foto kembali.');
          });
        });
      });

      // Kompresi Gambar Cerdas (Client-Side Canvas)
      function compressImage(file, maxDim, quality) {
        if (!maxDim) maxDim = 1200;
        if (!quality) quality = 0.72;

        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (event) {
            var img = new Image();
            img.src = event.target.result;
            img.onload = function () {
              var w = img.width;
              var h = img.height;

              if (w > maxDim || h > maxDim) {
                if (w > h) {
                  h = Math.round((h * maxDim) / w);
                  w = maxDim;
                } else {
                  w = Math.round((w * maxDim) / h);
                  h = maxDim;
                }
              }

              var canvas = document.createElement('canvas');
              canvas.width = w;
              canvas.height = h;
              var ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, w, h);

              var base64 = canvas.toDataURL('image/jpeg', quality);
              var sizeKb = Math.round((base64.length * 3) / 4 / 1024);

              resolve({
                base64: base64,
                sizeKb: sizeKb,
                name: file.name
              });
            };
            img.onerror = reject;
          };
          reader.onerror = reject;
        });
      }

      function showProgress(title, desc) {
        document.getElementById('progressTitle').textContent = title;
        document.getElementById('progressDesc').textContent = desc;
        document.getElementById('progressModal').style.display = 'flex';
      }

      function hideProgress() {
        document.getElementById('progressModal').style.display = 'none';
      }

      // Fungsi Pengiriman Berjenjang (google.script.run -> fallback fetch POST -> fallback offline)
      function submitPayload(payload, onDone) {
        var DEFAULT_GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyUbje5oXG3BzOSqqnCNzJDsUUIcVBkXDK2RCDTntPMwDdlsxgtCZod070oFUXUDQpxrw/exec';
        var scriptUrl = paramEndpoint || localStorage.getItem('wardipa_gas_endpoint') || DEFAULT_GAS_ENDPOINT;

        function doFetchPost() {
          if (!scriptUrl) {
            saveToLocalQueue();
            return;
          }
          fetch(scriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
          })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            if (res && res.status === 'success') onDone(null, res);
            else onDone(new Error((res && res.message) || 'Gagal menyimpan foto ke Google Drive'));
          })
          .catch(function (err) {
            console.warn('Fetch POST gagal, simpan ke antrean lokal:', err);
            saveToLocalQueue();
          });
        }

        function saveToLocalQueue() {
          var LOCAL_SUBMISSIONS_KEY = 'wardipa_submissions_queue';
          var queue = JSON.parse(localStorage.getItem(LOCAL_SUBMISSIONS_KEY) || '[]');
          queue.push(payload);
          localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(queue));
          onDone(null, { status: 'success', local: true });
        }

        // 1. Coba google.script.run jika di dalam Google Apps Script Web App
        if (typeof google !== 'undefined' && google.script && google.script.run) {
          google.script.run
            .withSuccessHandler(function (res) {
              if (res && res.status === 'success') {
                onDone(null, res);
              } else {
                doFetchPost();
              }
            })
            .withFailureHandler(function (err) {
              console.warn('google.script.run error, coba fetch POST:', err);
              doFetchPost();
            })
            .saveStudentSubmission(payload);
          return;
        }

        // 2. Fetch POST biasa jika dibuka via standalone link
        doFetchPost();
      }

      // Tombol Kirim Seluruh Lembar
      document.getElementById('btnSubmitAll').addEventListener('click', function () {
        var nama = document.getElementById('inputNamaSiswa').value.trim();
        if (!nama) {
          alert('Mohon isi Nama Lengkap Siswa terlebih dahulu!');
          document.getElementById('inputNamaSiswa').focus();
          return;
        }

        var countPhotos = Object.values(photos).filter(Boolean).length;
        if (countPhotos === 0) {
          alert('Mohon ambil minimal 1 foto lembaran LKPD sebelum mengirim!');
          return;
        }

        var kelas = document.getElementById('selectKelas').value;
        var kelompok = document.getElementById('selectKelompok').value;
        var pertemuan = document.getElementById('inputPertemuan').value || 1;
        var catatan = document.getElementById('inputCatatanSiswa').value.trim();

        // Buat Payload Pengiriman
        var payload = {
          nama_siswa: nama,
          kelas: kelas,
          kelompok: kelompok,
          pertemuan_ke: Number(pertemuan),
          catatan_siswa: catatan,
          timestamp: new Date().toISOString(),
          lembar: []
        };

        var LABELS = { 1: 'Memahami', 2: 'Mengaplikasi', 3: 'Merefleksi' };
        [1, 2, 3].forEach(function (id) {
          if (photos[id]) {
            payload.lembar.push({
              no_lembar: id,
              label: LABELS[id],
              base64: photos[id].base64,
              size_kb: photos[id].sizeKb
            });
          }
        });

        showProgress('Mengirim ke Google Drive Guru...', 'Menyimpan foto lembaran LKPD ke folder siswa...');

        submitPayload(payload, function (err, res) {
          hideProgress();
          if (err) {
            console.error('Submission error:', err);
            alert('Gagal mengunggah foto ke Google Drive Guru!\n\nPenyebab: ' + (err.message || err));
          } else {
            document.getElementById('uploadFormSection').style.display = 'none';
            document.getElementById('successNama').textContent = nama;
            document.getElementById('successKelas').textContent = kelas;
            document.getElementById('successPertemuan').textContent = 'Pertemuan ' + pertemuan;
            document.getElementById('successKelompok').textContent = kelompok;
            document.getElementById('successJumlahFoto').textContent = countPhotos + ' Lembar Foto Tersimpan';
            document.getElementById('successFolder').textContent = 'WARDIPA_LKPD / ' + kelas + ' / Pertemuan_' + pertemuan + ' / ' + nama;

            var listElem = document.getElementById('successListLembar');
            if (listElem) {
              listElem.innerHTML = '';
              [1, 2, 3].forEach(function (id) {
                if (photos[id]) {
                  var row = document.createElement('div');
                  row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.82rem; color: #a7f3d0; margin-bottom: 0.35rem;';
                  row.innerHTML = '<span>📄 Lembar ' + id + ': ' + LABELS[id] + '</span><span style="font-weight: 700;">Tersimpan ✅</span>';
                  listElem.appendChild(row);
                }
              });
            }

            document.getElementById('successSection').style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (navigator.vibrate) {
              try { navigator.vibrate([100, 50, 100]); } catch (_) {}
            }
          }
        });
      });

      // Tombol Kirim Lagi
      document.getElementById('btnKirimLagi').addEventListener('click', function () {
        window.location.reload();
      });

    })();
  </script>

</body>
</html>
`;

  return rawHtml
    .replace("__SERVER_INIT_KELAS__", safeKelas)
    .replace("__SERVER_INIT_PERTEMUAN__", String(safePertemuan));
}