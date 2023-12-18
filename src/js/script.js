const navlink = document.getElementById('nav-link');
const nav_visible = document.getElementById('open-nav');
const nav_invisible = document.getElementById('close_nav');

nav_invisible.addEventListener('click',toggleView)
nav_visible.addEventListener('click',toggleView)

function toggleView(){
    navlink.classList.toggle('visible')
}