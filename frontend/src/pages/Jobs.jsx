import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    salary: "",
  });

  const fetchJobs = async () => {
    const query = new URLSearchParams(filters).toString();

    const res = await api.get(`/jobs?${query}`);

    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Jobs</h2>

      <input
        placeholder="Location"
        onChange={(e) =>
          setFilters({ ...filters, location: e.target.value })
        }
      />

      <input
        placeholder="Type"
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      />

      <input
        placeholder="Minimum Salary"
        onChange={(e) =>
          setFilters({ ...filters, salary: e.target.value })
        }
      />

      <button onClick={fetchJobs}>Search</button>

      {jobs.map((job) => (
        <div key={job._id} className="card">
          <h3>{job.title}</h3>

          <p>{job.location}</p>

          <p>{job.type}</p>

          <p>{job.salary}</p>

          <Link to={`/jobs/${job._id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Jobs;