import React from "react";
import Image from "next/image";

interface JobDetailsProps {
  job: {
    companyName: string;
    companyLocation: string;
    position: string;
    positionDescription: string | undefined;
    jobType: "Remote" | "On-site" | "Hybrid";
    jobTiming: "Full-time" | "Part-time";
    companylogoURL: string | undefined;
    recruiterName: string;
    recruiterPhone: string;
    recruiterEmail: string;
    uploadedDate: string;
  };
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) return null; // Return null if job is null

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="w-full md:w-1/3 flex justify-center">
          {/* <Image
            src="amazon.png"
            alt={job.companyName}
            width={120}
            height={120}
            className="rounded-full"
          /> */}
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">{job.companyName}</h2>
          <p className="text-gray-500 mb-4">{job.companyLocation}</p>
          <p className="text-gray-500 mb-4">{job.uploadedDate}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Job Details</h3>
        <p className="text-gray-700 mb-2">{job.position}</p>
        <p className="text-gray-500 mb-4">{job.positionDescription}</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {job.jobType}
          </span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {job.jobTiming}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Recruiter Details</h3>
        <p className="text-gray-700 mb-2">{job.recruiterName}</p>
        <p className="text-gray-500 mb-2">{job.recruiterPhone}</p>
        <p className="text-gray-500">{job.recruiterEmail}</p>
      </div>
    </div>
  );
};

export default JobDetails;
