import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/jobs");
  };

  return (
    <nav className="navbar">
      <Link className="brand" to="/jobs">NaukriKhana</Link>
      <NavLink to="/jobs">Jobs</NavLink>

      <div className="nav-actions">
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/register">Register</NavLink>}

        {user?.role === "company" && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/create-job">Create Job</NavLink>
          </>
        )}

        {user && (
          <>
            <span className="nav-user">{user.name}</span>
            <button className="secondary" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
