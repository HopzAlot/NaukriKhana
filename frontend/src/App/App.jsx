import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Jobs from "../pages/Jobs";
import JobDetail from "../pages/JobDetail";
import Dashboard from "../pages/Dashboard";
import Applicants from "../pages/Applicants";
import Navbar from "../components/Navbar";
import CreateJob from "../pages/CreateJob";

import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs/:id" element={<JobDetail />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id/applications"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/jobs/:id/applicants"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-job"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <CreateJob />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
