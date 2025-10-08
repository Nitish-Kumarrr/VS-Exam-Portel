import React, { useEffect, useState } from 'react'
import { BiLogOut } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const LogoutPopup = ({open, setOpen}) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [open]);
  const handleLogout = () =>{
    setOpen(false);
    localStorage.clear(); 
    navigate("/about")
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/5 flex items-center justify-center z-50" onClick={(e)=>
    {
        setOpen(false)
        e.stopPropagation();
    }}>
          <div className={`bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative transform transition-all duration-300 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <IoMdClose size={20} />
            </button>

            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <BiLogOut size={28} className="text-red-500" />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-center">
              You are about to logout
            </h2>
            <p className="text-sm text-gray-500 text-center mt-2">
              Are you sure you want to logout? <br />
              We'll keep an eye on your exams while you're away.
            </p>

            <div className="flex justify-between mt-6 gap-4">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 flex-1 cursor-pointer"
              >
                ← Go Back
              </button>
              <button
                onClick={() => {
                  handleLogout()
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-md flex-1 cursor-pointer"
              >
                Logout <BiLogOut />
              </button>
            </div>
          </div>
        </div>
  )
}

export default LogoutPopup