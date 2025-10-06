import { useState, useEffect } from "react";
import { Image } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function AdminSettings() {
  const [orgInfo, setOrgInfo] = useState({
    name: "Vijay Software Solutions",
    phone: "9876543210",
    email: "hr@vijaysoft.com",
    logo: null,
  });

  const [editInfo, setEditInfo] = useState({ ...orgInfo });
  const [editing, setEditing] = useState(false); // start in summary view
  const [otpModal, setOtpModal] = useState({ show: false, field: "", value: "" });
  const [otpInput, setOtpInput] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [changesMade, setChangesMade] = useState(false);
  const [verifiedFields, setVerifiedFields] = useState({ phone: true, email: true });

  // Load saved info
  useEffect(() => {
    const savedData = localStorage.getItem("orgInfo");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setOrgInfo(parsed);
      setEditInfo(parsed);
    }
  }, []);

  // OTP Countdown
  useEffect(() => {
    let timer;
    if (otpModal.show && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown, otpModal.show]);

  const handleChange = (field, value) => {
    setEditInfo((prev) => ({ ...prev, [field]: value }));
    setChangesMade(true);

    // Require re-verification if phone/email changed
    if (field === "phone" || field === "email") {
      setVerifiedFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => handleChange("logo", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const requestOtp = (field) => {
    if (field === "phone" && !/^\d{10}$/.test(editInfo.phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editInfo.email)) {
      toast.error("Enter a valid email address");
      return;
    }
    setOtpModal({ show: true, field, value: editInfo[field] });
    setOtpCountdown(60);
    toast("OTP sent! (Simulated)", { icon: "🔑" });
  };

  const verifyOtp = () => {
    if (otpInput === "123456") {
      toast.success(`${otpModal.field} verified successfully ✅`);
      setVerifiedFields((prev) => ({ ...prev, [otpModal.field]: true }));
      setOtpModal({ show: false, field: "", value: "" });
      setOtpInput("");
    } else {
      toast.error("Invalid OTP ❌");
    }
  };

  const handleSave = () => {
    if (!verifiedFields.phone || !verifiedFields.email) {
      toast.error("Please verify phone and email before saving!");
      return;
    }
    localStorage.setItem("orgInfo", JSON.stringify(editInfo));
    setOrgInfo(editInfo);
    toast.success("Organization settings saved ✅");
    setChangesMade(false);
    setEditing(false);
  };

  const handleReset = () => {
    setEditInfo(orgInfo);
    setChangesMade(false);
    setVerifiedFields({ phone: true, email: true });
    toast("Changes reverted ⚡");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 space-y-10">
      <Toaster position="top-right" reverseOrder={false} />

      {!editing ? (
        // --- Summary / Initial View ---
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 space-y-6 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg">
            Organization Details
          </h2>
          {orgInfo.logo && (
            <img
              src={orgInfo.logo}
              alt="Logo"
              className="w-32 h-32 mx-auto object-contain rounded-full shadow-lg"
            />
          )}
          <div className="space-y-2 text-left mt-6 text-gray-800">
            <p>
              <span className="font-semibold">Name:</span> {orgInfo.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {orgInfo.phone}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {orgInfo.email}
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform font-semibold"
          >
            Edit Details
          </button>
        </div>
      ) : (
        // --- Editable Form ---
        <>
          <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg">
            Organization Settings
          </h2>

          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 space-y-6">
            {/* Logo Upload */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-3">Organization Logo</h3>
              <div className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center mb-4 bg-white/60 shadow-inner hover:border-indigo-400 transition">
                {editInfo.logo ? (
                  <img src={editInfo.logo} alt="Logo" className="w-28 h-28 object-contain rounded-full" />
                ) : (
                  <Image size={28} className="text-gray-400" />
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="cursor-pointer" />
            </div>

            {/* Name */}
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Organization Name</label>
              <input
                type="text"
                value={editInfo.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Phone Number</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={editInfo.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm transition"
                />
                <button
                  onClick={() => requestOtp("phone")}
                  className={`px-4 py-3 rounded-lg shadow-lg text-white font-semibold transition transform ${
                    verifiedFields.phone
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:scale-105 hover:shadow-2xl"
                  }`}
                  disabled={verifiedFields.phone}
                >
                  Verify
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Email</label>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={editInfo.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm transition"
                />
                <button
                  onClick={() => requestOtp("email")}
                  className={`px-4 py-3 rounded-lg shadow-lg text-white font-semibold transition transform ${
                    verifiedFields.email
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:scale-105 hover:shadow-2xl"
                  }`}
                  disabled={verifiedFields.email}
                >
                  Verify
                </button>
              </div>
            </div>

            {/* OTP Modal */}
            {otpModal.show && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center space-y-4">
                  <h3 className="font-semibold text-lg">Enter OTP for {otpModal.field}</h3>
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder=""
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm text-center"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={verifyOtp}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:scale-105 transition transform"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => setOtpModal({ show: false, field: "", value: "" })}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:scale-105 transition transform"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {otpCountdown > 0
                      ? `Resend OTP in ${otpCountdown}s`
                      : "You can request OTP again"}
                  </p>
                </div>
              </div>
            )}

            {/* Save / Reset */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                disabled={!changesMade || !verifiedFields.phone || !verifiedFields.email}
                onClick={handleSave}
                className={`px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition transform ${
                  changesMade && verifiedFields.phone && verifiedFields.email
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:scale-105 hover:shadow-2xl"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
              <button
                disabled={!changesMade}
                onClick={handleReset}
                className={`px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition transform ${
                  changesMade
                    ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:scale-105 hover:shadow-2xl"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
