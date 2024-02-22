import React, { useState } from 'react';
import './Welcome.css';
import { Login } from '../account-pages/Login';
import { Register } from '../account-pages/Register';
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {
    const [currentForm, setCurrentForm] = useState('');
    const navigate = useNavigate();

    const switchToMenu = (guest) => {
        if (guest) {
            sessionStorage.setItem('username', 'Guest User'); 
        }
        navigate('/home');
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
                    <h1 className="welcome">Valkommen!</h1>
                    <h1 className="welcome"> Welcome!</h1>
                    <p className="description">
                        Learn Swedish in a fun and interactive way!
                    </p>
                    <div className="button-container">
                        <button className="button" onClick={() => handleFormSwitch('login')}>
                            Start learning!
                        </button>
                        <button className="button" onClick={handleGuestClick}>
                            Try it as guest
                        </button>
                    </div>
                </>
            );
        }
    };

    return <div className="Valkom">{renderForm()}</div>;
};

export default WelcomePage;