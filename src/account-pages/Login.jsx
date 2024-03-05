import React, { useState } from "react";
import "./Account_login.css";

export const Login = (props) => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = sessionStorage.getItem(name);
        if (userData !== null) {
            const userPassword = JSON.parse(userData)["password"];
            if (userPassword === pass) {
                sessionStorage.setItem("username", name);
                document.getElementById("confirmation").innerHTML = "Login successful";
                document.getElementById("switchRegister").disabled = true;
                document.getElementById("lCreate").disabled = true;
                setTimeout(() => {
                    props.continueToMenu(false);
                }, 1000);
            } else {
                document.getElementById("confirmation").innerHTML = "Incorrect password";
            }
        } else {
            document.getElementById("confirmation").innerHTML = "Username does not exist";
        }
    };

    return (
        <div className="background-form">
            <h1 className="fontHeader">Log In</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <h3 className="font" htmlFor="name">Name</h3>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="name"
                    placeholder="Karl"
                    id="name"
                    name="name"
                    className="account-input"
                />

                <h3 className="font" htmlFor="password">Password</h3>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="*********"
                    id="password"
                    name="password"
                    className="account-input"
                />

                <button id="lCreate" type="submit" className="account-button">
                    Log in
                </button>
                <p id="confirmation" className="confirmation"></p>
                <div className="login-link-container">
                    <p>Don't have an account? </p>
                                <button
                    id="switchRegister"
                    onClick={() => props.onFormSwitch("register")}
                    className="account-button"
                                >
                    Sign up
                        </button>
                </div>
                </form>
            
        </div>
    );
};

