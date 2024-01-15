import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";

export let URLDataProduk = "https://asia-southeast2-msyahid.cloudfunctions.net/GetDataProduk";
export let tableTag="tr";
export let tableRowClass="content is-size-6";
export let tableTemplate=`
<td data-label="Name">#NAMA#</td>
<td data-label="Harga">#HARGA#</td>
<td data-label="Deskripsi">#DESKRIPSI#</td>
<td data-label="Stok">#STOK#</td>
<td data-label="image"><img
src="#IMAGE#"
alt="product"
class="product-img"
width="50"
height="50"
/></td>
<td>
<div class="buttons is-right">
  <a href="edit.html?_id=#IDEDIT#" class="button is-dark jb-modal" data-produk-id="#IDHAPUS#" data-target="edit-modal" type="button">
    <span class="icon"><i class="mdi mdi-eye-circle"></i></span>
  </a>
  <button class="button is-dark" type="button" onclick="deleteProduk('#DELETE#')">
    <span class="icon"><i class="mdi mdi-delete-circle"></i></span>
  </button>
</div>
</td>
` 

export function responseData(results){
    console.log(results);
    results.reverse().forEach(isiRow);
}

export function isiRow(value){
    let content=tableTemplate.replace("#NAMA#",value.nama)
    .replace("#HARGA#",value.harga)
    .replace("#DESKRIPSI#",value.deskripsi)
    .replace("#STOK#",value.stok)
    .replace("#IMAGE#",value.image)
    .replace("#IDEDIT#",value._id)
    .replace("#DELETE#",value._id)
    .replace("#IDHAPUS#",value._id);
    
    console.log(content);
    addChild("produk",tableTag,tableRowClass,content);
}
