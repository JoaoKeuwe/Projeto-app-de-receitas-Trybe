import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  const getEmail = JSON.parse(localStorage.getItem('user')) || { email: 'email' };
  /* const test = (getEmail); */
  const test = getEmail;
  const history = useHistory();

  function removeLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  }
  console.log(test);

  function doneRecipes() {
    history.push('/done-recipes');
  }

  return (
    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>
        <div>
          <h1 data-testid="profile-email">{test.email }</h1>

          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ doneRecipes }
          >
            Done Recipes
          </button>

          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>

          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ removeLocalStorage }
          >
            Logout
          </button>

        </div>

        <h2 data-testid="page-title">Profile</h2>
      </header>
      <Footer />
    </div>
  );
}
export default Profile;
