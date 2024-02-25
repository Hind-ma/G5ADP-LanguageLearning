import { useNavigate } from "react-router-dom";
import ChangePageButton from "./ChangePageButton";
import "./Home.css";
import { GetRandomInt } from "../utils";

/**
 * categoryList
 * 
 * NOTE: Temporary category list for the demo/MVP.
 * I'm using routePage to determine the button disable state.
 * This is *NOT* a good solution but probably will do for now.
 */
export const categoryList = [
  {id: 0, categoryName: "Generic", routePage: "/learn"},
  {id: 0, categoryName: "Supermarket", routePage: ""},
  {id: 0, categoryName: "Sports", routePage: ""},
  {id: 0, categoryName: "Travel", routePage: ""},
  {id: 0, categoryName: "Music", routePage: ""},
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

function StatsButton({label}) {
  return (
    <div>
      <button>
        {label}
      </button>
    </div>
  );
}

function Home() {
  var currentUsername = sessionStorage.getItem('username');
  var bGuest = currentUsername === 'Guest User';
  
  return (
  <div>
      {/* Navigation Buttons */}
      {/* currentUsername.charAt(0).toLocaleUpperCase() + currentUsername.slice(1) */}
      <div className="top-heading">
        <h4>Welcome {currentUsername.toLocaleUpperCase()}</h4>
      </div>
      <div className="top-btn-container">
        <ChangePageButton to="/account" label={bGuest ? "Guest Home" : currentUsername.toLocaleUpperCase() + "'s Home"} />
        <ChangePageButton to="/" label="LOG OUT" />
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
        {/* TODO: @CS, remove the para tag below, placeholder stats, Stats */}
        <p>Stats</p>
        <StatsButton label={bGuest ? "0 Day Streak" : GetRandomInt(1, 7).toLocaleString() +  " Day Streak!"} />
        <StatsButton label={bGuest ? "0 % of All Words" : GetRandomInt(30, 60).toLocaleString() + "% of All Words"} />
        <StatsButton label={bGuest ? "0 Words/Day" : GetRandomInt(4, 9).toLocaleString() + " Words/Day"} />
      </div>
  </div>
  );
}

export default Home;
