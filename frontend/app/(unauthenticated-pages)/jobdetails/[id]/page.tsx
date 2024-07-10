"use client"; //for client side access of quesry string data
import React, { useEffect, useState } from "react";
import JobDetails from "../../../components/singleJobdetail";
import { headers } from "next/headers";
import Loader from "../../../components/loader";
import ContentLoader from "../../../components/contentLoader";
// import { useParams, useSearchParams } from "next/navigation";

const Page = ({ params, searchParams }: any) => {
  //for client side access of quesry string data
  // const params = useParams();
  // const searchParams = useSearchParams();
  // const company = searchParams?.get("company");
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/jobdetails/${params.id}`
        );
        const data = await response.json();

        if (response.ok) {
          setJob(data.data);
          setLoading(false);
        } else {
          setError(data.message);
          setLoading(false);
        }
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobData();
  }, [params.id]);

  return (
    <div>
      {/* <p>Job Details Page</p>
      <p>JobID: {params?.id || "Loading..."}</p>

      <p>UserId : {searchParams.u_id}</p>
      <p>Company: {searchParams.company}</p> */}

      {loading ? (
        <div className="grid place-items-center mt-20 bg-zinc-200 px-4 py-8 h-full rounded-md">
          <ContentLoader />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="w-full my-8">
          <JobDetails job={job} />
        </div>
      )}
    </div>
  );
};

export default Page;
