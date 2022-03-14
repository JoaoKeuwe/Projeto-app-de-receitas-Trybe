import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  drinksApiMonunt,
  drinksApiCategory,
  handleClickCategoryDrinks,
} from '../Services/drinksApi';
import Context from '../Context/context';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import '../styles/drink&food.css';

function Drinks() {
  const { recipes } = useContext(Context);
  const [drinksMount, setDrinksMount] = useState();
  const [redirectId, setRedirectId] = useState(false);
  const [drinkCategory, setDrinkCategory] = useState('');
  const [listDrinkCategory, setListDrinkCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [categoryState, setCategoryState] = useState('');

  function handleDrinkCategory() {
    drinksApiCategory().then((dataCategory) => setDrinkCategory(dataCategory.drinks));
  }

  function handleDrinks() {
    drinksApiMonunt().then((data) => setDrinksMount(data.drinks));
  }

  function handleClickButton(category) {
    setCategoryState(category);
    handleClickCategoryDrinks(category)
      .then((drink) => setListDrinkCategory(drink.drinks));
    setDrinksMount('');
    setToggle((prevState) => !prevState);
    if (categoryState === category && toggle === true) {
      handleDrinks();
    }
  }

  function handleButtonAll() {
    handleDrinks();
  }

  function handleRedirect() {
    if (recipes && recipes.length === 1) {
      return setRedirectId(true);
    }
  }
  const TWELVE = 12;
  const FIVE = 5;
  useEffect(() => {
    handleDrinks();
    handleDrinkCategory();
  }, []);
  useEffect(() => {
    handleRedirect();
    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  });
  function handleRecipeCard(drink, index) {
    return (
      <RecipeCard
        key={ drink.idDrink }
        index={ index }
        recipe={ drink }
        recipeType="drinks"
      />
    );
  }
  return (
    <div className="divMainFoods">
      <Header title="Drinks" />
      <div className="box">
        <button
          type="button"
          className="same"
          data-testid="All-category-filter"
          value="All"
          onClick={ () => handleButtonAll() }
        >
          All
        </button>
        { drinkCategory && drinkCategory.slice(0, FIVE).map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            className="same"
            data-testid={ `${strCategory}-category-filter` }
            value={ strCategory }
            onClick={ (e) => handleClickButton(e.target.value) }
          >
            { strCategory }
          </button>
        )) }
      </div>
      <div className="divFoods">
        { recipes && recipes.slice(0, TWELVE).map((drink, index) => (
          handleRecipeCard(drink, index)
        ))}
        { recipes === ''
          && drinksMount
          && drinksMount.slice(0, TWELVE).map((drink, index) => (
            handleRecipeCard(drink, index)
          ))}
        { listDrinkCategory && listDrinkCategory.slice(0, TWELVE).map((drink, index) => (
          handleRecipeCard(drink, index)
        ))}
        { redirectId && <Redirect to={ `/drinks/${recipes[0].idDrink}` } /> }
      </div>
    </div>
  );
}
export default Drinks;
