import React from "react";
import Image from "next/image";

interface JobDetailsProps {
  job: {
    companyName: string;
    companyLocation: string;
    position: string;
    positionDescription: string[] | undefined;
    jobType: "Remote" | "On-site" | "Hybrid";
    jobTiming: "Full-time" | "Part-time";
    companylogoURL: string | undefined;
    recruiterName: string;
    recruiterPhone: string;
    recruiterEmail: string;
    uploadedDate: string;
    experience: string;
    salaryRange: string;
  };
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) return null; // Return null if job is null

  return (
    <div
      className="bg-white rounded-lg shadow-md  flex flex-col md:flex-row px-4 sm:px-10 md:px-20 pt-6 md:py-20"
      style={{ height: "max-content" }}
    >
      <div className="w-full flex flex-col justify-between">
        <div className="mb-4 flex ">
          <div className="w-full relative  flex gap-3 h-28 mb-8">
            {job.companylogoURL && (
              <Image
                src={job.companylogoURL}
                alt={job.companyName}
                width={150}
                height={150}
                className="rounded-3xl"
              />
            )}

            <div className="company-details">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2">
                {job.companyName}
              </h2>
              <p className="text-lg sm:text-xl font-bold mb-2">
                {job.position}
              </p>
              <p className="text-gray-500 mb-2">
                {job.companyLocation}, {job.jobType}
              </p>
            </div>

            <div className="absolute top-0 right-0 h-10 w-10 sm:h-10 sm:w-14 cursor-pointer">
              <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-4 mb-4">
          <div className="bg-green-100 px-2 py-1 rounded-3xl  flex flex-col justify-center items-center h-16 w-full md:h-32 md:w-44 ">
            <p className="mr-2 text-md">Salary</p>
            <p className="text-2xl font-bold inline-block">
              {job.salaryRange}
              {"K"}
            </p>
          </div>
          <div className="bg-blue-100  px-2 py-1 rounded-3xl flex flex-col justify-center items-center h-16 w-full md:h-32 md:w-44">
            <p className="mr-2 text-md">Job Type</p>
            <p className="text-2xl font-bold">{job.jobType}</p>
          </div>
          <div className="bg-purple-100  px-2 py-1 rounded-3xl flex flex-col justify-center items-center h-16 w-full md:h-32 md:w-44">
            <p className="mr-2 text-md">Experience</p>
            <p className="text-2xl font-bold">{job.experience}</p>
          </div>
          <div className="bg-gray-100  px-2 py-1 rounded-3xl flex flex-col justify-center items-center h-16 w-full md:h-32 md:w-44">
            <p className="mr-2 text-md">Job Timing</p>
            <p className="text-2xl font-bold">{job.jobTiming}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Job Description</h3>
          {job.positionDescription && (
            <ul className="list-disc list-inside text-gray-700">
              {job.positionDescription
                .slice(0, job.positionDescription.length)
                .map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
