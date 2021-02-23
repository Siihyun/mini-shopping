const itemList = document.querySelector(".items");
const button = document.querySelector(".buttons");
const logo = document.querySelector(".logo");

const createElement = (item) => {
  return `<li class="item">
      <img class="clothes" src=${item.image} alt=${item.type} />
      <p>${item.gender} , ${item.size} size</p>
    </li>`;
};

const onClick = (e, items) => {
  const target = e.target.dataset.color || e.target.dataset.type;
  displayItems(
    items.filter((item) => item.color === target || item.type === target)
  );
};

const setEventListener = (items) => {
  const button = document.querySelector(".buttons");
  button.addEventListener("click", (e) => onClick(e, items));
  logo.addEventListener("click", () => displayItems(items));
};

const displayItems = (items) => {
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
