const obtenerNombreEmpresa = (empresa, nombreEmpresa) =>
    empresa 
        ? empresa.mostrarImportaciones()
        : alert(`La empresa ${nombreEmpresa} no existe`);

export {obtenerNombreEmpresa}