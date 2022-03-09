import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context/context';
import Header from '../Components/Header';

export default function Foods() {
  const { recipes } = useContext(Context);
  const [redirectId, setRedirectId] = useState(false);
  console.log(recipes);
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
  return (
    <div>
      <Header
        title="Foods"
      />
      { recipes && recipes.slice(0, TWELVE).map((recipe, index) => (
        <div
          width="100px"
          key={ recipe.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            width="100px"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            { recipe.strMeal }
          </p>
        </div>
      ))}
      { redirectId && <Redirect to={ `/foods/${recipes[0].idMeal}` } /> }
    </div>
  );
}
