// Import library dan js yang diperlukan
import { UrlGetKotaSekolah, UrlGetProvinsiSekolah } from "./template/template.js";

// Untuk Get Data Sekolah yang Ada di Database
function getDataSekolah() {
    // Ambil elemen select dan nilai yang dipilih
    const selectElement = document.getElementById("AsalSekolah");
    const selectedValue = selectElement.value;

    if (selectedValue === "other") {
        // Siapkan body permintaan
        const requestBody = {
            "nama_sekolah": selectedValue
        };

        // Konfigurasi opsi untuk permintaan POST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        };

        // Lakukan permintaan POST ke endpoint
        fetch('https://komarbe.ulbi.ac.id/sekolah', requestOptions)
            .then(response => response.json())
            .then(data => {
                // Hapus semua opsi sebelum menambahkan yang baru
                selectElement.innerHTML = "";
                // Tambahkan opsi-opsi baru berdasarkan data yang diterima
                data.forEach(school => {
                    const option = document.createElement("option");
                    option.value = school.id; // Atur nilai opsi sesuai dengan id sekolah
                    option.text = school.nama_sekolah; // Atur teks opsi sesuai dengan nama sekolah
                    selectElement.appendChild(option);
                });
            })
            .catch(error => {
                // Tangani kesalahan jika ada
                console.error('Terjadi kesalahan:', error);
        });
    }
}

// Memanggil fungsi getDataFromEndpoint saat select diubah
document.getElementById("AsalSekolah").addEventListener("change", getDataSekolah);

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

  // Menampilkan SweetAlert konfirmasi
  Swal.fire({
    title: "Konfirmasi Pembuatan Akun",
    text: "Apakah Anda yakin ingin membuat akun?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, Daftar",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
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
          // Menampilkan SweetAlert sukses
          Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Akun Berhasil Dibuat',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(responseJson);
        })
        .catch((error) => {
          // Menampilkan pesan kesalahan jika terjadi masalah
          console.error("Terjadi kesalahan: " + error);
        });
    }
  });
});

// Untuk Input Sekolah yang Belum Terdaftar
const checkbox = document.getElementById("flexCheckDefault");
// Mendapatkan elemen-elemen inputan sekolah lainnya
const manualSchoolInput = document.getElementById("manualSchoolInput");
const manualCityInput = document.getElementById("manualCityInput");
const manualProvinceInput = document.getElementById("manualProvinceInput");
// Menambahkan event listener untuk perubahan status checkbox
checkbox.addEventListener("change", function() {
  if (checkbox.checked) {
    // Jika checkbox diceklist, tampilkan inputan sekolah lainnya
    manualSchoolInput.style.display = "block";
    manualCityInput.style.display = "block";
    manualProvinceInput.style.display = "block";
  } else {
    // Jika checkbox tidak diceklist, sembunyikan inputan sekolah lainnya
    manualSchoolInput.style.display = "none";
    manualCityInput.style.display = "none";
    manualProvinceInput.style.display = "none";
  }
});