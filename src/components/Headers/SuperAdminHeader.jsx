import { User } from 'lucide-react';
import React, { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { HiOutlineArrowsExpand } from 'react-icons/hi'
import { IoNotifications } from "react-icons/io5";

const SuperAdminHeader = ({}) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        if (!isFullScreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    };
    return (
        <header className="h-14 w-screen bg-white flex items-center justify-between px-4 shadow-sm fixed top-0 left-0 right-0 z-10">
            <div className="flex items-center gap-[22px] h-14 overflow-hidden w-[180px] justify-end">
                {/* <div
                className="relative flex items-center justify-center h-10 w-10 rounded-full bg-white cursor-pointer shadow-xl"
                onClick={() => setIsCollapsed((prev) => !prev)}
              >
                <span className="absolute">
                  <IoMdMenu size={24} />
                </span>
              </div> */}
                <img
                    alt="logo"
                    className="h-[100px] w-[100px]"
                />
            </div>
            <div className="flex items-center ">
               <Link to="/super-admin/notifications">
              <button className="text-white p-2 hover:bg-gray-700 rounded-full transition">
               🔔
              </button>
             </Link>
                <Link
              to="/super-admin/profile"
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full hover:underline"
            >
              <User size={20} />
              <span></span>
            </Link>
                <button className="cursor-pointer" >
                    <BiLogOut />
                </button>
            </div>
        </header>
    )
}

export default SuperAdminHeader