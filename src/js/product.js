const stored_product_id = localStorage.getItem("current_product_id");
function getProductId(){
    if(stored_product_id !== null){
        document.body.innerText =stored_product_id
        // alert(stored_product_id)
        //add that to url
    }else{
        //send back to home page
        window.location = window.location.origin
    }
}
getProductId()