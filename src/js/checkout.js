const form = document.getElementById('form');
const order_info_con = document.getElementById('order-info-con');
const shippingFee = 5;
const sub_totalElem = document.getElementById('sub-total');
const totalElem = document.getElementById('total');
const shippingELem = document.getElementById('shipping-fee');

//redirecting to a thank you page
function thankYou(){
    window.location.replace(`${window.location.origin}/thankyou`)
}

//function to check if the url has a parameters or we have to go with the localstroage as usual
function getURlPramas(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("src") && searchParams.has("qntty")){
            const ordered_product_details = {
                src:searchParams.get("src"),
                qntty:searchParams.get("qntty")
            }
            OrderFetcher(ordered_product_details.src,ordered_product_details.qntty)
    }else{
        if(searchParams.get("src") == "cart"){
            handleCartInfo()
        }else{
            const ordered_product = checkForLocalstorage("checkout_product")
            const ordered_product_Id = ordered_product[0]
            searchParams.set("src",ordered_product_Id);
            searchParams.set("qntty",ordered_product[1]);
            const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
            window.history.pushState({}, '', newUrl);
            const ordered_product_details = {
                src: searchParams.get("src"),
                qntty: searchParams.get("qntty"),
            }
            OrderFetcher(ordered_product_details.src,ordered_product_details.qntty)

        }
    }
}

//handling cart checkout
function handleCartInfo(){
    const cart_items = JSON.parse(localStorage.getItem("checkout_cart"));

    cart_items.map((item)=>{
        OrderFetcher(item.productID,item.product_quantity)
    })
}
function checkForLocalstorage(what_to_look){
    if(localStorage.getItem(what_to_look)){
        return JSON.parse(localStorage.getItem(what_to_look))
    }
}
async function OrderFetcher(src,qntty){
    await fetch(`../src/json/products.json`)
    .then(response => response.json())
    .then(response=> filterProduct(response.all_products,src,qntty))
}
function filterProduct(all_products,id,qntty){
    all_products.map((eachProducts)=>{
        if(eachProducts.product_Id == id){
            orderPriceUpdater(eachProducts.price,qntty)
            loadOrder(eachProducts,qntty)
        }
    })
}
function loadOrder(product,qntty){
    order_info_con.innerHTML += `<div class="info-each-product">
    <div class="info-img">
        <img src="${product.image[0]}" alt="">
    </div>
    <div class="info-txt">
        <h2 class="light-heading">${product.title}</h2>
        <p class="quantity">Quantity: ${qntty}</p>
        <p class="price"><b>${product.price}</b></p>
    </div>
</div>`
}
function orderPriceUpdater(price,qntty){
    const currentSubTotal = parseInt(sub_totalElem.innerHTML.split('$')[1])
    const productPrice = parseInt(price.split('$')[1])

    sub_totalElem.innerHTML = `$${currentSubTotal + productPrice * qntty}`

    shippingELem.innerHTML = `$${shippingFee}`

    totalElem.innerHTML = `$${currentSubTotal + productPrice * qntty + shippingFee}`
}
getURlPramas()

// form submission 

form.addEventListener("submit", function (e) {
    alert("submit started")
    thankYou()
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);
  
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
      .then(async (response) => {
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        form.reset();
      });
  });
  