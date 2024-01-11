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
