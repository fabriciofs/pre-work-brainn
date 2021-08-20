const formCarTable = document.querySelector('[data-js="form-car-table"]');
const formCar = document.querySelector('[data-js="form-car"]');

const createTDText = (value) => {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
};

const createTDImage = (value) => {
  const td = document.createElement("td");
  const img = document.createElement("img");
  img.src = value;
  img.width = 100;
  td.appendChild(img);
  return td;
};

const createTDcolor = (value) => {
  const td = document.createElement("td");
  const div = document.createElement("div");
  div.style.background = value;
  div.style.width = "100px";
  div.style.height = "100px";
  td.appendChild(div);
  return td;
};

const elementsCreateFunctions = {
  image: createTDImage,
  brandModel: createTDText,
  year: createTDText,
  plate: createTDText,
  color: createTDcolor,
};

const clearDataTable = () => {
  [...formCarTable.rows]
    .filter((_, index) => index > 0)
    .forEach((_, index) => formCarTable.deleteRow(index + 1));
};

const mountDataTable = async () => {
  try {
    const cars = await getCars();
    clearDataTable();
    if (cars.length > 0) {
      cars.forEach((car) => {
        const tr = document.createElement("tr");
        Object.entries(car).forEach((entry) => {
          tr.appendChild(elementsCreateFunctions[entry[0]](entry[1]));
        });
        formCarTable.appendChild(tr);
      });
    } else {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.innerText = "Nenhum carro encontrado";
      tr.appendChild(td);
      formCarTable.appendChild(tr);
    }
  } catch (error) {
    console.error(error);
  }
};

const getCars = async () => {
  try {
    const result = await fetch("http://localhost:3333/cars");
    const data = await result.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

mountDataTable();
