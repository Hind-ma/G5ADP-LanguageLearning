import React, { useState } from "react";
import "./Welcome.css";
import { Login } from "../account-pages/Login";
import { Register } from "../account-pages/Register";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [currentForm, setCurrentForm] = useState("");
  const navigate = useNavigate();

  const switchToMenu = (guest) => {
    if (guest) {
      sessionStorage.setItem("username", "Guest User");
    }
    navigate("/home");
  };

  const handleFormSwitch = (formName) => {
    setCurrentForm(formName);
  };

  const handleGuestClick = () => {
    switchToMenu(true);
  };

  const renderForm = () => {
    if (currentForm === "login") {
      return (
        <Login onFormSwitch={handleFormSwitch} continueToMenu={switchToMenu} />
      );
    } else if (currentForm === "register") {
      return (
        <Register
          onFormSwitch={handleFormSwitch}
          continueToMenu={switchToMenu}
        />
      );
    } else {
      return (
        <div className="content">
          <div className="welcome-area">
            <h1 className="welcome">
              Learn swedish in a fun and interactive way!
            </h1>

            <div className="main-buttons">
              <button
                className="button"
                onClick={() => handleFormSwitch("login")}
              >
                Start learning!
              </button>
              <button className="button" onClick={handleGuestClick}>
                Try it as guest
              </button>
            </div>
          </div>
          <div className="welcome-background"></div>
        </div>
      );
    }
  };

  return <div>{renderForm()}</div>;
};

/*
<p className="description">
              Learn Swedish in a fun and interactive way!
            </p>*/

export default WelcomePage;
