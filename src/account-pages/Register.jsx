import React, { useState } from "react";
import "./Account.css";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, email, pass, confPass].includes("")) {
      document.getElementById("confirmation").innerHTML = "Some fields are empty";
    } else {
      var passwordsMatch = confPass === pass;
      var nameAvailable = sessionStorage.getItem(name) === null;
      if (nameAvailable) {
        if (passwordsMatch) {
          storeData();
          sessionStorage.setItem("username", name);
          document.getElementById("confirmation").innerHTML = "The account has been created";
          document.getElementById("switchLogin").disabled = true;
          document.getElementById("create").disabled = true;
          setTimeout(() => {
            props.continueToMenu(false);
          }, 1000);
        } else document.getElementById("confirmation").innerHTML = "Passwords do not match";
      } else {
        document.getElementById("confirmation").innerHTML = "Username already taken";
      }
    }
  };

  const storeData = () => {
    const userData = { name: name, email: email, password: pass };
    const parsedUserData = JSON.stringify(userData);
    sessionStorage.setItem(name, parsedUserData);
  };

    return (
        <div>
            <h1 className="fontHeader">Register</h1>
      <div className="auth-form-container">
      <form noValidate className="register-form" onSubmit={handleSubmit}>
       <h3 className="font"  htmlFor="name">Name</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Karl Nils"
          id="name"
          name="name"
        />

       <h3 className="font" htmlFor="email">Email</h3>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Learn@swedish.com"
          id="email"
          name="email"
        />

              <h3 className="font" htmlFor="password">Password</h3>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*****"
          id="password"
          name="password"
        />

              <h3 className="font" htmlFor="confirmPassword">Confirm password</h3>
        <input
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
          type="password"
          placeholder="*****"
          id="confirmPassword"
          name="confirmPassword"
        />

        <button id="create" type="submit" className="check-button">
          Sign up
        </button>

        <p id="confirmation"></p>

        <div className="login-link-container">
          <p>Already have an account?</p>
          <button id="switchLogin" onClick={() => props.onFormSwitch("login")} className="check-button">
            Log in
          </button>
        </div>
      </form>
            </div>
        </div>
  );
};