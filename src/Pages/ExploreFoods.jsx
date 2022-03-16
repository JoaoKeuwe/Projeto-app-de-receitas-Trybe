import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';
import Foods from '../Services/suprisesFoods';

function ExploreFoods() {
  const history = useHistory();

  function screenFoodsMeals() {
    history.push('/explore/foods/ingredients');
  }

  function screenNationality() {
    history.push('/explore/foods/nationalities');
  }

  const [conditional, setConditional] = useState(false);
  const [id, setId] = useState();

  async function FoodsRandom() {
    const url = window.location.href;
    console.log(url);
    const randomFoods = await Foods();
    const { meals } = randomFoods;
    setId(meals[0].idMeal);
    setConditional(true);
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
          onClick={ FoodsRandom }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
      {conditional && <Redirect to={ `/foods/${id}` } />}
    </div>
  );
}
export default ExploreFoods;
