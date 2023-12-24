const speacialitites_con = document.getElementById('speacialities_container'); 
const hostOrigin = window.location.origin;
async function fecther(){
    await fetch('../src/json/products.json')
    .then(response => response.json())
    .then(data => loadInDom(data));
}

function loadInDom(data){
    console.log(data.speacialitites)
    data.speacialitites.forEach(data => {
        console.log(data)
        loader(speacialitites_con,data)
    });
}
const loader = (elem,data)=>{
 elem.innerHTML += `<div class="product">
 <div class="img">
 <img src="${data.image[0]}" alt="">
 </div>
 <div class="textarea">
     <h2>${data.title}</h2>
     <p>${data.description}</p>
     
 </div>
 <div class="cta-btn">
     <a href="${window.location.origin}/product" onclick="addUrlProductPara('${data.product_Id}')">
         Buy now
     </a>
     <a onclick="addToCart('${data.product_Id}')">
         Add to cart
     </a>
 </div>
</div>`

}

function addUrlProductPara(para) {
 localStorage.setItem('current_product_id',para)  
}

function addToCart(product_Id){
    alert(`${product_Id} successfully added to cart`)
}

fecther()