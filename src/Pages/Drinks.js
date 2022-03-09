import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context/context';
import Header from '../Components/Header';

function Drinks() {
  const { recipes } = useContext(Context);
  const [redirectId, setRedirectId] = useState(false);
  function handleRedirect() {
    if (recipes && recipes.length === 1) {
      return setRedirectId(true);
    }
  }
  const TWELVE = 12;

  useEffect(() => {
    handleRedirect();
    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  });

  console.log(recipes);
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
      { redirectId && <Redirect to={ `/drinks/${recipes[0].idDrink}` } /> }
    </div>
  );
}
export default Drinks;
