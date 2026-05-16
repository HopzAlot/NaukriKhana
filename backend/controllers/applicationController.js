const Application = require("../models/Application");
const Job = require("../models/Job");

const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const { name, email, resumeLink } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    const alreadyApplied = await Application.findOne({
      jobId,
      appliedBy: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied to this job",
      });
    }

    const application = await Application.create({
      jobId,
      name,
      email,
      resumeLink,
      appliedBy: req.user._id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ jobId })
      .populate("appliedBy", "_id name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyToJob,
  getJobApplications,
};