const sayForm = document.querySelector(".say_nana");
const sayInput = sayForm.querySelector("input");
const contents = document.querySelector("#Contents");

const SAY_NANA_KEY = "saynana";

let sayNanaList = [];

function saveSayNana() {
  localStorage.setItem(SAY_NANA_KEY, JSON.stringify(sayNanaList));
}

function deleteSayNana(event) {
  const List = event.target.parentElement;

  List.remove();

  sayNanaList = sayNanaList.filter((say) => say.id !== parseInt(List.id));
  saveSayNana();
}

function paintSayNana(sayNana) {
  const List = document.createElement("div");
  List.id = sayNana.id;
  const span = document.createElement("span");
  span.innerText = sayNana.text;
  const button = document.createElement("button", deleteSayNana);
  button.innerText = "✖️";
  button.addEventListener("click", deleteSayNana);

  List.appendChild(span);
  List.appendChild(button);

  contents.appendChild(List);
}

function handleSayNana(event) {
  event.preventDefault();

  const newSay = sayInput.value;

  sayInput.value = "";
  const newSayObj = {
    text: newSay,
    id: Date.now(),
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
