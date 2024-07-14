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

const allPostedJobsRoute = require("./routes/allpostedjobsAPI");
app.use("/", allPostedJobsRoute);

const singleJobDetailsRoute = require("./routes/singleJobDetailAPI");
app.use("/jobdetails", singleJobDetailsRoute);

const filteredJobsRoute = require("./routes/filteredJobsAPI");
app.use("/jobs", filteredJobsRoute);

const jobsListingRoute = require("./routes/new-listingAPI");
//app.use with first parameter new-listing means that all the request from /new-listing wil be handled by jobsRoute module
app.use("/new-listing", jobsListingRoute);

const userpostedJobsRoute = require("./routes/userpostedjobsAPI");
app.use("/user/postedjobs", userpostedJobsRoute);

const deleteuserpostedJobsRoute = require("./routes/deleteuserpostedjobsAPI");
app.use("/user/postedjobs/delete", deleteuserpostedJobsRoute);

const updateuserpostedJobsRoute = require("./routes/updateuserpostedjobsAPI");
app.use("/user/postedjobs/update", updateuserpostedJobsRoute);

const UserLoginSignupRoute = require("./routes/userRoutes");
app.use("/api", UserLoginSignupRoute);

const userDataRoute = require("./routes/userDetailsAPI");
app.use("/userdetails", userDataRoute);
