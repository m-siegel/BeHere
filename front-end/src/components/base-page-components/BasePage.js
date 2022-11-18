// By Mea

import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "../../stylesheets/BasePage.css";

function BasePage(props) {
  return (
    <div>
      <header>
        <Navbar currPage={props.currPage}></Navbar>
      </header>
      <main className="container-fluid">{props.children}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default BasePage;
