import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeLink: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRes = await api.get(`/jobs/${id}`);
        setJob(jobRes.data);

        const appRes = await api.get(`/jobs/${id}/applications`);
        setApplications(appRes.data);

        if (user) {
          const found = appRes.data.find(
            (app) =>
                app.appliedBy?._id === user._id ||
                app.appliedBy === user._id
            );

          setAlreadyApplied(!!found);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleApply = async () => {
    if (alreadyApplied) return;

    if (!form.name || !form.email || !form.resumeLink) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);

      await api.post(`/jobs/${id}/apply`, form);

      alert("Applied successfully");

      setAlreadyApplied(true);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to apply");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{job.title}</h2>
        <p>{job.description}</p>
        <p>{job.location}</p>
        <p>{job.type}</p>
        <p>{job.salary}</p>
      </div>

      <div className="card">
        <h3>Apply for this job</h3>

        {alreadyApplied ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            ✔ Already Applied
          </p>
        ) : (
          <div className="form">
            <input
              placeholder="Full Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Resume Link"
              onChange={(e) =>
                setForm({ ...form, resumeLink: e.target.value })
              }
            />

            <button
              onClick={handleApply}
              disabled={submitting}
            >
              {submitting ? "Applying..." : "Apply"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;