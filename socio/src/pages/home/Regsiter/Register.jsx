import "./register.css"
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordAgain = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
            <h3 className="registerLogo">ConnectEdge</h3>
            <span className="registerDesc">
                Connect with Friends and the World around you on Dhiva Social!
            </span>
        </div>
        <div className="registerRight">
            <form className="registerBox" onSubmit={handleClick}>
                <input placeholder="Username" className="registerInput" required ref={username}/>
                <input placeholder="Email" className="registerInput" type="email" required ref={email}/>
              <div className="inputWrapper">
              <input
                placeholder="Password"
                className="registerInput"
                type={showPassword ? "text" : "password"}
                minLength="6"
                required
                ref={password}
              />
              <button
                type="button"
                className="togglePasswordButton"
                onClick={toggleShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            <div className="inputWrapper">
              <input
                placeholder="Password Again"
                className="registerInput"
                required
                ref={passwordAgain}
                type={showPasswordAgain ? "text" : "password"}
              />
              <button
                type="button"
                className="togglePasswordButton"
                onClick={toggleShowPasswordAgain}
              >
                {showPasswordAgain ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
                <button className="registerButton" type="submit">Sign Up</button>
                <button
              type="button"
              className="registerRegisterButton"
              onClick={handleLoginClick}
            >
              Log into Account
            </button>
            </form>
        </div>
      </div>
    </div>
  )
}
