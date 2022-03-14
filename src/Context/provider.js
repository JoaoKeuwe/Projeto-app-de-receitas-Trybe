import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { mealID, drinkID } from '../Services/fetchID';
import { drinksApiMonunt } from '../Services/drinksApi';
import { foodsApiMount } from '../Services/ingredientsApi';
import IngredientMeasure from '../Services/IngredientMeasure';
import Context from './context';

function Provider({ children }) {
  const [fetchSearch, setFetchSearch] = useState('');
  const [fetchRadio, setFetchRadio] = useState('');
  const [recipes, setRecipes] = useState('');
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
  function handleRecipes(param) {
    if (param && Object.keys(param).includes('drinks')) {
      return setRecipes(param.drinks);
    }
    if (param && Object.keys(param).includes('meals')) {
      return setRecipes(param.meals);
    }
    return setRecipes(param);
  }

  function handleSearch(search) {
    return setFetchSearch(search);
  }
  function handleRadio(radio) {
    return setFetchRadio(radio);
  }
  const context = {
    handleRadio,
    handleSearch,
    handleRecipes,
    fetchConditional,
    fetchRadio,
    fetchSearch,
    recipes,
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
