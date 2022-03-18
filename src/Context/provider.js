import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import { mealID, drinkID } from '../Services/fetchID';
import { drinksApiMonunt } from '../Services/drinksApi';
import { foodsApiMount } from '../Services/ingredientsApi';
import IngredientMeasure from '../Services/IngredientMeasure';

function Provider({ children }) {
  const [fetchSearch, setFetchSearch] = useState('');
  const [fetchRadio, setFetchRadio] = useState('');
  const [recipes, setRecipes] = useState('');
  const [filterIngredients, setFilterIngredients] = useState([]);
  console.log(filterIngredients);
  const [meal, setMeal] = useState();
  const [drink, setDrink] = useState();
  const [id, setID] = useState();
  const [URLvideo, setURLvideo] = useState('');
  const [ingredients, setIngredients] = useState();
  const [recomendations, setRecomendations] = useState();

  async function fetchConditional() {
    const url = window.location.href;
    if (url.includes('foods')) {
      const data = url.split('foods/');
      const idNum = data[1];
      setID(idNum);
      const meals = await mealID(idNum);
      const y = await drinksApiMonunt();
      const { drinks } = y;
      setRecomendations(drinks);
      const arr = IngredientMeasure(meals);
      setIngredients(arr);
      const ID = meals[0].strYoutube.split('?v=');
      setURLvideo(ID[1]);
      setMeal(meals);
    }
    if (url.includes('drinks')) {
      const data = url.split('drinks/');
      const idNum = data[1];
      setID(idNum);
      const drinks = await drinkID(idNum);
      const y = await foodsApiMount();
      const { meals } = y;
      setRecomendations(meals);
      const arr = IngredientMeasure(drinks);
      setIngredients(arr);
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
    meal,
    drink,
    id,
    URLvideo,
    ingredients,
    recomendations,
    filterIngredients,
    setFilterIngredients,
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
