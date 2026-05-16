import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/jobs");
      setJobs(res.data);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <Link to={`/jobs/${job._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default Jobs;