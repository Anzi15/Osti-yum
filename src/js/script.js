const navlink = document.getElementById('nav-link');
const nav_toggler = document.getElementById('open-nav');
const footer_year = document.getElementById('year');
const nav = document.querySelector("nav");
const modal = document.getElementById('modal-con');
nav_toggler.addEventListener('click',toggleView)
nav_toggler.addEventListener('click',toggleView)
const notify_con = document.getElementById("notify_con");
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
 
      notify("Item added to your cart")
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

 function notify(msg){
  const curentNotification = notify_con.childNodes.length;
  notify_con.classList.add("notification-area")
  notify_con.innerHTML+=`<div class="notification" id="notifiation-${curentNotification}">
  <button onclick="closeNotification('notifiation-${curentNotification}')"><svg xmlns="http://www.w3.org/2000/svg" width="3rem"fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></button>
   <h3 class="light-heading">${msg}</h3> 
   </div>`

   setTimeout(() => {
    closeNotification(`notifiation-${curentNotification}`)
   }, 5000);
 }

 function closeNotification(notifiation_id){
  document.getElementById(notifiation_id).style.display="none"
 }