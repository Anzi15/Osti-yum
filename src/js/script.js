const navlink = document.getElementById('nav-link');
const nav_toggler = document.getElementById('open-nav');
const footer_year = document.getElementById('year');

nav_toggler.addEventListener('click',toggleView)

function toggleView(){
    navlink.classList.toggle('visible-nav')
}
function footerYearUpdater(){
    footer_year.innerHTML
   footer_year.innerText = new Date().getFullYear();
}

window.addEventListener('load',footerYearUpdater)
