import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/jobs");

        const companyJobs = res.data.filter(
          (job) => job.postedBy?._id === user?._id || job.postedBy === user?._id
        );

        setJobs(companyJobs);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchJobs();
    }
  }, [user]);

  if (loading) {
    return <div className="container">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h2>Company Dashboard</h2>
          <p>Manage your posted jobs and review applicants.</p>
        </div>
        <Link className="button-link" to="/create-job">Create Job</Link>
      </div>

      {error && <p className="error">{error}</p>}

      {jobs.length === 0 ? (
        <div className="empty">
          <h3>No jobs posted yet</h3>
          <p>Create a job to start receiving applications.</p>
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="card">
            <h3>{job.title}</h3>

            <div className="meta">
              <span>{job.location || "Remote"}</span>
              <span>{job.type || "Not specified"}</span>
              <span>{job.salary ? `Rs. ${job.salary}` : "Salary not listed"}</span>
            </div>

            <Link to={`/dashboard/jobs/${job._id}/applicants`}>
              View Applicants
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
