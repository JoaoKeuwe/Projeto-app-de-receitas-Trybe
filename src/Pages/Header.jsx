import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const [screen, setScreen] = useState(false);
  const { title } = props;
  const ClickToProfile = () => {
    const { history } = props;
    history.push('/profile');
  };

  return (
    <div>
      <header>
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ ClickToProfile }
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
          />
        </button>

        <h1 data-testid="page-title">{title || 'Foods'}</h1>

        <button
          type="button"
          src={ searchIcon }
          onClick={ () => setScreen(!screen) }
        >
          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>

      </header>

      {screen && (

        <div>
          <label htmlFor="ingredients-radio">

            Ingredient
            <input type="radio" data-testid="ingredient-search-radio" />
          </label>

          <label htmlFor="Name-radio">
            Name
            <input type="radio" data-testid="name-search-radio" />
          </label>

          <label htmlFor="FirstLetter-radio">
            First Letter
            <input type="radio" data-testid="first-letter-search-radio" />
          </label>

          <button type="button" data-testid="exec-search-btn">
            Search
          </button>

          <input type="text" data-testid="search-input" placeholder="pesquise" />

        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
