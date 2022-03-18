import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProgressCard(props) {
  const [t, setT] = useState();
  const {
    data,
    clipURL,
    handleFavorite,
    favorite,
    blackHeartIcon,
    whiteHearthIcon,
    copied,
    ingredients,
    handleClick,
    localCocktails,
    isDisabled,
    handleOnRecipe,
  } = props;

  useEffect(() => {
    setT(t);
  }, [copied, t]);
  return (
    <div key={ data.idDrink }>
      <img
        width="100px"
        data-testid="recipe-photo"
        alt="recipe"
        src={ data.strDrinkThumb }
      />
      <h2 data-testid="recipe-title">{data.strDrink}</h2>
      <button type="button" data-testid="share-btn" onClick={ () => clipURL }>
        share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavorite }
        src={ favorite ? blackHeartIcon : whiteHearthIcon }
      >
        <img
          src={ favorite ? blackHeartIcon : whiteHearthIcon }
          alt="white Heart"
        />
      </button>
      {t && <span>Link copied!</span>}
      <h3>Category</h3>
      <p data-testid="recipe-category">{data.strCategory}</p>
      <p>{data.strAlcoholic}</p>
      <ol>
        { ingredients
        && ingredients.map(({ ingredient, measure }, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ index }>
              <input
                id={ index }
                type="checkbox"
                onChange={ () => handleClick }
                checked={
                  localCocktails.length > 0
                  && localCocktails[0].some((as) => Number(as) === index)
                }
              />
              {`${ingredient} - ${measure}`}
            </label>
          </li>
        ))}
      </ol>
      <h3>Instructions</h3>
      <p data-testid="instructions">{data.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ () => handleOnRecipe() }
      >
        Finish Recipe
      </button>
    </div>
  );
}

ProgressCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  handleFavorite: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
  blackHeartIcon: PropTypes.string.isRequired,
  whiteHearthIcon: PropTypes.string.isRequired,
  clipURL: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleClick: PropTypes.func.isRequired,
  localCocktails: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleOnRecipe: PropTypes.func.isRequired,
};

export default ProgressCard;
