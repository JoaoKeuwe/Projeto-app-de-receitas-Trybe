import React, { useState, useEffect } from 'react';
import { mealID } from '../Services/fetchID';
import IngredientMeasure from '../Services/IngredientMeasure';

export default function FoodsInProgress() {
  const [meal, setMeal] = useState();
  const [ingredients, setIngredients] = useState();
  const [idd, setIdd] = useState('');
  const [localSto, setLocalSto] = useState([]);
  const inProgress = localStorage.getItem('inProgressRecipes');
  const [update, setUpdate] = useState(0);

  async function fetchConditional() {
    const url = window.location.href;
    if (url.includes('foods')) {
      const data = url.split('http://localhost:3000/foods/');
      const idNum = data[1].split('/in-progress');
      const apiMealId = await mealID(idNum[0]);
      const { meals } = apiMealId;
      const arrIngredientMeasure = IngredientMeasure(meals);
      setIngredients(arrIngredientMeasure);
      setMeal(meals);
      setIdd(meals[0].idMeal);
    }
  }

  function handleClick({ target }) {
    setUpdate(update + 1);
    let local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!local) local = { cocktails: {}, meals: {} };
    let arrayMeals = local.meals[idd];
    if (!arrayMeals) arrayMeals = [];
    const check = arrayMeals.some((e) => e === target.id);
    if (!check) {
      const newArrayMeals = [...arrayMeals, target.id];
      local.meals[idd] = newArrayMeals;
      localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    }
    if (check) {
      const filterArrayMeals = arrayMeals.filter((as) => as !== target.id);
      local.meals[idd] = filterArrayMeals;
      localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    }
  }

  useEffect(() => {
    fetchConditional();
    if (inProgress === null) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    }
    if (inProgress) setLocalSto(Object.values(JSON.parse(inProgress).meals));
  }, [inProgress]);

  useEffect(() => {
    if (inProgress && update) setLocalSto(Object.values(JSON.parse(inProgress).meals));
  }, [inProgress, update]);

  return (
    <div>
      { meal && meal.map((data) => (
        <div key={ data.idMeal }>
          <img
            width="100px"
            data-testid="recipe-photo"
            alt="recipe"
            src={ data.strMealThumb }
          />
          <h2 data-testid="recipe-title">
            {data.strMeal}
          </h2>
          <button type="button" data-testid="share-btn"> share </button>
          <button type="button" data-testid="favorite-btn"> favorite </button>
          <h3>Category</h3>
          <p data-testid="recipe-category">
            {data.strCategory }
          </p>
          <ol>
            { ingredients
            && ingredients
              .filter(({ ingredient, measure }) => ingredient !== '' && measure !== '')
              .map(({ ingredient, measure }, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <label htmlFor={ index }>
                    <input
                      id={ index }
                      type="checkbox"
                      value={ `${ingredient} - ${measure}` }
                      onChange={ handleClick }
                      checked={ localSto.length > 0
                        && localSto[0].some((as) => Number(as) === index) }
                    />
                    {`${ingredient} - ${measure}`}
                  </label>
                </li>
              )) }
          </ol>
          <h3>Instructions</h3>
          <p data-testid="instructions">
            { data.strInstructions }
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>
      )) }
    </div>
  );
}
