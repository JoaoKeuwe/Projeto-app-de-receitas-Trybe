import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';
import Ingredients from '../Services/ingredientsFoods';

function IngredientsFoods() {
  const [ingredientes, setIngredientes] = useState();
  const ZERO = 0;
  const TWELVE = 12;
  /* componentDidMount */
  useEffect(() => {
    async function ingredient() {
      const { meals } = await Ingredients();
      console.log(meals);
      setIngredientes(meals.slice(ZERO, TWELVE));
    }
    ingredient();
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
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt="#"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                {ingredient.strIngredient}
              </p>
            </section>
          ))}
      </header>
      <Footer />
    </div>
  );
}
export default IngredientsFoods;
