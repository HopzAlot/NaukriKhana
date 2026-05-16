const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { title, description, salary, location, type } = req.body;

    const job = await Job.create({
      title,
      description,
      salary,
      location,
      type,
      postedBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getJobs = async (req, res) => {
  try {
    const query = {};

    if (req.query.location) {
      query.location = req.query.location;
    }

    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.salary) {
      query.salary = { $gte: Number(req.query.salary) };
    }

    const jobs = await Job.find(query).populate(
      "postedBy",
      "name email"
    );

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getSingleJob,
};