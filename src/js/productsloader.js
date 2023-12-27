const speacialitites_con = document.getElementById('speacialities_container'); 
const hostOrigin = window.location.origin;
const cart_items = localStorage.getItem("cart_items");
async function fecther(){
    await fetch('../src/json/products.json')
    .then(response => response.json())
    .then(data => loadInDom(data));
}

function loadInDom(data){
    //loading speacialities products on homepage
    data.speacialitites.forEach(data => {
        loader(speacialitites_con,data)
    });
}
const loader = (elem,data)=>{
    let data_description_ultered ;
    if(data.description.length>120){
        data_description_ultered =data.description.split(0,80);

        console.log(data_description_ultered)
    }
    elem.innerHTML += `<div class="product">
    <div class="img">
    <img height="25%" src="${data.image[0]}" alt="${data.title} image">
    </div>
    <div class="textarea">
    <h2>${data.title}</h2> 
     <p>${data_description_ultered}</p>
     
 </div>
 <div class="cta-btn">
     <a href="${window.location.origin}/product" onclick="setLocalStorage('${data.product_Id}')">
         Buy now
     </a>
     <button onclick="addToCart('${data.product_Id}')">
         Add to cart
     </button>
 </div>
</div>`

}

function setLocalStorage(product_Id) {
 localStorage.setItem('current_product_id',product_Id)  
}

function addToCart(product_Id){
    
    if(cart_items !== null){
        let current_cart_items = JSON.parse(cart_items);
        if(!current_cart_items.includes(product_Id)){
            console.log(``,current_cart_items)
            let updated_cart_items = [...current_cart_items];
            updated_cart_items.push(product_Id);
            updated_cart_items = JSON.stringify(updated_cart_items);
            console.log(``,updated_cart_items)
            localStorage.setItem("cart_items",updated_cart_items)

        }
    }else if(cart_items == null){
        alert('else execu')
        let new_cart_items = [product_Id];
        const new_updated_cart_items = JSON.stringify(new_cart_items);

        localStorage.setItem("cart_items",new_updated_cart_items);
    }
}
fecther()