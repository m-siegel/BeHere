import React from "react";
import { Link } from "react-router-dom";
// TODO: should change <a> to link, but then it won't render

// Change "a" to "Link"
function Navbar(props) {
  // TODO: change active based on props
  return (
    <nav className="row">
      <div className="col-3">
        <a className="nav-a active" aria-current="page" href="/home">
          Home
        </a>
      </div>
      <div className="col-3">
        <a className="nav-a " aria-current="page" href="/create">
          Create
        </a>
      </div>
      <div className="col-3">
        <a className="nav-a " aria-current="page" href="/dashboard">
          Dashboard
        </a>
      </div>
      <div className="col-3">
        {/* TODO: his will be a dropdown for settings and logout */}
        <a className="nav-a " aria-current="page" href="/userSettings">
          Me
        </a>
      </div>
    </nav>
    // TODO: get this working
    // TODO: style
    // <nav className="navbar navbar-expand-lg bg-light">
    //   <div className="container-fluid">
    //     <ul className="row navbar-nav">
    //       <li className="nav-item col-3">
    //         <a className="nav-a active" aria-current="page" href="#">
    //           Home
    //         </a>
    //       </li>

    //       <li className="nav-item col-3">
    //         <a className="nav-a active" aria-current="page" href="#">
    //           Create
    //         </a>
    //       </li>

    //       <li className="nav-item col-3">
    //         <a className="nav-a active" aria-current="page" href="#">
    //           Dashboard
    //         </a>
    //       </li>

    //       <li className="nav-item col-3">
    //         <a className="nav-a active" aria-current="page" href="#">
    //           Me
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}

export default Navbar;
