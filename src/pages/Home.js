import ChangePageButton from "./ChangePageButton";

function Home() {
  return <div>Home
    {/* Navigation Buttons */}
      <div className="button-container">
        <ChangePageButton to="/welcome" label="Go to Welcome" />
        <ChangePageButton to="/" label="Go to Home" />
        <ChangePageButton to="/account" label="Go to Account" />
        <ChangePageButton to="/pick-word" label="Go to Pick-word" />
        <ChangePageButton to="/introduce" label="Go to Introduce words" />
        <ChangePageButton to="/fill-blank" label="Go to Fill in the blanks" />
        <ChangePageButton to="/sentence" label="Go to Make a sentence" />
        <ChangePageButton to="/connect-words" label="Go to Connect-words" />
        <ChangePageButton to="/welcome" label="LOG OUT" />
      </div>
  </div>;
}

export default Home;
