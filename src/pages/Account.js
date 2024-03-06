import ChangePageButton from "./ChangePageButton";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import { GenerateDayStreak, GenerateWordPercent, GetRandomInt } from "../utils";
import Header from "./Header";

/**
 * LogoutButton - resets username in sessionStorage
 *
 * NOTE: if this is not done, pressing back on web browser shows up the
 * last logged in user. I'm just doing it to prevent that. Clearing the
 * storage causes error - so i reset to "Guest User".
 */
function LogoutButton({ route, bGuestUser }) {
  const nav = useNavigate();
  const logout = () => {
    // Reset username
    sessionStorage.setItem("username", "Guest User");

    nav(route);
  };

  return (
    <div>
      <button onClick={logout}>{bGuestUser ? "LOG IN" : "LOG OUT"}</button>
    </div>
  );
}

/**
 * UserInfo - Fake user info
 */
function UserInfo({ usrName }) {
  return (
    <div>
      <h4>Info</h4>
      <p>Hej! {usrName.toLocaleUpperCase()}!</p>
      <p>You have been a member with us since 2024</p>
      <p>
        You have learned {sessionStorage.getItem("wordCount")} Swedish words!
      </p>
    </div>
  );
}

/**
 * StatsInfo - fake user stats consistent with home page
 */
function StatsInfo() {
  return (
    <div>
      <h4>Stats</h4>
      <p>
        You are on a {sessionStorage.getItem("dayStreak").toLocaleString()} Day
        Streak!
      </p>
      <p>
        You have learnt {sessionStorage.getItem("wordPerc").toLocaleString()}%
        of all words.
      </p>
      <p>
        You are learning {sessionStorage.getItem("wordRate").toLocaleString()}{" "}
        words per day.
      </p>
    </div>
  );
}

function Account() {
  var currentUsername = sessionStorage.getItem("username");
  var bGuest = currentUsername === "Guest User";

  return (
    <div>
      <Header />
      <div>
        <p>Account</p>
      </div>
      <div>
        <ChangePageButton to="/home" label="Go to Home" />
        <LogoutButton route="/" bGuestUser={bGuest} />
      </div>
      <div>
        {/* User Info */}
        {bGuest ? null : <UserInfo usrName={currentUsername} />}
      </div>
      <div>
        {/* Stats */}
        {bGuest ? null : <StatsInfo />}
      </div>
    </div>
  );
}

export default Account;
