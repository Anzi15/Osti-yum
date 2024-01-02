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

const loadProduct = function(product){
    cart_product.innerHTML += `            <div class="cart-product">
    <div class="all-product-data">
        <div class="product_img">
            <img src="${product.image[0]}" alt="${product.title}">
        </div>

        <div class="product-data">
            <h4 class="product-title">${product.title}</h4>
            <p class="product_price">Rs. 100</p>
            
            <div class="product-quantity">
                <div class="quantity-con">
                    <quantity-input class="quantity">
                        <button onclick="quantityUpdater('qtty-inp-${product.product_Id}',minusOne)" class="qtty-mns-btn">-</button>

                        <input onchange="valueLimiter('qtty-inp-${product.product_Id}')"  id="qtty-inp-${product.product_Id}" type="number" value="1" name="" class="quantity-inp">

                        <button onclick="quantityUpdater('qtty-inp-${product.product_Id}',plusOne)" class="qtty-pls-btn">+</button>
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

    <div class="product-quantity">
        <div class="quantity-con">
            <quantity-input class="quantity">

                <button onclick="quantityUpdater('qtty-inp-${product.product_Id}',minusOne)" class="qtty-mns-btn">-</button>

                <input onchange="valueLimiter('qtty-inp-${product.product_Id}')" id="qtty-inp-${product.product_Id}" type="number" value="1" name="" class="quantity-inp">

                <button onclick="quantityUpdater('qtty-inp-${product.product_Id}',plusOne)"
                class="qtty-pls-btn">+</button>
            </quantity-inp>

        </div>
        <div class="product-remove-con">

            <div class="product-remove-btn">
                <img src="../src/assets/trash.svg" alt="" class="trash-icon">
            </div>
        </div>
    </div>

    <div class="product-price">
        <p>Rs. 100</p>
    </div>
</div>`
}

const filterCartItems = function(cartItems,data){
    const cartItemsArr = JSON.parse(cartItems)
    console.log(``,data.all_products)
    data.all_products.forEach(item => {
        if(cartItemsArr.includes(item.product_Id) ){
            loadProduct(item)
        }
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