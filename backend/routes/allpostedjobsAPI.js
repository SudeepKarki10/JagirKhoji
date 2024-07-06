const express = require("express");
const router = express.Router();
const JobCollection = require("../models/job");
const requireAuth = require("../middleware/authMiddleware");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  try {
    const JobData = await JobCollection.find().sort({ updatedAt: -1 });
    // if (!JobData) {
    //   res.status(404).send({ message: "No Data Found" });
    // }
    res
      .status(200)
      .json({ message: "Job fetched successfully", data: JobData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
