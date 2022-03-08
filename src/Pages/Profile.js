import React from 'react';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        <h2 data-testid="page-title">Profile</h2>
      </header>
      <Footer />
    </div>
  );
}
export default Profile;
