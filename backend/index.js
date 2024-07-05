require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

router.use(express.json());

const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
// const mongoURI =
//   "mongodb+srv://sudeep:sudeep10@jobportal.behhjik.mongodb.net/?appName=JobPortal";

mongoose
  .connect(
    "mongodb+srv://sudeep:sudeep10@jobportal.behhjik.mongodb.net/JagirKhojiDB?retryWrites=true&w=majority&appName=JobPortal"
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Error: ", error.message));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const jobsListingRoute = require("./routes/new-listingAPI");

//app.use with first parameter new-listing means that all the request from /new-listing wil be handled by jobsRoute module
app.use("/new-listing", jobsListingRoute);

const userpostedJobsRoute = require("./routes/postedjobsAPI");

app.use("/user/postedjobs", userpostedJobsRoute);

const UserLoginSignupRoute = require("./routes/userRoutes");
app.use("/api", UserLoginSignupRoute);
