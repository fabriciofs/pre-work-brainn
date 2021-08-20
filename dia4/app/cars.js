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

const elementsList = {
  image: { tdFunction: createTDImage, defaultValue: "" },
  brandModel: { tdFunction: createTDText, defaultValue: "" },
  year: { tdFunction: createTDText, defaultValue: 0 },
  plate: { tdFunction: createTDText, defaultValue: "" },
  color: { tdFunction: createTDcolor, defaultValue: "" },
};

formCar.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();
    const car = [...e.target.elements]
      .filter((element) => element.nodeName === "INPUT")
      .reduce((obj, element) => {
        obj[element.id] = element.value;
        return obj;
      }, {});

    try {
      await addCar(car);
      [...e.target.elements]
        .filter((element) => element.nodeName === "INPUT")
        .forEach((element) => {
          element.value = elementsList[element.id].defaultValue;
        });
      mountDataTable();
    } catch (error) {
      alert(error.message);
    }

    [...e.target.elements][0].focus();
  },
  false
);

const addCar = async (car) => {
  try {
    const result = await fetch("http://localhost:3333/cars", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(car),
    });
    if (!result.ok) {
      const error = await result.json();
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeCar = async (plate) => {
  try {
    const result = await fetch("http://localhost:3333/cars", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ plate }),
    });
    if (result.ok) {
      mountDataTable();
    } else {
      const error = await result.json();
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const clearDataTable = () => {
  [...formCarTable.rows]
    .filter((_, index) => index > 0)
    .forEach(() => {
      formCarTable.deleteRow(1);
    });
};

const mountDataTable = async () => {
  try {
    const cars = await getCars();
    clearDataTable();
    if (cars.length > 0) {
      cars.forEach((car) => {
        const tr = document.createElement("tr");
        Object.entries(car).forEach((entry) => {
          tr.appendChild(elementsList[entry[0]].tdFunction(entry[1]));
        });
        const td = document.createElement("td");
        const button = document.createElement("button");
        button.innerText = "Excluir";
        button.addEventListener("click", (e) => {
          e.preventDefault();
          removeCar(car.plate);
        });
        td.appendChild(button);
        tr.appendChild(td);
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
