import "./style.css";

const app = document.querySelector('[data-js="app"]');

const textByStatus = {
  none: "Mostrar texto",
  "": "Escoder texto acima",
};

app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`;

const link = document.querySelector('[data-js="link"]');
link.innerHTML = textByStatus[app.style.display];

link.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    app.style.display = app.style.display === "none" ? "" : "none";
    link.innerHTML = textByStatus[app.style.display];
  },
  false
);
