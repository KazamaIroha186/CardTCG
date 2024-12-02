import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    username: Yup.string().min(3, "Too short!").max(15, "Too long!").required("Username is required"),
    password: Yup.string().min(4, "Too short!").max(20, "Too long!").required("Password is required"),
  });

  const onSubmit = (data) => {
    axios.post("https://tcg-collection.onrender.com/user/register", data).then(() => {
      console.log(data);
      navigate("/login");
    }).catch((error) => {
      console.error("Error during signup:", error);
      alert("Signup failed! Please try again.");
    });
  };

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-form-section">
          <div className="text">SIGN UP</div>
          <div className="login">Have we met? <Link to="/login">Login</Link></div>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="auth-form">
              <Field 
                name="email" 
                placeholder="Email..." 
                className="auth-input"
              />
              <ErrorMessage name="email" component="span" className="error-message" />

              <Field 
                name="username" 
                placeholder="Username..." 
                className="auth-input"
              />
              <ErrorMessage name="username" component="span" className="error-message" />

              <Field 
                type="password" 
                name="password" 
                placeholder="Password..." 
                className="auth-input"
              />
              <ErrorMessage name="password" component="span" className="error-message" />

              <button type="submit" className="auth-button">Sign Up</button>
            </Form>
          </Formik>
        </div>
        <div className="auth-image-section"></div>
      </div>
    </div>
  );
}

export default Signup;
