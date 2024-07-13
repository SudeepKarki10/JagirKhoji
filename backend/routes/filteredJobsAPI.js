const express = require("express");
const router = express.Router();
const Job = require("../models/job");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to get filtered jobs
router.get("/", async (req, res) => {
  try {
    const { search, location, experience, salaryRange, jobType, jobTiming } =
      req.query;

    // Create a filter object
    let filter = {};

    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
        { positionDescription: { $regex: search, $options: "i" } },
      ];
    }

    if (location) {
      filter.companyLocation = { $regex: location, $options: "i" };
    }

    // Experience Filter
    if (experience) {
      switch (experience) {
        case "0":
          filter.experience = "0";
          break;
        case "1-3":
          filter.experience = "1-3";
          break;
        case "3-5":
          filter.experience = "3-5";
          break;
        case "<5":
          filter.experience = "<5";
          break;
        default:
          break;
      }
    }
    // Salary Range Filter

    if (salaryRange) {
      switch (salaryRange) {
        case "<10":
          filter.salaryRange = "<10";
          break;
        case "10-20":
          filter.salaryRange = "10-20";
          break;
        case "20-40":
          filter.salaryRange = "20-40";
          break;
        case "50-80":
          filter.salaryRange = "50-80";
          break;
        case "100+":
          filter.salaryRange = "100+";
          break;
        default:
          break;
      }
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (jobTiming) {
      filter.jobTiming = jobTiming;
    }

    // Fetch jobs based on filters
    const jobs = await Job.find(filter).sort({ updatedAt: -1 });

    if (!jobs) {
      return res.status(404).send("No jobs found");
    }

    res.json({ data: jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
