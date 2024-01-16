const navlink = document.getElementById('nav-link');
const nav_toggler = document.getElementById('open-nav');
const footer_year = document.getElementById('year');
const nav = document.querySelector("nav");
const modal = document.getElementById('modal-con');
nav_toggler.addEventListener('click',toggleView)
nav_toggler.addEventListener('click',toggleView)

function toggleView(){
    navlink.classList.toggle('visible-nav');
}
function footerYearUpdater(){
    footer_year.innerHTML
   footer_year.innerText = new Date().getFullYear();
}
function modalToggle(){
  modal.classList.remove("grid")
}
window.addEventListener('load',footerYearUpdater)

var oldScrollY = window.scrollY;
window.onscroll = function(e) {
  if(oldScrollY < window.scrollY){
    nav.classList.remove("fixed-nav");
    navlink.classList.remove('visible-nav');
  } else {
    if(oldScrollY>150){
        nav.classList.add("fixed-nav")
    }
  }
  if(scrollY < 20){
    nav.classList.remove('fixed-nav');
  }
  oldScrollY = window.scrollY;
}

function setLocalStorage(product_Id) {
  localStorage.setItem('current_product_id',product_Id)  
 }
 
 function addToCart(product_Id){
 const cart_items = localStorage.getItem("cart_items");
     
     if(cart_items !== null){
         let current_cart_items = JSON.parse(cart_items);
         if(!current_cart_items.includes(product_Id)){
             
             current_cart_items.push(product_Id);
             current_cart_items = JSON.stringify(current_cart_items);
             localStorage.setItem("cart_items",current_cart_items)
 
         }
     }else if(cart_items == null){
         let new_cart_items = [product_Id];
         const new_current_cart_items = JSON.stringify(new_cart_items);
 
         localStorage.setItem("cart_items",new_current_cart_items);
     }
 }