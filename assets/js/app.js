const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
const cards = document.querySelector(".products-cards");
const loadMore = document.querySelector(".loadMore");
const BASE_URL = "http://localhost:8000/products";
let home = [];
let limit=3
menu.addEventListener("click", function () {
  nav.classList.toggle("active");
  this.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-xmark")
    : (this.classList = "fa-solid fa-bars");
});

async function getData() {
  const res = await axios(`${BASE_URL}`);
  home = res.data;
  drawCards(home.slice(0, limit))
}
getData()

async function drawCards(arr){
    cards.innerHTML=""
    arr.forEach(element => {
       cards.innerHTML+=`
       <div class="card">
              <img src="${element.image}" alt="" />
              <div class="content">
                <h1>${element.title}</h1>
                <p>${element.desc}</p>
                <h1>$${element.price}</h1>
              </div>
            </div>

       ` 
    });
}

loadMore.addEventListener("click",function(){
    limit+=3
    drawCards(home.slice(0,limit))
    console.log(home.slice(0, 6));
    if(limit == home.length) this.remove()
})