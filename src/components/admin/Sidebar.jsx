import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Users,
  Settings,
  Layers,
  DollarSign,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Video,
} from "lucide-react";
import logo from "../../assets/logo.jpg";
import LogoutPopup from "../LogoutPopup";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  const links = [
    { name: "Exams", path: "/admin/exams", icon: <Home size={20} /> },
    { name: "Students", path: "/admin/students", icon: <Users size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
    { name: "Upgrade Plans", path: "/admin/upgrade-plans", icon: <DollarSign size={20} /> },
    { name: "Customize Site", path: "/admin/customize-site", icon: <Layers size={20} /> },
    { name: "Tickets", path: "/admin/tickets", icon: <MessageSquare size={20} /> },
    { name: "Demo Video", path: "/admin/demovideo", icon: <Video size={20} /> }, // added
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-white border-r shadow-lg flex flex-col transition-all duration-300 z-40
          ${open ? "w-60" : "w-16"} 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            {open && <h1 className="font-bold text-xl text-blue-600">VS-Exams</h1>}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="hidden md:block text-gray-500 hover:text-blue-600 transition"
          >
            ☰
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-4 flex-grow overflow-y-auto">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 mx-2 my-1 rounded-lg transition 
                  ${isActive
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                {link.icon}
                {open && <span className="truncate">{link.name}</span>}
              </Link>
            );
          })}

          {/* Logout */}
          <button
            // to="/logout"
            onClick={() => {
              setMobileOpen(false)
              setShowLogoutPopup(true)
            }}
            className="flex items-center gap-3 px-4 py-2 mt-auto mx-2 my-2 rounded-lg text-red-600 hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
          >
            <LogOut size={20} />
            {open && <span>Logout</span>}
          </button>
        </nav>

        {/* Collapse/Expand Hint */}
        <div className="hidden md:flex justify-center items-center p-2 text-gray-400 text-sm">
          {open ? "Collapse Sidebar" : "Expand Sidebar"}
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {showLogoutPopup && <LogoutPopup open={showLogoutPopup} setOpen={setShowLogoutPopup} />}
    </>
  );
}
