import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPwdRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(true);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(true);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validConfirmPwd, setValidConfirmPwd] = useState(true);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const USER_REGEX = /^[a-zA-Z0-9_]{3,20}$/; // username regex
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email regex

  const validateUsername = () => {
    setValidName(USER_REGEX.test(username));
  };

  const validateEmail = () => {
    setValidEmail(EMAIL_REGEX.test(email));
  };

  const validatePassword = () => {
    setValidPwd(pwd.length >= 6);
  };

  const validateConfirmPassword = () => {
    setValidConfirmPwd(confirmPwd === pwd);
  };

  const HandleRegister = async (e) => {
    e.preventDefault();

    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
  
    if (validName && validEmail && validPwd && validConfirmPwd) {
      // All fields are correct
      try {
        let response = await axios.post('http://127.0.0.1:8000/api/register', {
          name: username,
          email: email,
          password: pwd,
        });
  
        // Handle a successful registration response here, e.g., display a success message.
        console.log(response.data);
        setSuccess("Registration successful!");
  
        // Clear the form fields
        setUsername("");
        setEmail("");
        setPwd("");
        setConfirmPwd("");
      } catch (error) {
        // Handle registration error (e.g., display an error message).
        console.error(error);
        setErrMsg("There is an error sorry");
      }
    }
  };
  

  return (
    <div className="center-card">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Welcome to our website</h3>
            <br />
            <form onSubmit={HandleRegister}>
              <div className="form-group">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  className={`form-control ${validName ? "" : "is-invalid"}`}
                  id="Username"
                  name="name"
                  placeholder="Enter your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={validateUsername}
                  ref={userRef}
                />
                {!validName && <div className="invalid-feedback">Invalid username</div>}
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className={`form-control ${validEmail ? "" : "is-invalid"}`}
                  id="Email"
                  name="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                  ref={emailRef}
                />
                {!validEmail && <div className="invalid-feedback">Invalid email</div>}
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${validPwd ? "" : "is-invalid"}`}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onBlur={validatePassword}
                  ref={passwordRef}
                />
                {!validPwd && <div className="invalid-feedback">Password must be at least 6 characters long broskie</div>}
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm your password</label>
                <input
                  type="password"
                  className={`form-control ${validConfirmPwd ? "" : "is-invalid"}`}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  onBlur={validateConfirmPassword}
                  ref={confirmPwdRef}
                />
                {!validConfirmPwd && <div className="invalid-feedback">Passwords not match</div>}
              </div>
              <br />
              <button type="submit" className="btn btn-primary btn-block" style={{ width: "100%" }}>
                Register
              </button>
              <p className="text-center">
                Do you have an account? <Link to="/login">Click here to login</Link>
              </p>
            </form>
            {errMsg && (
              <div className="alert alert-danger" role="alert" ref={errorRef}>
                {errMsg}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-3">
          <Link to="/">Return to home</Link>
        </div>
      </div>
    </div>
  );
}
