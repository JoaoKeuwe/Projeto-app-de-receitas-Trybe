import React, { useState, useEffect } from 'react';
import { mealID } from '../Services/fetchID';
import IngredientMeasure from '../Services/IngredientMeasure';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FoodsInProgress() {
  const [meal, setMeal] = useState();
  const [ingredients, setIngredients] = useState();
  const [idd, setIdd] = useState('');
  const [localSto, setLocalSto] = useState([]);
  const [update, setUpdate] = useState(0);
  const [copied, setCopied] = useState();
  const [favorite, setFavorite] = useState();
  const inProgress = localStorage.getItem('inProgressRecipes');
  const inFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  function verificationFavorite() {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (local) {
      const check = local.some((e) => e.id === idd);
      setFavorite(check);
    }
  }

  async function fetchConditional() {
    const url = window.location.href;
    if (url.includes('foods')) {
      const data = url.split('http://localhost:3000/foods/');
      const idNum = data[1].split('/in-progress');
      const meals = await mealID(idNum[0]);
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
  function clipURL() {
    const url = window.location.href;
    const newUrl = url.split('/in-progress');
    navigator.clipboard.writeText(newUrl[0]);
    setCopied(true);
  }

  const handleFavorite = () => {
    setFavorite(!favorite);
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const obj = {
      id: meal[0].idMeal,
      type: 'food',
      nationality: meal[0].strArea,
      category: meal[0].strCategory,
      alcoholicOrNot: '',
      name: meal[0].strMeal,
      image: meal[0].strMealThumb,
    };
    const va = local.some((as) => as.id === meal[0].idMeal);
    const vad = local.some((as) => as.id !== meal[0].idMeal);
    const arr = local.filter((as) => as.id !== meal[0].idMeal);
    if (local.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
    }
    if (vad) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
    }
    if (va) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...arr]));
    }
  };

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

  useEffect(() => {
    verificationFavorite();
  }, [idd]);
  useEffect(() => {
    if (inFavorite === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [inFavorite]);
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
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => clipURL() }
          >
            share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ handleFavorite }
            src={ favorite ? blackHeartIcon : whiteHearthIcon }
          >
            <img src={ favorite ? blackHeartIcon : whiteHearthIcon } alt="white Heart" />
          </button>
          {copied && (<span>Link copied!</span>)}
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
