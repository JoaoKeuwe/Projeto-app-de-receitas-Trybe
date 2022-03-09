import React from 'react';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Nationalities() {
  return (
    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        <h2 data-testid="page-title">Explore Nationalities</h2>

        <button type="button" src={ searchIcon }>
          <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />

        </button>
      </header>
      <Footer />
    </div>
  );
}
export default Nationalities;
