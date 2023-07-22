// import React from "react";
// import { useNavigate } from "react-router-dom";

// const DoctorSearchCard = ({ doctor }) => {
// const navigate=useNavigate()
//   return (
//     <div>
//       <div class="col">
//         <div class="card border ">
//           <div class="card-body">
//             <div class="row">
//               <div class="col-lg-2 col-md-3 border-0">
//                 <img
//                   src={`http://localhost:8800/Assets/${doctor.Picture}`}
//                   alt=""
//                   width="150px"
//                 />
//               </div>
//               <div className="col-lg-10 col-md-9">
//                 <div class="row">
//                   <div class="col-md-6">
//                     <h6 class="mb-2">{`DR ${doctor.Firstname}`}</h6>
//                     <p class="mb-1">{doctor.Speciality}</p>
//                     <p class="mb-1">{doctor.Email}</p>
//                     <p class="mb-1">
//                       Lorem Ipsum is simply dummy text of the printing and
//                       typesetting industry. Lorem Ipsum has been the industry's
//                       standard dummy text ever since the 1500s, when an unknown
//                       printer...
//                     </p>
//                   </div>
//                   <div className="col-md-6">
//                     <h6 class="mb-2">{`DR ${doctor.Firstname} ${doctor.Lastname}`}</h6>
//                     <p class="mb-1">{doctor.Speciality}</p>
//                     <p class="mb-1">{doctor.Email}</p>
//                     <p class="mb-1">+91-9910XXXXXX</p>
//                     <button
//                       type="button"
//                       class="btn btn-primary px-5"
//                       onClick={() => {
//                         navigate(`/doctors/${doctor._id}`);
//                       }}
//                     >
//                       see more
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorSearchCard;
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorSearchCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="col">
      <div className="card border">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-2 col-md-3 border-0">
              <img
                src={`http://localhost:8800/Assets/${doctor.Picture}`}
                alt="Doctor"
                width="150px"
              />
            </div>
            <div className="col-lg-10 col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="mb-2">{`Dr. ${doctor.Firstname} ${doctor.Lastname}`}</h6>
                  <p className="mb-1">{doctor.Speciality}</p>
                  <p className="mb-1">{doctor.Email}</p>
                  <p className="mb-1">{doctor.Phone}</p>
                  <button
                    type="button"
                    className="btn btn-primary px-5"
                    onClick={() => navigate(`/doctors/${doctor._id}`)}
                  >
                    See More
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearchCard;
