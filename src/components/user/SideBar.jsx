import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import LogoutPopup from "../LogoutPopup";
import { NavLink} from "react-router-dom";
import { BiSolidCheckSquare, BiLogOut } from "react-icons/bi";
import { FaArrowTrendUp, FaChalkboard } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";


const SideBar = ({children}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-[calc(100vh-56px)] pt-14">
          {/* Sidebar */}
          <aside
            className={`bg-white shadow-xl fixed top-14 left-0 transition-all duration-300 h-[calc(100vh-56px)] ${
              isCollapsed ? "w-[80px]" : "w-64"
            }`}
          >
            <div className="mb-[8px] p-4"> 
              <div className="flex items-center space-x-2">
                <img
                  src="/Images/Pic2.jpg"
                  alt="user"
                  className="w-12 h-12 rounded-full border"
                />
                {!isCollapsed && (
                  <div>
                    <p className="font-semibold">Nikku</p>
                    <p className="text-sm text-gray-500">1005</p>
                  </div>
                )}
              </div>
            </div>

            <nav className="space-y-2">
              <NavLink
                to="/online-exams"
                className={({ isActive }) =>
                  `px-4 py-3 flex items-center gap-4 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <BiSolidCheckSquare /> {!isCollapsed && "Online Exams"}
              </NavLink>

              <NavLink
                to="/analysis"
                className={({ isActive }) =>
                  `px-4 py-3 flex items-center gap-4 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <FaArrowTrendUp /> {!isCollapsed && "Analysis"}
              </NavLink>

              <NavLink
                to="/notice-board"
                className={({ isActive }) =>
                  `px-4 py-3 flex items-center gap-4 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <FaChalkboard /> {!isCollapsed && "Notice Board"}
              </NavLink>

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `px-4 py-3 flex items-center gap-4 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <IoMdSettings /> {!isCollapsed && "Settings"}
              </NavLink>

              <button
                onClick={() => setOpen(true)}
                className="px-4 py-3 flex items-center gap-4 hover:bg-gray-100 text-gray-700 w-full"
              >
                <BiLogOut /> {!isCollapsed && "Logout"}
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <main
            className={`flex-1 bg-gray-50 overflow-y-auto ${
              isCollapsed ? "ml-[80px]" : "ml-64"
            }`}
          >
            {children}
          </main>

          {open && <LogoutPopup open={open} setOpen={setOpen} />}
        </div>
  )
}

export default SideBar