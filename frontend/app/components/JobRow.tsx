import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Fallbackimg from "../../public/fallback.png";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import EditJobForm from "./EditJobForm";

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

interface Props {
  job: Job;
  iconType: string;
  setIsEditedDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const notify = () =>
  toast("Job deleted Successfully.Refresh to see changes.", {
    duration: 3000, // Auto-close after 3 seconds
    position: "top-right",
    icon: "⏰", // Custom icon for timeout
  });

const JobRow: React.FC<Props> = ({ job, iconType, setIsEditedDeleted }) => {
  const router = useRouter();

  const truncateDescription = () => {
    const description = job.positionDescription[0];
    if (description.length > 130) {
      return description.slice(0, 130) + "...";
    }
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    setIsEditedDeleted((x) => !x);
    router.push(`/editjob/${job._id}`);
  };

  const handleDelete = async (e: any, job_id: Object) => {
    e.preventDefault();
    setIsEditedDeleted((x) => !x);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:4000/user/postedjobs/delete?id=${job_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        notify();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <Toaster />

      <Link
        href={`/jobdetails/${job._id}?u_id=${job.user_id}&company=${job.companyName}`}
      >
        <div className="flex flex-col md:flex-row gap-4  rounded-lg border py-4 text-gray-700 shadow transition hover:shadow-lg mx-2  bg-white grow pl-2 mt-6 relative">
          <div className="likepost self-end absolute top-0 right-0 mt-6 mr-4">
            {iconType === "Like" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
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
            ) : (
              <div className="flex flex-col justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                  onClick={(e) => handleEdit(e)}
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                  onClick={(e: any) => handleDelete(e, job._id)}
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </div>
            )}
          </div>

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

            <p className="text-sm text-gray-600 mb-2 mt-0">
              {job.recruiterName}
            </p>

            <p className="mb-1 md:mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">
              {job.position}
            </p>
            <p className="overflow-hidden pr-7 text-sm">
              {truncateDescription()}
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
    </div>
  );
};

export default JobRow;
