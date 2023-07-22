import React, { useState } from "react";
import LoginImg from "../assets/error/login-img.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import { Select } from "antd";
const Register = () => {
  const [showInput, setShowInput] = useState(false);
  const [Role, setRole] = useState("patient");
  const [registerData, setRegisterData] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Gender: "",
    Speciality: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (showInput && !registerData.Speciality) {
      setError("Please select Speciality");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        { ...registerData, Role }
      );
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleToggle = () => {
    setShowInput(!showInput);
    setRole(!showInput ? "doctor" : "patient");
  };
  const handleChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  return (
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
                        <div class="col-12">
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              checked={showInput}
                              onChange={handleToggle}
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              switch the toggle if you are a doctor
                            </label>
                          </div>
                        </div>

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

                        {showInput && (
                          <div class="mb-3 select2-sm">
                            <label class="form-label">speciality</label>

                            <select
                              className="single-select form-select"
                              onChange={(e) => {
                                setRegisterData({
                                  ...registerData,
                                  Speciality: e.target.value,
                                });
                                setError(null);
                              }}
                            >
                              <option value="Cardiologie & Vasculaire (Cœur & Vaisseaux)">
                                Cardiologie & Vasculaire (Cœur & Vaisseaux)
                              </option>
                              <option value="Chirurgie & médecine esthétique (Visage & corps)">
                                Chirurgie & médecine esthétique (Visage & corps)
                              </option>
                              <option value="Dermatologie (Peau)">
                                Dermatologie (Peau)
                              </option>
                              <option value="Endocrinologie & diabétologie (Diabète & autres)">
                                Endocrinologie & diabétologie (Diabète & autres)
                              </option>
                              <option value="Gastro-entérologie (Appareil digestif)">
                                Gastro-entérologie (Appareil digestif)
                              </option>
                              <option value="Gynécologie & Obstétrique">
                                Gynécologie & Obstétrique
                              </option>
                              <option value="Hématologie (sang)">
                                Hématologie (sang)
                              </option>
                              <option value="Hépatologie (foie)">
                                Hépatologie (foie)
                              </option>
                              <option value="Médecine Dentaire (Dents)">
                                Médecine Dentaire (Dents)
                              </option>
                              <option value="Médecine Générale">
                                Médecine Générale
                              </option>
                              <option value="Neurologie (Cerveau et Nerfs)">
                                Neurologie (Cerveau et Nerfs)
                              </option>
                              <option value="Néphrologie  (Reins)">
                                Néphrologie (Reins)
                              </option>
                              <option value="Ophtalmologie (Yeux)">
                                Ophtalmologie (Yeux)
                              </option>
                              <option value="Orthopédie & Traumatologie (Os)">
                                Orthopédie & Traumatologie (Os)
                              </option>
                              <option value="Oto-Rhino-Laryngologie (ORL) (Oreille nez gorge)">
                                Oto-Rhino-Laryngologie (ORL) (Oreille nez gorge)
                              </option>
                              <option value="Pneumologie (Poumons)">
                                Pneumologie (Poumons)
                              </option>
                              <option value="Psychiatrie (Trouble mentaux)">
                                Psychiatrie (Trouble mentaux)
                              </option>
                              <option value="Pédiatrie (Enfant)">
                                Pédiatrie (Enfant)
                              </option>
                              <option value="Rhumatologie (articulations)">
                                Rhumatologie (articulations)
                              </option>
                              <option value="Urologie (appareil urinaire)">
                                Urologie (appareil urinaire)
                              </option>
                              <option value="Cancérologie (cancer)">
                                Cancérologie (cancer)
                              </option>
                              <option value="Autre">Autre</option>
                            </select>
                          </div>
                        )}
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
                            <a href="/">Sign in here</a>
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
  );
};

export default Register;
