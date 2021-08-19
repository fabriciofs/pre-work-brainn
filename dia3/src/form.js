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
