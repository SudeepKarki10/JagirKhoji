"use client";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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
};

export default function NewListingPage() {
  const [companylogoURL, setcompanylogoURL] = useState("");
  const [userprofileURL, setuserprofileURL] = useState("");
  const [error, setErrors] = useState({});

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

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
      const response = await fetch("http://localhost:4000/new-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Job data saved :", result);
        alert("Job data saved ");
        //reset(); // to reset the form data
        router.push("/new-listing");
      } else {
        const errorData = await response.json();
        console.error("Error saving job data:", errorData.error);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="w-full md:w-8/12 md:max-w-full mx-auto mt-16">
      <div className="p-6 border border-gray-300 sm:rounded-md  bg-white">
        <ToastContainer />
        <div className="flex justify-center items-center mb-10 text-2xl font-extrabold font-serif text-black">
          <h1>Job Specification Form</h1>
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
              <option value="Full">Full-time</option>
              <option value="Part">Part-time</option>
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
                maxLength: 5000,
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
              rows={3}
              placeholder="Tips: Provide a summary of the role, what success in the position looks like, and how this role fits into the organization overall.
              Responsibilities
              [Be specific when describing each of the responsibilities. Use gender-neutral, inclusive language.]
              
              Example: Determine and develop user requirements for systems in production, to ensure maximum usability
              Qualifications
              [Some qualifications you may want to include are Skills, Education, Experience, or Certifications.]Example: Excellent verbal and written communication sfasfkills"
            />
          </label>
          <div className="w-full flex flex-col md:flex-row gap-28">
            <div className="companyImage w-full md:w-1/2">
              <label className="block mb-6">
                <span className="text-gray-700">Company Logo</span>
                <br />
                <div className="bg-slate-400 h-24 w-full border-2 border-blue-300 flex justify-center text-white items-center">
                  {companylogoURL ? (
                    <Image
                      src={companylogoURL}
                      alt="companyLogo"
                      width={100}
                      height={100}
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
                        className="bg-blue-600 mt-2 w-full rounded-md text-white px-2 py-2"
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
            </div>

            <div className="ImageSection flex flex-col md:flex-row gap-4 justify-center items-center w-full md:w-1/2">
              <div className="left w-full md:w-4/12">
                <div className="companyImage">
                  <label className="block mb-6">
                    <span className="text-gray-700">Recruiter Profile</span>
                    <br />
                    <div className="bg-slate-400 h-24 w-full border-2 border-blue-300 flex justify-center text-white items-center">
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
                            className="bg-blue-600 mt-2 w-full rounded-md text-white px-2 py-2"
                          >
                            Choose File
                          </button>
                        );
                      }}
                    </CldUploadWidget>

                    {errors.companyLogo && (
                      <span className="text-red-500">
                        Company Logo is required
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="right w-full md:w-8/12">
                <input
                  {...register("recruiterName", {
                    required: true,
                    maxLength: 40,
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
                  placeholder="Name"
                />

                <input
                  {...register("recruiterPhone", {
                    required: true,
                    maxLength: 10,
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
                  placeholder="Phone number"
                />

                <input
                  {...register("recruiterEmail", {
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
                  placeholder="Email@gmail.com"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="
                h-10
                px-5
                text-indigo-100
                bg-indigo-700
                rounded-lg
                transition-colors
                duration-150
                focus:shadow-outline
                hover:bg-indigo-800
              "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
