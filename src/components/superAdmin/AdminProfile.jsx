import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Mouni",
    email: "mounikamatala@gmail.com",
    role: "Super Admin",
    phone: "6303332010",
    profilePic: "" // initially empty
  });

  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profilePic: URL.createObjectURL(file) });
    }
  };

  const handlePasswordUpdate = () => {
    if (newPassword === confirmPassword && newPassword !== "") {
      alert("✅ Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("❌ Passwords do not match!");
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto rounded-xl shadow-md mt-5">

      {/* Back Button */}
      <button className="text-2xl mb-3" onClick={() => navigate(-1)}>⬅</button>

      <h2 className="text-center text-2xl font-bold text-red-500 mb-5">Super Admin Profile</h2>

      <div className="flex bg-white p-5 rounded-lg shadow gap-5">
        <div className="flex flex-col items-center">
          <img
            src={profile.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-300"
          />
          <label
            htmlFor="profilePicUpload"
            className="mt-2 text-white bg-blue-500 px-3 py-1 rounded cursor-pointer"
          >
            Edit
          </label>
          <input
            type="file"
            id="profilePicUpload"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </div>

        <div className="flex-1">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="font-bold block mt-2 capitalize">{field}:</label>
              {editing ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p className="p-2 bg-gray-100 rounded">{profile[field]}</p>
              )}
            </div>
          ))}

          <label className="font-bold block mt-2">Role:</label>
          <p className="p-2 bg-gray-100 rounded">{profile.role}</p>

          {editing ? (
            <button
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mt-5 bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="Enter New Password"
          className="w-full p-2 border rounded mb-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded mb-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded w-full"
          onClick={handlePasswordUpdate}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
