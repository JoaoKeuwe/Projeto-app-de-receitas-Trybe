import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Drinks() {
  return (
    <div>
      <header title="Drinks">
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        <h1 data-testid="page-title">Drinks</h1>

        <button type="button" src={ searchIcon }>
          <img src={ searchIcon } alt="profileIcon" data-testid="search-top-btn" />
        </button>
      </header>
    </div>
  );
}
export default Drinks;
