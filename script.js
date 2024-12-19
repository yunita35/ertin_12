let users = [];

function addData() {
    const fotoInput = document.getElementById("fileUpload");
    const namabrng = document.getElementById("nmbarang").value;
    const merekbrng = document.getElementById("merekbarang").value;
    const jumlah = document.getElementById("jumlah").value;
    const kondisi = document.querySelector('input[name="kondisi"]:checked')?.value;

    // Validasi data
    if (fotoInput.files.length && namabrng && merekbrng && jumlah && kondisi) {
        const fotoURL = URL.createObjectURL(fotoInput.files[0]); // Mengambil URL file gambar
        users.push({ foto: fotoURL, namabrng, merekbrng, jumlah, kondisi });
        document.getElementById("peminjamanForm").reset();
        displayData();
    } else {
        alert("Harap isi semua data dengan benar!");
    }
}

function displayData() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${user.foto}" alt="Foto Barang" width="100"></td>
                <td>${user.namabrng}</td>
                <td>${user.merekbrng}</td>
                <td>${user.jumlah}</td>
                <td>${user.kondisi}</td>
                <td>
                    <button onclick="editData(${index})">Edit</button>
                    <button onclick="deleteData(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

function editData(index) {
    const user = users[index];
    const fotoInput = document.getElementById("fileUpload");
    document.getElementById("nmbarang").value = user.namabrng;
    document.getElementById("merekbarang").value = user.merekbrng;
    document.getElementById("jumlah").value = user.jumlah;
    document.querySelector(`input[name="kondisi"][value="${user.kondisi}"]`).checked = true;

    // Hapus data dari tabel sementara
    deleteData(index);

    // Perhatikan: Upload file tidak bisa diisi otomatis karena alasan keamanan browser.
    fotoInput.value = ""; // Reset file upload
    alert("Upload ulang file gambar saat mengedit.");
}

function deleteData(index) {
    users.splice(index, 1);
    displayData();
}
