import { CihuyDataAPI } from "https://c-craftjs.github.io/simpelbi/api.js";
import { UrlGetKotaSekolah } from "./template/template.js";

// Untuk Get All Data Kota Sekolah di Form
function KotaSekolah(data) {
    const selectElement = document.getElementById('kota-sekolah');
    // Kosongkan Isi Dropdown saat ini
    selectElement.innerHTML = "";

    // Loop data yang diterima dari API
    data.forEach((item) => {
        const optionElement = document.createElement("option")
        optionElement.value = item.id_kota;
        optionElement.textContent = `${item.nama_kota} - ${item.id_kota}`;
        selectElement.appendChild(optionElement);
    });
    selectElement.addEventListener("change", function () {
        const selectedValue = this.value;
        // Lakukan sesuatu dengan nilai yang dipilih, misalnya tampilkan di console
        console.log("Nilai yang dipilih: ", selectedValue);
    })
}
CihuyDataAPI(UrlGetKotaSekolah, (error, response) => {
    if (error) {
        console.error("Terjadi kesalahan : ", error);
    } else {
        const data = response.data;
        console.log("Data yang diterima : ", data);
        KotaSekolah(data)
    }
})

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