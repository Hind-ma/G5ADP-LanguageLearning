import React, { useState } from 'react';
//import './Welcome.css';
import { Login } from '../account-pages/Login';
import { Register } from '../account-pages/Register';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const [currentForm, setCurrentForm] = useState('');
  const navigate = useNavigate();

  const switchToMenu = (guest) => {
    if (guest) {
      sessionStorage.setItem('username', 'Guest user');
    }
    navigate('/');
  };

  const handleFormSwitch = (formName) => {
    setCurrentForm(formName);
  };

  const handleGuestClick = () => {
    switchToMenu(true);
  };

  const renderForm = () => {
    if (currentForm === 'login') {
      return <Login onFormSwitch={handleFormSwitch} continueToMenu={switchToMenu} />;
    } else if (currentForm === 'register') {
      return <Register onFormSwitch={handleFormSwitch} continueToMenu={switchToMenu} />;
    } else {
      return (
        <>
          <h1 className="welcome">Välkommen!    Welcome!</h1>
          <p className="description">
            Learn Swedish in a fun and interactive way!
          </p>
          <div className="button-container">
            <button className="light-blue-button primary-button" onClick={() => handleFormSwitch('login')}>
              Start learning!
            </button>
            <button className="blue-button secondary-button" onClick={handleGuestClick}>
              Try it as guest
            </button>
          </div>
        </>
      );
    }
  };

  return <div className="App">{renderForm()}</div>;
};

export default WelcomePage;