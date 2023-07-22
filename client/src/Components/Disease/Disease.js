import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DiseaseModal from "./DiseaseModal";
import DiseasesList from "./DiseasesList";
const Disease = () => {
  const [Diseases, setDiseases] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const getDiseases = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8800/api/disease/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDiseases(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDiseases();
  }, []);
  return (
    <div>
      <div class="card">
        <div class="card-header py-3">
          <h6 class="mb-0">Ajouter maladie</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-lg-4 d-flex">
              <div class="card border shadow-none w-100">
                <div class="card-body">
                  <DiseaseModal getDiseases={getDiseases} />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-8 d-flex">
              <div class="card border shadow-none w-100">
                <div class="card-body">
                  <DiseasesList Diseases={Diseases} getDiseases={getDiseases} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disease;
