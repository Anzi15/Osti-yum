const navlink = document.getElementById('nav-link');
const nav_toggler = document.getElementById('open-nav');
const footer_year = document.getElementById('year');
const nav = document.querySelector("nav");
nav_toggler.addEventListener('click',toggleView)
nav_toggler.addEventListener('click',toggleView)

function toggleView(){
    navlink.classList.toggle('visible-nav');
}
function footerYearUpdater(){
    footer_year.innerHTML
   footer_year.innerText = new Date().getFullYear();
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