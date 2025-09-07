import { useState, useEffect } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import "../style/Navbar.css";
import { useAuth } from "../context/authContext";

function Navbar() {
    const { auth } = useAuth()
    const [profileOpen, setProfileOpen] = useState(false);

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const closeModal = () => {
    setProfileOpen(false);
  }

    return (
        <>
            <div id="Navbar">
                <div id="logo" className="navbar-child">
                    LOGO
                </div>

                {auth ? (
                    <div id="link-container" className="navbar-child">
                        <span
                            className="profile-icon-container"
                            onClick={toggleProfile}
                        >
                            <img
                                src="user-profile-icon.png"
                                alt="user-profile-icon"
                                className="profile-icon"
                            />
                        </span>

                        {profileOpen && (
                            <div className="modal-overlay" onClick={closeModal}>
                                <div className="modal" onClick={(e) => e.stopPropagation()}>
                                    <ul>
                                        <li>Profile</li>
                                        <li>Settings</li>
                                        <li>My Products</li>
                                        <li>Contacts</li>
                                        <li>Add Products</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    < div id="link-container" className="navbar-child">
                        <NavLink to="/home" className="nav-links">
                            Home
                        </NavLink>
                        <NavLink to="/login" className="nav-links">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="nav-links">
                            Register
                        </NavLink>
                    </div>
                )}


            </div >

            {/* Prevents page content from hiding under fixed navbar */}
            < div style={{ marginTop: "80px" }}>
                <Outlet />
            </div >
        </>
    );
}


export default Navbar;
