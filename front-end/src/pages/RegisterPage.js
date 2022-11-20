// By Mea
import "../stylesheets/RegisterPage.css";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div className="RegisterPage">
      <div className="container-fluid">
        <div className="row">
          <div className="col img-col">
            <img
              src="/media/example-images/pexels-do-castle-2158963.jpeg"
              className="img-fluid"
              // src="/pexels-do-castle-2158963.jpeg"
              alt="People biking"
            ></img>
          </div>
          <div className="col form-col">
            <div>
              <h1>Register</h1>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterPage.propTypes = {};

export default RegisterPage;
