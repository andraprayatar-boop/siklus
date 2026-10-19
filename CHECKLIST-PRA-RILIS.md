# Checklist pra-rilis Siklus

## Pemeriksaan otomatis lokal yang sudah dijalankan

- [x] Sintaks JavaScript inline di `index.html` diperiksa dengan Node.js.
- [x] Sintaks `worker.js` diperiksa.
- [x] Semua 10 halaman navigasi utama dapat dirender tanpa error JavaScript pada browser pengujian.
- [x] Tampilan diuji pada lebar desktop dan 390 px; tidak ditemukan gulir horizontal.
- [x] Rumus dasar saldo aman dipakai diverifikasi: saldo Rp1.500.000 dikurangi kebutuhan Rp350.000, cadangan efektif Rp300.000, dan tabungan bertanda Rp150.000 menghasilkan Rp700.000.
- [x] Transfer antarakun terpantau menjaga total saldo terpantau; transfer ke akun luar pantauan mengurangi saldo terpantau.
- [x] Pemasukan, pengeluaran, pengembalian sebagian, pengembalian berlebih yang ditolak, serta pembagian kategori yang nominalnya tidak cocok diuji.
- [x] Pembelian kredit dan pembayaran kartu/PayLater diuji agar saldo dan sisa kewajiban tidak menghitung pengeluaran dua kali.
- [x] Transaksi tertunda diuji: tidak langsung mengubah saldo aktual, tetapi mengurangi uang aman saat dana perlu dianggap tertahan.
- [x] Impor cadangan JSON diuji termasuk pergantian tampilan setelah pemulihan; tidak menimbulkan error runtime.
- [x] ID HTML statis diperiksa dan tidak ditemukan duplikasi.
- [x] Aplikasi tidak memakai pustaka JavaScript atau stylesheet eksternal untuk fungsi inti.

## Uji manual yang masih disarankan pada perangkat sebenarnya

- [ ] Buat cadangan JSON, bersihkan data uji, pulihkan cadangan, lalu cocokkan saldo, tagihan, utang, catatan, dan foto.
- [ ] Coba ekspor CSV dan cetak laporan ke PDF.
- [ ] Uji pengingat dan notifikasi di browser yang akan dipakai; dukungan notifikasi lokal bergantung perangkat dan izin.
- [ ] Pasang PWA dari URL HTTPS GitHub Pages, buka sekali saat online, lalu uji mode offline.
- [ ] Uji ganti tema, sembunyikan nominal, ganti/hapus foto profil, dan kelengkapan tampilan di layar sempit.
- [ ] Pastikan ruang penyimpanan cukup apabila menyimpan foto struk. Ukuran backup dapat meningkat apabila menyertakan foto.
- [ ] Uji AI hanya jika backend sengaja dipasang dan batas gratis saat itu telah diperiksa. AI harus tetap mati jika tidak disetel.
- [ ] Pastikan pengguna menyimpan cadangan di luar browser sebelum mengganti perangkat atau menghapus data situs.

Pemeriksaan otomatis bukan jaminan bahwa setiap kombinasi data/perangkat bebas bug. Periksa hasil keuangan penting dengan catatan sumber sebelum mengandalkannya.
