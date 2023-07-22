import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AnalysisModal from "./AnalysisModal";
import AnalysisList from "./AnalysisList";
const Analysis = () => {
  const [Analysis, setAnalysis] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const getAnalysis = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8800/api/analysis/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnalysis(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAnalysis();
  }, []);
  return (
    <div>
      <div class="card">
        <div class="card-header py-3">
          <h6 class="mb-0">Ajouter analyse biologique</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-lg-4 d-flex">
              <div class="card border shadow-none w-100">
                <div class="card-body">
                  <AnalysisModal getAnalysis={getAnalysis} />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-8 d-flex">
              <div class="card border shadow-none w-100">
                <div class="card-body">
                  <AnalysisList Analysis={Analysis} getAnalysis={getAnalysis} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
