import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context/context';
import Header from '../Components/Header';
import {
  foodsApiMount,
  foodsApiCategory,
  handleClickCategory,
} from '../Services/ingredientsApi';
import RecipeCard from '../Components/RecipeCard';

export default function Foods() {
  const { recipes } = useContext(Context);
  const [foodsMount, setFoodsMount] = useState();
  const [redirectId, setRedirectId] = useState(false);
  const [foodCategory, setFoodCategory] = useState('');
  const [listFoodOfCategory, setListFoodOfCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [categoryState, setCategoryState] = useState('');

  function handleFoodCategory() {
    foodsApiCategory().then((dataCategory) => setFoodCategory(dataCategory.meals));
  }

  function handleFoods() {
    foodsApiMount().then((data) => setFoodsMount(data.meals));
  }

  function handleClickButton(category) {
    setCategoryState(category);
    handleClickCategory(category).then((food) => setListFoodOfCategory(food.meals));
    setFoodsMount('');
    setToggle((prevState) => !prevState);
    if (categoryState === category && toggle === true) {
      handleFoods();
    }
  }

  function handleRedirect() {
    if (recipes && recipes.length === 1) {
      return setRedirectId(true);
    }
  }
  const TWELVE = 12;
  const FIVE = 5;
  useEffect(() => {
    handleFoods();
    handleFoodCategory();
  }, []);
  useEffect(() => {
    handleRedirect();
    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  });
  function handleRecipeCard(food, index) {
    return (
      <RecipeCard
        key={ food.idMeal }
        index={ index }
        recipe={ food }
        recipeType="food"
      />
    );
  }
  return (
    <div>
      <Header
        title="Foods"
      />
      { foodCategory && foodCategory.slice(0, FIVE).map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
          onClick={ (e) => handleClickButton(e.target.value) }
        >
          { strCategory }
        </button>
      )) }
      { recipes
      && recipes.slice(0, TWELVE).map((food, index) => (
        handleRecipeCard(food, index)
      ))}
      { recipes === ''
        && foodsMount
        && foodsMount.slice(0, TWELVE).map((food, index) => (
          handleRecipeCard(food, index)
        ))}
      {listFoodOfCategory && listFoodOfCategory.slice(0, TWELVE).map((food, index) => (
        handleRecipeCard(food, index)
      )) }
      { redirectId && <Redirect to={ `/foods/${recipes[0].idMeal}` } /> }
    </div>
  );
}
