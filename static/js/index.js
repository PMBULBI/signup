// Import library dan js yang diperlukan
import { UrlGetKotaSekolah, UrlGetProvinsiSekolah } from "./template/template.js";

// Untuk Get All Data Kota Sekolah di Form
// Mendapatkan referensi ke elemen dropdown
const kotaDropdown = document.getElementById("kota-sekolah");
// Mengambil data kota dari endpoint
fetch(UrlGetKotaSekolah)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const kotaData = data.data;

      // Menghapus opsi yang sudah ada, kecuali opsi pertama
      while (kotaDropdown.length > 1) {
        kotaDropdown.remove(1);
      }
      // Menambahkan opsi kota ke dropdown
      kotaData.forEach(kota => {
        const option = document.createElement("option");
        option.value = kota.id_kota;
        option.text = kota.nama_kota;
        kotaDropdown.appendChild(option);
      });
    } else {
      // Menampilkan pesan kesalahan jika diperlukan
      console.error("Gagal mengambil data kota.");
    }
  })
  .catch(error => {
    console.error("Terjadi kesalahan dalam mengambil data: " + error);
});

// Untuk Get All Data Provinsi Sekolah di Form
// Mendapatkan referensi ke elemen dropdown
const provinsiDropdown = document.getElementById("provinsi-sekolah");
// Mengambil data kota dari endpoint
fetch(UrlGetProvinsiSekolah)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const provinsiData = data.data;

      // Menghapus opsi yang sudah ada, kecuali opsi pertama
      while (provinsiDropdown.length > 1) {
        provinsiDropdown.remove(1);
      }
      // Menambahkan opsi kota ke dropdown
      provinsiData.forEach(kota => {
        const option = document.createElement("option");
        option.value = kota.id_provinsi;
        option.text = kota.nama_provinsi;
        provinsiDropdown.appendChild(option);
      });
    } else {
      // Menampilkan pesan kesalahan jika diperlukan
      console.error("Gagal mengambil data kota.");
    }
  })
  .catch(error => {
    console.error("Terjadi kesalahan dalam mengambil data: " + error);
});

// Untuk Input Sekolah yang Belum Terdaftar
document.getElementById('form3Example4cdg').addEventListener('change', function () {
    var selectedOption = this.value;
    if (selectedOption === 'other') {
        document.getElementById('manualSchoolInput').style.display = 'block'; // Menampilkan input sekolah manual
        document.getElementById('manualCityInput').style.display = 'block'; // Menampilkan input sekolah manual
        document.getElementById('manualProvinceInput').style.display = 'block'; // Menampilkan input sekolah manual
    } else {
        document.getElementById('manualSchoolInput').style.display = 'none'; // Sembunyikan input sekolah manual
        document.getElementById('manualCityInput').style.display = 'none'; // Sembunyikan input sekolah manual
        document.getElementById('manualProvinceInput').style.display = 'none'; // Sembunyikan input sekolah manual
    }
});