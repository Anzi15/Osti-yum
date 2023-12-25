let stored_product_id = getParameter("Id");

if(stored_product_id ==null || stored_product_id == undefined){
    setParameter("Id",localStorage.getItem("current_product_id"))
    stored_product_id = getParameter("Id")
}else{
    localStorage.setItem("current_product_id",getParameter("Id"))
}

function getProductId(){
    if(stored_product_id !== null){
        setParameter("Id",stored_product_id);

    }else if(getParameter("Id") !== null || stored_product_id == null){
       localStorage.setItem("current_product_id",getParameter("Id"));

       stored_product_id == getParameter("Id");
    }
}

function getParameter(key) {
    const url = new URL(window.location.href);
    return url.searchParams.get(key);
}

 function setParameter(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url);
}

async function fecther(){
    await fetch('../src/json/products.json')
    .then(response => response.json())
    .then(data => loadInDom(data));
}

const loadInDom = function(data){
    productSearher(stored_product_id,data.all_products)
}

const productSearher = function(query, data){
    console.log("product search sarte",query, data)
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
    console.warn(product)
}
getProductId()
fecther()