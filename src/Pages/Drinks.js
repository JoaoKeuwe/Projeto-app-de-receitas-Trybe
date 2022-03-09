import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { drinksApiMonunt } from '../Services/drinksApi';
import Context from '../Context/context';
import Header from '../Components/Header';

function Drinks() {
  const { recipes } = useContext(Context);
  const [drinksMount, setDrinksMount] = useState();
  const [redirectId, setRedirectId] = useState(false);

  function handleDrinks() {
    drinksApiMonunt().then((data) => setDrinksMount(data.drinks));
  }

  function handleRedirect() {
    if (recipes && recipes.length === 1) {
      return setRedirectId(true);
    }
  }
  const TWELVE = 12;
  useEffect(() => {
    handleDrinks();
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
      { redirectId && <Redirect to={ `/drinks/${recipes[0].idDrink}` } /> }
    </div>
  );
}
export default Drinks;
