import React from "react";
import Logo from "../assets/logo-icon.png";
import { useSelector } from "react-redux";

const Drawer = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <aside class="sidebar-wrapper" data-simplebar="true">
      <div class="sidebar-header">
        <div>
          <img src={Logo} class="logo-icon" alt="logo icon" />
        </div>
        <div>
          <h4 class="logo-text">Medilink</h4>
        </div>
        <div class="toggle-icon ms-auto">
          {" "}
          <i class="bi bi-list"></i>
        </div>
      </div>
      <ul class="metismenu" id="menu">
        {user.role == "patient" && (
          <li>
            <a href="/">
              <div class="parent-icon">
                <i class="bi bi-house-fill"></i>
              </div>
              <div class="menu-title">Profil</div>
            </a>
          </li>
        )}
        {user.role === "admin" && (
          <li>
            <a href="/admin/features/registration">
              <div class="parent-icon">
                <i class="bi bi-house-fill"></i>
              </div>
              <div class="menu-title">Demandes d'inscription</div>
            </a>
          </li>
        )}
         {user.role === "admin" && (
          <li>
            <a href="/admin/features/users">
              <div class="parent-icon">
                <i class="lni lni-users"></i>
              </div>
              <div class="menu-title">users</div>
            </a>
          </li>
        )}
        {user.role == "patient" && (
          <li>
            <a href="/patient/edit">
              <div class="parent-icon">
                <i class="bi bi-person-fill"></i>
              </div>
              <div class="menu-title">compte</div>
            </a>
          </li>
        )}
        {user.role == "patient" && (
          <li>
            <a href="/chat">
              <div class="parent-icon">
                <i class="fadeIn animated bx bx-message"></i>
              </div>
              <div class="menu-title">chat</div>
            </a>
          </li>
        )}
        {user.role == "doctor" && (
          <li>
            <a href="/">
              <div class="parent-icon">
                <i class="bi bi-house-fill"></i>
              </div>
              <div class="menu-title">Profil</div>
            </a>
          </li>
        )}
        {user.role == "doctor" && (
          <li>
            <a href="/doctor/edit">
              <div class="parent-icon">
              <i class="bi bi-person-fill"></i>
              </div>
              <div class="menu-title">compte</div>
            </a>
          </li>
        )}
        {user.role == "doctor" && (
          <li>
            <a href="/chat">
              <div class="parent-icon">
                <i class="fadeIn animated bx bx-message"></i>
              </div>
              <div class="menu-title">chat</div>
            </a>
          </li>
        )}

        {user.role == "doctor" && (
          <li>
            <a href="/patient/search">
              <div class="parent-icon">
              <i class="fadeIn animated bx bx-face"></i>
              </div>
              <div class="menu-title">chercher patient</div>
            </a>
          </li>
        )}
        
        {user.role == "doctor" && (
          <li>
            <a href="/followers">
              <div class="parent-icon">
              <i class="lni lni-users"></i>
              </div>
              <div class="menu-title">demandes de suivi</div>
            </a>
          </li>
        )}
        {user.role == "admin" && (
          <li>
            <a href="/doctor/search">
              <div class="parent-icon">
                <i class="fadeIn animated bx bx-face"></i>
              </div>
              <div class="menu-title">doctors</div>
            </a>
          </li>
        )}
        {user.role == "patient" && (
          <li>
            <a href="/doctor/search">
              <div class="parent-icon">
                <i class="fadeIn animated bx bx-face"></i>
              </div>
              <div class="menu-title">doctors</div>
            </a>
          </li>
        )}
        {user.role == "admin" && (
          <li>
            <a href="/patient/search">
              <div class="parent-icon">
                <i class="fadeIn animated bx bx-face"></i>
              </div>
              <div class="menu-title">patients</div>
            </a>
          </li>
        )}
        {user.role == "patient" && (
          <li>
            <a href="javascript:;">
              <div class="parent-icon">
                <i class="fadeIn animated bx bx-history"></i>
              </div>
              <div class="menu-title">dossier médical</div>
            </a>
            <ul>
                <li> <a href="/allergy"><i class="bi bi-circle"></i>Allergies/intolérences</a>
                </li>
                <li> <a href="/analysis"><i class="bi bi-circle"></i>Analyses biologique</a>
                </li>
                <li> <a href="/antecedents"><i class="bi bi-circle"></i>Antécédent familiaux</a>
                </li>
                <li> <a href="/radiography"><i class="bi bi-circle"></i>Examens radiologique</a>
                </li>
                <li> <a href="/diseases"><i class="bi bi-circle"></i>Maladies</a>
                </li>
              </ul>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Drawer;
