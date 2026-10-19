# Siklus — ruang kerja keuangan pribadi

Siklus membantu mencatat dan merencanakan uang pribadi dengan bahasa Indonesia sederhana. Desainnya dibuat ringkas, bisa dipasang sebagai PWA, dan mengutamakan penyimpanan lokal.

## Yang tersedia

- Ringkasan uang aman dipakai, saldo tercatat, kewajiban belum dibayar, cadangan, dan tabungan yang ditandai.
- Transaksi pemasukan, pengeluaran, transfer antarakun, koreksi saldo, pengembalian uang, pinjaman, piutang, pembayaran utang, kartu kredit/PayLater, transaksi tertunda, pembagian kategori, dan foto struk.
- Anggaran bulanan dengan opsi batas mingguan, pengingat dan kebutuhan rutin, biaya tahunan/tidak rutin, serta jadwal pemasukan yang perlu dikonfirmasi.
- Tujuan tabungan, catatan Dashboard/Essential/Bebas, pencarian, laporan mingguan/bulanan/periode pilihan, perbandingan, simulasi, dan perkiraan keuangan.
- Ekspor/impor JSON untuk cadangan, CSV untuk transaksi, dan laporan yang bisa dicetak/disimpan sebagai PDF melalui dialog cetak browser.
- Tema gelap/terang, penyamaran nominal, foto profil, banyak akun manual, dan dukungan instalasi PWA/offline.
- Pendamping AI opsional yang mati secara bawaan. Fungsi keuangan lokal tidak bergantung pada AI.

## Berkas proyek

- `index.html` — antarmuka dan kode aplikasi.
- `manifest.webmanifest`, `sw.js`, `icon.svg`, `icon-192.png`, `icon-512.png` — identitas serta dukungan PWA/offline.
- `worker.js`, `wrangler.toml` — backend AI opsional untuk Cloudflare Workers AI. Berkas ini tidak dibutuhkan untuk memakai fitur keuangan lokal.
- `CHECKLIST-PRA-RILIS.md` — ringkasan pemeriksaan dan hal yang masih perlu dites pada perangkat tujuan.

## Sebelum mulai mencatat

1. Buka **Pengaturan → Ubah saldo awal** dan masukkan saldo pada tanggal mulai pencatatan. Saldo awal bukan pemasukan.
2. Catat transaksi sejak tanggal awal itu agar laporan sesuai. Jika riwayat lama belum lengkap, analisis periode lama tidak bisa dianggap lengkap.
3. Simpan cadangan JSON secara berkala di tempat yang aman, terpisah dari browser. Jangan unggah cadangan, foto struk, atau data keuangan ke repositori publik.
4. Data tersimpan di browser/perangkat yang dipakai. Tidak ada akun pengguna, koneksi bank, atau sinkronisasi daring otomatis. Menghapus data situs/browser dapat menghilangkan akses ke data yang belum dicadangkan.
5. Jumlah yang ditandai sebagai tabungan adalah penanda perencanaan, bukan pemindahan uang. Jika uang benar-benar dipindahkan ke akun luar pantauan, sesuaikan penanda tabungannya supaya tidak dihitung dua kali.

Siklus adalah alat pencatatan dan perencanaan, bukan layanan bank, pembukuan pajak, atau penasihat investasi profesional. Tetap periksa transaksi serta keputusan keuangan penting.

## Menjalankan dan menguji

Untuk menguji penyimpanan, instalasi PWA, dan service worker, gunakan situs HTTPS atau server lokal (`localhost`). Membuka berkas HTML langsung melalui `file://` tidak selalu mengizinkan penyimpanan lokal dan tidak mengaktifkan service worker pada semua browser.

## Publikasikan gratis lewat GitHub Pages

GitHub Pages dapat menerbitkan situs statis dari repositori. Pada akun GitHub Free, Pages untuk proyek biasanya memerlukan repositori publik; situs yang diterbitkan juga dapat dilihat publik. Jangan pernah mengunggah cadangan ke repositori.

1. Buat repositori baru bernama misalnya `siklus`.
2. Unggah **isi folder proyek** ke direktori utama repositori: `index.html`, `manifest.webmanifest`, `sw.js`, `icon.svg`, `icon-192.png`, dan `icon-512.png`. Jangan unggah data keuangan pribadi atau token.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**, pilih branch `main` dan folder `/(root)`, lalu simpan.
5. Tunggu sampai GitHub selesai menerbitkan situs dan buka URL yang disediakan GitHub.
6. Buka situs saat online setidaknya sekali untuk memasang cache awal. Di Chrome, gunakan pilihan **Install app** jika tersedia. Setelah kode diperbarui, tutup-buka atau muat ulang aplikasi supaya service worker mengambil versi baru.

Dokumentasi GitHub: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Pendamping AI opsional

AI mati secara bawaan. Untuk mengaktifkannya, kamu membutuhkan Worker terpisah yang kamu kendalikan; Siklus tidak menyimpan token dalam `index.html` atau cadangan. Token yang dimasukkan pada halaman AI hanya dipakai selama sesi aplikasi itu berjalan. Worker juga memiliki pembatas permintaan per alamat sebagai perlindungan tambahan; pembatas ini bersifat upaya terbaik, bukan jaminan kuota global.

1. Periksa kebijakan, katalog model, dan batas gratis Cloudflare yang berlaku saat kamu menyiapkan AI. Kuota, ketersediaan model, dan ketentuan penyedia dapat berubah. **Jangan aktifkan penagihan atau pindah ke paket berbayar** jika targetnya biaya Rp0.
2. Deploy Worker ini dengan Cloudflare Workers Free jika layanan gratisnya tersedia untuk akunmu. Jangan tambahkan kredensial rahasia ke repo.
3. Ubah `ALLOWED_ORIGIN` di `wrangler.toml` menjadi origin GitHub Pages milikmu saja, tanpa jalur repositori dan tanpa garis miring akhir. Contoh bentuknya `https://nama-akun.github.io`.
4. Simpan token acak yang panjang sebagai secret Worker melalui `npx wrangler secret put AI_GATE_TOKEN`. Jangan memasukkannya ke `wrangler.toml`, `index.html`, atau repo.
5. Deploy dengan `npx wrangler deploy`, lalu masukkan URL Worker pada **Pengaturan → Pendamping AI (opsional)**.
6. Di halaman Pendamping AI, masukkan token, tulis pertanyaan, baca penjelasan privasi, centang persetujuan dan konfirmasi pengiriman.

Saat pertanyaan AI dikirim, aplikasi mengirim pesan, ringkasan keuangan, dan catatan transaksi yang disertakan dalam permintaan. Foto struk tidak dikirim. Jangan gunakan AI jika kamu belum memercayai endpoint atau belum membaca ketentuan penyedia. Jika kuota gratis habis, model tidak tersedia, atau endpoint gagal, fitur AI bisa tidak menjawab; catatan dan hitungan lokal tetap tersedia. Model aktif dikonfigurasi pada `worker.js` dan perlu diperiksa kembali sebelum dipakai.

## Pemeriksaan sebelum publikasi

Baca `CHECKLIST-PRA-RILIS.md` dan uji lagi pada perangkat/browser yang akan dipakai, khususnya instalasi PWA, penyimpanan, pemulihan cadangan, notifikasi, serta batas penyimpanan foto. Nama “Siklus” masih kandidat sampai pemeriksaan nama/merek dan alamat web selesai.
