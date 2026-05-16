import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const Applicants = () => {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/applications/${id}/applications`);
        setApplications(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  if (loading) {
    return <div className="container">Loading applicants...</div>;
  }

  return (
    <div className="container">
      <h2>Applicants</h2>
      {error && <p className="error">{error}</p>}

      {applications.length === 0 ? (
        <div className="empty">
          <h3>No applicants yet</h3>
          <p>Applications for this job will appear here.</p>
        </div>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="card">
            <h3>{app.name}</h3>
            <p>{app.email}</p>
            <p className="muted">
              Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "recently"}
            </p>

            <a href={app.resumeLink} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default Applicants;
