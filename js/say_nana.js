const sayForm = document.querySelector("#feedContainer");
const sayInput = sayForm.querySelector("input");
const button = sayForm.querySelector("button");

const SAY_NANA_KEY = "saynana";

let sayNanaList = [];

function saveSayNana() {
  localStorage.setItem(SAY_NANA_KEY, JSON.stringify(sayNanaList));
}

function deleteSayNana(event) {
  const List = event.target.parentElement;

  List.remove();

  sayNanaList = sayNanaList.filter((say) => say.zid !== parseInt(List.id));
  saveSayNana();
}

function paintSayNana({ id, text, parentElement }) {
  const List = document.createElement("div");
  List.id = id;

  const span = document.createElement("span");
  span.innerText = text;

  const button = document.createElement("button", deleteSayNana);
  button.innerText = "✖️";
  button.addEventListener("click", deleteSayNana);

  List.appendChild(span);
  List.appendChild(button);

  parentElement.appendChild(List);
}

function handleSayNana(event) {
  event.preventDefault();

  const newSay = sayInput.value;
  const parentElement = event.target.parentElement;

  sayInput.value = "";
  const newSayObj = {
    text: newSay,
    id: Date.now(),
    parentElement: parentElement,
  };

  sayNanaList.push(newSayObj);
  paintSayNana(newSayObj);
  saveSayNana();
}

sayForm.addEventListener("submit", handleSayNana);

const savedSayNana = localStorage.getItem(SAY_NANA_KEY);

if (savedSayNana !== null) {
  const parsedSayNana = JSON.parse(savedSayNana);

  sayNanaList = parsedSayNana;
  parsedSayNana.forEach(paintSayNana);
}
