import React, { useState, useEffect } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { mealID, drinkID } from '../Services/fetchID';
import { drinksApiMonunt } from '../Services/drinksApi';
import { foodsApiMount } from '../Services/ingredientsApi';
import IngredientMeasure from '../Services/IngredientMeasure';
import RecomendationCard from './RecomendationCard';
import '../styles/startRecipe.css';

export default function Details() {
  const [meal, setMeal] = useState();
  const [drink, setDrink] = useState();
  const [recipe, setRecipe] = useState([]);
  const [URLvideo, setURLvideo] = useState('');
  const [ingredients, setIngredients] = useState();
  const [recomendations, setRecomendations] = useState();
  const NUM = 6;

  // const [Measures, setMeasures] = useState();

  async function fetchConditional() {
    const url = window.location.href;
    if (url.includes('foods')) {
      const data = url.split('foods/');
      const idNum = data[1];
      const x = await mealID(idNum);
      const y = await drinksApiMonunt();
      const { drinks } = y;
      setRecomendations(drinks);
      const { meals } = x;
      setRecipe(meals);
      const arr = IngredientMeasure(meals);
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
      const y = await foodsApiMount();
      const { meals } = y;
      setRecomendations(meals);
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
            width="100px"
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
          <Carousel>
            {
              recomendations && recomendations.slice(0, NUM).map((rcard, rindex) => (
                <CarouselItem key={ rindex }>
                  <RecomendationCard
                    key={ rindex }
                    index={ rindex }
                    recipe={ rcard }
                  />
                </CarouselItem>
              ))
            }
          </Carousel>
          <button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => { console.log(ingredients); } }
          >
            Start Recipe
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
            className="name-category"
          >
            {data.strCategory}
            {data.strAlcoholic}
          </p>
          <ol className="test">
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
          <Carousel>
            {
              recomendations
              && recomendations.slice(0, (NUM)).map((rcardd, rindexx) => (
                <CarouselItem key={ rindexx }>
                  <RecomendationCard
                    key={ rindexx }
                    recipe={ rcardd }
                    index={ rindexx }
                  />
                </CarouselItem>
              ))
            }
          </Carousel>
          <iframe
            title="iframe"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${URLvideo}` }
          />
          <button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => { console.log(ingredients); } }
          >
            Start Recipe
          </button>
        </div>
      ))}

    </section>
  );
}
