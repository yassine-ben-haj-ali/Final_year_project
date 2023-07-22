import React, { useState } from "react";
import LoginImg from "../assets/error/login-img.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";

const AdminRegister = () => {
    const [registerData, setRegisterData] = useState({
        Firstname: "",
        Lastname: "",
        Email: "",
        Password: "",
        Gender: "",
        Role:"admin"
      });
      const [error, setError] = useState("");
    
      const navigate = useNavigate();
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:8800/api/auth/register",
            { ...registerData}
          );
          navigate("/admin/auth/login");
        } catch (error) {
          if (error.response && error.response.data) {
            setError(error.response.data.message);
          }
        }
      };
    
     
      const handleChange = (event) => {
        setRegisterData({
          ...registerData,
          [event.target.name]: event.target.value,
        });
      };
    return (
    <div>
        <div class="wrapper">
      <main class="authentication-content">
        <div class="container-fluid ">
          <div class="authentication-card authentication-register">
            <div class="card shadow rounded-0 ">
              <div class="row  g-0">
                <div class="col-lg-6 bg-login d-flex align-items-center justify-content-center">
                  <img src={LoginImg} class="img-fluid" alt="" />
                </div>
                <div class="col-lg-6">
                  <div class="card-body p-3 p-sm-5">
                    <h5 class="card-title mb-4">Sign Up</h5>

                    <form
                      class="form-body "
                      onSubmit={(event) => handleSubmit(event)}
                    >
                      <div class="row g-3">
                        <div class="col-12 ">
                          <label htmlFor="inputFirstName" class="form-label">
                            First name
                          </label>
                          <div class="ms-auto position-relative">
                            <div class="position-absolute top-50 translate-middle-y search-icon px-3">
                              <i class="bi bi-person-circle"></i>
                            </div>
                            <input
                              class="form-control radius-30 ps-5"
                              type="text"
                              placeholder="first name"
                              id="inputFirstName"
                              name="Firstname"
                              onChange={(event) => handleChange(event)}
                            />
                          </div>
                        </div>
                        <div class="col-12 ">
                          <label htmlFor="inputLastName" class="form-label">
                            Last name
                          </label>
                          <div class="ms-auto position-relative">
                            <div class="position-absolute top-50 translate-middle-y search-icon px-3">
                              <i class="bi bi-person-circle"></i>
                            </div>
                            <input
                              class="form-control radius-30 ps-5"
                              type="text"
                              placeholder="last name"
                              id="inputLastName"
                              name="Lastname"
                              onChange={(event) => handleChange(event)}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="Gender"
                              id="inlineRadio1"
                              value="male"
                              onChange={(event) => handleChange(event)}
                            />
                            <label
                              class="form-check-label"
                              htmlFor="inlineRadio1"
                            >
                              Male
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="Gender"
                              id="inlineRadio2"
                              value="female"
                              onChange={(event) => handleChange(event)}
                            />
                            <label
                              class="form-check-label"
                              htmlFor="inlineRadio2"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <label
                            htmlFor="inputEmailAddress"
                            className="form-label"
                          >
                            Email Address
                          </label>
                          <div className="ms-auto position-relative">
                            <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                              <i className="bi bi-envelope-fill"></i>
                            </div>
                            <input
                              type="email"
                              className="form-control radius-30 ps-5"
                              id="inputEmailAddress"
                              placeholder="Email Address"
                              name="Email"
                              onChange={(event) => handleChange(event)}
                            />
                          </div>
                        </div>
                        <div class="col-12">
                          <label for="inputChoosePassword" class="form-label">
                            Enter Password
                          </label>
                          <div class="ms-auto position-relative">
                            <div class="position-absolute top-50 translate-middle-y search-icon px-3">
                              <i class="bi bi-lock-fill"></i>
                            </div>
                            <input
                              type="password"
                              class="form-control radius-30 ps-5"
                              id="inputChoosePassword"
                              placeholder="Enter Password"
                              name="Password"
                              onChange={(event) => handleChange(event)}
                            />
                          </div>
                        </div>
                        {error && (
                          <Alert
                            Type="text-danger"
                            Text={error}
                            Icon="bi-x-circle-fill"
                          />
                        )}

                        <div class="col-12">
                          <div class="d-grid">
                            <button
                              type="submit"
                              class="btn btn-primary radius-30"
                            >
                              Sign up
                            </button>
                          </div>
                        </div>

                        <div class="col-12">
                          <p class="mb-0">
                            Already have an account?{" "}
                            <a href="/admin/auth/login">Sign in here</a>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default AdminRegister




