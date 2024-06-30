import { useContext, useRef, useState } from "react";
import "./login.css"
import { loginCall } from "../../../apiCalls";
import {AuthContext} from "../../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user , isFetching , error , dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleClick = (e)=>{
    e.preventDefault();
    loginCall({email : email.current.value, password : password.current.value} , dispatch)
  }
  const handleRegisterClick = () => {
    navigate("/register");
  };

const togglePasswordVisibility = () => {
  setShowPassword((prevShowPassword) => !prevShowPassword);
};
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">ConnectEdge</h3>
            <span className="loginDesc">
                Connect with Friends and the World around you on Dhiva Social!
            </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Email" type = "email" required className="loginInput" ref = {email} autoComplete="current-password"/>
                <div className="passwordInputContainer">
              <input
                placeholder="Password"
                required
                type={showPassword ? "text" : "password"}
                minLength={6}
                className="loginInput"
                ref={password}
                autoComplete="current-password"
              />
              {showPassword ? (
                <VisibilityOff
                  className="passwordVisibilityIcon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Visibility
                  className="passwordVisibilityIcon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginButton" disabled={isFetching} >{isFetching? <CircularProgress color="inherit"/> : "Log In"}</button>
                <button
              type="button"
              className="loginRegisterButton"
              disabled={isFetching}
              onClick={handleRegisterClick}
            >
              {isFetching ? <CircularProgress color="inherit" /> : "Create a new account"}
            </button>
            </form>
        </div>
      </div>
    </div>
  )
}
