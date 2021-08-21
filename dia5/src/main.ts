import "./style.css";
import { get, post, del, requestData } from "./http";

const url = "http://localhost:3333/cars";
const form = document.querySelector('[data-js="cars-form"]');
const table = document.querySelector<HTMLTableElement>('[data-js="table"]');

if (form === null) {
  throw new Error("Invalid Form");
}

if (table === null) {
  throw new Error("Invalid Table");
}

const getFormElement = (event: Event) => (elementName: string) => {
  if (event.target === null) {
    throw new Error("Invalid event");
  }
  const formTemp = event.target as HTMLFormElement;

  return formTemp.elements.namedItem(elementName) as HTMLInputElement;
};

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
};

type createImageType = {
  src: string;
  alt: string;
};

function createImage(data: createImageType) {
  const td = document.createElement("td");
  const img = document.createElement("img");
  img.src = data.src;
  img.alt = data.alt;
  img.width = 100;
  td.appendChild(img);
  return td;
}

function createText(value: string) {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
}

function createColor(value: string) {
  const td = document.createElement("td");
  const div = document.createElement("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.background = value;
  td.appendChild(div);
  return td;
}

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const getElement = getFormElement(e);

  const data = {
    image: getElement("image").value,
    brandModel: getElement("brand-model").value,
    year: getElement("year").value,
    plate: getElement("plate").value,
    color: getElement("color").value,
  };

  const result = await post(url, data);

  if (result.error) {
    console.log("deu erro na hora de cadastrar", result.message);
    return;
  }

  const noContent = document.querySelector('[data-js="no-content"]');
  if (noContent) {
    table.removeChild(noContent);
  }

  createTableRow(data);

  if (e.target === null) {
    throw new Error("Invalid event");
  }

  const formToReset = e.target as HTMLFormElement;
  formToReset.reset();
  getElement("image").focus();
});

function createTableRow(data: requestData) {
  if (table === null) {
    throw new Error("Invalid Table");
  }
  const elements = [
    { type: "image", value: { src: data.image, alt: data.brandModel } },
    { type: "text", value: data.brandModel },
    { type: "text", value: data.year },
    { type: "text", value: data.plate },
    { type: "color", value: data.color },
  ];

  const tr = document.createElement("tr");
  tr.dataset.plate = data.plate;
  elements.forEach((element) => {
    if (element?.value === "null" || element.value === undefined) {
      throw new Error("");
    }
    const td = (
      elementTypes as {
        [key: string]:
          | typeof createImage
          | typeof createText
          | typeof createColor;
      }
    )[element.type](element.value);

    tr.appendChild(td);
  });

  const button = document.createElement("button");
  button.textContent = "Excluir";
  button.dataset.plate = data.plate;

  button.addEventListener("click", handleDelete);

  tr.appendChild(button);

  table.appendChild(tr);
}

async function handleDelete(e: Event) {
  if (table === null) {
    throw new Error("Invalid Table");
  }

  const button = e.target as HTMLButtonElement;

  if (button === null) {
    throw new Error("Invalid Button");
  }

  const plate = button.dataset.plate as string;

  const result = await del(url, { plate });

  if (result.error) {
    console.log("erro ao deletar", result.message);
    return;
  }

  const tr = document.querySelector<HTMLTableRowElement>(
    `tr[data-plate="${plate}"]`
  );

  if (tr === null) {
    throw new Error("Invalid Table Row");
  }
  table.removeChild(tr);
  button.removeEventListener("click", handleDelete);

  const allTrs = table.querySelector("tr");
  if (!allTrs) {
    createNoCarRow();
  }
}

function createNoCarRow() {
  if (table === null) {
    throw new Error("Invalid Table");
  }

  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const thsLength = document.querySelectorAll("table th");

  td.setAttribute("colspan", thsLength.length.toString());
  td.textContent = "Nenhum carro encontrado";

  tr.dataset.js = "no-content";
  tr.appendChild(td);
  table.appendChild(tr);
}

async function main() {
  const result = await get(url);

  if (result.error) {
    console.log("Erro ao buscar carros", result.message);
    return;
  }

  if (result.length === 0) {
    createNoCarRow();
    return;
  }

  result.forEach(createTableRow);
}

main();
