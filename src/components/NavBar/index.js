import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/pin">
            Demo Pinning Service
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/network">Network</Link>
          </li>
          <li>
            <Link to="/pin">Pin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
