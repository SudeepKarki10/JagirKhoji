const express = require("express");
const router = express.Router();
const JobCollection = require("../models/job");
const requireAuth = require("../middleware/authMiddleware");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(requireAuth); // Protect all routes below

router.post("/", async (req, res) => {
  try {
    const jobData = req.body;

    if (jobData) {
      const JobDetails = await JobCollection.insertMany(jobData);
      res
        .status(200)
        .json({ message: "Job created successfully", data: JobDetails });
    } else {
      res.status(400).json({ message: "Invalid job data", data: jobData });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
});

module.exports = router;
