import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

function BasePage(props) {
  return (
    <div className="container-fluid">
      <header>
        <Navbar currPage={props.currPage}></Navbar>
      </header>
      <main>{props.children}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default BasePage;
