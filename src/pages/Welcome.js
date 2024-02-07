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

  const switchToMenu = () => {
    sessionStorage.setItem('username', 'Guest user');
    navigate("/");
  }

  const welcomePage = () => {
    return (
      <>
        <button onClick={() => toggleForm('login')}>Start learning!</button>
        <button onClick={() => switchToMenu()}>Try it as a guest</button>
      </>
    );
  }

  return (
    <div className="App">
      {
        currentForm === 'login' ?  <Login onFormSwitch={toggleForm}/> : 
        currentForm === 'register' ? <Register onFormSwitch={toggleForm}/> :
        welcomePage()
      }
    </div>
  );
}

export default Welcome;
