const apikey = "1787b0fe2b92e6bfcbe872b8af25f295";

document.getElementById("climaForm").addEventListener("submit", e => {
    obtenerDatos(document.getElementById("ciudad").value)
    e.preventDefault();
})

const obtenerDatos = async function (nombreCiudad) {
    try{
        const datosClima = await obtenerClima(nombreCiudad);
        alert(await generarMensaje());
        mostrarInfo(datosClima);
    } catch(error) {
        alert("La ciudad enviada no está disponible")
    }
}

const obtenerClima = async function (nombreCiudad) {
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${apikey}&lang=es`;

    try {
        const response = await fetch(urlApi);
        if(!response.ok){
            throw new Error("No se pudo obtener la información del clima")
        }

        const data = await response.json();
        return data;
    } catch(error) {
        document.getElementById("infoClima").innerHTML = `Hubo un error consultando el clima`;
    }
}

const generarMensaje = () => 
    new Promise(resolve => {
        setTimeout(() => {
            resolve('Información Enviada');
        }, 2000)
    });

const kelvinACelsius = kelvin => Math.trunc(kelvin - 273.15);

const mayuscula = texto => texto.charAt(0).toUpperCase() + texto.slice(1);

const mostrarInfo = data => {
    if (data.cod === 200) {
        const infoClima = document.querySelector(".infoClima");
        infoClima.classList.remove("noVisible");
        infoClima.innerHTML = `
            <div id="infoClimaTitulo">
                <h2>Clima en ${data.name}, ${data.sys.country}</h2>
            </div>
            <div id="infoClimaTemperatura">
                <div id="temperaturaActual">
                    <p>${kelvinACelsius(data.main.temp)}°C</p>
                </div>
                <div id="temperaturaMaxMin">
                    <p>${kelvinACelsius(data.main["temp_max"])}°</p>
                    <p>${kelvinACelsius(data.main["temp_min"])}°</p>
                </div>
            </div>
            <div id="infoClimaDescripcion">
                <p>${mayuscula(data.weather[0].description)}</p>
            </div>
            <ul id="infoClimaOtros">
                <li>
                    <p id="tituloOtros">Humedad:</p>
                    <p id="resultadoOtros">${data.main.humidity} %</p>
                </li>
                <li>
                    <p id="tituloOtros">Viento:</p>
                    <p id="resultadoOtros">${data.wind.speed} km/h</p>
                </li>
                <li>
                    <p id="tituloOtros">Presión:</p>
                    <p id="resultadoOtros">${data.main.pressure} mb</p>
                </li>
                <li>
                    <p id="tituloOtros">Nubosidad:</p>
                    <p id="resultadoOtros">${data.clouds.all} %</p>
                </li>
            </ul>
        `
    } else {
        document.getElementById("infoClima").innerHTML = `Hubo un error consultando el clima`;
    }
}