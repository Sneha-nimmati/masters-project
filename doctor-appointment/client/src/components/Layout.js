import React, { useState } from "react";
import "../styles/layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import Footer from "./Footer";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
    }
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  
  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg navbar-light">

        <p className="logo"> {""} </p>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${collapsed ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav nav-bar mr-auto menu-items">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <li className={`nav-item menu ${isActive && "active"}`} key={menu.name}>
                  <Link className="nav-link" to={menu.path}>
                    {menu.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="navbar-nav ml-auto profile">
            <li className="nav-item notifications-icon">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line nav-link"></i>
              </Badge>
            </li>
            <li className="nav-item user-name">
              <Link className="nav-link" to="/profile">
                {user?.name}
              </Link>
            </li>
            <li className="nav-item logout">
              <button
                className="btn btn-link nav-link"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">{children}</div>
    </div>
  );
}

  export default Layout;