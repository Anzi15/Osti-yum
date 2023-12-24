const navlink = document.getElementById('nav-link');
const nav_visible = document.getElementById('open-nav');
const nav_invisible = document.getElementById('close_nav');
const footer_year = document.getElementById('year');

nav_invisible.addEventListener('click',toggleView)
nav_visible.addEventListener('click',toggleView)

function toggleView(){
    navlink.classList.toggle('visible')
}
function footerYearUpdater(){
    footer_year.innerHTML
   footer_year.innerText = new Date().getFullYear();
}

window.addEventListener('load',footerYearUpdater)

console.log(window.location)