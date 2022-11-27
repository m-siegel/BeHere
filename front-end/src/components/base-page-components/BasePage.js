// By Mea
import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "../../stylesheets/BasePage.css";

function BasePage(props) {
  return (
    <div className="BasePage">
      <header>
        <Navbar></Navbar>
      </header>
      <div className="container-fluid">
        <main>{props.children}</main>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

BasePage.propTypes = {
  children: PropTypes.oneOfType([
    // https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default BasePage;
