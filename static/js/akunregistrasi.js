// Function to retrieve a specific cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Retrieve the data cookie
const asalSekolah = getCookie('asalSekolah');
const namaMhs = getCookie('namaMhs');
const emailMhs = getCookie('emailMhs');
const noHp = getCookie('noHp');
const password = getCookie('password');

console.log(asalSekolah, namaMhs, emailMhs, noHp, password)

// Set data to HTML elements
document.getElementById('asalSekolah').innerText = asalSekolah || 'Data tidak tersedia';
document.getElementById('namaMhs').innerText = namaMhs || 'Data tidak tersedia';
document.getElementById('emailMhs').innerText = emailMhs || 'Data tidak tersedia';
document.getElementById('noHp').innerText = noHp || 'Data tidak tersedia';
document.getElementById('passwordMhs').innerText = password || 'Data tidak tersedia';