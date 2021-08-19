const formCarSubmit = document.querySelector('[data-js="form-car-submit"]');
const formCarImage = document.querySelector('[data-js="form-car-image"]');
const formCarBrand = document.querySelector('[data-js="form-car-brand"]');
const formCarYear = document.querySelector('[data-js="form-car-year"]');
const formCarId = document.querySelector('[data-js="form-car-id"]');
const formCarColor = document.querySelector('[data-js="form-car-color"]');
const formCarTable = document.querySelector('[data-js="form-car-table"]');

formCarSubmit.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    const tr = document.createElement("tr");

    const tdImage = document.createElement("td");
    tdImage.innerText = formCarImage.value;
    tr.appendChild(tdImage);
    formCarImage.value = "";
    formCarImage.focus();

    const tdBrans = document.createElement("td");
    tdBrans.innerText = formCarBrand.value;
    tr.appendChild(tdBrans);
    formCarBrand.value = "";

    const tdYear = document.createElement("td");
    tdYear.innerText = formCarYear.value;
    tr.appendChild(tdYear);
    formCarYear.value = "";

    const tdCarId = document.createElement("td");
    tdCarId.innerText = formCarId.value;
    tr.appendChild(tdCarId);
    formCarId.value = "";

    const tdColor = document.createElement("td");
    tdColor.innerText = formCarColor.value;
    tr.appendChild(tdColor);
    formCarColor.value = "";

    formCarTable.appendChild(tr);
  },
  false
);
