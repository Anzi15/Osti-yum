const cart_items = localStorage.getItem("cart_items");
const empty_cart_sec = document.getElementById('empty_cart_sec');

const cartEmpty = function(cartItems){
  return cartItems == null ?   true : false;
}

const loadCartItems = function(cartItems){
    
}

function cartEmptyUpdater(cart_section){
    if(!cartEmpty(cart_items)){
        cart_section.classList.add("none")
    }
}

cartEmptyUpdater(empty_cart_sec)