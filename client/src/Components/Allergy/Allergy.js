import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AllergyModal from "./AllergyModal";
import AllergiesList from "./AllergiesList";
const Allergy = () => {
  const [Allergies, setAllergies] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const getAllergies = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8800/api/allergy/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllergies(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllergies();
  }, []);
  return (
    <div>
      <div class="card">
        <div class="card-header py-3">
          <h6 class="mb-0">Ajouter allergy</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-lg-4 d-flex">
              <div class="card border shadow-none w-100">
                <div class="card-body">
                  <AllergyModal getAllergies={getAllergies} />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-8 d-flex">
              <div class="card border shadow-none w-100">
                <div class="card-body">
                  <AllergiesList Allergies={Allergies} getAllergies={getAllergies} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allergy;
