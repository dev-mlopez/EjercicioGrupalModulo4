const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
const categoriesUrl = `${apiUrl}categories.php`;
const searchUrl = `${apiUrl}search.php?s=`;
async function getCategories() {
    try {
        const response = await fetch(categoriesUrl);
        const categories = await response.json();
        return categories.categories;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
    }
}
async function getRecipesByName(name) {
    try {
        const response = await fetch(`${searchUrl}${name}`);
        const recipes = await response.json();
        return recipes.meals;
    } catch (error) {
        console.error('Error al obtener recetas por nombre:', error);
    }
}
async function showRecipes(event) {
    event.preventDefault();
    const selectorCategoria = document.getElementById('selector-categoria');
    const selectedRecipe = selectorCategoria.value;
    const tarjetasRecetasContainer = document.getElementById('tarjetas-recetas');
    if (selectedRecipe) {
        const recipes = await getRecipesByName(selectedRecipe);
        tarjetasRecetasContainer.innerHTML = '';
        recipes.forEach((recipe) => {
            const cardHtml = `
                <div class="recipe-card">
                    <h2>${recipe.strMeal}</h2>
                    <p>${recipe.strInstructions}</p>
                </div>
            `;
            tarjetasRecetasContainer.innerHTML += cardHtml;
        });
    }
}
async function populateRecipeSelect() {
    const selectorCategoria = document.getElementById('selector-categoria');
    const categories = await getCategories();
    categories.forEach((category) => {
        const optionHtml = `
            <option value="${category.strCategory}">${category.strCategory}</option>
        `;
        selectorCategoria.innerHTML += optionHtml;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    populateRecipeSelect();
    const mostrarRecetasBtn = document.getElementById('mostrar-recetas-btn');
    mostrarRecetasBtn.addEventListener('click', showRecipes);
});