import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { drinkID } from '../Services/fetchID';
import { handleFavorite, handleDoneRecipes } from '../Helpers/index';
import IngredientMeasure from '../Services/IngredientMeasure';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksInProgress() {
  const [drink, setDrink] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [idd, setIdd] = useState('');
  const [localCocktails, setLocalCocktails] = useState([]);
  const [update, setUpdate] = useState(0);
  const [copied, setCopied] = useState();
  const [favorite, setFavorite] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [cocktailsMaisId, setCocktailsMaisId] = useState([]);
  const inProgress = localStorage.getItem('inProgressRecipes');
  const inFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const newArr = arr
        .filter(({ ingredient, measure }) => ingredient !== '' && measure !== '');
      setIngredients(newArr);
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
  }
  function clipURL() {
    const url = window.location.href;
    const newUrl = url.split('/in-progress');
    navigator.clipboard.writeText(newUrl[0]);
    setCopied(true);
  }

  const history = useHistory();
  function handleOnRecipe() {
    handleDoneRecipes(drink);
    history.push('/done-recipes');
  }

  useEffect(() => {
    fetchConditional();
    if (inProgress === null) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    }
    if (inProgress) {
      setLocalCocktails(Object.values(JSON.parse(inProgress).cocktails));
      setCocktailsMaisId(JSON.parse(inProgress).cocktails[idd]);
    }
  }, [inProgress, idd]);

  useEffect(() => {
    if (inProgress && update) {
      setLocalCocktails(Object.values(JSON.parse(inProgress).cocktails));
      setCocktailsMaisId(JSON.parse(inProgress).cocktails[idd]);
    }
  }, [inProgress, update, idd]);
  useEffect(() => {
    verificationFavorite();
  }, [idd, verificationFavorite]);

  useEffect(() => {
    if (inFavorite === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [inFavorite]);

  useEffect(() => {
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, [doneRecipes]);

  useEffect(() => {
    if (cocktailsMaisId && cocktailsMaisId.length) {
      setIsDisabled(false);
    }
    if (cocktailsMaisId && cocktailsMaisId.length !== ingredients.length) {
      setIsDisabled(true);
    }
  }, [cocktailsMaisId, ingredients]);

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
            onClick={ () => handleFavorite(setFavorite, favorite, drink) }
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
            onClick={ () => handleOnRecipe() }
          >
            Finish Recipe
          </button>
        </div>
      )) }
    </div>
  );
}

export default DrinksInProgress;
