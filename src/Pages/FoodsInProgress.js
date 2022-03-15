import React, { useState, useEffect } from 'react';
import { mealID } from '../Services/fetchID';
import IngredientMeasure from '../Services/IngredientMeasure';

export default function FoodsInProgress() {
  const [meal, setMeal] = useState();
  const [ingredients, setIngredients] = useState();

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
    }
  }

  useEffect(() => { fetchConditional(); }, []);
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
                  {`${ingredient} - ${measure}`}
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
