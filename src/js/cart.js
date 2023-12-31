const cart_items = localStorage.getItem("cart_items");
const empty_cart_sec = document.getElementById('empty_cart_sec');
const cart_product = document.getElementById('product-cart');

async function fecther(){
    await fetch('../src/json/products.json')
    .then(response => response.json())
    .then(data => filterCartItems(cart_items,data));
}

const cartEmpty = function(cartItems){
  return cartItems == null ?   true : false;
}

const filterCartItems = function(cartItems,data){
    const cart_items_Arr = JSON.parse(cartItems)
    console.log(``,data,cart_items_Arr)
    cart_items_Arr.forEach(item => {
        
    });
}

function cartEmptyUpdater(cart_section){
    if(cartEmpty(cart_items)){
        cart_product.classList.add("none")
        cart_section.classList.remove("none")
        cart_section.innerHTML =  `<div class="cart-illustration">
        <img src="../src/assets/Groupcart.svg" alt="" class="illustration" draggable="false" >
    </div>

    <div class="textarea">
        <h1>Your cart is empty 📪</h1>

        <div class="cart-cta-btn">
            <a href="../catalog/">Continue shopping</a>
        </div>
    </div>`
    }else{
        fecther()
    }
}

cartEmptyUpdater(empty_cart_sec)