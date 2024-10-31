import { obtenerListaRecetas, obtenerDatosRecetas } from "./app.js"

document.addEventListener("DOMContentLoaded", () => {
    obtenerListaRecetas();
})

document.getElementById("searchForm").addEventListener("submit", e => {
    obtenerDatosRecetas(document.getElementById("listaRecetas").value);
    e.preventDefault();
})