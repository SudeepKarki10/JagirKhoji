import Link from "next/link";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isAuthenticated: boolean;
  user: any;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  isAuthenticated,
  user,
  handleLogout,
}) => {
  return (
    <div
      className={`fixed sm:hidden top-0 right-0 h-full text-center text-lg  bg-blue-800 text-white w-64 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex items-center justify-end p-4 border-b border-gray-700">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none text-right "
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col p-4">
        <div className="py-2">
          {user ? `👋, ${user.username}` : "Loading..."}
        </div>
        <Link href="/" className="py-2 hover:text-gray-400">
          Home
        </Link>
        <Link href="/user/postedjobs" className="py-2 hover:text-gray-400">
          Your Posts
        </Link>
        {!isAuthenticated ? (
          <Link href="/login" className="py-2 hover:text-gray-400 ">
            Login
          </Link>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="py-2 hover:text-gray-400 "
            >
              Logout
            </button>
          </>
        )}
        <Link href="/new-listing" className="py-2 hover:text-gray-400">
          Post a Job
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
