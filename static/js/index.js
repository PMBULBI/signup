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
    } else if (inputValue.length < 3) {
      // Menampilkan pesan jika panjang input kurang dari 3 karakter
      asalsekolahsuggestion.textContent = 'Masukkan setidaknya 3 karakter untuk mencari sekolah.';
      asalsekolahsuggestion.style.display = 'block';
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
      asalsekolahsuggestion.classList.add('dropdown');
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
      inputKotaAsal.disabled = true;
    } else if (inputValue.length < 2) {
      provinsiAsalsuggestion.textContent = 'Masukkan setidaknya 2 karakter untuk mencari asal provinsi.';
      provinsiAsalsuggestion.style.display = 'block';
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
              inputKotaAsal.disabled = false;
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
      provinsiAsalsuggestion.classList.add('dropdown');
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
    } else if (inputValue.length < 3) {
      kotaAsalsuggestion.textContent = 'Masukkan setidaknya 3 karakter untuk mencari asal kota.';
      kotaAsalsuggestion.style.display = 'block';
    } else {
      const body = {
        id_provinsi: selectedProvinsiId, // Menggunakan ID provinsi yang dipilih
        nama_kota: inputValue
      };
      const data = await CihuyPost(UrlGetKotaByIdProvNmKota, body);
      // Untuk Cek di console
      console.log("Data yang diterima setelah GET:", data);
      if (data.success == false) {
        // Tampilkan pesan kesalahan
        kotaAsalsuggestion.textContent = data.status;
        kotaAsalsuggestion.style.display = 'block';
      } else {
        // kotaAsalsuggestion.textContent = JSON.stringify(data);
        kotaAsalsuggestion.textContent = '';
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
      kotaAsalsuggestion.classList.add('dropdown');
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan GET:", error);
  }
})

const namaLengkapInput = document.getElementById("NamaLengkap");
const asalSekolahInput = document.getElementById("AsalSekolah");
const asalSekolahInputManual = document.getElementById("manualSchool");
const emailInput = document.getElementById("Email");
const noHandphoneInput = document.getElementById("NoHandphone");
const provinsiSekolahInput = document.getElementById("provinsi-sekolah");
const kotaSekolahInput = document.getElementById("kota-sekolah");
const checkbox = document.getElementById("flexCheckDefault");

document.addEventListener('DOMContentLoaded', function () {
  const navbarToggle = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navbarToggle.addEventListener('click', function () {
    navbarCollapse.classList.toggle('show');
  });

  document.addEventListener('click', function (event) {
    if (!navbarCollapse.contains(event.target) && !navbarToggle.contains(event.target)) {
      navbarCollapse.classList.remove('show');
    }
  });

  // Fungsi validasi email regex
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Menyimpan referensi ke tombol "DAFTAR"
  const daftarButton = document.querySelector("button[type='button']");

  // Function to handle form submission
  async function handleFormSubmit() {
    // Mengambil nilai dari elemen formulir
    const namaMhs = namaLengkapInput.value;
    const emailMhs = emailInput.value;
    const hpMhs = noHandphoneInput.value;
    const provinsiSekolah = provinsiSekolahInput.value;
    const kotaSekolah = kotaSekolahInput.value;
    const usernameAdmin = ""; // Gantilah sesuai kebutuhan

    let asalSekolah = ''; // Untuk inputan asal sekolah

    // Validasi nama tidak boleh kosong
    if (namaMhs.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nama wajib diisi!',
      });
      return; // Menghentikan eksekusi lebih lanjut
    }

    if (!validateEmail(emailMhs)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email tidak valid!',
      });
      return; // Menghentikan eksekusi lebih lanjut
    }

    // Validasi Nomor HP tidak boleh kosong
    if (hpMhs.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nomor HP wajib diisi!',
      });
      return; // Menghentikan eksekusi lebih lanjut
    }

    if (hpMhs.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nomor HP wajib diisi!',
      });
      return; // Menghentikan eksekusi lebih lanjut
    }
    // Conditional untuk asal sekolah
    if (checkbox.checked) {
      // Validasi provinsi dan kota asal diisi
      if (asalSekolahInputManual.value.trim() === '' || provinsiSekolah.trim() === '' || kotaSekolah.trim() === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Asal Sekolah, Provinsi dan Kota asal harus diisi jika checkbox diceklis!',
        });
        return; // Menghentikan eksekusi lebih lanjut
      }

      asalSekolah = asalSekolahInputManual.value; // Jika checkbox diceklist, gunakan data dari input sekolah manual
    } else {
      asalSekolah = asalSekolahInput.value; // Gunakan data dari input asal sekolah

      if (asalSekolah.length < 5) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Masukkan asal sekolah!',
        });
        return; // Menghentikan eksekusi lebih lanjut
      }
    }

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Mengirim permintaan POST ke endpoint
          const response = await fetch("https://komarbe.ulbi.ac.id/pendaftar/daftar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          const responseJson = await response.json();
          console.log(responseJson); // Tambahkan ini untuk melihat respons dari API
    
          if (responseJson.success) {
            // Menampilkan SweetAlert sukses
            Swal.fire({
              icon: 'success',
              title: 'Sukses!',
              text: 'Akun Berhasil Dibuat',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              // Menangkap data dari respons JSON
              const namaMhs = responseJson.data.nama_mhs;
              const emailMhs = responseJson.data.email_mhs;
              const noHp = responseJson.data.hp_mhs;
              const asalSekolah = responseJson.data.asal_sekolah;
              const password = responseJson.data.password;
    
              // Simpan data dalam cookie
              document.cookie = `asalSekolah=${asalSekolah}; path=/`;
              document.cookie = `namaMhs=${namaMhs}; path=/`;
              document.cookie = `emailMhs=${emailMhs}; path=/`;
              document.cookie = `noHp=${noHp}; path=/`;
              document.cookie = `password=${password}; path=/`;
                
              // Redirect ke halaman selanjutnya dengan menggunakan id
              window.location.href = `akunregistrasi.html`;
            });
          } else {
            // Menampilkan SweetAlert gagal dengan pesan dari status
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: responseJson.status + ", karena akun sudah ada!",
            });
            console.error(responseJson);
          }
        } catch (error) {
          // Menampilkan SweetAlert gagal dengan pesan kesalahan
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Akun Gagal Dibuat!',
          });
          // Menampilkan pesan kesalahan jika terjadi masalah
          console.error("Terjadi kesalahan: " + error);
        }
      }
    });
  }

  // Add click event listener for form submission
  daftarButton.addEventListener("click", handleFormSubmit);
});