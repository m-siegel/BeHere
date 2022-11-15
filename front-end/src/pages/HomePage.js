import BasePage from "../building-blocks/BasePage.js";

function Home() {
  return (
    <BasePage>
      <h1>Home</h1>
      <p>Some paragrap text</p>
      <button onClick={() => fetch("/test")}>
        Testing some backend route. Should print "got request" to console.
      </button>
    </BasePage>
  );
}

export default Home;
