const createElement = (item) => {
  return `<li class="item">
      <img class="img_clothes" src=${item.image} alt=${item.type} />
      <p>${item.gender} , ${item.size} size</p>
    </li>`;
};

const onClick = (e, items) => {
  const key = e.target.dataset.key;
  const value = e.target.dataset.value;

  if (key == null) return;

  displayItems(items.filter((item) => item[key] === value));
};

const setEventListener = (items) => {
  const button = document.querySelector(".buttons");
  const logo = document.querySelector(".logo");
  button.addEventListener("click", (e) => onClick(e, items));
  logo.addEventListener("click", () => displayItems(items));
};

const displayItems = (items) => {
  const itemList = document.querySelector(".items");
  itemList.innerHTML = items.map(createElement).join("");
  items.map((item) => console.log(item));
};

const fetchItems = () => {
  return fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => data.items);
};

fetchItems().then((items) => {
  displayItems(items);
  setEventListener(items);
});
