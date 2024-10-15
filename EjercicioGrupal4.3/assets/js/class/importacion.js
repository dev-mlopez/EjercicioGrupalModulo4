import ImportacionExtendida from "./class/importacionClass.js";
import listaImportaciones from "./listas/listaImportaciones.js"
import { empresas } from "./empresa.js";

const d = document;

const importaciones = [];

const buscarEmpresaPorNombre = nombre => empresas.find(empresa => empresa.nombre === nombre);

const verificarImportacion = (nombreEmpresa, nombreProducto, numeroProductos, precioUnitario, rubroImportacion, tamanioImportador) =>
    buscarEmpresaPorNombre(nombreEmpresa)
        ? agregarImportacion(nombreEmpresa, new ImportacionExtendida(nombreProducto, numeroProductos, precioUnitario, rubroImportacion, tamanioImportador))
        : alert(`La empresa ${nombreEmpresa} no existe.`);

const agregarImportacion = (nombreEmpresa, importacion) => {
    importaciones.push({nombreEmpresa, importacion});
    let empresa = buscarEmpresaPorNombre(nombreEmpresa)
    empresa.registrarImportacion(importacion);
    mostrarImportaciones();
}

const mostrarImportaciones = () => {
    const listaImportaciones = d.getElementById("importacionesLista");
    listaImportaciones.innerHTML = "";
    const cabeceraTabla = d.createElement("tr");
    cabeceraTabla.innerHTML = `
        <th>Empresa</th>
        <th>Producto</th>
        <th>Rubro de Importación</th>
        <th>Tamaño de Importador</th>
        <th>Cantidad</th>
        <th>Valor por Unidad</th>
        <th>Valor por Cantidad</th>
    `
    listaImportaciones.appendChild(cabeceraTabla);
    importaciones.forEach((importacion) => {
        const datosImportacion = d.createElement("tr");
        datosImportacion.innerHTML = `
            <td>${importacion.nombreEmpresa}</td>
            <td>${importacion.importacion.producto}</td>
            <td>${importacion.importacion.rubroImportacion}</td>
            <td>${importacion.importacion.tamanioImportador}</td>
            <td>${importacion.importacion.numeroProductos}</td>
            <td>$${importacion.importacion.precioUnitario}</td>
            <td>$${importacion.importacion.obtenerCostoTotal()}</td>
        `
        listaImportaciones.appendChild(datosImportacion);
    })
}

listaImportaciones.forEach((importacion) => {
    agregarImportacion(
        importacion.nombreEmpresa, 
        new ImportacionExtendida(
            importacion.producto, 
            importacion.numeroProductos, 
            importacion.precioUnitario,
            importacion.rubroImportacion,
            importacion.tamanioImportador
        ));
})

export {verificarImportacion, buscarEmpresaPorNombre};