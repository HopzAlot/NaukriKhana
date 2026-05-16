import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    await api.post(`/jobs/${id}/apply`, form);
    alert("Applied successfully");
  };

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>

      <input
        placeholder="name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="resume link"
        onChange={(e) =>
          setForm({ ...form, resumeLink: e.target.value })
        }
      />

      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default JobDetail;