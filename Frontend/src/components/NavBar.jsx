import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/homepage"
            >
              Home Page
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/settings"
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/myposts"
            >
              My Rides
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
