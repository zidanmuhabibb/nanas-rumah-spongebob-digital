# 🍍 Nanas Rumah SpongeBob Digital (NRSD)

**Media Manipulatif Digital untuk Penjumlahan dengan Menyimpan Kelas III Sekolah Dasar**

---

## 🌟 Tentang Aplikasi

**Nanas Rumah SpongeBob Digital (NRSD)** adalah media pembelajaran interaktif berbasis web yang dirancang khusus untuk membantu murid Kelas III Sekolah Dasar memahami konsep dan proses **penjumlahan bilangan cacah dengan teknik menyimpan** secara visual, manipulatif, dan intuitif.

Murid tidak hanya menghafal aturan mekanik "tulis satuan, simpan puluhan", melainkan mengalami alur pemindahan digit yang bermakna:
> **Menghitung → Menghasilkan Dua Digit → Memisahkan Digit → Menyimpan ke Penguin → Memindahkan ke Carry Slot → Menyelesaikan Penjumlahan.**

---

## 🚀 Fitur Utama

- 🏠 **Multi-Screen Experience**: Splash Screen, Beranda Interaktif, Panduan 3 Langkah, Pemilih Mode, Workspace Manipulatif, dan Panel Guru.
- 🔵 **Manipulasi Bola Angka (Digit Tokens)**: Mendukung metode **Drag-and-Drop** (magnet snap) dan **Click-to-Move** untuk aksesibilitas tablet/touchscreen.
- 🐧 **Penguin Penjaga Bilangan & Jalur Simpan**: Visualisasi penyimpanan digit puluhan yang bergerak melalui *Jalur Simpan* menuju *Sarang Penguin* lalu diteruskan ke *Slot Simpan Puluhan (Carry Slot)*.
- 📝 **Sinkronisasi Algoritma Bersusun**: Tampilan penjumlahan bersusun standar yang terupdate otomatis mengikuti langkah manipulasi murid.
- 💡 **Bantuan Bertingkat (5 Level)**: Bantuan adaptif dari pemahaman nilai tempat hingga instruksi spesifik digit.
- ↩ **Undo & Reset Penuh**: Murid bebas bereksperimen tanpa takut salah.
- 🔊 **Audio & Narasi Suara**: Web Audio API synthesizer (efek pop, chime, snap, penguin squeak) dan narasi suara Bahasa Indonesia.
- 🎮 **4 Mode Pembelajaran**:
  1. **Mode Belajar**: Panduan langkah demi langkah terstruktur.
  2. **Mode Latihan**: Latihan mandiri berbasis soal bertingkat.
  3. **Mode Tantangan**: Uji ketangkasan dengan skor dan medali bintang.
  4. **Mode Guru**: Pengaturan kustom bilangan (0-99), saklar bantuan, diagnostik konsep, dan pencetakan LKPD.

---

## 💻 Struktur File Proyek

```text
LIDYAPROJ2/
├── index.html        # Halaman utama aplikasi (SPA)
├── css/
│   └── style.css     # Design system & styling responsif
├── js/
│   ├── app.js        # Logika aplikasi & state machine pedagogis
│   ├── audio.js      # Web Audio synthesizer & speech engine
│   └── mascots.js    # Generator grafis vektor SVG karakter & Rumah Nanas
├── netlify.toml      # Konfigurasi deployment Netlify
├── server.js         # Local server development
└── README.md         # Dokumentasi proyek
```

---

## 🌐 Cara Deploy ke Netlify

1. Buka [Netlify](https://app.netlify.com/).
2. Login dan pilih **"Add new site"** > **"Import an existing project"**.
3. Hubungkan akun GitHub dan pilih repositori `nanas-rumah-spongebob-digital`.
4. Pengaturan Build:
   - **Build command**: *(kosongkan)*
   - **Publish directory**: `.` *(atau root folder)*
5. Klik **"Deploy site"**! Situs Anda akan langsung aktif secara online.

---

## 🛠️ Menjalankan Secara Lokal

Untuk menjalankan aplikasi di komputer lokal:

```bash
# Menggunakan Node.js
node server.js
```
Lalu buka browser di `http://localhost:8080/` atau `http://localhost:8081/`.

---

*Dikembangkan untuk keperluan media pembelajaran matematika interaktif kelas 3 SD.*
