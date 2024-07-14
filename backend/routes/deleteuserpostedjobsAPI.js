const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const JobCollection = require("../models/job");
const requireAuth = require("../middleware/authMiddleware");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.delete("/", requireAuth, async (req, res) => {
  try {
    const { id } = req.query;

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

    // Delete the job
    const deletedJob = await JobCollection.findByIdAndDelete(id);

    // Respond with success message and deleted job details
    res.status(200).json({ message: "Job deleted successfully", deletedJob });
  } catch (error) {
    // Respond with server error message
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
