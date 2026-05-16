import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const Applicants = () => {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await api.get(`/jobs/${id}/applications`);

      setApplications(res.data);
    };

    fetchApplications();
  }, [id]);

  return (
    <div>
      <h2>Applicants</h2>

      {applications.map((app) => (
        <div key={app._id}>
          <h3>{app.name}</h3>

          <p>{app.email}</p>

          <a href={app.resumeLink} target="_blank">
            Resume
          </a>
        </div>
      ))}
    </div>
  );
};

export default Applicants;