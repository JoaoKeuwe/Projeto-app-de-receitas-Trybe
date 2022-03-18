import React from 'react';
import PropTypes from 'prop-types';

function CardDrinks(props) {
  const { index, data } = props;
  return (
    <div key={ index }>
      <img
        className="picture-recipe"
        data-testid="recipe-photo"
        alt="recipe"
        src={ data.strDrinkThumb }
      />
      <h2 data-testid="recipe-title" className="name-recipe">
        {data.strDrink}
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

CardDrinks.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  // shareIcon: PropTypes.string.isRequired,
  // SavFavRecipes: PropTypes.func.isRequired,
  // Icon: PropTypes.string.isRequired,
  // clipURL: PropTypes.func.isRequired,
  // copy: PropTypes.bool.isRequired,
};

export default CardDrinks;
