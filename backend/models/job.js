const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyLocation: { type: String, required: true },
    position: { type: String, required: true },
    positionDescription: { type: [String], required: true },
    jobType: { type: String, required: true },
    jobTiming: { type: String, required: true },
    recruiterName: { type: String, required: true },
    recruiterPhone: { type: String, required: true },
    recruiterEmail: { type: String, required: true },
    recruiterPosition: { type: String, required: true },
    companylogoURL: { type: String, required: true },
    userprofileURL: { type: String, required: true },
    experience: { type: String, required: true },
    salaryRange: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const JobCollection = mongoose.model("jobs", jobSchema);

module.exports = JobCollection;
