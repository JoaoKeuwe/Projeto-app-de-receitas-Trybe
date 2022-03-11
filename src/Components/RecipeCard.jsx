import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { index, recipe, recipeType } = props;
  return (
    <Link
      key={ recipe.idDrink || recipe.idMeal }
      to={ `/${recipeType}/${recipe.idDrink || recipe.idMeal}` }
    >
      <div
        width="100px"
        key={ recipe.idMeal || recipe.idDrink }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          width="100px"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          {recipe.strMeal || recipe.strDrink}
        </p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default RecipeCard;
