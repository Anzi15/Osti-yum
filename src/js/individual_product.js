const quantityInput = document.getElementById('quantity-inp');
const qttyPlusBtn = document.getElementById('qtty-pls-btn');
const qttyMinusBtn = document.getElementById('qtty-mns-btn');
const product_imgs_btn = document.querySelectorAll(".product_imgs")
//img zooming functionality
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

//quantity manger buttons
const plusOne = function(elem){
    elem.value= parseInt(elem.value)+1
}
const minusOne = function(elem){
    elem.value<=1 ? elem.value = 1 : elem.value = parseInt(elem.value)-1
}

//limiting the quanity to 1
const valueLimiter = function(elem){
    if(parseInt(elem.value)<1){
        elem.value=1
    }
}
const quantityUpdater = function(action,elem){
    action(elem)
}

//adding event listners accordingly
qttyPlusBtn.addEventListener("click",()=>{
    quantityUpdater(plusOne,quantityInput)
})
qttyMinusBtn.addEventListener("click",()=>{
    quantityUpdater(minusOne,quantityInput)
})
quantityInput.addEventListener("change",()=>{
    valueLimiter(quantityInput)
})