const form = document.getElementById('form');
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
    orderProductGetter(details.src)
    console.log(``,details)
}
function orderProductGetter(id){
    OrderFetcher(id)
}
function getURlPramas(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("src") && searchParams.has("qntty")){
        if(searchParams.get("src") == "cart"){
            alert('cart')
            return handleCartInfo()
        }else{
            const ordered_product_details = {
                src:searchParams.get("src"),
                qntty:searchParams.get("qntty")
            }
            return ordered_product_details
        }
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
        return ordered_product
    }
}
function checkForLocalstorage(what_to_look){
    if(localStorage.getItem(what_to_look)){
        return JSON.parse(localStorage.getItem(what_to_look))
    }
}
async function OrderFetcher(id){
    await fetch(`../src/json/products.json`)
    .then(response => response.json())
    .then(response=> filterProduct(response.all_products,id))
}
function filterProduct(all_products,id){
    console.log(``,all_products)
    all_products.map((eachProducts)=>{
        if(eachProducts.product_Id == id){
            loadOrder(eachProducts)
        }
    })
}
function loadOrder(){
    
}
getOrderDetails()
form.addEventListener("submit", handleSubmit)