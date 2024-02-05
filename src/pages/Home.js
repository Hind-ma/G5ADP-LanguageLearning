import ChangePageButton from "./ChangePageButton";

function Home() {
  return <div>Home
    {/* Navigation Buttons */}
      <div className="button-container">
        <ChangePageButton to="/welcome" label="Go to Welcome page" />
        <ChangePageButton to="/" label="Go to Home page" />
        <ChangePageButton to="/account" label="Go to Account page" />
        <ChangePageButton to="/pick-word" label="Start session Pick a word" />
        <ChangePageButton to="/introduce" label="Start session Introduce words" />
        <ChangePageButton to="/fill-blank" label="Start session Fill in the blanks" />
        <ChangePageButton to="/sentence" label="Start session Make a sentence" />
        <ChangePageButton to="/connect-words" label="Start session Connect-words" />
        <ChangePageButton to="/welcome" label="LOG OUT" />
      </div>
  </div>;
}

export default Home;
