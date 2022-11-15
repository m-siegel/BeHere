import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div>
			<nav className="navbar bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="#">Default</Link>
				</div>	
			</nav>
		</div>
	);
}

export default Navbar;