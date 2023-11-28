import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const LogInto = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: password,
        });
        localStorage.setItem('token', response.data.token);
        setEmail("");
        setPassword("");
        navigate("/");
      } catch (error) {
        console.error(error);
        setErrMsg("Invalid email or password");
      }
    } else {
      setErrors(newErrors);
    }
  }

  return (
    <div className="center-card">
            <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Login to get our news</h3>
                <br />
                <form onSubmit={LogInto}>
                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                      type="text"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id="Email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ width: "100%" }}
                  >
                    Login
                  </button>
                  <p className="text-center">
                    Do you want to create an account?{" "}
                    <Link to="/register">Click here to register</Link>
                  </p>
                </form>
                {errMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errMsg}
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
