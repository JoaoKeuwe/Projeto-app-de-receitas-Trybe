import React, { useState, useEffect } from 'react';
import { mealID, drinkID } from '../Services/fetchID';
import IngredientMeasure from '../Services/IngredientMeasure';

export default function Details() {
  const [meal, setMeal] = useState();
  const [drink, setDrink] = useState();
  const [recipe, setRecipe] = useState([]);
  const [URLvideo, setURLvideo] = useState('');
  const [ingredients, setIngredients] = useState();
  // const [Measures, setMeasures] = useState();

  async function fetchConditional() {
    const url = window.location.href;
    if (url.includes('foods')) {
      const data = url.split('foods/');
      const idNum = data[1];
      const x = await mealID(idNum);
      const { meals } = x;
      setRecipe(meals);
      const arr = IngredientMeasure(meals);
      console.log(arr);
      setIngredients(arr);
      const ID = (meals[0].strYoutube);
      const split = ID.split('?v=');
      const idvideo = split[1];
      setURLvideo(idvideo);
      setMeal(meals);
    } if (url.includes('drinks')) {
      const data = url.split('drinks/');
      const idNum = data[1];
      const x = await drinkID(idNum);
      const { drinks } = x;
      const arr = IngredientMeasure(drinks);
      setIngredients(arr);
      setRecipe(drinks);
      setDrink(drinks);
    }
  }

  useEffect(() => {
    fetchConditional();
  }, []);

  return (
    <section>
      { drink !== undefined && recipe.map((data, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            alt="recipe"
            src={ data.strDrinkThumb }
          />

          <h2
            data-testid="recipe-title"
          >
            {data.strDrink}
          </h2>
          <button
            type="button"
            data-testid="share-btn"
          >
            compartilhar
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            favoritar
          </button>
          <p
            data-testid="recipe-category"
          >
            {data.strCategory}
            {data.strAlcoholic}
          </p>
          <ol>
            { ingredients && ingredients.map(({ ingredient, measure }, indexx) => (
              <li
                key={ indexx }
                data-testid={ `${indexx}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measure}`}
              </li>

            )) }
          </ol>
          <p
            data-testid="instructions"
          >
            { data.strInstructions }
          </p>
          <p
            data-testid={ `${index}-recomendation-card` }
          />
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => { console.log(ingredients); } }
          >
            Iniciar a Receita
          </button>
        </div>
      ))}
      {meal !== undefined && recipe.map((data, index) => (
        <div key={ index }>

          <img
            width="100px"
            data-testid="recipe-photo"
            alt="recipe"
            src={ data.strMealThumb }
          />

          <h2
            data-testid="recipe-title"
          >
            {data.strMeal}
          </h2>
          <button
            type="button"
            data-testid="share-btn"
          >
            compartilhar
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            favoritar
          </button>
          <p
            data-testid="recipe-category"
          >
            {data.strCategory}
            {data.strAlcoholic}
          </p>
          <ol>
            { ingredients && ingredients.map(({ ingredient, measure }, indexxx) => (
              <li
                key={ indexxx }
                data-testid={ `${indexxx}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measure}`}
              </li>

            )) }
          </ol>
          <p
            data-testid="instructions"
          >
            { data.strInstructions }
          </p>
          <p
            data-testid={ `${index}-recomendation-card` }
          />
          <iframe
            title="iframe"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${URLvideo}` }
          />
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => { console.log(ingredients); } }
          >
            Iniciar a Receita
          </button>
        </div>
      ))}

    </section>
  );
}
