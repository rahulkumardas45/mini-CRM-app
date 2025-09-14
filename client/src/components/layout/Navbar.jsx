import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = "text-gray-600 hover:text-black";
  const activeLinkStyle = {
    textDecoration: "underline",
    color: "black",
  };

  // ✅ Safe name rendering
  const displayName = user?.fullName || user?.firstName || user?.name;

  return (
    <header className="flex justify-between items-center h-16 w-full fixed top-0 z-20 bg-white px-6 border-b shadow-sm">
      {/* Left: Logo + Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="font-bold text-xl text-black">
          MiniCRM
        </Link>

        {user && (
          <nav className="flex items-center gap-4">
            <NavLink
              to="/dashboard"
              className={linkStyle}
              style={({ isActive }) =>
                isActive ? activeLinkStyle : undefined
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/customers"
              className={linkStyle}
              style={({ isActive }) =>
                isActive ? activeLinkStyle : undefined
              }
            >
              Customers
            </NavLink>
            <NavLink
              to="/reports"
              className={linkStyle}
              style={({ isActive }) =>
                isActive ? activeLinkStyle : undefined
              }
            >
              Reports
            </NavLink>
          </nav>
        )}
      </div>

      {/* Right: Welcome + Logout / Auth Links */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700">
              Welcome, <strong>{displayName}</strong>!
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-black">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
