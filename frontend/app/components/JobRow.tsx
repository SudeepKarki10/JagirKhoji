import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Fallbackimg from "../../public/fallback.png";

interface Props {
  job: {
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
    uploadedDate: string;
    user_id: Object;
  };
}

const JobRow: React.FC<Props> = ({ job }) => {
  const truncateDescription = (text: string | undefined, maxLength: number) => {
    if (!text) {
      return "";
    }
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + "...";
    }

    return text;
  };

  // useEffect(() => {
  //   console.log(job);
  // }, []);

  return (
    <Link
      href={`/jobdetails/${job._id}?u_id=${job.user_id}&company=${job.companyName}`}
    >
      <div className="flex flex-col md:flex-row gap-4  rounded-lg border py-4 text-gray-700 shadow transition hover:shadow-lg mx-2  bg-white grow pl-2 mt-6">
        <div className="flex items-center justify-center relative h-40 md:h-40 w-full  md:w-1/4  rounded-sm ">
          {job.companylogoURL ? (
            <Image
              src={job.companylogoURL}
              layout="fill"
              objectFit="cover"
              alt="company logo"
              className="object-cover"
            />
          ) : (
            <Image
              src={Fallbackimg}
              layout="fill"
              objectFit="cover"
              alt="fallback logo"
              className="object-cover"
            />
          )}
        </div>

        <div className=" flex flex-col pr-0 sm:pr-8 text-left pl-0 sm:pl-4 grow  w-full md:w-8/12 ">
          <h3 className="text-sm text-gray-600">{job.companyName}</h3>
          <div className="likepost self-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-heart cursor-pointer inline-block"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
          </div>

          <p className="text-sm text-gray-600 mb-2 mt-0">{job.recruiterName}</p>

          <p className="mb-1 md:mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">
            {job.position}
          </p>
          <p className="overflow-hidden pr-7 text-sm">
            {truncateDescription(job.positionDescription, 200)}
          </p>

          <div className=" mt-2 md:mt-5 flex flex-col flex-grow space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 space-x-0 sm:space-x-2">
            <div className="flex-grow flex-row">
              <div className="flex items-center mt-3 sm:mt-0">
                <span className="mr-0 sm:mr-3 rounded-md sm:rounded-full bg-blue-100 px-2 py-0.5 text-blue-800 w-full sm:w-fit">
                  {job.jobType} · {job.companyLocation} · {job.jobTiming}
                </span>
              </div>
            </div>

            <div className="self-end">
              <div className="text-right pr-2">{job.uploadedDate}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobRow;
