import "./register.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

function Register() {
  const [registerResponse, setRegisterResponse] = useState();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don't math!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
        setRegisterResponse(err.response.data.message);
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Feicebook</h3>
          <span className="loginDesc">
            Connect with your Friends with Feicebook!
          </span>
        </div>
        <form className="loginRight" onSubmit={(e) => handleSubmit(e)}>
          <div className="loginBox">
            <input
              placeholder="Username"
              ref={username}
              minLength="4"
              maxLength="20"
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              minLength="8"
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              type="password"
              minLength="8"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              {" "}
              Sign Up
            </button>
            {!registerResponse ? null : (
              <div className="registerResponse">{registerResponse}</div>
            )}
            <Link to="login">
              <button className="loginRegisterButton" type="button">
                Log in
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
