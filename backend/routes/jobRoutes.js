const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getSingleJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", getJobs);
router.get("/:id", getSingleJob);

router.post(
  "/",
  protect,
  authorizeRoles("company"),
  createJob
);

module.exports = router;