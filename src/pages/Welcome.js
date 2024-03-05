import React, { useState } from "react";
import "./Welcome.css";
import { Login } from "../account-pages/Login";
import { Register } from "../account-pages/Register";
import { useLocation, useNavigate } from "react-router-dom";
import ChangePageButton from "./ChangePageButton";
import "./Header.css";

const WelcomePage = () => {
  /*let currentUsername = sessionStorage.getItem("username");
  let bGuest;
  console.log("guest " + bGuest);
  console.log("username " + currentUsername);
  if (currentUsername == null || currentUsername == undefined) {
    sessionStorage.setItem("username", "Guest User");
    bGuest = true;
    console.log("i got here");
  } else {
    bGuest = currentUsername === "Guest User";
    console.log("guest2 " + bGuest);
    console.log("username2 " + currentUsername);
  }

  const location = useLocation();
  let formState = "";
  if (location.state != null) {
    formState = location.state.form;
  }
*/
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
        <div>
          <div className="header">
            <ChangePageButton
              to="/home"
              label="SpråkBuddy"
              className="logo"
            ></ChangePageButton>
          </div>
          <Login
            onFormSwitch={handleFormSwitch}
            continueToMenu={switchToMenu}
          />
        </div>
      );
    } else if (currentForm === "register") {
      return (
        <div>
          <div className="header">
            <ChangePageButton
              to="/home"
              label="SpråkBuddy"
              className="logo"
            ></ChangePageButton>
          </div>
          <Register
            onFormSwitch={handleFormSwitch}
            continueToMenu={switchToMenu}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="header">
            <ChangePageButton
              to="/home"
              label="SpråkBuddy"
              className="logo"
            ></ChangePageButton>
          </div>
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
