const quantityInput = document.querySelectorAll('#quantity-inp');
const qttyPlusBtn = document.querySelectorAll('#qtty-pls-btn');
const qttyMinusBtn = document.querySelectorAll('#qtty-mns-btn');
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

const plusOne = function(elem){
    elem.forEach(element=>{
        const elemValue = parseInt(element.value);
        element.value = elemValue + 1;
    })
}
const minusOne = function(elem){
    elem.forEach(element=>{
        const elemValue = parseInt(element.value);
        if(elemValue > 1){
            element.value = elemValue - 1;
        }
    })
}
const quantityUpdater = function(elem,action){
    action(elem)
}

//not letting quantity go below 1

quantityInput.forEach(element => {
    element.addEventListener("change",()=>{
        if(element.value < 1){
            element.value = 1
        }
    })
});


//updating the quantity respectively
qttyMinusBtn.forEach(element =>{
    element.addEventListener("click",()=>{
        quantityUpdater(quantityInput,minusOne)
}) 
})

qttyPlusBtn.forEach(element => {
    element.addEventListener("click",()=>{
        quantityUpdater(quantityInput,plusOne)
    })
}); 
