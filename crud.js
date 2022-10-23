let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create");
let search = document.getElementById("search");
let tbody = document.querySelector("tbody");
let deleteAll = document.querySelector(".deleteAll");

let mood = "create";
let searchMood = "title";
let tmp;

let myArr = [];

if (localStorage.getItem("product") != null) {
  myArr = JSON.parse(localStorage.getItem("product"));
  showData(myArr);
}

function calcTotal() {
  if (price.value != "" && taxes.value != "" && ads.value != "") {
    total.innerHTML = +price.value + +taxes.value + +ads.value - discount.value;
  }
  if (total.innerHTML > 0) {
    total.style.backgroundColor = "#009688";
  } else {
    total.style.backgroundColor = "#e91e63";
  }
}

submit.onclick = function () {
  if (
    title.value != "" &&
    price.value != "" &&
    ads.value != "" &&
    taxes.value != ""
  ) {
    saveData();
  } else {
    alert("");
  }
  clearData();
  calcTotal();
};

function saveData() {
  let myObj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === "create") {
    if (count.value > 1) {
      for (let i = 0; i < count.value; i++) {
        myArr.push(myObj);
      }
    } else {
      myArr.push(myObj);
    }
  } else {
    myArr[tmp] = myObj;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }
  showData(myArr);

  localStorage.setItem("product", JSON.stringify(myArr));
}

function showData(array) {
  tbody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    tbody.innerHTML += `
    
      <tr>
        <td> ${i + 1} </td>
        <td> ${array[i].title} </td>
        <td> ${array[i].price} </td>
        <td> ${array[i].taxes} </td>
        <td> ${array[i].ads} </td>
        <td> ${array[i].discount} </td>
        <td> ${array[i].total} </td>
        <td> ${array[i].category} </td>
        <td> <button class='update' onclick='updateData(${i})'> Update </button> </td>
        <td> <button class='delete' onclick = 'deleteData(${i})'> Delete </button> </td>
      </tr>
    `;
  }
  if (array.length > 0) {
    deleteAll.innerHTML = `<button onclick = 'deleteAllData()'>Delete All (${array.length}) </button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

function deleteData(id) {
  myArr.splice(id, 1);
  localStorage.product = JSON.stringify(myArr);
  showData(myArr);
}

function deleteAllData() {
  myArr.splice(0, myArr.length);
  localStorage.clear();
  showData(myArr);
}
function updateData(id) {
  mood = "update";
  title.value = myArr[id].title;
  price.value = myArr[id].price;
  taxes.value = myArr[id].taxes;
  ads.value = myArr[id].ads;
  calcTotal();
  discount.value = myArr[id].discount;
  category.value = myArr[id].category;
  count.style.display = "none";
  submit.innerHTML = "Update";

  tmp = id;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function searchData(id) {
  if (id === "searchT") {
    search.placeholder = "Search By Title";
    searchMood = "title";
  } else {
    search.placeholder = "Search By Category";
    searchMood = "category";
  }
  search.focus();
  search.value = "";
  showData(myArr);
}

search.onkeyup = function (e) {
  let val = e.target.value;
  tbody.innerHTML = "";
  for (let i = 0; i < myArr.length; i++) {
    if (searchMood === "title") {
      if (myArr[i].title.includes(val)) {
        tbody.innerHTML += `
    
      <tr>
      <td> ${i + 1} </td>
      <td> ${myArr[i].title} </td>
      <td> ${myArr[i].price} </td>
      <td> ${myArr[i].taxes} </td>
      <td> ${myArr[i].ads} </td>
      <td> ${myArr[i].discount} </td>
      <td> ${myArr[i].total} </td>
      <td> ${myArr[i].category} </td>
      <td> <button class='update' onclick='updateData(${i})'> Update </button> </td>
      <td> <button class='delete' onclick = 'deleteData(${i})'> Delete </button> </td>
      </tr>
      `;
      }
    } else {
      if (myArr[i].category.includes(val)) {
        tbody.innerHTML += `
    
      <tr>
      <td> ${i + 1} </td>
      <td> ${myArr[i].title} </td>
      <td> ${myArr[i].price} </td>
      <td> ${myArr[i].taxes} </td>
      <td> ${myArr[i].ads} </td>
      <td> ${myArr[i].discount} </td>
      <td> ${myArr[i].total} </td>
      <td> ${myArr[i].category} </td>
      <td> <button class='update' onclick='updateData(${i})'> Update </button> </td>
      <td> <button class='delete' onclick = 'deleteData(${i})'> Delete </button> </td>
      </tr>
      `;
      }
    }
  }
};
