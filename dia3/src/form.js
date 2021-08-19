const inputName = document.querySelector('[data-js="name"]');

inputName.addEventListener(
  "input",
  (e) => {
    e.preventDefault();
    e.target.value = capitalizeText(e.target.value);
  },
  false
);

const capitalizeText = (text) =>
  text
    .toLowerCase()
    .split(" ")
    .map((word) =>
      isLowerCaseWord(word)
        ? word
        : word.substr(0, 1).toUpperCase() + word.substr(1)
    )
    .join(" ");

const isLowerCaseWord = (word) =>
  (word = ["de", "da", "do", "dos"].includes(word));

const form = document.querySelector('[data-js="form"]');
const selectColors = document.createElement("select");
selectColors.setAttribute("multiple", true);

form.appendChild(selectColors);

const colors = [
  { color: "#ff0000", label: "Red" },
  { color: "#00ff00", label: "Green" },
  { color: "#0000ff", label: "Blue" },
  { color: "#ffff00", label: "Yellow" },
  { color: "#ff8000", label: "Orange" },
];

colors.forEach((color) => {
  selectColors.add(new Option(color.label, color.color));
});

const divResult = document.createElement("div");
divResult.classList.add("div-result");
form.appendChild(divResult);

selectColors.addEventListener("change", (e) => {
  e.preventDefault();
  divResult.innerHTML = "";
  [...e.target.options]
    .filter((el) => el.selected)
    .forEach((el) => {
      const div = document.createElement("div");
      div.style.background = el.value;
      div.style.width = "100px";
      div.style.height = "100px";
      divResult.appendChild(div);
    });
});
