package gcf

import (
	"fmt"
	"net/http"

	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/Rumahkopi/rkbackend"
  
)
func init() {
	functions.HTTP("get", GetTransaksi)
}

func GetTransaksi(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "https://rumahkopi.yumerp.me")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization,Token")
    w.Header().Set("Access-Control-Max-Age", "3600")
	fmt.Fprintf(w, rkbackend.GetDataTransaksi("MONGOSTRING", "proyek3", "transaksi"))
}