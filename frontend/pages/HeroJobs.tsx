"use client";
import React, { useState, useEffect } from "react";
import JobRow from "../app/components/JobRow";
import ContentLoader from "../app/components/contentLoader";

interface Job {
  _id: string;
  companyName: string;
  companyLocation: string;
  position: string;
  positionDescription: string[];
  jobType: "Remote" | "On-site" | "Hybrid";
  jobTiming: "Full-time" | "Part-time";
  companylogoURL?: string;
  userprofileURL?: string;
  recruiterName: string;
  recruiterPhone: string;
  recruiterEmail: string;
  user_id: Object;
  updatedAt: string;
  uploadedDate: string;
}

const HeroJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //for filter
  const [search, setSearch] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [jobTiming, setJobTiming] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/");

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();

        // Calculate uploadedDate for each job
        const updatedJobs = data.data.map((job: Job) => ({
          ...job,
          uploadedDate: calculateUploadedDate(job.updatedAt),
        }));

        setJobs(updatedJobs);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case "search":
        setSearch(value);
        localStorage.setItem("search", value);
        break;
      case "location":
        setLocation(value);
        localStorage.setItem("location", value);
        break;
      case "experience":
        setExperience(value);
        localStorage.setItem("experience", value);
        console.log(experience);
        break;
      case "salaryRange":
        setSalaryRange(value);
        localStorage.setItem("salaryRange", value);
        experience;
        console.log(salaryRange);
        break;
      case "jobType":
        setJobType((prevJobType) => (prevJobType === value ? "" : value));
        localStorage.setItem("jobType", value);
        break;
      case "jobTiming":
        setJobTiming((preJobTiming) => (preJobTiming === value ? "" : value));
        localStorage.setItem("jobTiming", value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = new URLSearchParams({
          search,
          location,
          experience,
          salaryRange,
          jobType,
          jobTiming,
        }).toString();

        const response = await fetch(`http://localhost:4000/jobs?${params}`);

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();

        const updatedJobs = data.data.map((job: Job) => ({
          ...job,
          uploadedDate: calculateUploadedDate(job.updatedAt),
        }));

        setJobs(updatedJobs);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [search, location, experience, salaryRange, jobType, jobTiming]);

  const calculateUploadedDate = (updatedAt: string): string => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);

    const diff = now.getTime() - updatedDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  };

  if (loading) {
    return (
      <div className="bg-stone-100 px-0 sm:px-8 py-4 mt-10 md:mt-4">
        <h3 className="text-lg font-medium text-gray-600 text-center sm:text-left">
          Recent Jobs
        </h3>
        <div className="flex flex-col gap-4 rounded-lg border py-4 text-gray-700 shadow transition hover:shadow-lg mx-2 bg-white grow pl-2 mt-6">
          <div className="flex items-center justify-center">
            <ContentLoader id={1} />
          </div>
          <div className="flex items-center justify-center">
            <ContentLoader id={2} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 px-2 rounded-none md:rounded-md sm:px-8 py-4 mt-10 md:mt-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-lg font-medium text-gray-600 text-center sm:text-left">
          Recent Jobs
        </h3>

        {/* Top Filters Section */}
        <div className="flex flex-wrap items-center justify-between mt-4 mb-8 ">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search jobs"
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-6/12 md:w-2/12 mb-3 md:mb-0"
            value={search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />

          {/* Location Input */}
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-6/12 md:w-2/12 mb-3 md:mb-0"
            value={location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            placeholder="Enter location"
          />

          {/* Experience Dropdown */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-6/12 md:w-2/12 mb-3 md:mb-0"
            value={experience}
            onChange={(e) => handleFilterChange("experience", e.target.value)}
          >
            <option>experience</option>
            <option value="0">Freshers</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="<5">More than 5 years</option>
          </select>

          {/* Salary Range filter */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-6/12 md:w-2/12 mb-3 md:mb-0"
            value={salaryRange}
            onChange={(e) => handleFilterChange("salaryRange", e.target.value)}
          >
            <option>Salary</option>
            <option value="<10">less than 10K</option>
            <option value="10-20">10-20K</option>
            <option value="20-40">20-40K</option>
            <option value="50-80">50-80K</option>
            <option value="100+">100+K</option>
          </select>
        </div>

        {/* Left Sidebar Filters Section */}
        <div className="flex flex-wrap">
          <div className="inline-grid grid-cols-1 w-full md:block md:w-1/4 pr-4">
            <div className="sticky top-20">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Filters</h3>

                {/* Job Type Filter */}
                <fieldset>
                  <legend className="text-sm font-medium mb-2">Job Type</legend>
                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        value="Remote"
                        checked={jobType.includes("Remote")}
                        onChange={(e) =>
                          handleFilterChange("jobType", e.target.value)
                        }
                      />
                      Remote
                    </label>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        value="On-site"
                        checked={jobType.includes("On-site")}
                        onChange={(e) =>
                          handleFilterChange("jobType", e.target.value)
                        }
                      />
                      Onsite
                    </label>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        value="Hybrid"
                        checked={jobType.includes("Hybrid")}
                        onChange={(e) =>
                          handleFilterChange("jobType", e.target.value)
                        }
                      />
                      Hybrid
                    </label>
                  </div>
                </fieldset>

                {/* Job Timing Filter */}
                <fieldset>
                  <legend className="text-sm font-medium mb-2">
                    Job Timing
                  </legend>
                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        value="Full"
                        checked={jobTiming.includes("Full")}
                        onChange={(e) =>
                          handleFilterChange("jobTiming", e.target.value)
                        }
                      />
                      Full-time
                    </label>

                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        value="Part"
                        checked={jobTiming.includes("Part")}
                        onChange={(e) =>
                          handleFilterChange("jobTiming", e.target.value)
                        }
                      />
                      Part-time
                    </label>

                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        value="Flexible"
                        checked={jobTiming.includes("Flexible")}
                        onChange={(e) =>
                          handleFilterChange("jobTiming", e.target.value)
                        }
                      />
                      Flexible
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">No jobs found</h3>
                <p className="text-gray-500">
                  Try adjusting your search filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                  <JobRow key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroJobs;
