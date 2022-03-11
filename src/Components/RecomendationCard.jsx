import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCard(props) {
  const {
    index,
    recipe,
  } = props;
  return (
    <>
      <p data-testid={ `${index}-recomendation-title` }>
        { recipe.strMeal || recipe.strDrink }
      </p>
      <img
        width="100px"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ `${index}-recomendation-card` }
      />
    </>
  );
}

RecomendationCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;
