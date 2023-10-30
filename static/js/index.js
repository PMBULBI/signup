// Untuk Input Sekolah yang Belum Terdaftar
document.getElementById('form3Example4cdg').addEventListener('change', function () {
    var selectedOption = this.value;
    if (selectedOption === 'other') {
        document.getElementById('manualSchoolInput').style.display = 'block'; // Menampilkan input sekolah manual
    } else {
        document.getElementById('manualSchoolInput').style.display = 'none'; // Sembunyikan input sekolah manual
    }
});