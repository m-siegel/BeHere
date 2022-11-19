// By Mea

import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "../../stylesheets/BasePage.css";

function BasePage(props) {
  return (
    <div className="BasePage">
      <div className="container-fluid">
        <header>
          <Navbar currPage={props.currPage}></Navbar>
        </header>
        <main>{props.children}</main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
}

export default BasePage;
