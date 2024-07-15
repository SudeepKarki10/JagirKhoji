const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const JobCollection = require("../models/job");
const requireAuth = require("../middleware/authMiddleware");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.put("/", requireAuth, async (req, res) => {
  try {
    const { id } = req.query;
    const jobData = req.body;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Find the job by ID
    const job = await JobCollection.findById(id);

    // If job not found, respond with 404
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Update the job with new data
    const updatedJob = await JobCollection.findByIdAndUpdate(id, jobData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on the updated data
    });

    // Respond with success message and updated job details
    res.status(200).json({ message: "Job updated successfully", updatedJob });
  } catch (error) {
    // Respond with server error message
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", requireAuth, async (req, res) => {
  res.send("hi");
});

module.exports = router;
