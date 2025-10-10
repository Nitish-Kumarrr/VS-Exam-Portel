import React, { useEffect, useState } from 'react'
import FloatingLabel from './FloatingLabel'
import { MdSend } from 'react-icons/md'

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        userName: "",
        newPassword: "",
        confirmPassword: ""
      })
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const storedEmail = localStorage.getItem("email");
    
        if (users.length && storedEmail) {
          const matchedUser = users.find((u) => u.email === storedEmail);
    
          if (matchedUser) {
            setFormData((prev) => ({
              ...prev,
              userName: matchedUser.name || "",
            }));
          }
        }
      }, []);
    
    const [errors, setErrors] = useState({})
      const validate = () => {
    let newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    console.log(newErrors,"newErrors")
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
    const handleSubmit = () =>{
      if(validate()){
        console.log("Done")
      }
    }
  return (
    <div className="flex flex-col gap-4 shadow-lg w-[350px] p-4">
          <div className="flex flex-col gap-1">
            <FloatingLabel label="Username" value={formData.userName} errors={errors?.userName}/>
          </div>
          <div className="flex flex-col gap-1">
            <FloatingLabel label="New Password" type="password" value={formData.newPassword} errors={errors?.newPassword}/>
          </div>
          <div className="flex flex-col gap-1">
            <FloatingLabel label="Confirm Password" type="password" value={formData.confirmPassword} errors={errors?.confirmPassword}/>
          </div>
          <div className="w-full flex items-center justify-center">
            <button className="flex items-center justify-center gap-2 h-10 px-4 bg-blue-400 text-white rounded-4xl cursor-pointer"
            onClick={handleSubmit}
            >Set Password <MdSend /></button>
          </div>
        </div>
  )
}

export default ChangePassword