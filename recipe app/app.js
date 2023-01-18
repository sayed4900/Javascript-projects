// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector("#search-btn");
const resultArea = document.querySelector(".result-area");

// set events
// let searchTerm = "Arrabiata";

searchBtn.addEventListener("click", getRecipes);

function getRecipes() {
    let searchTerm = searchInput.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;

    https: fetch(apiUrl)
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
        const data = getRecipeWithId(element.idMeal);
        console.log(data);
        resultArea.innerHTML += `
        <div class="card">
            <div class="card-img">
                <img src="${element.strMealThumb}" alt="" />
            </div>
            <div class="card-info">
                <h2>${element.strMeal}</h2>
                <a href="${data.strYoutube}">Get Recipe</a>
            </div>
        </div>`;
    });
}

async function getRecipeWithId(id) {
    try {
        const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}
