import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';

function Explore() {
  const history = useHistory();

  function exploreFoods() {
    history.push('/explore/foods');
  }

  function exploreDrinks() {
    history.push('/explore/drinks');
  }

  return (
    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        <h2 data-testid="page-title">Explore</h2>
      </header>
      <div>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ exploreFoods }
        >
          Explore Foods
        </button>

        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ exploreDrinks }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default Explore;
