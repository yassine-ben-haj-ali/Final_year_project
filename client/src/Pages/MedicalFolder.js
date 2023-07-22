// import React, { useState } from "react";
// import { Button, Menu, MenuProps } from "antd";
// import Allergy from "../Components/Allergy/Allergy";
// import Disease from "../Components/Disease/Disease";
// import Antecedent from "../Components/Antécédent/Antecedent";
// import Radiography from "../Components/Radiography/Radiography";
// import Analysis from "../Components/Analysis/Analysis";

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }

// const items = [
//   getItem("Maladies", "Maladies"),
//   getItem("Analyses", "Analyses"),
//   getItem("Examens radiologique", "radiologique"),
//   getItem("Allergies/intolérences", "Allergies"),
//   getItem("Antécédent familiaux", "Antécédents"),
// ];

// const MedicalFolder = () => {
//   const [key, setKey] = useState("Maladies");
//   const onClick = (e) => {
//     setKey(e.key);
//   };
//   return (
//     <div>
//       <div className="row">
//         <div className="col-md-3">
//           <div style={{ width: 256 }}>
//             <Menu
//               onClick={onClick}
//               defaultSelectedKeys={["Résumé du dossier médical"]}
//               mode="inline"
//               theme="light"
//               items={items}
//             />
//           </div>
//         </div>
//         <div className="col-md-9">
//           {key === "Allergies" && <Allergy />}
//           {key === "Maladies" && <Disease />}
//           {key === "Antécédents" && <Antecedent />}
//           {key === "radiologique" && <Radiography />}
//           {key === "Analyses" && <Analysis />}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicalFolder;
