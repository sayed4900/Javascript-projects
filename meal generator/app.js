const getMealBtn = document.getElementById("get_meal");

const mealContainer = document.getElementById("meal");

getMealBtn.addEventListener("click", async () => {
    //     fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    //         .then((res) => res.json())
    //         .then((res) => {
    //             createMeal(res.meals[0]);
    //         });

    try {
        const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        const data = await res.json();
        createMeal(data.meals[0]);
    } catch (error) {
        console.error(error);
    }
});
createMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal["strIngredient" + i] !== "")
            ingredients.push(
                `${meal["strMeasure" + i]} - ${meal["strIngredient" + i]}`
            );
        else break;
    }
    console.log(meal.strYoutube);
    mealContainer.innerHTML = `
        <div class="row">
            <div class="column five">
                <img src="${meal.strMealThumb}" alt="Meal Img" />
                <p><strong>Categort: </strong>${meal.strCategory}<p>
                <p><strong>Area: </strong>${meal.strArea}<p>
                <p><strong>Tags: </strong>${meal.strTags}<p>
                <h5>Ingredients</h5>
                <ul>
                    ${ingredients
                        .map(
                            (ing) => `
                        <li>${ing}</li>
                    `
                        )
                        .join("")}
                </ul>
            </div>
            <div class="column seven">
                <h4>${meal.strMeal}</h4>
                <p>${meal.strInstructions}</p>
            </div>
            <div class=""video-recipe>
                <h5>Video Recipe</h5>
                <div class="videoWrapper">
                     <iframe
                src="https://www.youtube.com/embed/${meal.strYoutube.slice(
                    -11
                )}"
                />; 
                </div>
            </div>
        </div>
    `;
};
{
}
