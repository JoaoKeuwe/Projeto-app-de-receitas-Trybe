import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Foods(props) {
  const ClickToProfile = () => {
    const { history } = props;
    history.push('/profile');
  };

  return (
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

      <h1 data-testid="page-title">Foods</h1>

      <button
        type="button"
        src={ searchIcon }
      >
        <img
          src={ searchIcon }
          alt="searchIcon"
          data-testid="search-top-btn"
        />
      </button>

    </header>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Foods;
