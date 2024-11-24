import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <div className="text">WELCOME BACK</div>
        <div className="signup">Don't have an account? <Link to="/signup">Sign up</Link></div>
        
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <div className="remember-forgot">
          <label>
            <input 
              type = "checkbox"
              checked = {rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me  
          </label>
          <Link to = "/forgetpass" className="forgot-password">Forgot Password?</Link>
        </div>

        <button onClick={login}> Login </button>
      </div>

      <div className="imageContainer"></div>
    </div>
  );
}

export default Login;