import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    salary: "",
  });

  const fetchJobs = async (nextFilters = filters) => {
    try {
      setLoading(true);
      setError("");

      const params = Object.fromEntries(
        Object.entries(nextFilters).filter(([, value]) => value)
      );

      const res = await api.get("/jobs", { params });
      setJobs(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const clearFilters = () => {
    const emptyFilters = { location: "", type: "", salary: "" };
    setFilters(emptyFilters);
    fetchJobs(emptyFilters);
  };

  if (loading) {
    return <div className="container">Loading jobs...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h2>Jobs</h2>
          <p>Browse openings and apply as a candidate.</p>
        </div>
      </div>

      <form className="filter-bar" onSubmit={handleFilter}>
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
        >
          <option value="">All types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
          <option value="Remote">Remote</option>
        </select>
        <input
          name="salary"
          type="number"
          min="0"
          placeholder="Minimum salary"
          value={filters.salary}
          onChange={handleChange}
        />
        <button type="submit">Filter</button>
        <button className="secondary" type="button" onClick={clearFilters}>
          Clear
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {jobs.length === 0 ? (
        <div className="empty">
          <h3>No jobs available</h3>
          <p>Try changing your filters or check again later.</p>
        </div>
      ) : (
        <div className="grid">
          {jobs.map((job) => (
            <div key={job._id} className="card job-card">
              <div>
                <h3>{job.title}</h3>
                <p className="muted">{job.postedBy?.name || "Company"}</p>
              </div>

              <div className="meta">
                <span>{job.location || "Remote"}</span>
                <span>{job.type || "Not specified"}</span>
                <span>{job.salary ? `Rs. ${job.salary}` : "Salary not listed"}</span>
              </div>

              <p>{job.description}</p>

              <Link className="button-link" to={`/jobs/${job._id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
