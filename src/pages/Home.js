import { useNavigate } from "react-router-dom";
import ChangePageButton from "./ChangePageButton";
import "./Home.css";
import { GetRandomInt } from "../utils";
import { useState } from "react";
import voc from "../images/vokaler.jpg"
import lock from "../images/lock.jpg"
import streak from "../images/streak.png"
import chart from "../images/barChart.png"
import progress from "../images/progress.png"

import Header from "./Header";

/**
 * categoryList
 *
 * NOTE: Temporary category list for the demo/MVP.
 * I'm using routePage to determine the button disable state.
 * This is *NOT* a good solution but probably will do for now.
 */
export const categoryList = [
  {id: 0, categoryName: "Generic", routePage: "/learn", img:voc},
  {id: 1, categoryName: "Supermarket", routePage: "", img:lock},
  {id: 2, categoryName: "Sports", routePage: "", img:lock},
  {id: 3, categoryName: "Travel", routePage: "", img:lock},
  {id: 4, categoryName: "Music", routePage: "", img:lock},
  {id: 4, categoryName: "School", routePage: "", img:lock},
];

/**
 * LearnButton - for users to start learing or continue learning.
 *
 * NOTE: I'm deliberatly making any non-guest user have it display as
 * "Continue Learning" since we actually don't have any progress stored.
 */
function LearnButton({ bGuestUser }) {
  const item = bGuestUser ? "Start Learning" : "Continue Learning";
  return (
    <div>
      <ChangePageButton className="learn-btn" to="/learn" label={item} />
    </div>
  );
}

/**
 * CategoryButton - for users to navigate to a specific category.
 */
function CategoryButton({label, route, bDisabled,pic}) {
  const nav = useNavigate();
  const arrow = bDisabled ? <svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.333496 31.9469V3.05315C0.333496 2.26218 0.612663 1.59869 1.171 1.06269C1.72933 0.526693 2.38072 0.259623 3.12516 0.261484C3.3578 0.261484 3.60254 0.295915 3.85937 0.364776C4.1162 0.433638 4.36001 0.53879 4.59079 0.680235L27.3429 15.1271C27.7616 15.4063 28.0762 15.7552 28.2865 16.174C28.4968 16.5927 28.601 17.0347 28.5991 17.5C28.5991 17.9653 28.4949 18.4073 28.2865 18.8261C28.078 19.2448 27.7635 19.5938 27.3429 19.8729L4.59079 34.3198C4.35815 34.4594 4.11434 34.5646 3.85937 34.6353C3.6044 34.706 3.35966 34.7404 3.12516 34.7386C2.38072 34.7386 1.72933 34.4706 1.171 33.9346C0.612663 33.3986 0.333496 32.736 0.333496 31.9469Z" fill="#808080"/>
  </svg> 
  : 
  <svg width={35} height={35} viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.333496 31.9469V3.05315C0.333496 2.26218 0.612663 1.59869 1.171 1.06269C1.72933 0.526693 2.38072 0.259623 3.12516 0.261484C3.3578 0.261484 3.60254 0.295915 3.85937 0.364776C4.1162 0.433638 4.36001 0.53879 4.59079 0.680235L27.3429 15.1271C27.7616 15.4063 28.0762 15.7552 28.2865 16.174C28.4968 16.5927 28.601 17.0347 28.5991 17.5C28.5991 17.9653 28.4949 18.4073 28.2865 18.8261C28.078 19.2448 27.7635 19.5938 27.3429 19.8729L4.59079 34.3198C4.35815 34.4594 4.11434 34.5646 3.85937 34.6353C3.6044 34.706 3.35966 34.7404 3.12516 34.7386C2.38072 34.7386 1.72933 34.4706 1.171 33.9346C0.612663 33.3986 0.333496 32.736 0.333496 31.9469Z" fill="#6A80CF"/>
  </svg> 
  ;
  const changePage = () => {
    nav(route);
  };

  return (
    <div>
      <button className="card" disabled={bDisabled} >
        <div className="image-box">
          <img className="image" src={pic}/>
           </div>
           <div className="content-home">
        <div className="content-title">
      {label}
       </div>
       <div className="content-text">
        {"20 words"}
         </div>
       <div className="line">  </div>
       </div>
      <button className="card-button" onClick={changePage} disabled={bDisabled} >
        {arrow}
      </button>
      </button>
    </div>
  );
}

/**
 * StatsButton - Displays basic user stats
 */
function StatsButton({ label }) {
  return (
    <div>
      <button>{label}</button>
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
      <StatsButton
        label={
          sessionStorage.getItem("dayStreak").toLocaleString() + " Day Streak!"
        }
      />
      <StatsButton
        label={
          sessionStorage.getItem("wordPerc").toLocaleString() + "% of All Words"
        }
      />
      <StatsButton
        label={
          sessionStorage.getItem("wordRate").toLocaleString() + " Words/Day"
        }
      />
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
  } else {
    return sessionStorage.getItem("dayStreak");
  }
}

function GenerateWordPercent() {
  if (sessionStorage.key(3) === null) {
    var val = GetRandomInt(30, 60);
    sessionStorage.setItem("wordPerc", val);
    return val;
  } else {
    return sessionStorage.getItem("wordPerc");
  }
}

function GenerateWordRate() {
  if (sessionStorage.key(4) === null) {
    var val = GetRandomInt(4, 9);
    sessionStorage.setItem("wordRate", val);
    return val;
  } else {
    return sessionStorage.getItem("wordRate");
  }
}

function GenerateWordCount() {
  if (sessionStorage.key(5) === null) {
    var val = GetRandomInt(35, 75);
    sessionStorage.setItem("wordCount", val);
    return val;
  } else {
    return sessionStorage.getItem("wordCount");
  }
}

function Home() {
  var currentUsername = sessionStorage.getItem("username");
  var bGuest = currentUsername === "Guest User";

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
    <div className="home">
      <Header />
      {/* Navigation Buttons */}
      {/* currentUsername.charAt(0).toLocaleUpperCase() + currentUsername.slice(1) */}
      <div className="top-heading">
        <h4>Welcome {currentUsername.toLocaleUpperCase()}</h4>
      </div>
      <div className="top-btn-container">
        {/*<ChangePageButton to="/" label="LOG OUT" />*/}
      </div>
      <div className="home-page-content">
      <div className="category-card-container">
        {/* TODO: @CS, remove the para tag below, Category buttons */}
        {categoryList.map(category => (
          <CategoryButton key={category.id} label={category.categoryName} bDisabled={category.routePage === ""} route={category.routePage} pic={category.img} />
        ))}
        </div>
        <div className="panel">
        <LearnButton bGuestUser={bGuest} />
        <img className="stats.img" src={streak}/>
        <img className="stats.img" src={progress}/>
        <img className="stats.img" src={chart}/> 
        </div>
        
      </div>
      <div className="stats-btn-container">
        {bGuest ? null : <StatsDisplay />}
      </div>
    </div>
  );
}

export default Home;
