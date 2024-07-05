// "use client";
// import Link from "next/link";
// import React from "react";
// import { useSession } from "next-auth/react";
// import { signIn } from "next-auth/react";
// import { TailSpin } from "react-loader-spinner";

// const Header = () => {
//   // const { data: session, status } = useSession();

//   // console.log(status);

//   return (
//     <div>
//       <header>
//         <div className=" flex items-center justify-between ">
//           <Link href="/" className="font-bold text-xl text-white">
//             Job Khoji
//           </Link>

//           <div className="flex gap-2 text-white ">
//             <Link href="/" className=" hover:text-gray-400">
//               Home
//             </Link>
//             <Link href="/user/postedjobs" className=" hover:text-gray-400">
//               Your Posts
//             </Link>
//           </div>

//           <nav className="flex gap-2   *:rounded-md font-medium">
//             {status === "unauthenticated" ? (
//               <button
//                 onClick={(e) => signIn("google")}
//                 className="bg-gray-300 px-1 py-1  sm:px-4 sm:py-2"
//               >
//                 Login
//               </button>
//             ) : (
//               <>
//                 <div className="content-center text-white">
//                   {status === "loading" ? (
//                     <TailSpin
//                       visible={true}
//                       height="30"
//                       width="40"
//                       color="#ffff"
//                       ariaLabel="tail-spin-loading"
//                       radius="1"
//                       wrapperStyle={{}}
//                       wrapperClass=""
//                     />
//                   ) : (
//                     `👋${session?.user?.name}`
//                   )}
//                 </div>
//                 <Link
//                   href="/api/auth/signout"
//                   className="bg-gray-300 px-4 py-2 cursor-pointer"
//                   onClick={() => alert("login clicked")}
//                 >
//                   Logout
//                 </Link>
//               </>
//             )}

//             <Link
//               href="/new-listing"
//               className="bg-blue-600 px-1 py-1  sm:px-4 sm:py-2  text-white cursor-pointer"
//             >
//               Post a job
//             </Link>
//           </nav>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user info
      const user = JSON.parse(atob(token.split(".")[1]));
      setIsAuthenticated(true);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    // Redirect to home page
  };

  return (
    <div>
      <header>
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-white">
            Job Khoji
          </Link>

          <div className="flex gap-2 text-white">
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link href="/user/postedjobs" className="hover:text-gray-400">
              Your Posts
            </Link>
          </div>

          <nav className="flex gap-2 *:rounded-md font-medium">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="bg-gray-300 px-1 py-1 sm:px-4 sm:py-2"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <div className="content-center text-white">
                  {user ? `👋sudeep` : "Loading..."}
                </div>
                <button
                  className="bg-gray-300 px-4 py-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
            <Link
              href="/new-listing"
              className="bg-blue-600 px-1 py-1 sm:px-4 sm:py-2 text-white cursor-pointer"
            >
              Post a job
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
