import { a, b } from "../store/store.js";

const createElement = (item) => {
  return `<li class="item" data-type=${item.type} data-color=${item.color}>
      <img class="img_clothes"  src=${item.image} alt=${item.type} />
      <p>${item.gender} , ${item.size} size</p>
    </li>`;
};

const onLogoClick = () => {
  const list = document.querySelectorAll("li");
  list.forEach((li) => {
    li.classList.remove("invisible");
  });
};

const onButtonClick = (e) => {
  const list = document.querySelectorAll("li");
  const key = e.target.dataset.key;
  const value = e.target.dataset.value;

  if (key === undefined) return;

  list.forEach((li) => {
    if (li.dataset[key] === value) {
      li.classList.remove("invisible");
    } else {
      li.classList.add("invisible");
    }
  });
};

/* fetch한 item을 통해 list로 만들어 innerHTML 수정 */
const displayItems = (items) => {
  const clothesList = document.querySelector(".items");
  clothesList.innerHTML = items.map((item) => createElement(item)).join("");
};

/* logo와 button에 click event를 달아 주어 filtering 할 수 있도록 함 */
const setEventListener = (items) => {
  const buttons = document.querySelector(".buttons");
  const logo = document.querySelector(".logo");

  logo.addEventListener("click", onLogoClick);
  buttons.addEventListener("click", (e) => onButtonClick(e));
};

/* clothes data를 fetch 해옴 */
const fetchItems = () => {
  return fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => data.items);
};

/* fetch후 display를 통해 화면에 뿌려주고 event handler를 달아줌 */
fetchItems().then((items) => {
  displayItems(items);
  setEventListener(items);
});
