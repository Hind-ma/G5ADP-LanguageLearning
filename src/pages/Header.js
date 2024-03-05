import ChangePageButton from "./ChangePageButton";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function LogoutButton({ isGuest }) {
  const nav = useNavigate();
  const logout = () => {
    console.log(isGuest);
    // Reset username
    if (isGuest) {
      nav("/", { state: { form: "login" } });
    } else {
      sessionStorage.setItem("username", "Guest User");
      nav("/", { state: { form: "" } });
    }
  };

  return (
    <div>
      <button className="login-button" onClick={logout}>
        {isGuest ? "Log in" : "Log out"}
      </button>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <ChangePageButton
        to="/home"
        label="SpråkBuddy"
        className="logo"
      ></ChangePageButton>
      <ChangePageButton
        to="/account"
        label="Account"
        className="login-button"
      ></ChangePageButton>
    </div>
  );
}

export default Header;
