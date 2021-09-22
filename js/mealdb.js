const searchBtn = document.getElementById('button-search');
const searchInput = document.getElementById('search-field');

searchInput.addEventListener("keypress", function (event) {
   // event.preventDefault();
   //console.log('key triggered' ,event.key);
    if (event.key == 'Enter') 
        {  
           // console.log('key triggered inside');
            searchBtn.click();
        }
});


document.getElementById('error-messege').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';

    document.getElementById('error-messege').style.display = 'none';

    const emptyText = document.getElementById('empty-text');
    emptyText.textContent = '';
    if (searchText == '') {
        const p = document.createElement('p');
        p.innerText = `Please write something to display
       `;
        p.style.fontSize = '30px';
        p.style.color = 'red';
        p.style.textAlign = 'center';
        emptyText.appendChild(p);
    }
    else {
        //load Data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));
    }
}
const displayError = error => {
    document.getElementById('error-messege').style.display = 'block';
}

const displaySearchResult = meals => {

    const searchResult = document.getElementById('search-result');

    //clear previuos search data
    //searchResult.innerHTML = '';
    searchResult.textContent = '';

    meals.forEach(meal => {

        //console.log(meal);

        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
       <div onclick="loadMealDetail('${meal.idMeal}')" class="card h-100">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>`;
        searchResult.appendChild(div);

    });
}


const loadMealDetail = mealId => {
    //console.log(mealId);

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))

}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
   <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">${meal.strMeal}</h5>
     <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
     <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
   </div>
   `;
    mealDetails.appendChild(div);

}