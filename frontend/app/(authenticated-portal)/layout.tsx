"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import AuthProvider from "../auth/Provider";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data: session, status } = useSession();

  const [status, setStatus] = useState("pending");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  if (status === "pending") {
    return (
      <div>
        <div className="flex justify-center items-center  h-full w-full py-2">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    // signIn("google");
    // // redirect("/api/auth/signin");
    return (
      <div className="flex justify-center  gap-2 mt-20 flex-col">
        <h1 className="text-xl text-white">
          You need to be logged in to perform this action.
        </h1>{" "}
        <Link
          className="bg-blue-600 py-1 px-1 text-white font-bold text-md rounded-md w-fit cursor-pointer"
          // onClick={() => {
          //   signIn("google");
          // }
          // }
          href="/login"
        >
          Login now
        </Link>
      </div>
    );
  } else {
    // console.log("Session data:", session);

    return (
      <html lang="en">
        <body>
          {/* <AuthProvider> */}
          <div className="w-full">
            <div className="area">
              <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <main className=" py-4 px-4 sm:px-10 md:30 lg:px-52  w-full">
              <Header />
              {children}
            </main>
          </div>
          {/* </AuthProvider> */}
        </body>
      </html>
    );
  }
}
