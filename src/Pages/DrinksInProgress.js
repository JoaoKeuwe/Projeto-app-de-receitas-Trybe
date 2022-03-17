import React, { useState, useEffect } from 'react';
import { drinkID } from '../Services/fetchID';
import IngredientMeasure from '../Services/IngredientMeasure';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksInProgress() {
  const [drink, setDrink] = useState();
  const [ingredients, setIngredients] = useState();
  const [idd, setIdd] = useState('');
  const [localCocktails, setLocalCocktails] = useState([]);
  const [update, setUpdate] = useState(0);
  const [copied, setCopied] = useState();
  const [favorite, setFavorite] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
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
    if (url.includes('drinks')) {
      const data = url.split('http://localhost:3000/drinks/');
      const idNum = data[1].split('/in-progress');
      const drinks = await drinkID(idNum[0]);
      const arr = IngredientMeasure(drinks);
      setIngredients(arr);
      setDrink(drinks);
      setIdd(drinks[0].idDrink);
    }
  }
  function handleClick({ target }) {
    setUpdate(update + 1);
    let local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!local) local = { cocktails: {}, meals: {} };
    let arrayCocktails = local.cocktails[idd];
    if (!arrayCocktails) arrayCocktails = [];
    const check = arrayCocktails.some((e) => e === target.id);
    if (!check) {
      const newArray = [...arrayCocktails, target.id];
      local.cocktails[idd] = newArray;
      localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    }
    if (check) {
      const newArrayCocktails = arrayCocktails.filter((as) => as !== target.id);
      local.cocktails[idd] = newArrayCocktails;
      localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    }
    if (ingredients.length === localCocktails.length) {
      setIsDisabled(false);
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
      id: drink[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drink[0].strCategory,
      alcoholicOrNot: drink[0].strAlcoholic,
      name: drink[0].strDrink,
      image: drink[0].strDrinkThumb,
    };
    const va = local.some((as) => as.id === drink[0].idDrink);
    const vad = local.some((as) => as.id !== drink[0].idDrink);
    const arr = local.filter((as) => as.id !== drink[0].idDrink);
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
    if (inProgress) setLocalCocktails(Object.values(JSON.parse(inProgress).cocktails));
  }, [inProgress]);

  useEffect(() => {
    if (inProgress && update) {
      setLocalCocktails(Object.values(JSON.parse(inProgress).cocktails));
    }
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
          <button
            type="button"
            data-testid="share-btn"
            onClick={ clipURL }
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
                  <label htmlFor={ index }>
                    <input
                      id={ index }
                      type="checkbox"
                      onChange={ handleClick }
                      checked={ localCocktails.length > 0
                        && localCocktails[0].some((as) => Number(as) === index) }
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
            disabled={ isDisabled }
          >
            Finish Recipe
          </button>
        </div>
      )) }
    </div>
  );
}

export default DrinksInProgress;
