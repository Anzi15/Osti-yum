const quantityInput = document.getElementById('quantity-inp');
const qttyPlusBtn = document.getElementById('qtty-pls-btn');
const qttyMinusBtn = document.getElementById('qtty-mns-btn');
const product_imgs_btn = document.querySelectorAll(".product_imgs")

product_imgs_btn.forEach(elem =>{
    elem.addEventListener("click",()=>{
        img_modal(elem)
    })
})

function img_modal(elem){
    if(elem){
        console.log(``,elem.classList)
        elem.classList.toggle("full-screen")
    }
    // elem.classlist.add("full-screen")
}

const plusOne = function(elem){
    const elemValue = parseInt(elem.value);
    elem.value = elemValue + 1;
}
const minusOne = function(elem){
    const elemValue = parseInt(elem.value);
    elem.value = elemValue + 1;
}
const quantityUpdater = function(elem,action){
    action(elem)
}

//not letting quantity go below 1
quantityInput.addEventListener("change",()=>{
    if(quantityInput.value < 1){
        quantityInput.value = 1
    }
})

//updating the quantity respectively
qttyMinusBtn.addEventListener("click",()=>{
    quantityUpdater(quantityInput,minusOne)
})
qttyPlusBtn.addEventListener("click",()=>{
    quantityUpdater(quantityInput,plusOne)
})
