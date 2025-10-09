import React, { useEffect, useState } from 'react'
import FloatingLabel from './FloatingLabel'
import { FaPlus } from 'react-icons/fa6'
import { MdSend } from 'react-icons/md'

const EditProfile = () => {
    const [image, setImage] = useState(true);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phoneNo: "",
        file: null
    })
    const [errors, setErrors] = useState({});
    useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const storedEmail = localStorage.getItem("email");

    if (users.length && storedEmail) {
      const matchedUser = users.find((u) => u.email === storedEmail);

      if (matchedUser) {
        setFormData((prev) => ({
          ...prev,
          userName: matchedUser.name || "",
          email: matchedUser.email || "",
        }));
      }
    }
  }, []);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, file }));
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" })); 
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.userName.trim()) {
            newErrors.userName = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.phoneNo.trim()) {
            newErrors.phoneNo = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phoneNo)) {
            newErrors.phoneNo = "Phone number must be 10 digits";
        }

        if (!formData.file) {
            newErrors.file = "Profile image is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            console.log("Form submitted", formData);
        }
    };
    return (
        <div className="flex flex-col gap-4 shadow-lg  p-4 w-[400px]">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                        <input
                            type="file"
                            id="profile-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        <label
                            htmlFor="profile-upload"
                            className="cursor-pointer w-full h-full rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100"
                        >
                            {image ? (
                                <img
                                    src="/Images/Pic2.jpg"
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No Image</span>
                            )}
                        </label>

                        <label
                            htmlFor="profile-upload"
                            className="absolute bottom-[5px] right-[5px] bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-lg"
                        >
                            <FaPlus size={14} />
                        </label>
                        {errors.file && <p className="absolute top-[100%] text-[12px] text-red-500 text-nowrap">{errors.file}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <FloatingLabel
                        label="Name"
                        type="text"
                        value={formData.userName}
                        onChange={(e) => handleChange("userName", e.target.value)}
                        errors={errors.userName} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <FloatingLabel
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        errors={errors.email}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <FloatingLabel
                        label="Phone Number"
                        type="text"
                        value={formData.phoneNo}
                        onChange={(e) => handleChange("phoneNo", e.target.value)}
                        errors={errors.phoneNo}
                    />
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <button className="flex items-center justify-center gap-2 h-10 px-4 bg-blue-400 text-white rounded-4xl cursor-pointer"
                    onClick={handleSubmit}
                >Save <MdSend /></button>
            </div>
        </div>
    )
}

export default EditProfile