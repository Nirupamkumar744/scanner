import React, { useState } from "react";
import styles from "./NavBar.module.css"; // Import CSS Module
import { FaBars, FaTimes, FaHome, FaSignal, FaBook, FaVideo, FaCalculator } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
const NavBar = ({ isNavOpen, setIsNavOpen }) => {
    const location = useLocation();

    // Navigation links data
    const navLinks = [
        { path: "/home", label: "Home", icon: <FaHome style={{ marginRight: "10px" }} className={styles.navIcons} /> },
        { path: "/heat", label: "Heatmap", icon: <FaSignal style={{ marginRight: "10px" }} className={styles.navIcons} /> },
        { path: "/marketpulse", label: "Crypto/Forex", icon: <BsGraphUpArrow style={{ marginRight: "10px" }} className={styles.navIcons} /> },
        { path: "/insiderstrategy", label: "Insider Strategy", icon: <FaGears style={{ marginRight: "10px" }} className={styles.navIcons} /> },
        { path: "/tradejournal", label: "Trading Journal", icon: <FaBook style={{ marginRight: "10px" }} className={styles.navIcons} /> },
        { path: "/technical", label: "Technical Analysis", icon: <FaVideo style={{ marginRight: "10px" }} className={styles.navIcons} /> },
        { path: "/calcu", label: "Calculator", icon: <FaCalculator style={{ marginRight: "10px" }} className={styles.navIcons} /> },
    ];

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img
                    src="https://res.cloudinary.com/dyrn2eg1j/image/upload/v1740734340/Add_a_subheading_1_pui9fq.png"
                    alt="Logo"
                />
            </div>
            <div className={styles.hamburger} onClick={() => setIsNavOpen(!isNavOpen)}>
                {isNavOpen ? <FaTimes size={30} className={styles.icon} /> : <FaBars size={30} className={styles.icon} />}
            </div>
            <ul className={`${styles.navLinks} ${isNavOpen ? styles.open : ""}`}>
                {navLinks.map(({ path, label, icon }) => (
                    location.pathname !== path && ( // Hide if it's the active link
                        <li key={path}>
                            <NavLink className={styles.a} to={path}>
                                {icon} {label}
                            </NavLink>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default NavBar;
