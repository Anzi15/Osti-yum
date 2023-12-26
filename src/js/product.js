let stored_product_id = getParameter("Id");
const product_Section = document.getElementById('product_section');
const product_segments = {
    "title": document.getElementById('product_title'),
    "image": {
       bigImg: document.getElementById('big_img'),
       short_imgs: document.querySelectorAll('.short_imgs button img')

    }
    ,
    "compared_price": document.getElementById('compared_price'),
    "price": document.getElementById('price'),
    "description": document.getElementById('product_description')
}

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
    .then(response => {
        loadInDom(response)
    })
       
}

const loadInDom = function(data){
    productSearher(stored_product_id,data.all_products)
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
   product_segments.title.innerText = product.title;
   product_segments.description.innerText = product.description;
   product_segments.compared_price.innerText = product.compared_price;
   product_segments.price.innerText = product.price;
   product_segments.image.bigImg.src = product.image[0];
   product_segments.image.short_imgs[0].src = product.image[1];
   product_segments.image.short_imgs[1].src = product.image[2];
}
getProductId()
fecther()