import React, {useState} from "react"
import {Login} from "../account-pages/Login";
import {Register} from "../account-pages/Register";

function Account() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === 'login' ?  <Login onFormSwitch={toggleForm}/> :<Register onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default Account;