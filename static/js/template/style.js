// Untuk Input Sekolah yang Belum Terdaftar
const checkbox = document.getElementById("flexCheckDefault");
// Mendapatkan elemen-elemen inputan sekolah lainnya
const manualSchoolInput = document.getElementById("manualSchoolInput");
const manualCityInput = document.getElementById("manualCityInput");
const manualProvinceInput = document.getElementById("manualProvinceInput");
const asalSekolahReadonly = document.getElementById("AsalSekolah");
// Menambahkan event listener untuk perubahan status checkbox
checkbox.addEventListener("change", function() {
  if (checkbox.checked) {
    // Jika checkbox diceklist, tampilkan inputan sekolah lainnya
    manualSchoolInput.style.display = "block";
    manualCityInput.style.display = "block";
    manualProvinceInput.style.display = "block";
    asalSekolahReadonly.readOnly = true;
    asalSekolahReadonly.value = ""; // Hapus nilai dari input asal sekolah
  } else {
    // Jika checkbox tidak diceklist, sembunyikan inputan sekolah lainnya
    manualSchoolInput.style.display = "none";
    manualCityInput.style.display = "none";
    manualProvinceInput.style.display = "none";
    asalSekolahReadonly.readOnly = false;
  }
});