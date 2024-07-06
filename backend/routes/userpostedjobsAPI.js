const express = require("express");
const router = express.Router();
const JobCollection = require("../models/job");
const requireAuth = require("../middleware/authMiddleware");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(requireAuth); // Protect all routes below
// const requireAuth = require("../middleware/authMiddleware"); OR as below
router.get("/", requireAuth, async (req, res) => {
  try {
    //userId is generated from token and passed from frontend as header
    const userId = req.user._id;
    const JobData = await JobCollection.find({ user_id: userId });
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