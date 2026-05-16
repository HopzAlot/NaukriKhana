import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/jobs");

      const companyJobs = res.data.filter(
        (job) => job.postedBy._id === user._id
      );

      setJobs(companyJobs);
    };

    fetchJobs();
  }, [user]);

  return (
    <div className="container">
      <h2>Company Dashboard</h2>

      {jobs.map((job) => (
        <div key={job._id} className="card">
          <h3>{job.title}</h3>

          <p>{job.location}</p>

          <Link to={`/jobs/${job._id}/applications`}>
            View Applicants
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;