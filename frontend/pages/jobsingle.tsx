// pages/jobdetails.tsx
"use client";
import { useSearchParams } from "next/navigation";

const JobDetailsPage = () => {
  const searchParams = useSearchParams();

  // Extract query parameters from searchParams
  const company = searchParams?.get("company");
  const job_id = searchParams?.get("job_id");

  // Alert job_id value
  if (job_id) {
    alert(`Job ID: ${job_id}`);
  }

  return (
    <div>
      <h1>Job Details Page</h1>
      <h2>{job_id}</h2>
    </div>
  );
};

export default JobDetailsPage;
