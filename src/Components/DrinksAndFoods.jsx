/* import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function DrinksAndFoods({ exibirNacionalite }) {
  const history = useHistory();

  function screenFoodsMeals() {
    history.push('/explore/foods/ingredients');
  }

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ screenFoodsMeals }
      >
        By Ingredient
      </button>
      {exibirNacionalite ? (
        <button
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>) : null}

      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
    </div>);
}

DrinksAndFoods.propTypes = {
  exibirNacionalite: PropTypes.string.isRequired,
};

export default DrinksAndFoods;
 */
