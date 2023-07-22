import React, { useState } from "react";
import Allergy from "./Allergy";
import Disease from "./Disease";
import Antécedants from "./Antécedants";
import Radiography from "./Radiography";
import Analysis from "./Analysis";
import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Maladies", "Maladies"),
  getItem("Analyses", "Analyses"),
  getItem("Examens radiologique", "radiologique"),
  getItem("Allergies/intolérences", "Allergies"),
  getItem("Antécédent familiaux", "Antécédents"),
];

const PatientMedicalFolder = ({ id }) => {
  const [key, setKey] = useState("Allergies");
  const onClick = (e) => {
    setKey(e.key);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <div style={{ width: 200 }}>
            <Menu
              onClick={onClick}
              defaultSelectedKeys={["Allergies"]}
              mode="inline"
              theme="light"
              items={items}
            />
          </div>
        </div>
        <div className="col-md-9">
          {key === "Allergies" && <Allergy id={id} />}
          {key === "Maladies" && <Disease id={id} />}
          {key === "Antécédents" && <Antécedants id={id} />}
          {key === "radiologique" && <Radiography id={id} />}
          {key === "Analyses" && <Analysis id={id} />}
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalFolder;
