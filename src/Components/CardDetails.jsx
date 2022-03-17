import React from 'react';
import PropTypes from 'prop-types';

function CardDetails(props) {
  const { index, data, shareIcon, SavFavRecipes, whiteHearthIcon, clipURL } = props;
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
      <div className="icons-details">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => clipURL() }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => SavFavRecipes(data) }
          src={ whiteHearthIcon }
        >
          <img src={ whiteHearthIcon } alt="white Heart" />
        </button>
      </div>
      <h3>Category</h3>
      <p data-testid="recipe-category">
        { data.strCategory }
        { data.strAlcoholic }
      </p>
    </div>
  );
}

CardDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  shareIcon: PropTypes.string.isRequired,
  SavFavRecipes: PropTypes.func.isRequired,
  whiteHearthIcon: PropTypes.string.isRequired,
  clipURL: PropTypes.func.isRequired,
};

export default CardDetails;
