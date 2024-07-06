"use client";
import React, { useState, useEffect } from "react";
import JobRow from "../../../components/JobRow";

interface Job {
  _id: string;
  companyName: string;
  companyLocation: string;
  position: string;
  positionDescription: string;
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

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/user/postedjobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        // Access the data property in the response
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

  return (
    <div className="bg-stone-100 px-2 sm:px-8 py-4 mt-10 sm:mt-32 md:mt-60 h-screen">
      <h3 className="text-lg font-medium text-gray-600 text-center sm:text-left">
        Posted Jobs
      </h3>
      {jobs.length == 0 ? (
        <div className="flex justify-center items-center mt-10 md:mt-40">
          You haven&apos;t Posted any jobs yet...
        </div>
      ) : (
        jobs.map((job) => <JobRow key={job._id} job={job} />)
      )}
    </div>
  );
};

export default Jobs;
