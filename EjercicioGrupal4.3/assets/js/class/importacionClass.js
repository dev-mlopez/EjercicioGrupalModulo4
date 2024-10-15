class Importacion {
    static contadorId = 0;

    constructor(producto, numeroProductos, precioUnitario) {
        this.idImportacion = Importacion.contadorId++;
        this.producto = producto;
        this.numeroProductos = numeroProductos;
        this.precioUnitario = precioUnitario;
    }

    getIdImportacion = () => this.idImportacion;
    setIdImportacion = idImportacion => this.idImportacion = idImportacion;

    getProducto = () => this.producto;
    setProducto = producto => this.producto = producto;

    getNumeroProductos = () => this.numeroProductos;
    setNumeroProductos = numeroProductos => this.numeroProductos = numeroProductos;

    getPrecioUnitario = () => this.precioUnitario;
    setPrecioUnitario = precioUnitario => this.precioUnitario = precioUnitario;

    obtenerCostoTotal = () => this.numeroProductos * this.precioUnitario;
}

export default class ImportacionExtendida extends Importacion {
    constructor(producto, numeroProductos, precioUnitario, rubroImportacion, tamanioImportador) {
        super(producto, numeroProductos, precioUnitario)
        this.rubroImportacion = rubroImportacion;
        this.tamanioImportador = (tamanioImportador === "pequenio") 
            ? this.tamanioImportador = "Pequeño" 
            : (tamanioImportador === "mediano") 
            ? this.tamanioImportador = "Mediano" 
            : (tamanioImportador === "grande") 
            ? this.tamanioImportador = "Grande" 
            : this.tamanioImportador = null;
    }

    getRubroImportacion = () => this.rubroImportacion;
    setRubroImportacion = rubroImportacion => this.rubroImportacion = rubroImportacion;

    getTamanioImportador = () => this.tamanioImportador;
    setTamanioImportador = tamanioImportador => this.tamanioImportador = tamanioImportador;
}