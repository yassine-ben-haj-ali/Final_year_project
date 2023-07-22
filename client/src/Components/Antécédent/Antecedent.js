import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import AntecedentModal from "./AntecedentModal";
import AntecedentsList from "./AntecedentsList";

const Antecedent = () => {
  const [Antecedents, setAntecedents] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const getAntecedents = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8800/api/antecedent/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAntecedents(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAntecedents();
  }, []);

  return (
    <div>
      <div class="card">
        <div class="card-header py-3">
          <h6 class="mb-0">Ajouter antécédents familiaux</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-lg-4 d-flex">
              <div class="card border shadow-none w-100">
                <div class="card-body">
                  <AntecedentModal getAntecedents={getAntecedents} />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-8 d-flex">
              <div class="card border shadow-none w-100">
                <div class="card-body">
                  <AntecedentsList Antecedents={Antecedents} getAntecedents={getAntecedents} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Antecedent;
