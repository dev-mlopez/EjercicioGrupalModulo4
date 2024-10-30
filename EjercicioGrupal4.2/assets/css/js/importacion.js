export default class Importacion {
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