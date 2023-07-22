import React, { useState } from "react";
import LoginImg from "../assets/error/login-img.jpg";
import { login } from "../Actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Components/Alert";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const [Data, setData] = useState({
    Email: "",
    Password: "",
    Role: "admin",
  });
  const Error = useSelector((state) => state.auth.error);
  const handleChange = (event) => {
    setData({ ...Data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(Data));
  };
  return (
    <div>
      <div class="wrapper">
        <main class="authentication-content">
          <div class="container-fluid">
            <div class="authentication-card">
              <div class="card shadow rounded-0 overflow-hidden">
                <div class="row g-0">
                  <div class="col-lg-6 bg-login d-flex align-items-center justify-content-center">
                    <img src={LoginImg} class="img-fluid" alt="" />
                  </div>
                  <div class="col-lg-6">
                    <div class="card-body p-4 p-sm-5">
                      <h5 class="card-title">Sign In</h5>
                      <p class="card-text mb-5">
                        See your growth and get consulting support!
                      </p>
                      <form
                        class="form-body"
                        onSubmit={(event) => {
                          handleSubmit(event);
                        }}
                      >
                        <div class="row g-3">
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
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="inputChoosePassword"
                              className="form-label"
                            >
                              Enter Password
                            </label>
                            <div className="ms-auto position-relative">
                              <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                                <i className="bi bi-lock-fill"></i>
                              </div>
                              <input
                                type="password"
                                className="form-control radius-30 ps-5"
                                id="inputChoosePassword"
                                placeholder="Enter Password"
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                name="Password"
                              />
                            </div>
                          </div>
              
                          {Error && (
                            <Alert
                              Type="text-danger"
                              Text={Error}
                              Icon="bi-x-circle-fill"
                            />
                          )}
                          <div class="col-12">
                            <div class="d-grid">
                              <button
                                type="submit"
                                class="btn btn-primary radius-30"
                              >
                                Sign In
                              </button>
                            </div>
                          </div>
                          <div class="col-12">
                            <p class="mb-0">
                              Don't have an account yet?{" "}
                              <a href="/">Sign up here</a>
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
  );
};

export default AdminLogin;
