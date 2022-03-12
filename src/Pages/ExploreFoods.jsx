import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';

function ExploreFoods() {
  const history = useHistory();

  function screenFoodsMeals() {
    history.push('/explore/foods/ingredients');
  }

  function screenNationality() {
    history.push('/explore/foods/nationalities');
  }

  return (
    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        <h2 data-testid="page-title">Explore Foods</h2>
      </header>

      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ screenFoodsMeals }
        >
          By Ingredient
        </button>

        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ screenNationality }
        >
          By Nationality
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default ExploreFoods;
