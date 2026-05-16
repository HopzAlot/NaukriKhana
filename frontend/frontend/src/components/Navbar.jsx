import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Jobs</Link>

      {!user && <Link to="/login">Login</Link>}

      {!user && <Link to="/register">Register</Link>}

      {user?.role === "company" && (
    <>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-job">Create Job</Link>
    </>
    )}

      {user && (
        <button onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;