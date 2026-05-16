import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
      <h2>Company Dashboard</h2>

      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>

          <Link to={`/jobs/${job._id}/applications`}>
            View Applicants
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;