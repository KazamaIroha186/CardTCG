import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import './style/Signup.css';

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
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);

      navigate("/login");
    }).catch((error) => {
      console.error("Error during signup:", error);
      alert("Signup failed! Please try again.");
    });
  };

  return (
    <div className="container">
      <div className="signupContainer">
        <div className="text">SIGN UP</div>
        <div className="login">Have we met? <a href="/login">Login</a></div>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <Field 
              name="email" 
              placeholder="Email..." 
              className="inputField"
            />
            <ErrorMessage name="email" component="span" className="errorMessage" />

            <Field 
              name="username" 
              placeholder="Username..." 
              className="inputField"
            />
            <ErrorMessage name="username" component="span" className="errorMessage" />

            <Field 
              type="password" 
              name="password" 
              placeholder="Password..." 
              className="inputField"
            />
            <ErrorMessage name="password" component="span" className="errorMessage" />

            <button type="submit" className="submitButton">Sign Up</button>
          </Form>
        </Formik>
      </div>

      <div className="imageContainer"></div>
    </div>
  );
}

export default Signup;
