const express = require("express");
const router = express.Router();
const JobCollection = require("../models/job");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Fetch job by ID
router.get("/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log("Job ID:", jobId); // Add this line

    const job = await JobCollection.findById(jobId);

    if (!job) {
      console.log("Job not found"); // Add this line
      return res.status(404).json({ message: "Job not found" });
    }

    console.log("Job found:", job); // Add this line

    res.status(200).json({ message: "Job fetched successfully", data: job });
  } catch (error) {
    console.error("Error fetching job:", error); // Add this line
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
