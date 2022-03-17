import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';
import Drinks from '../Services/suprisesDrink';

function ExploreDrinks() {
  const history = useHistory();

  function screenDrinksMeal() {
    history.push('/explore/drinks/ingredients');
  }

  const [conditional, setConditional] = useState(false);
  const [id, setId] = useState();

  async function DrinksRandom() {
    const url = window.location.href;
    console.log(url);
    const randomDrinks = await Drinks();
    const { drinks } = randomDrinks;
    setId(drinks[0].idDrink);
    setConditional(true);
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
            onClick={ DrinksRandom }
          >
            Surprise me!
          </button>
        </div>
        ;
      </div>
      <Footer />
      {conditional && <Redirect to={ `/drinks/${id}` } />}
    </div>
  );
}
export default ExploreDrinks;
