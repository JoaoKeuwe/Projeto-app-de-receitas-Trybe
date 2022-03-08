import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function FavoriteRecipes() {
  return (
    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        <h2 data-testid="page-title">Favorite Recipes</h2>
      </header>
    </div>
  );
}
export default FavoriteRecipes;
