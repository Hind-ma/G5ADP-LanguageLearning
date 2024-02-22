import ChangePageButton from "./ChangePageButton";

function LearnButton({bGuestUser}) {
  const item = bGuestUser ? "Start Learning" : "Continue Learning";
  return (
    <div>
      <button>
        {item}
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
      <div>
        <h4>Welcome {currentUsername.toLocaleUpperCase()}</h4>
      </div>
      <div className="button-container">
        {/*<ChangePageButton to="/" label="Go to Welcome page" />*/}
        {/*<ChangePageButton to="/home" label="Go to Home page" />*/}
        {/*<ChangePageButton to="/home" label={bGuest ? "Guest Home" : currentUsername.toLocaleUpperCase()} />*/}
        <ChangePageButton to="/account" label={bGuest ? "Guest Home" : currentUsername.toLocaleUpperCase()} />
        <LearnButton bGuestUser={bGuest} />
        <ChangePageButton to="/introduce" label="Introduce words" />
        <ChangePageButton to="/pick-word" label="Word Translation" />
        <ChangePageButton to="/fill-blank" label="Fill In The Blanks" />
        <ChangePageButton to="/TranslateSentence" label="Translate Sentence" />
        <ChangePageButton to="/create-sen" label="Make A Sentence" />
        <ChangePageButton to="/connect-words" label="Match Words" />
        <ChangePageButton to="/" label="LOG OUT" />
      </div>
  </div>
  );
}

export default Home;
