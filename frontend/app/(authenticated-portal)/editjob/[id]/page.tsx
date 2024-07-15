"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";

type Inputs = {
  companyName: string;
  companyLocation: string;
  position: string;
  positionDescription: string;
  jobType: string;
  jobTiming: string;
  experience: string;
  salaryRange: string;
  companylogoURL: string;
  recruiterName: string;
  recruiterPhone: string;
  recruiterEmail: string;
  recruiterPosition: string;
};

export default function EditListingPage() {
  const router = useRouter();
  const { id } = useParams<any>(); // Extract job ID from URL params
  const [job, setJob] = useState<Inputs>({
    companyName: "",
    companyLocation: "",
    position: "",
    positionDescription: "",
    jobType: "",
    jobTiming: "",
    recruiterName: "",
    recruiterPhone: "",
    recruiterEmail: "",
    recruiterPosition: "",
    companylogoURL: "",
    experience: "",
    salaryRange: "",
  });
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchJobListing = async () => {
      try {
        const response = await fetch(`http://localhost:4000/jobdetails/${id}`);
        if (!response.ok) {
          throw new Error("Job details not found");
        }
        const jobData = await response.json();
        setJob(jobData.data);
        reset(jobData.data); // Reset form with fetched job data
      } catch (error: any) {
        console.error("Error fetching job listing:", error.message);
        toast.error("Error fetching job listing");
      }
    };

    fetchJobListing();
  }, [id, reset]);

  const onSubmit = async (data: Inputs) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/user/postedjobs/update?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Job updated successfully");
        setTimeout(() => {
          router.push("/user/postedjobs");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error: any) {
      console.error("Error updating job:", error.message);
      toast.error("Error updating job");
    }
  };

  return (
    <div className="w-full md:w-10/12 md:max-w-full mx-auto mt-28">
      <div className="p-6 border border-gray-300 sm:rounded-md bg-white">
        <ToastContainer />
        <div className="flex justify-center items-center mb-10 text-2xl font-extrabold font-serif text-black">
          <h1>Edit Job Specification Form</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Company Name */}
          <label className="block mb-6">
            <span>Company Name</span>
            <input
              {...register("companyName", {
                required: true,
              })}
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Google, Spotify, etc."
              defaultValue={job.companyName}
            />
            {!job.companyName && (
              <span className="text-red-500">Company Name is required</span>
            )}
          </label>

          {/* Company Location */}
          <label className="block mb-6">
            <span>Company Location</span>
            <input
              {...register("companyLocation", {
                required: true,
              })}
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Koteshwor, Baneshwor, etc."
              defaultValue={job.companyLocation}
            />
            {!job.companyLocation && (
              <span className="text-red-500">Company Location is required</span>
            )}
          </label>

          {/* Hiring Position */}
          <label className="block mb-6">
            <span>Hiring Position</span>
            <input
              {...register("position", {
                required: true,
              })}
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Node.js Developer, Python Developer, Manager, etc."
              defaultValue={job.position}
            />
            {!job.position && (
              <span className="text-red-500">Hiring Position is required</span>
            )}
          </label>

          {/* Experience Dropdown */}
          <label className="block mb-6">
            <span>Experience</span>
            <select
              {...register("experience", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              defaultValue={job.experience}
            >
              <option>Experience</option>
              <option value="0">Freshers</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="<5">More than 5 years</option>
            </select>
            {!job.experience && (
              <span className="text-red-500">Experience is required</span>
            )}
          </label>

          {/* Salary Range Dropdown */}
          <label className="block mb-6">
            <span>Salary Range</span>
            <select
              {...register("salaryRange", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              defaultValue={job.salaryRange}
            >
              <option value="" disabled>
                Salary Range
              </option>
              <option value="<10">Below 10k</option>
              <option value="10-20">10-20k</option>
              <option value="20-40">20-40k</option>
              <option value="50-80">50-80k</option>
              <option value="100+">More than 100k</option>
            </select>
            {!job.salaryRange && (
              <span className="text-red-500">Salary Range is required</span>
            )}
          </label>

          {/* Job Type */}
          <label className="block mb-6">
            <span>Job Type</span>
            <select
              {...register("jobType", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              defaultValue={job.jobType}
            >
              <option value="" disabled>
                Job Type
              </option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {!job.jobType && (
              <span className="text-red-500">Job Type is required</span>
            )}
          </label>

          {/* Job Timing */}
          <label className="block mb-6">
            <span>Job Timing</span>
            <select
              {...register("jobTiming", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              defaultValue={job.jobTiming}
            >
              <option value="" disabled>
                Job Timing
              </option>
              <option value="Full">Full-time</option>
              <option value="Part">Part-time</option>
              <option value="Flexible">Flexible</option>
            </select>
            {!job.jobTiming && (
              <span className="text-red-500">Job Timing is required</span>
            )}
          </label>

          {/* Position Description */}
          <label className="block mb-6">
            <span>Description of the Job Vacancy</span>
            <textarea
              {...register("positionDescription", {
                required: true,
              })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
              placeholder="What is the job about?"
              defaultValue={job.positionDescription}
            ></textarea>
            {!job.positionDescription && (
              <span className="text-red-500">
                Description of the Job Vacancy is required
              </span>
            )}
          </label>

          {/* Company Logo Upload */}
          <label className="block mb-6">
            <span>Company Logo</span>
            <CldUploadWidget
              onSuccess={(result: any) => {
                setValue("companylogoURL", result.info.secure_url);
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="mt-1 flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upload Logo
                </button>
              )}
            </CldUploadWidget>
            {job.companylogoURL && (
              <div className="mt-2">
                <Image
                  src={job.companylogoURL}
                  alt="Company Logo"
                  width={100}
                  height={100}
                />
              </div>
            )}
            {!job.companylogoURL && (
              <span className="text-red-500">Company Logo is required</span>
            )}
          </label>

          {/* Recruiter Name */}
          <label className="block mb-6">
            <span>Recruiter Name</span>
            <input
              {...register("recruiterName", {
                required: true,
              })}
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Recruiter Name"
              defaultValue={job.recruiterName}
            />
            {!job.recruiterName && (
              <span className="text-red-500">Recruiter Name is required</span>
            )}
          </label>

          {/* Recruiter Phone */}
          <label className="block mb-6">
            <span>Recruiter Phone</span>
            <input
              {...register("recruiterPhone", {
                required: true,
              })}
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Recruiter Phone"
              defaultValue={job.recruiterPhone}
            />
            {!job.recruiterPhone && (
              <span className="text-red-500">Recruiter Phone is required</span>
            )}
          </label>

          {/* Recruiter Email */}
          <label className="block mb-6">
            <span>Recruiter Email</span>
            <input
              {...register("recruiterEmail", {
                required: true,
              })}
              type="email"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Recruiter Email"
              defaultValue={job.recruiterEmail}
            />
            {!job.recruiterEmail && (
              <span className="text-red-500">Recruiter Email is required</span>
            )}
          </label>

          {/* Recruiter Position */}
          <label className="block mb-6">
            <span>Recruiter Position</span>
            <input
              {...register("recruiterPosition", {
                required: true,
              })}
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Recruiter Position"
              defaultValue={job.recruiterPosition}
            />
            {!job.recruiterPosition && (
              <span className="text-red-500">
                Recruiter Position is required
              </span>
            )}
          </label>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
            >
              Update Job
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
