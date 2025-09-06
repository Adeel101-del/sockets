import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import "../style/Navbar.css";
import { useAuth } from "../context/authContext";

function Navbar() {
    const { auth } = useAuth()
    return (
        <>
            <div id="Navbar">
                <div id="logo" className="navbar-child">
                    LOGO
                </div>

                {auth ? (
                    <div>
                        hello
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
