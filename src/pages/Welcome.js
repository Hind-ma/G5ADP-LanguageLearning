import React, {useState} from "react"
import {Login} from "../account-pages/Login";
import {Register} from "../account-pages/Register";
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [currentForm, setCurrentForm] = useState('');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const navigate = useNavigate();

  const switchToMenu = (guest) => {
    if (guest) {
      sessionStorage.setItem('username', 'Guest user');
    }
    navigate("/");
  }

  const welcomePage = () => {
    return (
      <>
        <h1>Welcome</h1>
        <h2>Here we learn swedish the right way :D</h2>
        <button onClick={() => toggleForm('login')}>Start learning!</button>
        <button onClick={() => switchToMenu(true)}>Try it as a guest</button>
      </>
    );
  }

  return (
    <div className="App">
      {
        currentForm === 'login' ?  <Login onFormSwitch={toggleForm} continueToMenu={switchToMenu}/> : 
        currentForm === 'register' ? <Register onFormSwitch={toggleForm} continueToMenu={switchToMenu}/> :
        welcomePage()
      }
    </div>
  );
}

export default Welcome;
