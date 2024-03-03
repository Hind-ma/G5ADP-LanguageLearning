import { useNavigate } from "react-router-dom";
import ChangePageButton from "./ChangePageButton";
import "./Home.css";
import { GetRandomInt } from "../utils";
import { useState } from "react";

/**
 * categoryList
 * 
 * NOTE: Temporary category list for the demo/MVP.
 * I'm using routePage to determine the button disable state.
 * This is *NOT* a good solution but probably will do for now.
 */
export const categoryList = [
  {id: 0, categoryName: "Generic", routePage: "/learn"},
  {id: 1, categoryName: "Supermarket", routePage: ""},
  {id: 2, categoryName: "Sports", routePage: ""},
  {id: 3, categoryName: "Travel", routePage: ""},
  {id: 4, categoryName: "Music", routePage: ""},
];

/**
 * LearnButton - for users to start learing or continue learning.
 * 
 * NOTE: I'm deliberatly making any non-guest user have it display as
 * "Continue Learning" since we actually don't have any progress stored.
 */
function LearnButton({bGuestUser}) {
  const item = bGuestUser ? "Start Learning" : "Continue Learning";
  return (
    <div>
      <ChangePageButton to="/learn" label={item} />
    </div>
  );
}

/**
 * CategoryButton - for users to navigate to a specific category.
 */
function CategoryButton({label, route, bDisabled}) {
  const nav = useNavigate();
  const changePage = () => {
    nav(route);
  };

  return (
    <div>
      <button onClick={changePage} disabled={bDisabled} >
        {label}
      </button>
    </div>
  );
}

/**
 * StatsButton - Displays basic user stats
 */
function StatsButton({label}) {
  return (
    <div>
      <button>
        {label}
      </button>
    </div>
  );
}

/**
 * StatsDisplay - display container for user stats
 */
function StatsDisplay() {
  return (
    <div>
      {/* TODO: @CS, remove the para tag below, placeholder stats, Stats */}
      <p>Stats</p>
        <StatsButton label={sessionStorage.getItem("dayStreak").toLocaleString() +  " Day Streak!"} />
        <StatsButton label={sessionStorage.getItem("wordPerc").toLocaleString() + "% of All Words"} />
        <StatsButton label={sessionStorage.getItem("wordRate").toLocaleString() + " Words/Day"} />
    </div>
  );
}

/**
 * Random Stats generator
 */
function GenerateDayStreak() {
  if (sessionStorage.key(2) === null) {
    var val = GetRandomInt(1, 7);
    sessionStorage.setItem("dayStreak", val);
    return val;
  }
  else {
    return sessionStorage.getItem("dayStreak")
  }
}

function GenerateWordPercent() {
  if (sessionStorage.key(3) === null) {
    var val = GetRandomInt(30, 60);
    sessionStorage.setItem("wordPerc", val);
    return val;
  }
  else {
    return sessionStorage.getItem("wordPerc");
  }
}

function GenerateWordRate() {
  if (sessionStorage.key(4) === null) {
    var val = GetRandomInt(4, 9);
    sessionStorage.setItem("wordRate", val);
    return val;
  }
  else {
    return sessionStorage.getItem("wordRate");
  }
}

function GenerateWordCount() {
  if (sessionStorage.key(5) === null) {
    var val = GetRandomInt(35, 75);
    sessionStorage.setItem("wordCount", val);
    return val;
  }
  else {
    return sessionStorage.getItem("wordCount");
  }
}

function Home() {
  var currentUsername = sessionStorage.getItem('username');
  var bGuest = currentUsername === 'Guest User';

  // Store "FAKE" stats to make it consistent with account page view
  var [dayStreak] = useState(GenerateDayStreak);
  sessionStorage.setItem("dayStreak", dayStreak);

  var [wordPerc] = useState(GenerateWordPercent);
  sessionStorage.setItem("wordPerc", wordPerc);

  var [wordRate] = useState(GenerateWordRate);
  sessionStorage.setItem("wordRate", wordRate);

  var [wordCount] = useState(GenerateWordCount);
  sessionStorage.setItem("wordCount", wordCount);
  
  return (
  <div>
      {/* Navigation Buttons */}
      {/* currentUsername.charAt(0).toLocaleUpperCase() + currentUsername.slice(1) */}
      <div className="top-heading">
        <h4>Welcome {currentUsername.toLocaleUpperCase()}</h4>
      </div>
      <div className="top-btn-container">
        <ChangePageButton to="/account" label={bGuest ? "Guest Home" : currentUsername.toLocaleUpperCase() + "'s Home"} />
        {/*<ChangePageButton to="/" label="LOG OUT" />*/}
      </div>
      <div className="learn-btn-container">
        <LearnButton bGuestUser={bGuest} />
      </div>
      <div className="category-btn-container">
        {/* TODO: @CS, remove the para tag below, Category buttons */}
        <p>Categories</p>
        {categoryList.map(category => (
          <CategoryButton key={category.id} label={category.categoryName} bDisabled={category.routePage === ""} route={category.routePage} />
        ))}
      </div>
      <div className="stats-btn-container">
        {bGuest ? null : <StatsDisplay />}
      </div>
  </div>
  );
}

export default Home;
