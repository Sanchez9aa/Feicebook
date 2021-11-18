import { useRef, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState();
  const email = useRef();
  const password = useRef();

  const auth = useSelector((state) => state);

  const dispatch = useDispatch();
  const { isFetching } = auth.auth;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
      setLogin
    );
  };

  return (
    <form className="login" onSubmit={(e) => handleSubmit(e)}>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Feicebook</h3>
          <span className="loginDesc">
            Connect with your Friends with Feicebook!
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email"
              type="email"
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              minLength="6"
              ref={password}
              className="loginInput"
            />
            <button className="loginButton">
              {isFetching ? (
                <CircularProgress primary="white" size="18px" />
              ) : (
                "Log in"
              )}
            </button>
            {!login ? null : <div className="loginResponse">{login}</div>}
            <span className="loginForgot">Forgot Password?</span>
            <Link to={"/register"}>
              <button className="loginRegisterButton">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
