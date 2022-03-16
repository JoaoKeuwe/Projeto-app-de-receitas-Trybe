import React, { useState, useEffect } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { mealID, drinkID } from '../Services/fetchID';
import { drinksApiMonunt } from '../Services/drinksApi';
import { foodsApiMount } from '../Services/ingredientsApi';
import IngredientMeasure from '../Services/IngredientMeasure';
import RecomendationCard from './RecomendationCard';
import SavFavRecipes from '../Services/SavFavRecipes';
import shareIcon from '../images/shareIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import '../styles/startRecipe.css';
import '../styles/doneRecipes.css';
import '../styles/carousel.css';

export default function Details() {
  const [meal, setMeal] = useState();
  const [drink, setDrink] = useState();
  const [name, setName] = useState();
  const [URLvideo, setURLvideo] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [ingredients, setIngredients] = useState();
  const [recomendations, setRecomendations] = useState();
  const NUM = 6;
  const SR = 'Start Recipe';

  async function fetchConditional() {
    const url = window.location.href;
    if (url.includes('foods')) {
      const data = url.split('foods/');
      const idNum = data[1];
      const meals = await mealID(idNum);
      const y = await drinksApiMonunt();
      const { drinks } = y;
      setRecomendations(drinks);
      const arr = IngredientMeasure(meals);
      setIngredients(arr);
      const ID = (meals[0].strYoutube).split('?v=');
      setURLvideo(ID[1]);
      setMeal(meals);
    } if (url.includes('drinks')) {
      const data = url.split('drinks/');
      const idNum = data[1];
      const drinks = await drinkID(idNum);
      const y = await foodsApiMount();
      const { meals } = y;
      setRecomendations(meals);
      const arr = IngredientMeasure(drinks);
      setIngredients(arr);
      setDrink(drinks);
    }
  }

  useEffect(() => { fetchConditional(); }, []);

  function changeButton() {
    const getProcess = localStorage.getItem('inProgressRecipes');
    const url = window.location.href;
    setName(SR);
    if (getProcess === null) return false;
    if (url.includes('drinks')) {
      const data = url.split('drinks/');
      const idPage = data[1];
      const condition = getProcess.includes(idPage);
      if (condition) {
        setName('Continue Recipe');
      } if (!condition) {
        setName(SR);
      }
    } if (url.includes('foods')) {
      const data = url.split('foods/');
      const idPage = data[1];
      const condition = getProcess.includes(idPage);
      if (condition) {
        setName('Continue Recipe');
      } if (!condition) {
        setName(SR);
      }
    }
  }

  useEffect(() => { changeButton(); });

  function clipURL() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    global.alert('Link copied!');
  }

  function toRedirect() {
    setRedirect(true);
  }

  return (
    <section>
      { drink !== undefined && drink.map((data, index) => (
        <div key={ index }>
          <img
            className="picture-recipe"
            data-testid="recipe-photo"
            alt="recipe"
            src={ data.strDrinkThumb }
          />
          <h2 data-testid="recipe-title" className="name-recipe">{data.strDrink}</h2>
          <div className="icons-details">
            <button
              type="button"
              data-testid="share-btn"
              onClick={ clipURL }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => SavFavRecipes(data) }
              src={ whiteHearthIcon }
            >
              <img src={ whiteHearthIcon } alt="white Heart" />
            </button>
          </div>
          <h3>Category</h3>
          <p data-testid="recipe-category">
            {data.strCategory}
            {data.strAlcoholic}
          </p>
          <ol>
            { ingredients
            && ingredients.filter(
              ({ ingredient, measure }) => ingredient !== '' && measure !== '',
            ).map(
              ({ ingredient, measure }, indexx) => (
                <li
                  key={ indexx }
                  data-testid={ `${indexx}-ingredient-name-and-measure` }
                >
                  {`${ingredient} - ${measure}`}
                </li>
              ),
            ) }
          </ol>
          <p data-testid="instructions">{ data.strInstructions }</p>
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
            {name}
          </button>
          {redirect && <Redirect to={ `/drinks/${data.idDrink}/in-progress` } /> }
        </div>
      ))}
      {meal !== undefined && meal.map((data, index) => (
        <div key={ index }>
          <img
            width="100px"
            data-testid="recipe-photo"
            alt="recipe"
            src={ data.strMealThumb }
          />
          <h2 data-testid="recipe-title">{data.strMeal}</h2>
          <hr className="hr" />
          <div className="icons-details">
            <button
              type="button"
              data-testid="share-btn"
              src={ shareIcon }
              onClick={ clipURL }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => SavFavRecipes(data) }
              src={ whiteHearthIcon }
            >
              <img src={ whiteHearthIcon } alt="heartIcon" />
            </button>
          </div>
          <p data-testid="recipe-category" className="name-category">
            {data.strCategory}
            {data.strAlcoholic}
          </p>
          <ol>
            { ingredients
            && ingredients.filter(
              ({ ingredient, measure }) => ingredient !== '' && measure !== '',
            ).map(
              ({ ingredient, measure }, indexxx) => (
                <li
                  key={ indexxx }
                  data-testid={ `${indexxx}-ingredient-name-and-measure` }
                >
                  {`${ingredient} - ${measure}`}
                </li>
              ),
            ) }
          </ol>
          <p data-testid="instructions">{ data.strInstructions }</p>
          <Carousel>
            {recomendations
              && recomendations.slice(0, (NUM)).map((rcardd, ind) => (
                <CarouselItem key={ ind } className="carousel">
                  <RecomendationCard key={ ind } recipe={ rcardd } index={ ind } />
                </CarouselItem>
              ))}
          </Carousel>
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
            {name}
          </button>
          {redirect && <Redirect to={ `/foods/${data.idMeal}/in-progress` } /> }
        </div>
      ))}
    </section>
  );
}
