const stored_product_id = localStorage.getItem("current_product_id");
function getProductId(){
    if(stored_product_id !== null){
        document.body.innerText =stored_product_id;
    }else{
        sendToHomePage()
    }
}
async function fecther(){
    await fetch('../src/json/products.json')
    .then(response => response.json())
    .then(data => loadInDom(data));
}
const loadInDom = function(data){
    productSearher(stored_product_id,data.speacialitites)
    
}
const productSearher = function(query, data){
    for(let i=0; i<data.length; i++){
        if(data[i].product_Id == query){
            loadProduct(data[i])
        }
    }
}
function sendToHomePage(){
    window.location = window.location.origin;
}
const loadProduct = function(product){
    console.log(product)
}
fecther()
getProductId()