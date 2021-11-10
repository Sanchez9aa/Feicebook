import {useRef} from 'react'
import './login.css'
import {loginCall} from '../../apiCalls'
import { useSelector, useDispatch } from 'react-redux'
import {CircularProgress} from "@material-ui/core"


function Login() {

  const email = useRef()
  const password = useRef()

  const auth = useSelector((state) => state)
  
  const dispatch = useDispatch()
  const {isFetching} = auth.auth

  const handleSubmit = (e) => {
    e.preventDefault()
    loginCall({email: email.current.value, password: password.current.value}, dispatch)
  } 

  return (
    <form className="login" onSubmit={(e) => handleSubmit(e)}>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Feicebook</h3>
          <span className="loginDesc">Connect with your Friends with Feicebook!</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" type="email" ref={email} className="loginInput" />
            <input placeholder="Password" type="password" minLength="6" ref={password} className="loginInput" />
            <button className="loginButton">
              {isFetching ? <CircularProgress color="white" size="18px" /> : "Log in"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Register</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login
