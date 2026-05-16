import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    resumeLink: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");
        const jobRes = await api.get(`/jobs/${id}`);
        setJob(jobRes.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      name: current.name || user?.name || "",
      email: current.email || user?.email || "",
    }));
  }, [user]);

  const handleApply = async (e) => {
    e.preventDefault();

    if (alreadyApplied) return;

    if (!user) {
      setError("Please login as a candidate to apply.");
      return;
    }

    if (user.role !== "candidate") {
      setError("Only candidates can apply for jobs.");
      return;
    }

    if (!form.name || !form.email || !form.resumeLink) {
      setError("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      await api.post(`/applications/${id}/apply`, form);

      setMessage("Application submitted successfully");
      setAlreadyApplied(true);
    } catch (err) {
      const applyError = err?.response?.data?.message || "Failed to apply";
      setError(applyError);

      if (applyError.toLowerCase().includes("already applied")) {
        setAlreadyApplied(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container">Loading job...</div>;
  }

  if (error && !job) {
    return (
      <div className="container">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{job.title}</h2>
        <p className="muted">{job.postedBy?.name || "Company"}</p>
        <p>{job.description}</p>
        <div className="meta">
          <span>{job.location || "Remote"}</span>
          <span>{job.type || "Not specified"}</span>
          <span>{job.salary ? `Rs. ${job.salary}` : "Salary not listed"}</span>
        </div>
      </div>

      <div className="card">
        <h3>Apply for this job</h3>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        {!user ? (
          <p>
            <Link to="/login">Login</Link> as a candidate to apply.
          </p>
        ) : user.role !== "candidate" ? (
          <p className="muted">Company accounts can view applicants from the dashboard.</p>
        ) : (
          <form className="form" onSubmit={handleApply}>
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Resume Link"
              type="url"
              value={form.resumeLink}
              onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
            />

            <button disabled={submitting}>
              {submitting ? "Applying..." : "Apply"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
