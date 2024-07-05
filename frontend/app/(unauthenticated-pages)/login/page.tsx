"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        // Redirect or navigate to another page on successful login
        window.location.href = "/";
      } else {
        alert(data.error); // Display error message from backend
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again."); // Generic error message
    }
  };

  return (
    <div className=" flex flex-col items-center justify-start h-screen px-2  bg-white mt-20 lg:mt-36 ">
      <p className=" text-xl text-center text-gray-600 dark:text-gray-200 mt-20">
        Welcome back!
      </p>

      <form onSubmit={handleSubmit} className="mt-4 w-3/5">
        <label className="block mb-2 mt-10 text-sm font-medium text-gray-600 dark:text-gray-200">
          Email
        </label>
        <input
          id="email"
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="mt-4">
          <div className="flex justify-between">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Password
            </label>
            <Link
              href="/resetPassword"
              className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <input
            id="password"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-6">
          <button
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <div className="flex gap-4 justify-center items-center mt-4">
        <span>Don&apos;t have account ?</span>
        <Link
          href="/signup"
          className=" text-gray-600 uppercase dark:text-gray-400 hover:underline text-sm"
        >
          sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
