---
layout: layouts/page.njk
title: Mencari
description: Cari di website SIBAKOM
heroImage: /assets/images/pages/project-management.jpg
---
<div style="max-width: 800px; margin: 0 otomatis; padding-top: var(--spacing-md);">
<div style="posisi: relatif; margin-bawah: var(--spacing-lg);">
<input type="text" id="search-input" placeholder="Apa yang Anda cari?" 
style="lebar: 100%; padding: 20px 24px; padding-kiri: 60px; ukuran font: var(--fs-lg); font-family: var(--font-body); batas: 2px solid var(--color-border); radius-batas: var(--radius-lg); box-shadow: var(--shadow-sm); garis besar: tidak ada; transisi: batas-warna 0,3 detik;">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; kiri: 20px; atas: 50%; transformasi: TranslateY(-50%);"><circle cx="11" cy="11" r="8"></lingkaran><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
</div>

<div id="hasil-pencarian" style="display: flex; arah fleksibel: kolom; gap: var(--spacing-md);">
<p style="color: var(--color-text-muted); text-align: center; padding: 40px;">Ketikkan kata kunci di atas untuk menelusuri layanan, proyek, dan kemampuan kami.</p>
</div>
</div>

<skrip>
dokumen.addEventListener('DOMContentLoaded', () => {
const input = document.getElementById('input-pencarian');
const resultContainer = document.getElementById('hasil-pencarian');
biarkan indeks pencarian = [];

// Ambil indeksnya
ambil('/pencarian.json')
.lalu(res => res.json())
.lalu(data => {
indeks pencarian = data;
masukan.fokus();
})
.menangkap(err => {
console.error("Tidak dapat memuat indeks pencarian", err);
resultContainer.innerHTML = '<p style="color: red; text-align: center;">Kesalahan saat memuat fungsi pencarian.</p>';
});

masukan.addEventListener('masukan', (e) => {
const query = e.target.value.toLowerCase().trim();

if (panjang kueri < 2) {
resultContainer.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 40px;">Ketikkan kata kunci di atas untuk mencari di seluruh layanan, proyek, dan kemampuan kami.</p>';
kembali;
}

hasil const = searchIndex.filter(halaman => {
if (!page.url || page.url === '/search/') menghasilkan false;
kembalikan halaman.title.toLowerCase().includes(query) || halaman.konten.toLowerCase().includes(query);
});

if (hasil.panjang === 0) {
resultContainer.innerHTML = '<p style="text-align: center; padding: 40px;">Tidak ditemukan hasil untuk "**' + kueri + '**".</p>';
kembali;
}

biarkan html = '';
hasil.untukSetiap(hasil => {
// Temukan cuplikan konten
const contentLower = hasil.content.toLowerCase();
const matchIndex = contentLower.indexOf(query);
biarkan cuplikan = '';
jika (Indeks Pertandingan !== -1) {
const start = Math.max(0, matchIndex - 60);
const end = Math.min(hasil.konten.panjang, matchIndex + 60);
cuplikan = (mulai > 0 ? '...' : '') + hasil.konten.substring(mulai, akhir) + (akhir < hasil.konten.panjang ? '...' : '');
// Sorot pertanyaannya
const regex = RegExp baru(kueri, 'gi');
cuplikan = snippet.replace(regex, match => '<span style="background-color: rgba(255, 255, 0, 0.4); font-weight: bold;">' + match + '</span>');
} lain {
cuplikan = hasil.konten.substring(0, 120) + '...';
}

html += '<a href="' + result.url + '" style="display: block; padding: 24px; border: 1px solid var(--color-border); border-radius: var(--radius-md); dekorasi teks: tidak ada; latar belakang: var(--color-surface); box-shadow: var(--shadow-sm); transisi: transformasi 0,2 detik, box-shadow 0,2 detik;" onmouseover="this.style.transform=\'translateY(-2px)\'; this.style.boxShadow=\'var(--shadow-md)\';" onmouseout="this.style.transform=\'none\'; this.style.boxShadow=\'var(--shadow-sm)\';">' +
'<h3 style="color: var(--color-primary); margin-bawah: 8 piksel; ukuran font: 1,25rem;">' + hasil.judul + '</h3>' +
'<p style="color: var(--color-text); ukuran font: 0,9rem; tinggi garis: 1,5; margin-bawah: 8 piksel;">' + cuplikan + '</p>' +
'<span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: huruf besar; spasi huruf: 0.05em;">' + result.url + '</span>' +
'</a>';
});

resultContainer.innerHTML = html;
});

// Tambahkan gaya fokus secara manual karena gaya inline rumit dengan pseudoclass
input.addEventListener('fokus', () => {
input.style.borderColor = 'var(--warna-primer)';
input.style.boxShadow = '0 0 0 3px rgba(43, 95, 167, 0,15)';
});
masukan.addEventListener('blur', () => {
input.style.borderColor = 'var(--color-border)';
input.style.boxShadow = 'var(--shadow-sm)';
});
});
</skrip>
