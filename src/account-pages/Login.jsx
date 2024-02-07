import React, {useState} from "react"

export const Login = (props) => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = sessionStorage.getItem(name);
        if (userData !== null) {
            const userPassword = JSON.parse(userData)['password'];
            if (userPassword === pass) {
                sessionStorage.setItem('username', name);
                document.getElementById("confirmation").innerHTML = "Login succesful";
                setTimeout(() => {props.continueToMenu(false);}, 1000);
            } else {
                document.getElementById("confirmation").innerHTML = "Incorrect password";
            }
            
        } else {
            document.getElementById("confirmation").innerHTML = "Username does not exist";
        }
    }


    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Karl" id="name" name="name"/>
                
                <label htmlFor="password">Password</label>
                <input value={pass}  onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
                
                <button type="submit">Log in</button>
                <p id="confirmation"></p>
            </form>
            <button onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</button>
        </div>
    )
}