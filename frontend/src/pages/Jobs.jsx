import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jobs");
      setJobs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="container">Loading jobs...</div>;
  }

  return (
    <div className="container">
      <h2>Jobs</h2>

      {jobs.length === 0 ? (
        <div className="empty">
          <h3>No jobs available</h3>
          <p>Try again later</p>
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="card">
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <p>{job.type}</p>
            <p>{job.salary}</p>

            <Link to={`/jobs/${job._id}`}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;