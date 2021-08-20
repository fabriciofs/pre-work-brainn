const formCarTable = document.querySelector('[data-js="form-car-table"]');
const formCar = document.querySelector('[data-js="form-car"]');

formCar.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    const tr = document.createElement("tr");

    [...e.target.elements]
      .filter((element) => element.nodeName === "INPUT")
      .forEach((element) => {
        const td = document.createElement("td");
        td.innerText = element.value;
        tr.appendChild(td);
        element.value = "";
      });
    [...e.target.elements][0].focus();
    formCarTable.appendChild(tr);
  },
  false
);
