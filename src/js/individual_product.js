const quantityInput = document.getElementById('quantity-inp');
const qttyPlusBtn = document.getElementById('qtty-pls-btn');
const qttyMinusBtn = document.getElementById('qtty-mns-btn');

function img_modal(){
    this.classlist.toggle("full-screen")
}

const plusOne = function(elem){
    const elemValue = parseInt(elem.value);
    console.log(typeof(elem.value))
    elem.value = elemValue + 1;
}
const minusOne = function(elem){
    const elemValue = parseInt(elem.value);
    elem.value = elemValue + 1;
}
function quantityUpdater(elem,action){
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
