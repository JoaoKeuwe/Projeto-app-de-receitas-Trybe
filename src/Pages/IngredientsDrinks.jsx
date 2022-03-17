import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';
import IngredientDrinksAPI from '../Services/ingredientsDrinks';

function IngredientsDrinks() {
  const [ingredientes, setIngredientes] = useState();
  const ZERO = 0;
  const TWELVE = 12;
  /* componentDidMount */
  useEffect(() => {
    async function ingredientDrink() {
      const { drinks } = await IngredientDrinksAPI();
      console.log(drinks);
      setIngredientes(drinks.slice(ZERO, TWELVE));
    }
    ingredientDrink();
  }, []);

  return (
    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </button>

        <h2 data-testid="page-title">Explore Ingredients</h2>
        {ingredientes
          && ingredientes.map((ingredient, index) => (
            <section key={ index } data-testid={ `${index}-ingredient-card` }>
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt="#"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                {ingredient.strIngredient1}
              </p>
            </section>
          ))}

      </header>
      <Footer />
    </div>
  );
}
export default IngredientsDrinks;
