import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm.jsx";
import Navbar from "../components/Navbar.jsx";

function Homepage() {
	return (
		<div className="homepage">
			<Navbar />
			<div className="container">
				<h1 className="title">Welcome to BeHere</h1>
				<Row className="flex">
					<Col className="prompt" xs={6}>
						<Link className="btn btn-primary" to="./signupPage">
								Go to sign up page
						</Link>
						<Link className="btn btn-primary" to="./feedPage">
								Go to the feed page
						</Link>
					</Col>
					<Col className="prompt" xs={6}>
						<LoginForm />
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default Homepage;