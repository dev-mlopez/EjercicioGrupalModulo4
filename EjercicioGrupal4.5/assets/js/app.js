const idRecetas = new Map();

async function obtenerListaRecetas() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

    try {
        const response = await fetch(url);
        if(!response.ok) {
            const mensaje = `No fue posible acceder a la ruta: ${response.status}`;
            throw new Error(mensaje);
        }
        const recetas = await response.json();
        anadirRecetas(recetas.categories);
        listaRecetas(recetas.categories);
    } catch (error) {
        return error;
    }
}

const anadirRecetas = recetas => 
    recetas.forEach(receta => {
        idRecetas.set(receta.strCategory, receta.idCategory)
    });

const listaRecetas = recetas => {
    const listaRecetas = document.getElementById("listaRecetas");
    recetas.forEach(receta => {
        const opcion = document.createElement("option");
        opcion.value = receta.strCategory;
        opcion.textContent = receta.strCategory;
        listaRecetas.appendChild(opcion)
    })
}

async function obtenerDatosRecetas(opcion) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${opcion}`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            const mensaje = `No fue posible acceder a la ruta: ${response.status}`;
            throw new Error(mensaje);
        }

        const recetas = await response.json()  
        obtenerRecetas(recetas);      
    } catch (error) {
        return error;
    }
}

const obtenerRecetas = recetas => {
    const contenedorRecetas = document.getElementById("section__content");
    contenedorRecetas.innerHTML = "";
    if(recetas.meals === null) {
        alert(`No hay recetas disponibles.`);
    } else {
        recetas.meals.forEach(receta => {
            mostrarReceta(receta);
        })
    }
}

const mostrarReceta = receta => {
    const contenedorRecetas = document.getElementById("section__content"),
        recetaCard = document.createElement("div");
    recetaCard.classList.add("receta");
    recetaCard.innerHTML = `
        <div class="receta__img">
            <img src="${receta.strMealThumb}" alt="${receta.strMeal}">
        </div>
        <div class="receta__titulo">
            <p class="receta__titulo_texto">${receta.strMeal}</p>
        </div>
        <div class="receta__descripcion">
            <p class="receta__descripcion_texto">
                ${receta.strInstructions}
            </p>
        </div>
    `
    contenedorRecetas.appendChild(recetaCard);
}

export {obtenerListaRecetas, obtenerDatosRecetas};