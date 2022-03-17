import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';
import Ingredients from '../Services/ingredientsFoods';
import context from '../Context/context';
import '../styles/ingredientsDrinks.css';

function IngredientsFoods() {
  const [ingredientes, setIngredientes] = useState();
  const ZERO = 0;
  const TWELVE = 12;
  const { pathname } = useLocation();
  const { setFilterIngredients } = useContext(context);
  console.log(pathname);
  /* componentDidMount */
  useEffect(() => {
    async function ingredient() {
      const { meals } = await Ingredients();
      setIngredientes(meals.slice(ZERO, TWELVE));
    }
    ingredient();
  }, []);

  async function filterFoods(ingredient) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`;
    const response = await fetch(url);
    const { meals } = await response.json();
    setFilterIngredients(meals.slice(ZERO, TWELVE));
  }
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
            <Link
              onClick={ () => filterFoods(ingredient) }
              to={ `/${pathname.split('/')[2]}` }
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt="#"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                {ingredient.strIngredient}
              </p>
            </Link>
          ))}
      </header>
      <Footer />
    </div>
  );
}
export default IngredientsFoods;
