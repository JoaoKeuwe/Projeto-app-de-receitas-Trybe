import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  drinksApiMonunt,
  drinksApiCategory,
  handleClickCategoryDrinks,
} from '../Services/drinksApi';
import Context from '../Context/context';
import Header from '../Components/Header';

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
  return (
    <div>
      <Header title="Drinks" />
      { drinkCategory && drinkCategory.slice(0, FIVE).map(({ strCategory }) => (
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
      { recipes && recipes.slice(0, TWELVE).map((recipe, index) => (
        <div width="100px" key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            width="100px"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            { recipe.strDrink }
          </p>
        </div>
      ))}
      { recipes === ''
        && drinksMount
        && drinksMount.slice(0, TWELVE).map((drink, index) => (
          <div width="100px" key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              width="100px"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              { drink.strDrink }
            </p>
          </div>
        ))}
      { listDrinkCategory && listDrinkCategory.slice(0, TWELVE).map((drinks, index) => (
        <div width="100px" key={ drinks.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            width="100px"
            src={ drinks.strDrinkThumb }
            alt={ drinks.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            { drinks.strDrink }
          </p>
        </div>
      ))}
      { redirectId && <Redirect to={ `/drinks/${recipes[0].idDrink}` } /> }
    </div>
  );
}
export default Drinks;
