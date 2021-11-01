function loadCatatan() {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if (list_data.length > 0) {
            data_app = '<table class="table table-striped table-dark">';
            data_app += '<thead>' +
                '<th>No. Pesanan</th>' +
                '<th>Nama Pesanan</th>' +
                '<th>Harga</th>' +
                '<th>Jumlah Pesanan</th>' +
                '<th>Catatan Tambahan</th>' +
                '<th>Menghapus Pesanan</th>' +
                '<th>Melihat Detail Pesanan</th>' +
                '<th>Mengubah Pesanan</th>' +
                '</thead> <tbody>';

            for (i in list_data) {
                data_app += '<tr>';
                data_app +=
                    '<td>' + list_data[i].id_data + ' </td>' +
                    '<td>' + list_data[i].nama + ' </td>' +
                    '<td>' + list_data[i].harga + ' </td>' +
                    '<td>' + list_data[i].jumlahPesanan + ' </td>' +
                    '<td>' + list_data[i].catatan + ' </td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id_data + '\')">Hapus</a></td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="lihatData(\'' + list_data[i].id_data + '\')">Lihat</a></td>' +
                    '<td><a class="btn btn-warning btn-small" href="javascript:void(0)" onclick="editData(\'' + list_data[i].id_data + '\')">Ubah</a></td>';
                data_app += '</tr>';          
            }

            data_app += '</tbody></table>';
        }
        else {
            data_app = "Pesanan masih kosong, silahkan menambah pesanan!";
        }
        $('#list-catatan').html(data_app);
        $('#list-catatan').hide();
        $('#list-catatan').fadeIn(100);
    }
}

function editData(id) {

    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#eid_data").val(list_data[i].id_data);
                $("#enama").val(list_data[i].nama);
                $("#eharga").val(list_data[i].harga);
                $("#ejumlahPesanan").val(list_data[i].jumlahPesanan);
                $("#ecatatan").val(list_data[i].catatan);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('edit-data');
    }

}

function lihatData(id) {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#lid_data").val(list_data[i].id_data);
                $("#lnama").val(list_data[i].nama);
                $("#lharga").val(list_data[i].harga);
                $("#ljumlahPesanan").val(list_data[i].jumlahPesanan);
                $("#lcatatan").val(list_data[i].catatan);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('lihat-data');

    }
}


function simpanData() {
    nama = $('#nama').val();
    harga = $('#harga').val();
    jumlahPesanan = $('#jumlahPesanan').val();
    catatan = $('#catatan').val();
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = []; 
        id_data = 0;
    }
    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'harga': harga, 'jumlahPesanan': jumlahPesanan, 'catatan': catatan });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    gantiMenu('list-catatan');
    return false;
}

function simpanEditData() {
    id_data = $('#eid_data').val();
    nama = $('#enama').val();
    harga = $('#eharga').val();
    jumlahPesanan = $("#ejumlahPesanan").val();
    catatan = $('#ecatatan').val();

    list_data.push({ 'id_data': id_data, 'nama': nama, 'harga': harga,'jumlahPesanan': jumlahPesanan, 'catatan': catatan });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    gantiMenu('list-catatan');

    return false;
}

function hapusData(id) {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        localStorage.setItem('list_data', JSON.stringify(list_data));
        loadCatatan();
    }
}


function gantiMenu(menu) {
    if (menu == "list-catatan") {
        loadCatatan();
        $('#tambah-catatan').hide();
        $('#list-catatan').fadeIn();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    }
    else if (menu == "tambah-catatan") {
        $('#tambah-catatan').fadeIn();
        $('#list-catatan').hide();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "edit-data") {
        $('#edit-data').fadeIn();
        $('#tambah-catatan').hide();
        $('#list-catatan').hide();
        $('#lihat-data').hide();
    } else if (menu == "lihat-data") {
        $('#lihat-data').fadeIn();
        $('#edit-data').hide();
        $('#tambah-catatan').hide();
        $('#list-catatan').hide();
    }
}

const ModeWarna = document.getElementById("ModeWarna");
ModeWarna.onclick = function() {
    document.body.classList.toggle("darkmode");
    document.querySelector(".card").classList.toggle("card-darkmode");
    if(ModeWarna.value == "Light Mode"){
        ModeWarna.value = "Dark Mode";
        ModeWarna.innerHTML = "Dark Mode";
    } else {
        ModeWarna.value = "Light Mode";
        ModeWarna.innerHTML = "Light Mode";
    }
} 

var OS = liff.getOS();
const ScanQR = document.getElementById("ScanQR");
ScanQR.onclick = function() {
    if(OS=="ios"||OS=="android"){
        window.location="https://line.me/R/nv/QRCodeReader";
    } else {
        alert("Fitur ini tidak dapat digunakan di external browser!");
    }
}

function identitasCustomer(){
    liff.getProfile().then(profile => {
    console.log(profile.displayName);
    document.getElementById("nama-baru").innerHTML = profile.displayName;
    document.getElementById("identitas").innerHTML = '<h3>Identitas Customer</h3>';
    document.getElementById("nama-baru2").innerHTML = "Nama: " + profile.displayName;
    document.getElementById("profileImage").src = profile.pictureUrl;
    }).catch((err) => {
    console.log('error', err);
    });
}

liff.init({liffId: "1655315180-d1Zw5ZGO" }, () => {
    if(liff.isLoggedIn()){
        identitasCustomer();
    } else {
        console.log("Silahkan login terlebih dahulu");
    }
},err => console.error(err.code,error.message));

function pesanSekarang(){
    var messageContent = "";
    for(var i=0; i<list_data.length; i++){
        messageContent += '\n' + list_data[i].nama + ' sebanyak ' +list_data[i].jumlahPesanan;
    }

    if (!liff.isInClient()) {
        alert('Terima kasih, Anda telah memesan di FoodFest. Berikut pesanan Anda :'+messageContent);
    } else {
        liff.sendMessages([{
            type: 'text',
            text: 'Terima kasih, Anda telah memesan di FoodFest. Berikut pesanan Anda :'+ messageContent 
        }]).then(function() {
            alert('Pesanan sedang diproses, silahkan menutup aplikasi');
        }).catch(function(error) {
            alert(error);
        }); 
    } 
}