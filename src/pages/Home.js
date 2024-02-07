function Home() {
  var currentUsername = sessionStorage.getItem('username');
  return (
  <>
  <h4>Welcome: {currentUsername}</h4>
  <div>Home</div>
  </>
  );
}

export default Home;
