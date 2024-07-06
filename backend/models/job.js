const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: String,
    companyLocation: String,
    position: String,
    positionDescription: String,
    jobType: String,
    jobTiming: String,
    companylogoURL: String,
    userprofileURL: String,
    recruiterName: String,
    recruiterPhone: String,
    recruiterEmail: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // to link each job with particular user
  },
  { timestamps: true }
);

const JobCollection = mongoose.model("jobs", jobSchema);

module.exports = JobCollection;
