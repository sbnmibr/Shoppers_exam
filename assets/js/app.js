const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");


menu.addEventListener("click",function(){
    nav.classList.toggle("active")
    this.classList.contains("fa-bars")
    ? this.classList=("fa-solid fa-xmark")
    : this.classList=("fa-solid fa-bars")
})