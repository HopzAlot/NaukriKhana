const express = require("express");
const router = express.Router();

const {
  applyToJob,
  getJobApplications,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");
const {authorizeRoles} = require("../middleware/roleMiddleware");

router.post(
  "/:id/apply",
  protect,
  authorizeRoles("candidate"),
  applyToJob
);

router.get(
  "/:id/applications",
  protect,
  authorizeRoles("company"),
  getJobApplications
);

module.exports = router;