import { useContext, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMsg("");

      const res = await api.post("/auth/register", form);

      login(res.data);

      setMsg("Account created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {msg && <p className="success">{msg}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange}>
          <option value="candidate">Candidate</option>
          <option value="company">Company</option>
        </select>

        <button disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;