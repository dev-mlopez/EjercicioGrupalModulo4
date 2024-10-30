export default class Empresa {
    static contadorId = 0;

    constructor(nombre, rut) {
        this.idRegistro = Empresa.contadorId++;
        this.nombre = nombre;
        this.rut = rut;
        this.importaciones = [];
    }

    getIdRegistro = () => this.idRegistro;
    setIdRegistro = idRegistro => this.idRegistro = idRegistro;

    getNombre = () => this.nombre;
    setNombre = nombre => this.nombre = nombre;

    getRut = () => this.rut;
    setRut = rut => this.rut = rut;

    registrarImportacion = importacion => this.importaciones.push(importacion);

    obtenerTotalImportaciones = () => 
        this.importaciones.reduce((total, importacion) => 
            total + importacion.obtenerCostoTotal(), 0)

    mostrarImportaciones = () => {
        const listaImportacionesPorEmpresa = document.getElementById("importacionesLista");
        listaImportacionesPorEmpresa.innerHTML = "";
        const cabeceraTabla = document.createElement("tr");
        cabeceraTabla.innerHTML = `
            <th>Empresa</th>
            <th>ID Producto</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Valor por Unidad</th>
            <th>Valor por Cantidad</th>
        `
        listaImportacionesPorEmpresa.appendChild(cabeceraTabla);
        this.importaciones.forEach(importacion => {
            const datosImportacion = document.createElement("tr");
            datosImportacion.innerHTML = `
                <td>${this.getNombre()}</td>
                <td>${importacion.getIdImportacion()}</td>
                <td>${importacion.producto}</td>
                <td>${importacion.numeroProductos}</td>
                <td>$${importacion.precioUnitario}</td>
                <td>$${importacion.obtenerCostoTotal()}</td>
            `
            listaImportacionesPorEmpresa.appendChild(datosImportacion);
        })
        const pieTabla = document.createElement("tr");
        pieTabla.innerHTML = `
            <th colspan="5">Total</th>
            <td>$${this.obtenerTotalImportaciones()}</td>
        `
        listaImportacionesPorEmpresa.appendChild(pieTabla)
    }
}