import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import loginAtom from "../../atom-user/user.atom";
import './logintest.css';

function Login() {
  const setLogin = useSetRecoilState(loginAtom);
  const navigate = useNavigate();
  
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (data) => {
    axios.post("https://tcg-collection.onrender.com/users/login", data)
      .then((response) => {
        if (response.data) {
          if (data.rememberMe) {
            localStorage.setItem("user-login", JSON.stringify(response.data));
          }
          setLogin(true);
          navigate("/home");
        } else {
          alert("Login failed! Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
      });
  };

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-form-section">
          <div className="text">WELCOME BACK</div>
          <div className="signup">Don't have an account? <Link to="/signup">Sign up</Link></div>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="auth-form">
              <Field 
                type="email" 
                name="email" 
                placeholder="Email..." 
                className="auth-input"
              />
              <ErrorMessage name="email" component="span" className="error-message" />

              <Field 
                type="password" 
                name="password" 
                placeholder="Password..." 
                className="auth-input"
              />
              <ErrorMessage name="password" component="span" className="error-message" />

              <div className="remember-forgot">
                <label>
                  <Field 
                    type="checkbox"
                    name="rememberMe"
                    className="remember-checkbox"
                  />
                  Remember me
                </label>
                <Link to="/forgetpass" className="forgot-password">Forgot Password?</Link>
              </div>

              <button type="submit" className="auth-button">Login</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;