const cart_items = JSON.parse(localStorage.getItem("cart_items"));
const empty_cart_sec = document.getElementById('empty_cart_sec');
const cart_product = document.getElementById('product-cart');
const productCon = document.getElementById('products-con');
var price_elems;
const cart_checkout_btn = document.getElementById('cart-checkout-btn')

//updatig the total price after updating the quantity
const priceUpdater = function(elemId){
    const inpValue = parseInt(document.getElementById(`${elemId}`).value)
    const splitedId = [elemId.split("_")[1]];
    fecther(splitedId,priceLoader,inpValue)
}

//updating the quanity of products

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
const quantityUpdater = function(elemId=null,action){
    action(elemId);
    priceUpdater(elemId);
}

//limiting to select quantity less then 1
const valueLimiter = function(elemId){
    const elem = document.querySelectorAll(`#${elemId}`);
    
    elem.forEach(elem =>{
        if(elem.value<1){
            elem.value = 1;
        }
    })

    priceUpdater(elemId);
}

//counting and listing total price of items
const priceLoader = function(inpValue, productPrice, elemId){
    const priceElem = document.getElementById(`price-${elemId}`);
    const product_Price = parseInt(productPrice.split("$")[1])
    priceElem.innerHTML = `$${eval(inpValue * product_Price)}`
    totalPriceUpdater()
}

//overcoming the bug of "price not deducting after removing an item" by making it price 0
const totalPriceDeductor = function(priceDeducted){
    const totalElem = document.getElementById('total-price');
    const toBeDeducted = parseInt(document.getElementById(priceDeducted).innerHTML.split("$")[1])
    totalElem.innerHTML = `$${    parseInt(totalElem.innerHTML.split("$")[1]) - toBeDeducted}`
}

//fetching the items fron json file to list 
async function fecther(cartItems,action,inpValue=null){
    await fetch('../src/json/products.json')
    .then(response => response.json())
    .then(data => filterCartItems(cartItems,data,action,inpValue));


}

//updaing the localstorage of cart after removing a project
const cartItemsUpdater = function(removedItemId){
    const removedItemIndex = cart_items.indexOf(removedItemId);
    if (removedItemIndex > -1) { 
        cart_items.splice(removedItemIndex, 1);
    }
    localStorage.setItem("cart_items",JSON.stringify(cart_items))
}

//remove a specific item from cart
const removeCartItem = function(cartItem){
    const itemId = cartItem.split("_")[1];
    totalPriceDeductor(`price-${itemId}`)
    const productElem = document.getElementById(`product_${itemId}`);
    productElem.childNodes[3].children[0].innerHTML=""
    productElem.style.display="none";
    cartItemsUpdater(itemId);
    checkCartEmptyUpStatus()
}

//checking whether cart is empty or not
const checkCartStatus = function(cartItems){
  return cartItems.length> 0 ? true : false;
}

//updating the totalprice of the cart accordingly
function totalPriceUpdater(){
    const totalElem = document.getElementById('total-price');
    totalElem.innerHTML="$0"
    for(let i=0; i<price_elems.length; i++){
        price_elems[1]
        const totalElemValue = parseInt(totalElem.innerHTML.split("$")[1]);

        totalElem.innerHTML = `$${totalElemValue + parseInt(price_elems[i].innerHTML.split("$")[1])}`
    }
}
//loading the filtered product into dom
const loadProduct = function(product){
    productCon.innerHTML += `<div class="cart-product" id="product_${product.product_Id}">
    <div class="all-product-data">
        <div class="product_img">
            <img src="${product.image[0]}" alt="${product.title}">
        </div>

        <div class="product-data">
            <div class="product-data-inner">
                <h4 class="product-title">${product.title}</h4>
                <p class="product_price">${product.price}</p>
            </div>
            
            <div class="product-quantity">
                <div class="quantity-con">
                    <quantity-input class="quantity">
        
                        <button onclick="quantityUpdater('qtty-inp_${product.product_Id}',minusOne)" class="qtty-mns-btn">-</button>
        
                        <input onchange="valueLimiter('qtty-inp_${product.product_Id}')" id="qtty-inp_${product.product_Id}" type="number" value="1" name="" class="quantity-inp">
        
                        <button onclick="quantityUpdater('qtty-inp_${product.product_Id}',plusOne)"
                        class="qtty-pls-btn">+</button>
                    </quantity-inp>
        
                </div>
                <div class="product-remove-con">
        
                    <button onclick="removeCartItem('item_${product.product_Id}')" class="product-remove-btn">
                        <img src="../src/assets/trash.svg" alt="" class="trash-icon">
                    </button>
                </div>
            </div>
        </div>

    </div>


    <div class="product-price">
        <p class="price_elems" id="price-${product.product_Id}">${product.price}</p>
    </div>
</div>`
}

//filtering out items that are in localstorage for cart
const filterCartItems = function(cartItems,data,action,inpValue){
    
    const cartItemsArr = typeof(cartItems) == "string" ? JSON.parse(cartItems) : cartItems;

    data.all_products.forEach(item => {
        if(cartItemsArr.includes(item.product_Id) ){
           if(action ==loadProduct){
            action(item)
           }else{
            action(inpValue,item.price,item.product_Id)
           }
        }
    });

     price_elems = document.querySelectorAll(".price_elems");

    totalPriceUpdater()

}

//updating cart based on the existense of products
function checkCartEmptyUpStatus(action){
    if(!checkCartStatus(cart_items)){
        cart_product.classList.toggle("none")
        empty_cart_sec.classList.toggle("none")
        empty_cart_sec.innerHTML =  `<div class="cart-illustration">
        <img src="../src/assets/Groupcart.svg" alt="" class="illustration" draggable="false" >
    </div>

    <div class="textarea">
        <h1>Your cart is empty 📪</h1>

        <div class="cart-cta-btn">
            <a href="../catalog/">Continue shopping</a>
        </div>
    </div>`
    }else{
        empty_cart_sec.classList.add("none")
        if(action){
            action(cart_items,loadProduct)
        }
    }
}

//getting things ready to localstorage for checkout
function checkout(){
    const allCartItems = []
    const all_products = document.querySelectorAll(".cart-product");

    all_products.forEach(element => {
        const productID = element.id.split("_")[1];
        const productPriceElem = document.getElementById(`price-${productID}`)
        if(productPriceElem.innerHTML!==""){
            const product_quantity = document.getElementById(`qtty-inp_${productID}`).value;
            const productObj = {
                productID,
                product_quantity
            }
            allCartItems.push(productObj)
        }
    })
    localStorage.setItem("checkout_cart",JSON.stringify(allCartItems))
}
checkCartEmptyUpStatus(fecther)
cart_checkout_btn.addEventListener("click",checkout)
