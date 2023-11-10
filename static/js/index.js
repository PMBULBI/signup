// Import library dan js yang diperlukan
import { UrlGetKotaSekolah, UrlGetNamaProvinsi, UrlGetSekolah, UrlGetKotaByIdProvNmKota } from "./template/template.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyPost, CihuyGet } from "https://c-craftjs.github.io/api/api.js";

// Untuk Get Data Sekolah ke Inputan with Suggestions
// Membuat Variabel untuk get id element
const asalsekolahsuggestion = CihuyId('AsalSekolah-suggestions')
const inputSekolah = document.getElementById("AsalSekolah");

document.addEventListener('click', function (event) {
  const dropdown = document.getElementById('AsalSekolah-suggestions');

  if (!dropdown.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});

// Membuat Listener untuk suggestions
inputSekolah.addEventListener("input", async () => {
  const asalSekolahValue = inputSekolah.value;
  const body = {
    nama_sekolah: asalSekolahValue
  };
  try {
    const inputValue = inputSekolah.value.trim(); // Mendapatkan nilai input dan menghapus spasi
    if (inputValue === '') {
      asalsekolahsuggestion.innerHTML = ''; // Kosongkan saran jika input kosong
      asalsekolahsuggestion.style.display = 'none'; // Sembunyikan daftar saran
    } else {
      const data = await CihuyPost(UrlGetSekolah, body);
      console.log("Data yang diterima setelah POST:", data);
      if (data.success == false) {
        // Tampilkan pesan kesalahan
        asalsekolahsuggestion.textContent = data.status;
        asalsekolahsuggestion.style.display = 'block';
      } else {
        // asalsekolahsuggestion.textContent = JSON.stringify(data);
        asalsekolahsuggestion.textContent = '';
        const schoolNames = data.data.map(sekolah => sekolah.nama_sekolah);
        asalsekolahsuggestion.innerHTML = "";
        schoolNames.forEach(schoolNames => {
          const elementSekolah = document.createElement("div");
          elementSekolah.className = "sekolah"
          elementSekolah.textContent = schoolNames;
          elementSekolah.addEventListener("click", () => {
            asalSekolahInput.value = schoolNames;
            asalsekolahsuggestion.innerHTML = "";
          })
          asalsekolahsuggestion.appendChild(elementSekolah);
          if (schoolNames.length > 0) {
            asalsekolahsuggestion.style.display = "block";
          } else {
            asalsekolahsuggestion.style.display = "none";
          }
        })
      }
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan POST:", error);
  }
})

/// Membuat Variabel untuk get id element
const provinsiAsalsuggestion = document.getElementById('ProvinsiSekolah-suggestions'); // Perubahan di sini
const inputProvinsiAsal = document.getElementById("provinsi-sekolah");
let selectedProvinsiId;

// Membuat Listener untuk suggestions
inputProvinsiAsal.addEventListener("input", async () => {
  const provinsiAsalValue = inputProvinsiAsal.value;
  const body = {
    nama_provinsi: provinsiAsalValue
  };
  try {
    const inputValue = inputProvinsiAsal.value.trim(); // Mendapatkan nilai input dan menghapus spasi
    if (inputValue === '') {
      provinsiAsalsuggestion.innerHTML = ''; // Kosongkan saran jika input kosong
      provinsiAsalsuggestion.style.display = 'none'; // Sembunyikan daftar saran
    } else {
      const data = await CihuyPost(UrlGetNamaProvinsi, body);
      // Untuk Cek di console
      console.log("Data yang diterima setelah POST:", data);
      if (data.success == false) {
        // Tampilkan pesan kesalahan
        provinsiAsalsuggestion.textContent = data.status;
        provinsiAsalsuggestion.style.display = 'block';
      } else {
        // provinsiAsalsuggestion.textContent = JSON.stringify(data);
        provinsiAsalsuggestion.textContent = '';
        const provinceNames = data.data.map(provinsi => provinsi.nama_provinsi);
        provinsiAsalsuggestion.innerHTML = "";
        provinceNames.forEach(provinceNames => {
          const elementProvinsi = document.createElement("div");
          elementProvinsi.className = "provinsi"
          elementProvinsi.textContent = provinceNames;
          const selectedProvinsi = data.data.find(provinsi => provinsi.nama_provinsi === provinceNames);
          if (selectedProvinsi) {
            elementProvinsi.addEventListener("click", () => {
              provinsiSekolahInput.value = provinceNames;
              provinsiAsalsuggestion.innerHTML = "";
              selectedProvinsiId = selectedProvinsi.id_provinsi; // Menyimpan ID provinsi yang dipilih
            });
          }
          provinsiAsalsuggestion.appendChild(elementProvinsi);
          if (provinceNames.length > 0) {
            provinsiAsalsuggestion.style.display = "block";
          } else {
            provinsiAsalsuggestion.style.display = "none";
          }
        })
      }
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan GET:", error);
  }
})

// Untuk Get All Data Kota Sekolah di Form
// Membuat Variabel untuk get id element
const kotaAsalsuggestion = document.getElementById('KotaSekolah-suggestions')
const inputKotaAsal = document.getElementById("kota-sekolah");

// Membuat Listener untuk suggestions
inputKotaAsal.addEventListener("input", async () => {
  try {
    const inputValue = inputKotaAsal.value.trim(); // Mendapatkan nilai input dan menghapus spasi
    if (inputValue === '') {
      kotaAsalsuggestion.innerHTML = ''; // Kosongkan saran jika input kosong
      kotaAsalsuggestion.style.display = 'none'; // Sembunyikan daftar saran
    } else {
      const body = {
        id_provinsi: selectedProvinsiId, // Menggunakan ID provinsi yang dipilih
        nama_kota: inputValue
      };
      const data = await CihuyPost(UrlGetKotaByIdProvNmKota, body);
      // Untuk Cek di console
      console.log("Data yang diterima setelah GET:", data);
      kotaAsalsuggestion.textContent = JSON.stringify(data);
      const cityNames = data.data.map(kota => kota.nama_kota);
      kotaAsalsuggestion.innerHTML = "";
      cityNames.forEach(cityNames => {
        const elementKota = document.createElement("div");
        elementKota.className = "kota"
        elementKota.textContent = cityNames;
        elementKota.addEventListener("click", () => {
          kotaSekolahInput.value = cityNames;
          kotaAsalsuggestion.innerHTML = "";
        })
        kotaAsalsuggestion.appendChild(elementKota);
        if (cityNames.length > 0) {
          kotaAsalsuggestion.style.display = "block";
        } else {
          kotaAsalsuggestion.style.display = "none";
        }
      })
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan GET:", error);
  }
})

// Untuk Melakukan POST Pendaftar Akun
// Simpan referensi ke elemen-elemen formulir
const namaLengkapInput = document.getElementById("NamaLengkap");
const asalSekolahInput = document.getElementById("AsalSekolah");
const asalSekolahInputManual = document.getElementById("manualSchool");
const emailInput = document.getElementById("Email");
const noHandphoneInput = document.getElementById("NoHandphone");
const provinsiSekolahInput = document.getElementById("provinsi-sekolah");
const kotaSekolahInput = document.getElementById("kota-sekolah");
const checkbox = document.getElementById("flexCheckDefault");

// Menyimpan referensi ke tombol "DAFTAR"
const daftarButton = document.querySelector("button[type='button']");

// Fungsi validasi email regex
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

daftarButton.addEventListener("click", () => {
  // Mengambil nilai dari elemen formulir
  const namaMhs = namaLengkapInput.value;
  const emailMhs = emailInput.value;
  const hpMhs = noHandphoneInput.value;
  const provinsiSekolah = provinsiSekolahInput.value;
  const kotaSekolah = kotaSekolahInput.value;
  const usernameAdmin = ""; // Gantilah sesuai kebutuhan

  let asalSekolah = ''; // Untuk inputan asal sekolah

  if (!validateEmail(emailMhs)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email tidak valid!',
    });
    return; // Menghentikan eksekusi lebih lanjut
  }

  // Conditional untuk asal sekolah
  if (checkbox.checked) {
    asalSekolah = asalSekolahInputManual.value; // Jika checkbox diceklist, gunakan data dari input sekolah manual
  } else {
    asalSekolah = asalSekolahInput.value; // Gunakan data dari input asal sekolah

    if (asalSekolah.length < 5) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Masukkan setidaknya 5 karakter untuk mencari sekolah sebelum mendaftar!',
      });
      return; // Menghentikan eksekusi lebih lanjut
    }
  }

  // Validasi panjang minimal pencarian sekolah

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
          }).then(() => {
            window.location.href = 'https://pmb.ulbi.ac.id';
          })
          console.log(responseJson);
        })
        .catch((error) => {
          // Menampilkan Data Alert Error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Akun Gagal Dibuat!',
          });
          // Menampilkan pesan kesalahan jika terjadi masalah
          console.error("Terjadi kesalahan: " + error);
        });
    }
  });
});


