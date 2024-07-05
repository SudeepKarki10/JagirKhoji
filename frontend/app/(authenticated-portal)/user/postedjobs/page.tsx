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
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:4000/user/postedjobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        // Access the data property in the response
        setJobs(data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-stone-100 px-2 sm:px-8 py-4 mt-10 sm:mt-32 md:mt-60">
      <h3 className="text-lg font-medium text-gray-600 text-center sm:text-left">
        Posted Jobs
      </h3>
      {jobs.map((job) => (
        <JobRow key={job._id} job={job} />
      ))}
    </div>
  );
};

export default Jobs;
