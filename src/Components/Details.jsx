import React, { useState, useEffect, useContext } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { mealID, drinkID } from '../Services/fetchID';
import { drinksApiMonunt } from '../Services/drinksApi';
import { foodsApiMount } from '../Services/ingredientsApi';
import IngredientMeasure from '../Services/IngredientMeasure';
import RecomendationCard from './RecomendationCard';
/* import shareIcon from '../images/shareIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg'; */
import '../styles/startRecipe.css';
import '../styles/doneRecipes.css';
import '../styles/carousel.css';
import Context from '../Context/context';

export default function Details() {
  const [meal, setMeal] = useState();
  const [drink, setDrink] = useState();
  const [recipe, setRecipe] = useState([]);
  const [URLvideo, setURLvideo] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [ingredients, setIngredients] = useState();
  const [recomendations, setRecomendations] = useState();
  const { sendDataRecipes } = useContext(Context);
  const NUM = 6;

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

  useEffect(() => { fetchConditional(); }, []);

  function toRedirect() {
    setRedirect(true);
    sendDataRecipes(drink, meal);
  }

  return (
    <section>
      { drink !== undefined && recipe.map((data, index) => (
        <div key={ index }>
          <img
            className="picture-recipe"
            data-testid="recipe-photo"
            alt="recipe"
            src={ data.strDrinkThumb }
          />

          <h2
            data-testid="recipe-title"
            className="name-recipe"
          >
            {data.strDrink}
          </h2>
          <button
            type="button"
            data-testid="share-btn"
          >
            share
          </button>
          <button type="button" data-testid="favorite-btn"> favorite </button>
          <h3>Category</h3>
          <p
            data-testid="recipe-category"
          >
            {data.strCategory}
            {<br /> }
            {data.strAlcoholic}
          </p>
          <h3>Ingredients and Measure</h3>
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
          <h3>Instructions</h3>
          <p data-testid="instructions">
            { data.strInstructions }
          </p>
          <h3>Recomendations</h3>
          <Carousel>
            {recomendations && recomendations.slice(0, NUM).map((rcard, rindex) => (
              <CarouselItem key={ rindex } className="carousel">
                <RecomendationCard key={ rindex } index={ rindex } recipe={ rcard } />
              </CarouselItem>
            ))}
          </Carousel>
          <button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ toRedirect }
          >
            Start Recipe
          </button>
          <button
            className="done-recipe"
            type="button"
            data-testid="done-recipe-btn"
            onClick={ () => {
              localStorage.setItem('doneRecipes', JSON.stringify([{
                id: data.idDrink,
                type: 'Drink',
                nationality: data.strArea,
                category: data.strCategory,
                alcoholicOrNot: data.strAlcoholic,
                name: data.strDrink,
                image: data.strDrinkThumb,
                doneDate: data.dateModified,
                tags: data.strTags,
              }]));
            } }
          >
            Done Recipe
          </button>
          {redirect && <Redirect to={ `/drinks/${data.idDrink}/in-progress` } /> }
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
          <h2 data-testid="recipe-title">
            {data.strMeal}
          </h2>
          <button type="button" data-testid="share-btn"> share </button>
          <button type="button" data-testid="favorite-btn"> favorite </button>
          <h3>Category</h3>
          <p data-testid="recipe-category">
            {data.strCategory }
          </p>
          <h3>Ingredients and Measure</h3>
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
          <h3>Instructions</h3>
          <p data-testid="instructions">
            { data.strInstructions }
          </p>
          <h3>recomendations</h3>
          <Carousel>
            {recomendations
              && recomendations.slice(0, (NUM)).map((rcardd, ind) => (
                <CarouselItem key={ ind } className="carousel">
                  <RecomendationCard key={ ind } recipe={ rcardd } index={ ind } />
                </CarouselItem>
              ))}
          </Carousel>
          <h3>Video:</h3>
          <iframe
            className="video"
            title="iframe"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${URLvideo}` }
          />
          <button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ toRedirect }
          >
            Start Recipe
          </button>
          <button
            className="done-recipe"
            type="button"
            data-testid="done-recipe-btn"
            onClick={ () => {
              localStorage.setItem('doneRecipes', JSON.stringify([{
                id: data.idMeal,
                type: 'Food',
                nationality: data.strArea,
                category: data.strCategory,
                alcoholicOrNot: data.strAlcoholic,
                name: data.strMeal,
                image: data.strMealThumb,
                doneDate: data.dateModified,
                tags: data.strTags,
              }]));
            } }
          >
            Done Recipe
          </button>
          {redirect && <Redirect to={ `/foods/${data.idMeal}/in-progress` } /> }
        </div>
      ))}
    </section>
  );
}
