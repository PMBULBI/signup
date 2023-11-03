// Import library dan js yang diperlukan
import { UrlGetKotaSekolah, UrlGetProvinsiSekolah, UrlGetSekolah } from "./template/template.js";

// Untuk Get Data Sekolah yang Ada di Database
function getDataSekolah() {
    // Ambil elemen select dan nilai yang dipilih
    const selectElement = document.getElementById("AsalSekolah");
    const selectedValue = selectElement.value;

    // Siapkan body permintaan
    const requestBody = {
        "nama_sekolah" : selectedValue
    };

    // Konfigurasi opsi untuk permintaan POST
    const requestOptions = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(requestBody)
    };
}

// Untuk Get All Data Kota Sekolah di Form
// Mendapatkan referensi ke elemen dropdown
const sekolahDropdown = document.getElementById("AsalSekolah");
// Mengambil data kota dari endpoint
fetch(UrlGetSekolah)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const sekolahData = data.data;

      // Menghapus opsi yang sudah ada, kecuali opsi pertama
      while (sekolahDropdown.length > 1) {
        sekolahDropdown.remove(1);
      }
      // Menambahkan opsi kota ke dropdown
      sekolahData.forEach(kota => {
        const option = document.createElement("option");
        option.value = kota.id_kota;
        option.text = kota.nama_kota;
        sekolahDropdown.appendChild(option);
      });
    } else {
      // Menampilkan pesan kesalahan jika diperlukan
      console.error("Gagal mengambil data kota.");
    }
  })
  .catch(error => {
    console.error("Terjadi kesalahan dalam mengambil data: " + error);
});

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

// Untuk Melakukan POST Pendaftar Akun
// Simpan referensi ke elemen-elemen formulir
const namaLengkapInput = document.getElementById("NamaLengkap");
const asalSekolahInput = document.getElementById("AsalSekolah");
const emailInput = document.getElementById("Email");
const noHandphoneInput = document.getElementById("NoHandphone");
const provinsiSekolahInput = document.getElementById("provinsi-sekolah");
const kotaSekolahInput = document.getElementById("kota-sekolah");

// Menyimpan referensi ke tombol "DAFTAR"
const daftarButton = document.querySelector("button[type='button']");

// Menambahkan event listener untuk tombol "DAFTAR"
daftarButton.addEventListener("click", () => {
  // Mengambil nilai dari elemen formulir
  const namaMhs = namaLengkapInput.value;
  const asalSekolah = asalSekolahInput.value;
  const emailMhs = emailInput.value;
  const hpMhs = noHandphoneInput.value;
  const provinsiSekolah = provinsiSekolahInput.value;
  const kotaSekolah = kotaSekolahInput.value;
  const usernameAdmin = "rofi"; // Gantilah sesuai kebutuhan

  // Membuat objek data yang akan dikirim
  const data = {
    nama_mhs: namaMhs,
    asal_sekolah: asalSekolah,
    email_mhs: emailMhs,
    hp_mhs: hpMhs,
    provinsi_sekolah: provinsiSekolah,
    kota_sekolah: kotaSekolah,
    username_admin: usernameAdmin,
  };

  // Mengirim permintaan POST ke endpoint
  fetch("https://komarbe.ulbi.ac.id/daftar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // Handle respons dari server jika diperlukan
      console.log(responseJson);
    })
    .catch((error) => {
      // Menampilkan pesan kesalahan jika terjadi masalah
      console.error("Terjadi kesalahan: " + error);
    });
});

// Untuk Input Sekolah yang Belum Terdaftar
document.getElementById('AsalSekolah').addEventListener('change', function () {
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