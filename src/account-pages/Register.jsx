import React, {useState} from "react"

export const Register = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([name,email,pass,confPass].includes("")) {
            document.getElementById("confirmation").innerHTML ="Some fields are empty";
        } else {
            var passwordsMatch = confPass === pass;
            var nameAvailable = sessionStorage.getItem(name) === null;
            if (nameAvailable) {
                if (passwordsMatch) {
                    storeData();
                    sessionStorage.setItem('username', name);
                    document.getElementById("confirmation").innerHTML = "The account has been created";
                    setTimeout(() => {props.continueToMenu(false);}, 1000);
                } else
                    document.getElementById("confirmation").innerHTML = "Passwords do not match";
            }
            else {
                document.getElementById("confirmation").innerHTML = "Username already taken";
            }
        }
    }

    const storeData = () => {
        const userData = {'name' : name, 'email' : email, 'password' : pass};
        const parsedUserData = JSON.stringify(userData);
        sessionStorage.setItem(name, parsedUserData);
    }

    return (
        <div className="auth-form-container">
            <form noValidate className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Username</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Karl Nils" id="name" name="name"/>

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Learn@swedish.com" id="email" name="email"/>
                
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*****" id="password" name="password"/>

                <label htmlFor="confirmPassword">Confirm password</label>
                <input value={confPass}  onChange={(e) => setConfPass(e.target.value)} type="password" placeholder="*****" id="confirmPassword" name="confirmPassword"/>
                
                <button type="submit">Create account</button>

                <p id="confirmation"></p>
            </form>
            <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here</button>
        </div>
    )
}