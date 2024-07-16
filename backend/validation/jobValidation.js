const { z } = require("zod");

const jobSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyLocation: z.string().min(1, "Company location is required"),
  position: z.string().min(1, "Position is required"),
  positionDescription: z
    .array(z.string())
    .min(1, "Position description is required"),
  jobType: z.string().min(1, "Job type is required"),
  jobTiming: z.string().min(1, "Job timing is required"),
  recruiterName: z.string().min(1, "Recruiter name is required"),
  recruiterPhone: z
    .string()
    .regex(
      /^98\d{8}$/,
      "Recruiter phone must start with 98 or invalid phone number"
    ),
  recruiterEmail: z.string().email("Invalid email"),
  recruiterPosition: z.string().min(1, "Recruiter position is required"),
  companylogoURL: z.string().url("Invalid company logo URL"),
  userprofileURL: z.string().url("Invalid user profile URL"),
  experience: z.string().min(1, "Experience is required"),
  salaryRange: z.string().min(1, "Salary range is required"),
  user_id: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid user ID"),
});

module.exports = jobSchema;
