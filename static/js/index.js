import { CihuyDataAPI } from "https://c-craftjs.github.io/simpelbi/api.js";
import { UrlGetKotaSekolah, UrlGetProvinsiSekolah } from "./template/template.js";

// Untuk Get All Data Kota Sekolah di Form
// Mendapatkan referensi ke elemen dropdown
const kotaDropdown = document.getElementById("kota-sekolah");
// Mengambil data kota dari endpoint
fetch('https://komarbe.ulbi.ac.id/wilayah-kota/get')
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
// function ProvinsiSekolah(data) {
//     const selectElement = document.getElementById('provinsi-sekolah');
//     // Kosongkan Isi Dropdown saat ini
//     selectElement.innerHTML = "";

//     // Loop data yang diterima dari API
//     data.forEach((item) => {
//         const optionElement = document.createElement("option")
//         optionElement.value = item.id_provinsi;
//         optionElement.textContent = `${item.nama_provinsi} - ${item.id_provinsi}`;
//         selectElement.appendChild(optionElement);
//     });
//     selectElement.addEventListener("change", function () {
//         const selectedValue = this.value;
//         // Lakukan sesuatu dengan nilai yang dipilih, misalnya tampilkan di console
//         console.log("Nilai yang dipilih: ", selectedValue);
//     })
// }
// CihuyDataAPI(UrlGetProvinsiSekolah, token, (error, response) => {
//     if (error) {
//         console.error("Terjadi kesalahan : ", error);
//     } else {
//         const data = response.data;
//         console.log("Data yang diterima : ", data);
//         ProvinsiSekolah(data)
//     }
// })

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