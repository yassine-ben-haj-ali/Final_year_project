import { useSelector } from "react-redux";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import PatientProfile from "./Pages/PatientProfile";
import DoctorProfile from "./Pages/DoctorProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Doctors from "./Pages/Doctors";
import Patients from "./Pages/Patients";
import EditPatientProfile from "./Pages/EditPatientProfile";
import EditDoctorProfile from "./Pages/EditDoctorProfile";
import AdminLogin from "./Pages/AdminLogin";
import AdminRegister from "./Pages/AdminRegister";
import AdminProfile from "./Pages/AdminProfile";
import RegistrationRequests from "./Pages/RegistrationRequests";
import Chat from "./Pages/Chat";
import ApprovedPatients from "./Components/ApprovedPatients";
import Users from "./Pages/Users";
import MedicalFolder from "./Pages/MedicalFolder";
import Allergy from "./Components/Allergy/Allergy";
import Disease from "./Components/Disease/Disease";
import Analysis from "./Components/Analysis/Analysis";
import Radiography from "./Components/Radiography/Radiography";
import Antecedent from "./Components/Antécédent/Antecedent";
import PendingFollowers from "./Pages/PendingFollowers";
function App() {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path="/admin/auth/register"
          element={
            !token ? (
              <AdminRegister />
            ) : user.role != "admin" ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role === "patient" && <PatientProfile />}
                  {user.role === "doctor" && <DoctorProfile />}
                </main>
              </div>
            ) : (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <AdminProfile />
                </main>
              </div>
            )
          }
        />
        <Route
          path="/admin/features/registration"
          element={
            !token ? (
              <Login />
            ) : user.role != "admin" ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role === "patient" && <PatientProfile />}
                  {user.role === "doctor" && <DoctorProfile />}
                </main>
              </div>
            ) : (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <RegistrationRequests />
                </main>
              </div>
            )
          }
        />
        <Route
          path="/admin/features/users"
          element={
            !token ? (
              <Login />
            ) : user.role != "admin" ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role === "patient" && <PatientProfile />}
                  {user.role === "doctor" && <DoctorProfile />}
                </main>
              </div>
            ) : (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <Users/>
                </main>
              </div>
            )
          }
        />
        <Route
          path="/admin/auth/login"
          element={
            !token ? (
              <AdminLogin />
            ) : user.role != "admin" ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role === "patient" && <PatientProfile />}
                  {user.role === "doctor" && <DoctorProfile />}
                </main>
              </div>
            ) : (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <AdminProfile />
                </main>
              </div>
            )
          }
        />

        
        <Route
          path="/"
          element={
            !token ? (
              <Login />
            ) : (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role == "patient" && <PatientProfile />}
                  {user.role == "doctor" && <DoctorProfile />}
                  {user.role == "admin" && <AdminProfile />}
                  
                </main>
              </div>
            )
          }
        />
        <Route
          path="/chat"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <Chat />
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            !token ? (
              <Register />
            ) : (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role == "patient" && <PatientProfile />}
                  {user.role == "admin" && <AdminProfile />}
                  {user.role == "doctor" && <DoctorProfile />}
                </main>
              </div>
            )
          }
        />
        <Route
          path="/doctors/:DoctorID"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <DoctorProfile />
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/followers"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <PendingFollowers />
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
        
        <Route
          path="/patients/:PatientID"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <PatientProfile />
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/doctor/search"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <Doctors />
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/patient/edit"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <EditPatientProfile />
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/doctor/edit"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <EditDoctorProfile />
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/allergy"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role=="patient"&&<Allergy />}
                  {user.role=="admin"&&<AdminProfile />}
                  {user.role=="doctor"&&<DoctorProfile />}
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
         <Route
          path="/diseases"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role=="patient"&&<Disease />}
                  {user.role=="admin"&&<AdminProfile />}
                  {user.role=="doctor"&&<DoctorProfile />}
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
         <Route
          path="/analysis"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role=="patient"&&<Analysis />}
                  {user.role=="admin"&&<AdminProfile />}
                  {user.role=="doctor"&&<DoctorProfile />}
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
         <Route
          path="/radiography"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role=="patient"&&<Radiography />}
                  {user.role=="admin"&&<AdminProfile />}
                  {user.role=="doctor"&&<DoctorProfile />}
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
         <Route
          path="/antecedents"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  {user.role=="patient"&&<Antecedent />}
                  {user.role=="admin"&&<AdminProfile />}
                  {user.role=="doctor"&&<DoctorProfile />}
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/patient/search"
          element={
            token ? (
              <div className="wrapper">
                <Header />
                <Drawer />
                <main className="page-content">
                  <Patients />
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
