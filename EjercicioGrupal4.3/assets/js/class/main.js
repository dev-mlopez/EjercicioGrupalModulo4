import { obtenerNombreEmpresa} from "./index.js";
import { verificarEmpresa } from "./empresa.js"
import { verificarImportacion, buscarEmpresaPorNombre } from "./importacion.js";

const d = document;

d.getElementById("agregar-empresa-btn").addEventListener("click", () => {
    verificarEmpresa(
        d.getElementById("nombreEmpresa").value, 
        d.getElementById("rutEmpresa").value);
})

d.getElementById("agregar-importacion-btn").addEventListener("click", () => {
    verificarImportacion(
        d.getElementById("nombreEmpresaRegistrada").value, 
        d.getElementById("nombreProducto").value, 
        d.getElementById("cantidadProductos").value, 
        d.getElementById("precioUnitario").value,
        d.getElementById("rubroImportacion").value,
        d.getElementById("tamanioImportador").value);
})

d.getElementById("mostrarImportacionesPorEmpresaBtn").addEventListener("click", () => {
    obtenerNombreEmpresa(
        buscarEmpresaPorNombre(d.getElementById("filtrarPorNombreEmpresa").value), 
        d.getElementById("filtrarPorNombreEmpresa").value);
})