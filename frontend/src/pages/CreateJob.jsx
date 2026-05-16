import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CreateJob = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user?.role !== "company") {
        return alert("Only companies can create jobs");
      }
      alert("Job created successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="container">
      <h2>Create Job</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          type="text"
          name="type"
          placeholder="Full-Time / Part-Time"
          onChange={handleChange}
        />

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;