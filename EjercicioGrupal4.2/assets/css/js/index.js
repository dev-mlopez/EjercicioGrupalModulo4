import Importacion from "./importacion.js";
import Empresa from "./empresa.js"

const d = document;

const empresas = [],
    importaciones = [],
    infoEmpresas = new Map(),
    rutEmpresas = new Set();

const empresasDefecto = [
        {
            nombre: "Lider",
            rut: "202"
        },
        {
            nombre: "Tottus",
            rut: "20-4"
        },
        {
            nombre: "Santa Isabel",
            rut: "903-6"
        },
        {
            nombre: "Jumbo",
            rut: "145-3"
        },
        {
            nombre: "Mercado Libre",
            rut: "248"
        },
    ],
    importacionesDefecto = [
        {
            nombreEmpresa: "Lider",
            producto: "Leche",
            numeroProductos: 9,
            precioUnitario: 950
        },
        {
            nombreEmpresa: "Santa Isabel",
            producto: "Arroz",
            numeroProductos: 5,
            precioUnitario: 900
        },
        {
            nombreEmpresa: "Tottus",
            producto: "Fideos",
            numeroProductos: 4,
            precioUnitario: 800
        },
        {
            nombreEmpresa: "Lider",
            producto: "Arroz",
            numeroProductos: 4,
            precioUnitario: 1150
        },
        {
            nombreEmpresa: "Mercado Libre",
            producto: "Bicicleta",
            numeroProductos: 7,
            precioUnitario: 300000
        },
    ];

const mostrarEmpresas = () => {
    const listaEmpresas = d.getElementById("empresasLista");
    listaEmpresas.innerHTML = '';
    const cabeceraTabla = d.createElement("tr");
    cabeceraTabla.innerHTML = `
        <th>ID</th>
        <th>Nombre</th>
        <th>Rut</th>
    `
    listaEmpresas.appendChild(cabeceraTabla);
    empresas.forEach((empresa => {
        const datosEmpresa = d.createElement("tr");
        datosEmpresa.innerHTML = `
            <td>${empresa.getIdRegistro()}</td>
            <td>${empresa.getNombre()}</td>
            <td>${empresa.getRut()}</td>
        `
        listaEmpresas.appendChild(datosEmpresa);
    }))
}

const mostrarImportaciones = () => {
    const listaImportaciones = d.getElementById("importacionesLista");
    listaImportaciones.innerHTML = "";
    const cabeceraTabla = d.createElement("tr");
    cabeceraTabla.innerHTML = `
        <th>Empresa</th>
        <th>Producto</th>
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
            <td>${importacion.importacion.numeroProductos}</td>
            <td>$${importacion.importacion.precioUnitario}</td>
            <td>$${importacion.importacion.obtenerCostoTotal()}</td>
        `
        listaImportaciones.appendChild(datosImportacion);
    })
}

const consultarRut = rut => 
    rutEmpresas.has(rut);

const verificarEmpresa = (nombre, rut) => 
    consultarRut(rut)
        ? alert(`El rut ${rut} ya existe, no se puede volver a registrar una Empresa con este rut`)
        : agregarEmpresa(new Empresa(nombre, rut));

const agregarEmpresa = empresa => {
    rutEmpresas.add(empresa.getRut());
    empresas.push(empresa);
    infoEmpresas.set(empresa.getRut(), empresa.getIdRegistro());
    mostrarEmpresas();
}

const buscarEmpresaPorNombre = (nombre) => empresas.find(empresa => empresa.nombre === nombre);

const verificarImportacion = (nombreEmpresa, nombreProducto, numeroProductos, precioUnitario) =>
    buscarEmpresaPorNombre(nombreEmpresa)
        ? agregarImportacion(nombreEmpresa, new Importacion(nombreProducto, numeroProductos, precioUnitario))
        : alert(`La empresa ${nombreEmpresa} no existe.`);

const agregarImportacion = (nombreEmpresa, importacion) => {
    importaciones.push({nombreEmpresa, importacion});
    let empresa = buscarEmpresaPorNombre(nombreEmpresa)
    empresa.registrarImportacion(importacion);
    mostrarImportaciones();
}

const obtenerNombreEmpresa = (empresa, nombreEmpresa) =>
    empresa 
        ? empresa.mostrarImportaciones()
        : alert(`La empresa ${nombreEmpresa} no existe`);

empresasDefecto.forEach(empresa => {
    verificarEmpresa(empresa.nombre, empresa.rut);
})

importacionesDefecto.forEach((importacion) => {
    agregarImportacion(
        importacion.nombreEmpresa, 
        new Importacion(
            importacion.producto, 
            importacion.numeroProductos, 
            importacion.precioUnitario
        ));
})

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
        d.getElementById("precioUnitario").value);
})

d.getElementById("mostrarImportacionesPorEmpresaBtn").addEventListener("click", () => {
    obtenerNombreEmpresa(
        buscarEmpresaPorNombre(d.getElementById("filtrarPorNombreEmpresa").value), d.getElementById("filtrarPorNombreEmpresa").value);
})