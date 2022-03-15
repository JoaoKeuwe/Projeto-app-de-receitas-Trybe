import React, { useState, useEffect } from 'react';
import { drinkID } from '../Services/fetchID';
import IngredientMeasure from '../Services/IngredientMeasure';

function DrinksInProgress() {
  const [drink, setDrink] = useState();
  const [ingredients, setIngredients] = useState();

  async function fetchConditional() {
    const url = window.location.href;
    if (url.includes('drinks')) {
      const data = url.split('http://localhost:3000/drinks/');
      const idNum = data[1].split('/in-progress');
      const x = await drinkID(idNum[0]);
      const { drinks } = x;
      const arr = IngredientMeasure(drinks);
      setIngredients(arr);
      setDrink(drinks);
    }
  }

  useEffect(() => { fetchConditional(); }, []);

  return (
    <div>
      { drink && drink.map((data) => (
        <div key={ data.idDrink }>
          <img
            width="100px"
            data-testid="recipe-photo"
            alt="recipe"
            src={ data.strDrinkThumb }
          />
          <h2 data-testid="recipe-title">
            {data.strDrink}
          </h2>
          <button type="button" data-testid="share-btn"> share </button>
          <button type="button" data-testid="favorite-btn"> favorite </button>
          <h3>Category</h3>
          <p data-testid="recipe-category">
            {data.strCategory }
          </p>
          <p>
            {data.strAlcoholic}
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

export default DrinksInProgress;
