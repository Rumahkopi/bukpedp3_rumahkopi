import { postWithBearer } from "https://jscroot.github.io/api/croot.js";

export let URLPost = `https://asia-southeast2-msyahid.cloudfunctions.net/InsertDataTransaksi`
export let token = 'token';


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
         // Display loading overlay
        showLoadingOverlay();
        let data = GetDataForm();
        postWithBearer(URLPost, token, data, ResponsePost)
    });
});

    export function GetDataForm(){
        const namaproduk = document.querySelector("#productName").value;
        const harga = document.querySelector("#productPrice").value;
        const quantity = document.querySelector("#productQuantity").value;
        const total = document.querySelector("#productTotal").value;
        const namapembeli = document.querySelector("#namapembeli").value;
        const email = document.querySelector("#email").value;
        const alamat = document.querySelector("#alamat").value;
        const nohp = document.querySelector("#nohp").value;
        console.log(namapembeli)
    
        const data = {
            namaproduk: namaproduk,
            harga: harga,
            quantity: quantity,
            total : total,
            namapembeli : namapembeli,
            email : email,
            alamat : alamat,
            nohp : nohp,
        };
        return data
    }
    
    function showLoadingOverlay() {
        // Show loading overlay
        document.getElementById('loader-wrapper').style.display = 'flex';
      }
      
      function hideLoadingOverlay() {
        // Hide loading overlay
        document.getElementById('loader-wrapper').style.display = 'none';
      }

    export function ResponsePost (result) {
        hideLoadingOverlay();
        console.log(result,result.status)
      if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Success Silahkan lanjutkan Pembayaran Melewati WhatsApp Ini.",
            confirmButtonColor: '#000',
        }).then(() => {
            window.location.href = "https://wa.me/62895326369830?text=Bayar";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Gagal Coba Lagi",
            text: result.message,
        });
    }
}

  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };

