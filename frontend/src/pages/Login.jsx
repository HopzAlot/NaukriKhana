import { useContext, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", form);

    login(res.data);

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button>Login</button>
    </form>
  );
};

export default Login;