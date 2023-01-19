// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector("#search-btn");
const resultArea = document.querySelector(".result-area");
const recipeDetails = document.querySelector(".recipe-details");
// set events
// let searchTerm = "Arrabiata";

searchBtn.addEventListener("click", getRecipes);

recipeDetails.addEventListener("click", closeRecipeDetails);
function getRecipes() {
    let searchTerm = searchInput.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;

    fetch(apiUrl)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            displayRecipes(data);
        });
}

function displayRecipes(recipes) {
    if (recipes.meals == null) {
        resultArea.innerHTML = "NO DATA";
        return;
    }

    resultArea.innerHTML = "";
    recipes.meals.forEach((element) => {
        resultArea.innerHTML += `
        <div class="card">
            <div class="card-img">
                <img src="${element.strMealThumb}" alt="" />
            </div>
            <div class="card-info">
                <h2>${element.strMeal}</h2>
                <a href="#" class="recipe-btn" data-id=${element.idMeal}>Get Recipe</a>
            </div>
        </div>`;
    });
}

resultArea.addEventListener("click", getRecipeDetails);

function getRecipeDetails(e) {
    if (e.target.classList.contains("recipe-btn")) {
        const id = e.target.getAttribute("data-id");

        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(apiUrl)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                displayRecipeDetails(data);
            });
    }
}

function displayRecipeDetails(recipeItem) {
    recipeDetails.classList.remove("showDetails");
    recipeDetails.innerHTML = "";
    recipeDetails.innerHTML = `
        <i class="fas fa-times"></i>
        <h2>${recipeItem.meals[0].strMeal}</h2>
        <p>Instructions:</p>
        <p>
            ${recipeItem.meals[0].strInstructions}
        </p>
        <a href="${recipeItem.meals[0].strYoutube}">Watch Video</a>
    `;
}

function closeRecipeDetails(e) {
    if (e.target.classList.contains("fa-times")) {
        recipeDetails.classList.add("showDetails");
    }
}
