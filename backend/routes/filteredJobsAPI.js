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
          filter.experience = "Freshers";
          break;
        case "1-3":
          filter.experience = "1-3 years";
          break;
        case "3-5":
          filter.experience = "3-5 years";
          break;
        case "<5":
          filter.experience = "More than 5 years";
          break;
        default:
          break;
      }
    }

    if (salaryRange) {
      let minSalary, maxSalary;
      if (salaryRange.includes("+")) {
        minSalary = parseInt(salaryRange.replace("+", "")) * 1000;
        maxSalary = Infinity;
      } else if (salaryRange.includes("<")) {
        maxSalary = parseInt(salaryRange.replace("<", "")) * 1000;
        minSalary = 0;
      } else {
        [minSalary, maxSalary] = salaryRange.split("-").map(Number);
        minSalary *= 1000;
        maxSalary *= 1000;
      }
      filter.salaryRange = { $gte: minSalary, $lte: maxSalary };
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
