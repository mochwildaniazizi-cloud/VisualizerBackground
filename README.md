# Visualizer Background & Reactive Red Cursor 🔴

Projek web showcase yang berfokus pada:
1. **Interactive Audio/Equalizer Background Visualizer** (`HeroVisualizer.tsx`) – Bereaksi secara dinamis mengikuti koordinat kursor dan posisi sumbu Y dengan spektrum gradient crimson red serta ambient idle wave.
2. **Opening Shutter Intro** (`OpeningIntro.tsx`) – Animasi pembuka tirai berlayer wave 7-kolom crimson elegan dengan tombol replay.
3. **Custom Red Cursor with 11 Echo Trails** (`CustomCursor.tsx`) – Kursor merah reaktif dengan trail echo dinamis serta multi-shape detection (default pointer, text, grab, pointer).

---

## 🚀 Cara Menjalankan Secara Lokal

1. Buka terminal di folder project ini:
   ```bash
   cd c:\Code\VisualizerBackground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan server lokal:
   ```bash
   npm run dev
   ```

4. Buka URL yang muncul di browser (biasanya `http://localhost:5173`).

---

## 🌐 Cara Deploy ke GitHub Pages

Projek ini sudah dilengkapi dengan:
- `base: './'` pada `vite.config.ts` sehingga link aset otomatis relatif dan tidak akan error 404 pada GitHub Pages.
- GitHub Actions workflow otomatis di `.github/workflows/deploy.yml`.

### Langkah-langkah deploy:
1. Inisialisasi Git dan commit perubahan:
   ```bash
   git init
   git add .
   git commit -m "feat: initial visualizer showcase setup"
   ```

2. Buat repositori baru di GitHub (misalnya: `visualizer-background`).

3. Hubungkan remote repository dan push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<username-kamu>/visualizer-background.git
   git push -u origin main
   ```

4. Aktifkan GitHub Pages melalui GitHub Actions:
   - Buka repo di GitHub -> Masuk ke tab **Settings** -> **Pages**.
   - Pada bagian **Build and deployment** -> **Source**, pilih **GitHub Actions**.
   - GitHub Actions akan otomatis membuild dan mendeploy web kamu setiap kali kamu melakukan push ke branch `main`.

---

## 📂 Struktur File

```
VisualizerBackground/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages automated deployment
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx    # Kursor merah reaktif + 11 echo trails
│   │   ├── HeroVisualizer.tsx  # Equalizer spectrum background
│   │   └── OpeningIntro.tsx    # Animasi tirai pembuka berurutan
│   ├── App.tsx                 # Halaman utama showcase & playground interaktif
│   ├── index.css               # Styling & Tailwind CSS setup
│   └── main.tsx                # Entry point React
├── index.html                  # HTML template dengan typography Google Fonts
├── package.json                # Dependencies & scripts
├── tsconfig.json               # Konfigurasi TypeScript
└── vite.config.ts              # Konfigurasi Vite & base path
```
