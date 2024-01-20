const form = document.getElementById('form');
const order_info_con = document.getElementById('order-info-con');
const shippingFee = 5;
const sub_totalElem = document.getElementById('sub-total');
const totalElem = document.getElementById('total');
const shippingELem = document.getElementById('shipping-fee');

async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
     fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
        thankYou()
        form.reset()
      if (!response.ok) {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            (error => error["message"]).join(", ")
          } else {
              modal_img.src = `../src/assets/error-svgrepo-com.svg`
              modal_msg.innerText = `Error occured`
              modal.classList.add("grid")
            
          }
        })
      }
    }).catch(error => {
  
    });
}
function thankYou(){
    window.location.replace(`${window.location.origin}/thankyou`)
}
function getOrderDetails(){
    const details = getURlPramas()
}
function orderProductGetter(src,qntty){
    OrderFetcher(src,qntty)
}
function getURlPramas(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("src") && searchParams.has("qntty")){
            const ordered_product_details = {
                src:searchParams.get("src"),
                qntty:searchParams.get("qntty")
            }
            orderProductGetter(details.src,details.qntty)
            return ordered_product_details
    }else{
        if(searchParams.get("src") == "cart"){
            handleCartInfo()
        }else{
            const ordered_product = checkForLocalstorage("checkout_product")
            const ordered_product_Id = ordered_product[0]
            console.log(``,ordered_product[0])
            searchParams.set("src",ordered_product_Id);
            searchParams.set("qntty",ordered_product[1]);
            const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
            window.history.pushState({}, '', newUrl);
            const ordered_product_details = {
                src: searchParams.get("src"),
                qntty: searchParams.get("qntty"),
            }
            return ordered_product_details
        }
    }
}
function handleCartInfo(){
    const cart_items = JSON.parse(localStorage.getItem("checkout_cart"));
    cart_items.map((item)=>{
        orderProductGetter(item.productID,item.product_quantity)
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
    console.log(``,price,currentSubTotal);
}
getOrderDetails()
form.addEventListener("submit", handleSubmit)