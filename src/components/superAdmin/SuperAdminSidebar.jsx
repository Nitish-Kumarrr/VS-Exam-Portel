import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import { NavLink} from "react-router-dom";
import { LayoutDashboard, Calendar, CreditCard, HelpCircle, User, LogOut } from "lucide-react";
import { BiSolidCheckSquare, BiLogOut } from "react-icons/bi";
import { FaArrowTrendUp, FaChalkboard } from "react-icons/fa6";
import { IoMdMenu, IoMdSettings } from "react-icons/io";
import LogoutPopup from "../LogoutPopup";


const SuperAdminSidebar = ({children}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-[calc(100vh-56px)] pt-14">
      <div
      className="absolute z-10 top-1 left-8 shadow-xl cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-white"
                onClick={() => setIsCollapsed((prev) => !prev)}
              >
                <span >
                  <IoMdMenu size={24} />
                </span>
              </div>
          {/* SuperAdminSidebar */}
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
                to="/super-admin/organisation"
                className={({ isActive }) =>
                  `px-4 py-3 flex items-center gap-4 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100 text-gray-700"
                  } ${isCollapsed?"justify-center":"justify-start"}`
                }
              >
                <Calendar size={20} /> {!isCollapsed && "Organisation & Events"}
              </NavLink>

              <NavLink
                to="/super-admin/billing"
                className={({ isActive }) =>
                  `px-4 py-3 flex items-center gap-4 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100 text-gray-700"
                  }  ${isCollapsed?"justify-center":"justify-start"}`
                }
              >
                <CreditCard size={20} /> {!isCollapsed && "Subscription & Billing"}
              </NavLink>

              <NavLink
                to="/super-admin/global"
                className={({ isActive }) =>
                  `px-4 py-3 flex items-center gap-4 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100 text-gray-700"
                  } ${isCollapsed?"justify-center":"justify-start"}`
                }
              >
                <LayoutDashboard size={20} /> {!isCollapsed && "Global Dashboard"}
              </NavLink>

              <NavLink
                to="/super-admin/support"
                className={({ isActive }) =>
                  `px-4 py-3 flex items-center gap-4 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100 text-gray-700"
                  } ${isCollapsed?"justify-center":"justify-start"}`
                }
              >
                <HelpCircle size={20} /> {!isCollapsed && "Support"}
              </NavLink>

              <button
                onClick={() => setOpen(true)}
                className={`px-4 py-3 flex items-center gap-4 hover:bg-gray-100 text-gray-700 w-full ${isCollapsed?"justify-center":"justify-start"}`}
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

export default SuperAdminSidebar