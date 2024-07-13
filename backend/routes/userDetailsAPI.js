const express = require("express");
const router = express.Router();
const User = require("../models/User");
const requireAuth = require("../middleware/authMiddleware");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(requireAuth); // Protect all routes below this is extra layer of route protection using express

router.get("/", async (req, res) => {
  try {
    const user = req.user;
    const userDetails = await User.findById(user);
    if (!userDetails) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
});

module.exports = router;

// //index.js: backend
// const userDataRoute = require("./routes/userDetailsAPI");
// app.use("/userdetails", userDataRoute);
