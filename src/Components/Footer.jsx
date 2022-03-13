import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const [redirectCocktails, setRedirectCocktails] = useState(false);
  const [redirectFoods, setRedirectFoods] = useState(false);
  const [redirectExplore, setRedirectExplore] = useState(false);

  function redirectToCocktails() {
    setRedirectCocktails(true);
  }
  function redirectToFoods() {
    setRedirectFoods(true);
  }
  function redirectToExplore() {
    setRedirectExplore(true);
  }

  return (
    <div
      className="footer"
    >
      <footer
        className="footer"
        data-testid="footer"
      >
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          onClick={ redirectToCocktails }
        >
          <img
            src={ drinkIcon }
            alt="drinkIcon"
          />
        </button>

        <button
          type="button"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          onClick={ redirectToExplore }
        >
          <img
            src={ exploreIcon }
            alt="exploreIcon"
          />
        </button>

        <button
          type="button"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          onClick={ redirectToFoods }
        >
          <img
            src={ mealIcon }
            alt="MealIcon"
          />
        </button>
      </footer>
      { redirectCocktails && <Redirect to="/drinks" />}
      { redirectFoods && <Redirect to="/foods" />}
      { redirectExplore && <Redirect to="/explore" />}

    </div>
  );
}

export default Footer;
