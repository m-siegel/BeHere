// By Mea
import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "../../stylesheets/BasePage.css";

function BasePage(props) {
  return (
    <div className="BasePage">
      <div className="container-fluid">
        <header>
          <Navbar></Navbar>
        </header>
        <main>{props.children}</main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
}

BasePage.propTypes = {
  children: PropTypes.element,
};

export default BasePage;
