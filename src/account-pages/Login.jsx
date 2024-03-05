import React, { useState } from "react";
import "./Account.css";

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
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="font" htmlFor="name">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="name"
                    placeholder="Karl"
                    id="name"
                    name="name"
                />

                <label className="font" htmlFor="password">Password</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="*********"
                    id="password"
                    name="password"
                />

                <button id="lCreate" type="submit" className="next-button">
                    Log in
                </button>
                <p id="confirmation"></p>
            </form>
            <button
                id="switchRegister"
                onClick={() => props.onFormSwitch("register")}
                className="check-button"
            >
                Don't have an account? Register here
            </button>
        </div>
    );
};

