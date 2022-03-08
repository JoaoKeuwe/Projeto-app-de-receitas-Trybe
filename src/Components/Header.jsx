import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import ingredientsApi from '../Services/ingredientsApi';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const [screen, setScreen] = useState(false);
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const { title } = props;
  const ClickToProfile = () => {
    const { history } = props;
    history.push('/profile');
  };

  function hadleChange(e) {
    const { value } = e.target;
    return setRadio(value);
  }

  async function handleClickApi(searchh, radioo) {
    const data = await ingredientsApi(searchh, radioo);
    return data;
  }

  return (
    <div>
      <header>
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ ClickToProfile }
        >
          <img src={ profileIcon } alt="profile-icon" />
        </button>

        <h1 data-testid="page-title">{title || 'Foods'}</h1>

        <button
          type="button"
          src={ searchIcon }
          onClick={ () => setScreen(!screen) }
        >
          <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
        </button>
        {screen && (
          <div>
            <label htmlFor="ingredients-radio">
              Ingredient
              <input
                name="radioIngredients"
                type="radio"
                data-testid="ingredient-search-radio"
                value="Ingredient"
                onClick={ hadleChange }
              />
            </label>

            <label htmlFor="Name-radio">
              Name
              <input
                name="radioIngredients"
                type="radio"
                data-testid="name-search-radio"
                value="Name"
                onClick={ hadleChange }
              />
            </label>

            <label htmlFor="FirstLetter-radio">
              First Letter
              <input
                name="radioIngredients"
                type="radio"
                data-testid="first-letter-search-radio"
                value="First letter"
                onClick={ hadleChange }
              />
            </label>

            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => handleClickApi(search, radio) }
            >
              Search
            </button>

            <input
              type="text"
              data-testid="search-input"
              placeholder="pesquise"
              onChange={ (e) => setSearch(e.target.value) }
            />
          </div>
        )}
      </header>
      <Footer />
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
