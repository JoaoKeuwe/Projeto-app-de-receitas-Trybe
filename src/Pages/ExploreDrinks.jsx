import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';

function ExploreDrinks() {
  const history = useHistory();

  function screenDrinksMeal() {
    history.push('/explore/drinks/ingredients');
  }
  return (

    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        <h2 data-testid="page-title">Explore Drinks</h2>
      </header>
      <div>
        <div>
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ screenDrinksMeal }
          >
            By Ingredient
          </button>

          <button
            type="button"
            data-testid="explore-surprise"
          >
            Surprise me!
          </button>
        </div>
        ;
      </div>
      <Footer />
    </div>
  );
}
export default ExploreDrinks;
