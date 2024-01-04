const cart_items = localStorage.getItem("cart_items");
const empty_cart_sec = document.getElementById('empty_cart_sec');
const cart_product = document.getElementById('product-cart');
const productCon = document.getElementById('products-con');
async function fecther(cartItems,action,inpValue=null){
    await fetch('../src/json/products.json')
    .then(response => response.json())
    .then(data => filterCartItems(cartItems,data,action,inpValue));


}

const checkCartStatus = function(cartItems){
  return cartItems == null ?   true : false;
}
const totalPriceUpdater = function(addValue){
    console.log(``,addValue)
    const totalElem = document.getElementById('total-price');
    const currentTotal = parseInt(totalElem.innerText.split("$")[1]);

    const add_value = parseInt(addValue.split("$")[1]);
    console.log(``,add_value);

    totalElem.innerText = `$${currentTotal + add_value}`
}
const loadProduct = function(product){
    productCon.innerHTML += `            <div class="cart-product">
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
        
                    <div class="product-remove-btn">
                        <img src="../src/assets/trash.svg" alt="" class="trash-icon">
                    </div>
                </div>
            </div>
        </div>

    </div>


    <div class="product-price">
        <p id="price-${product.product_Id}">${product.price}</p>
    </div>
</div>`

    totalPriceUpdater(product.price)
}

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
}

function checkCartEmptyUpStatus(cart_section){
    if(checkCartStatus(cart_items)){
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
        fecther(cart_items,loadProduct)
    }
}

checkCartEmptyUpStatus(empty_cart_sec)