const BASE_URL = "http://localhost:8000/products";
const tbody = document.querySelector("tbody");
const allinputs = document.querySelectorAll("input");
const form = document.querySelector("form");
const search = document.querySelector(".search");
const sort = document.querySelector(".sort");

let home = [];
let homeCopy = [];

let editId = null;

async function getData() {
  const res = await axios(`${BASE_URL}`);
  home = res.data;
  homeCopy = structuredClone(home);
  drawTable(homeCopy);
}
getData();

async function drawTable(arr) {
  tbody.innerHTML = "";
  arr.forEach((element) => {
    const trElem = document.createElement("tr");
    trElem.innerHTML += `
        <td>${element.title}</td>
        <td><img src="${element.image}" alt="" ></td>
        <td>${element.desc}</td>
        <td>${element.price}</td>
        <td>
        <button class="delete" onclick=deleteFunction("${element.id}",this)>delete</button> 
        <button class="edit" onclick=editfunction("${element.id}")>Edit</button> 
        </td>
        `;
    tbody.append(trElem);
  });
}
async function deleteFunction(id, btn) {
  if (window.confirm("are you sure delete?")) {
    await axios.delete(`${BASE_URL}/${id}`);
    this.closest("tr").remove();
  }
}

async function editfunction(id) {
  editId = id;
  console.log("id", id);
  console.log("Editid", editId);
  const res = await axios(`${BASE_URL}/${id}`);
  allinputs[0].value = res.data.title;
  allinputs[2].value = res.data.desc;
  allinputs[3].value = res.data.price;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  window.scrollTo(0, 0);
  let obj = {
    title: allinputs[0].value,
    image: `./assets/image/${allinputs[1].value.split("\\")[2]}`,
    desc: allinputs[2].value,
    price: allinputs[3].value,
  };
  if (!editId) {
    if (
      allinputs[0].value != "" &&
      allinputs[1].value != "" &&
      allinputs[2].value != "" &&
      allinputs[3].value != ""
    ) {
      await axios.post(`${BASE_URL}`, obj);
    } else {
     window.alert("bos olmazzzzz!!!")
    }
  } else {
    await axios.patch(`${BASE_URL}/${editId}`, obj);
  }
});

search.addEventListener("input", function (e) {
  let filtered = homeCopy.filter((item) => {
    return item.title
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawTable(filtered);
});

sort.addEventListener("click", function () {
  let sorted;
  if (sort.innerHTML === "Ascending") {
    sort.innerHTML = "Descending";
    sorted = homeCopy.sort((a, b) => a.price - b.price);
  } else if (sort.innerHTML === "Descending") {
    sort.innerHTML = "Ascending";
    sorted = homeCopy.sort((a, b) => b.price - a.price);
  }
  drawTable(sorted)
});
