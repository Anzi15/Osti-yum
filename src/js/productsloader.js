const speacialitites_con = document.getElementById('speacialities_container'); 
const hostOrigin = window.location.origin;
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
    }
    elem.innerHTML += `<div class="product">
    <div class="img">
    <img height="25%" src="${data.image[0]}" alt="${data.title} image">
    </div>
    <div class="textarea">
    <h2>${data.title}</h2> 
     
 </div>
 <div class="cta-btn">
     <a href="${window.location.origin}/product?Id=${data.product_Id}" onclick="setLocalStorage('${data.product_Id}')">
         Buy now
     </a>
     <button onclick="addToCart('${data.product_Id}')">
         Add to cart
     </button>
 </div>
</div>`

}


fecther()
