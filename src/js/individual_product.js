const quantityInput = document.querySelectorAll('.quantity-inp');
const qttyPlusBtn = document.querySelectorAll('.qtty-pls-btn');
const qttyMinusBtn = document.querySelectorAll('.qtty-mns-btn');
const product_imgs_btn = document.querySelectorAll(".product_imgs")

product_imgs_btn.forEach(elem =>{
    elem.addEventListener("click",()=>{
        img_modal(elem)
    })
})

function img_modal(elem){
    if(elem){
        elem.classList.toggle("full-screen")
    }
}
const priceWriter = function(parentElem,value){
    if(parentElem.childNodes[1] == document.querySelector("#product-cart > div:nth-child(1) > div.all-product-data > div.product-data > h4")){
        const productPriceElem = parentElem.parentElement.parentElement.childNodes[5].childNodes[1];
        
        productPriceElem
        console.log(``,productPriceElem.innerText)
    }else{

        console.log(``,parentElem)
    }
}

const priceUpdater = function(elemId){
    const bothInp = document.querySelectorAll(`#${elemId}`)
    for(let i =0; i<bothInp.length; i++){
        let itsProduct = bothInp[i].parentElement.parentElement.parentElement.parentElement;
        priceWriter(itsProduct,bothInp.value)
    }
}
const plusOne = function(elemId){
    const bothInp = document.querySelectorAll(`#${elemId}`)
    for(let i=0; i<bothInp.length; i++){
        const currentValue = parseInt(bothInp[i].value);
        bothInp[i].value = currentValue +1;
    }
}
const minusOne = function(elemId){
    const bothInp = document.querySelectorAll(`#${elemId}`)
    for(let i=0; i<bothInp.length; i++){
        const currentValue = bothInp[i].value;
        if(currentValue>1){
            bothInp[i].value = currentValue - 1;
        }
    }
}
const quantityUpdater = function(elemId,action){
    action(elemId);
    priceUpdater(elemId);
}
const valueLimiter = function(elemId){
    const elem = document.querySelectorAll(`#${elemId}`);
    elem.forEach(elem =>{
        if(elem.value<1){
            elem.value = 1;
        }
    })
    priceUpdater(elemId);
}