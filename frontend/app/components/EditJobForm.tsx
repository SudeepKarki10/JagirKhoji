"use client";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";

type Inputs = {
  companyName: string;
  companyLocation: string;
  position: string;
  positionDescription: string;
  jobType: string;
  jobTiming: string;
  companyLogo: FileList | null;
  recruiterName: string;
  recruiterPhone: string;
  recruiterEmail: string;
  recruiterPosition: string;
  experience: string;
  salaryRange: string;
};

export default function EditListingPage({ job }: any) {
  const [companylogoURL, setcompanylogoURL] = useState("");
  const [userprofileURL, setuserprofileURL] = useState("");
  const [error, setErrors] = useState({});
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchJobListing = async () => {
      try {
        const data = job;
        console.log("data received ", data);

        setValue("companyName", data.companyName);
        setValue("companyLocation", data.companyLocation);
        setValue("position", data.position);
        setValue("positionDescription", data.positionDescription);
        setValue("jobType", data.jobType);
        setValue("jobTiming", data.jobTiming);
        setValue("recruiterName", data.recruiterName);
        setValue("recruiterPhone", data.recruiterPhone);
        setValue("recruiterEmail", data.recruiterEmail);
        setValue("recruiterPosition", data.recruiterPosition);
        setValue("experience", data.experience);
        setValue("salaryRange", data.salaryRange);
        setcompanylogoURL(data.companylogoURL);
        setuserprofileURL(data.userprofileURL);
      } catch (error: any) {
        console.error("Error fetching job listing:", error.message);
      }
    };
  }, []);

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    const formData = {
      ...data,
      companylogoURL: companylogoURL,
      userprofileURL: userprofileURL,
    };

    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    console.log(formData);
    try {
      const response = await fetch(`http://localhost:4000/listing/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Job data updated :", result);
        alert("Job data updated");
        router.push("/listings"); // Redirect to the listings page after updating
      } else {
        const errorData = await response.json();
        console.error("Error updating job data:", errorData.error);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="w-full md:w-10/12 md:max-w-full mx-auto mt-28">
      <div className="p-6 border border-gray-300 sm:rounded-md  bg-white">
        <ToastContainer />
        <div className="flex justify-center items-center mb-10 text-2xl font-extrabold font-serif text-black">
          <h1>Edit Job Specification Form</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-6">
            <span>Company Name</span>
            <input
              {...register("companyName", {
                required: true,
              })}
              type="text"
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
              placeholder="Google, Spotify, etc."
            />
            {errors.companyName && (
              <span className="text-red-500">Company Name is required</span>
            )}
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Company Location</span>
            <input
              {...register("companyLocation", {
                required: true,
              })}
              type="text"
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
              placeholder="Koteshwor, Baneshwor, etc."
            />
            {errors.companyLocation && (
              <span className="text-red-500">Company Location is required</span>
            )}
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Hiring Position</span>
            <input
              {...register("position", {
                required: true,
              })}
              type="text"
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
              placeholder="Node.js Developer, Python Developer, Manager, etc."
            />
          </label>
          {/* Experience Dropdown */}
          <label className="block mb-6">
            <span className="text-gray-700">Experience</span>
            <select
              {...register("experience", { required: true })}
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
            >
              <option>Experience</option>
              <option value="0">Freshers</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="<5">More than 5 years</option>
            </select>
            {errors.experience && (
              <span className="text-red-500">Experience is required</span>
            )}
          </label>

          {/* Salary Range Dropdown */}
          <label className="block mb-6">
            <span className="text-gray-700">Salary Range</span>
            <select
              {...register("salaryRange", { required: true })}
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
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
            {errors.salaryRange && (
              <span className="text-red-500">Salary Range is required</span>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Job Type</span>
            <select
              {...register("jobType", { required: true })}
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.jobType && (
              <span className="text-red-500">Job Type is required</span>
            )}
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Job Timing</span>
            <select
              {...register("jobTiming", { required: true })}
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
            >
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Freelance">Freelance</option>
            </select>
            {errors.jobTiming && (
              <span className="text-red-500">Job Timing is required</span>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">
              Description of the Job Vacancy
            </span>
            <textarea
              {...register("positionDescription", {
                required: true,
              })}
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
              rows={5}
            />
            {errors.positionDescription && (
              <span className="text-red-500">
                Description of the Job Vacancy is required
              </span>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Company Logo</span>
            <br />
            <div className="bg-slate-400 h-40 w-full border-2 border-blue-300 flex justify-center text-white items-center">
              {companylogoURL ? (
                <Image
                  src={companylogoURL}
                  alt="companyLogo"
                  width={100}
                  height={200}
                />
              ) : (
                <span>No Logo</span>
              )}
            </div>
            <CldUploadWidget
              uploadPreset="JobKhoji"
              onSuccess={(results: any) => {
                // console.log(results?.info?.url);
                // setcompanylogoURL(results?.info?.url);
                // console.log(companylogoURL);

                const url = results?.info?.url;
                if (url) {
                  setcompanylogoURL(url);
                  console.log(url);
                  console.log(companylogoURL);
                } else {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    companyLogo: "Failed to upload logo",
                  }));
                }
              }}
            >
              {({ open }) => {
                return (
                  <button
                    onClick={() => open()}
                    className="bg-gray-900 mt-2 w-full rounded-md text-white px-2 py-2"
                  >
                    Choose File
                  </button>
                );
              }}
            </CldUploadWidget>

            {errors.companyLogo && (
              <span className="text-red-500">Company Logo is required</span>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Recruiter Name</span>
            <input
              {...register("recruiterName", {
                required: true,
              })}
              type="text"
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
              placeholder="John Doe, Jane Smith, etc."
            />
            {errors.recruiterName && (
              <span className="text-red-500">Recruiter Name is required</span>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Recruiter Phone</span>
            <input
              {...register("recruiterPhone", {
                required: true,
              })}
              type="text"
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
              placeholder="+977-9855446635"
            />
            {errors.recruiterPhone && (
              <span className="text-red-500">Recruiter Phone is required</span>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Recruiter Email</span>
            <input
              {...register("recruiterEmail", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              type="email"
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
              placeholder="john.doe@example.com"
            />
            {errors.recruiterEmail && (
              <span className="text-red-500">
                Valid Recruiter Email is required
              </span>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Recruiter Position</span>
            <input
              {...register("recruiterPosition", {
                required: true,
              })}
              type="text"
              className="
                block
                w-full
                mt-1
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
              placeholder="Hiring Manager, HR Specialist, etc."
            />
            {errors.recruiterPosition && (
              <span className="text-red-500">
                Recruiter Position is required
              </span>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Recruiter Profile</span>
            <br />
            <div className="bg-slate-400 h-40 w-full border-2 border-blue-300 flex justify-center text-white items-center">
              {userprofileURL ? (
                <Image
                  src={userprofileURL}
                  alt="companyLogo"
                  width={100}
                  height={100}
                />
              ) : (
                <span>No Profile</span>
              )}
            </div>
            <CldUploadWidget
              uploadPreset="JobKhoji"
              onSuccess={(results: any) => {
                console.log(results?.info?.url);
                setuserprofileURL(results.info.url);
                console.log(userprofileURL);
              }}
            >
              {({ open }) => {
                return (
                  <button
                    onClick={() => open()}
                    className="bg-gray-600 mt-2 w-full rounded-md text-white px-2 py-2"
                  >
                    Choose File
                  </button>
                );
              }}
            </CldUploadWidget>

            {errors.companyLogo && (
              <span className="text-red-500">Company Logo is required</span>
            )}
          </label>

          <div className="mb-6">
            <button
              type="submit"
              className="h-10 px-5 text-indigo-100 bg-blue-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-blue-800"
            >
              Update Job Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
