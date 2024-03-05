import ChangePageButton from "./ChangePageButton";
import "./Header.css";
import { useNavigate } from "react-router-dom";

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
