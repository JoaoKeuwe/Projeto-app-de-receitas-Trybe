import React from 'react';
import PropTypes from 'prop-types';

function CardFoods(props) {
  const { index, data } = props;
  return (
    <div key={ index }>
      <img
        className="picture-recipe"
        data-testid="recipe-photo"
        alt="recipe"
        src={ data.strMealThumb }
      />
      <h2 data-testid="recipe-title" className="name-recipe">
        {data.strMeal}
      </h2>
      <hr className="hr" />
      <h3>Category</h3>
      <p data-testid="recipe-category">
        { data.strCategory }
        {<br />}
        { data.strAlcoholic }
      </p>
    </div>
  );
}

CardFoods.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  // shareIcon: PropTypes.string.isRequired,
  // SavFavRecipes: PropTypes.func.isRequired,
  // Icon: PropTypes.string.isRequired,
  // clipURL: PropTypes.func.isRequired,
  // copy: PropTypes.bool.isRequired,
};

export default CardFoods;
