const all_products_con = document.getElementById('all-products-con');
async function productFetcher(url){
    await fetch(url)
    .then(response => response.json())
    .then(data => loadAllProducts(data.all_products));
}

function loadAllProducts(data){
    console.log(data);
    data.map((elem)=>{
        all_products_con.innerHTML+= `<a href="../product?Id${elem.product_Id}" onclick="setLocalStorage('${elem.product_Id}')" class="product">
        <div class="product-img">
            <img src="${elem.image[0]}" alt="">
        </div>
        <div class="product-data">
            <h2 class="light-heading">${elem.title}</h2>
        </div>
    </a>`
        console.log(``,elem)
    })
}

productFetcher('../src/json/products.json')