import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="email" onChange={handleChange} />
      <input name="password" placeholder="password" type="password" onChange={handleChange} />

      <button>Login</button>
    </form>
  );
};

export default Login;