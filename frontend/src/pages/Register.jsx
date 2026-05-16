import { useContext, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    role: "candidate",
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/register", form);

    login(res.data);

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button>Register</button>
    </form>
  );
};

export default Register;