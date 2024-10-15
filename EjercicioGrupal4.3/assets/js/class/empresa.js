import Empresa from "./class/empresaClass.js"
import listaEmpresas from "./listas/listaEmpresas.js";

const d = document;

const empresas = [], 
    infoEmpresas = new Map(),
    rutEmpresas = new Set();

const consultarRut = rut => 
    rutEmpresas.has(rut);

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

const agregarEmpresa = empresa => {
    rutEmpresas.add(empresa.getRut());
    empresas.push(empresa);
    infoEmpresas.set(empresa.getRut(), empresa.getIdRegistro());
    mostrarEmpresas();
}

const verificarEmpresa = (nombre, rut) => 
    consultarRut(rut)
        ? alert(`El rut ${rut} ya existe, no se puede volver a registrar una Empresa con este rut`)
        : agregarEmpresa(new Empresa(nombre, rut));

listaEmpresas.forEach(empresa => {
    verificarEmpresa(empresa.nombre, empresa.rut);
})

export {verificarEmpresa, empresas}