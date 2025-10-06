import { useState, useEffect } from "react";
import { Image, Palette } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function CustomizeSite() {
  const [logo, setLogo] = useState(null);
  const [webAppIcon, setWebAppIcon] = useState(null);
  const [color, setColor] = useState("#2d8df1");

  useEffect(() => {
    const savedLogo = localStorage.getItem("siteLogo");
    const savedIcon = localStorage.getItem("siteWebAppIcon");
    const savedColor = localStorage.getItem("siteColor");

    if (savedLogo) setLogo(savedLogo);
    if (savedIcon) setWebAppIcon(savedIcon);
    if (savedColor) setColor(savedColor);
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setWebAppIcon(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("siteLogo", logo || "");
    localStorage.setItem("siteWebAppIcon", webAppIcon || "");
    localStorage.setItem("siteColor", color);
    toast.success("Theme saved successfully ✅", { duration: 2500 });
  };

  const handleReset = () => {
    localStorage.removeItem("siteLogo");
    localStorage.removeItem("siteWebAppIcon");
    localStorage.removeItem("siteColor");

    setLogo(null);
    setWebAppIcon(null);
    setColor("#2d8df1");
    toast.error("Theme reset to default 🔄", { duration: 2500 });
  };

  return (
    <div className="pt-6 pb-10 px-6 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 space-y-16">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Heading */}
      <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-700 drop-shadow-xl">
        Customize Your Site
      </h2>

      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Organization Logo */}
        <div className="flex flex-col items-center p-6  rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 border-transparent hover:border-indigo-300 border-2">
          <h3 className="font-semibold mb-3 text-gray-800 text-lg">Organization Logo</h3>
          <div className="w-44 h-32 border-2 border-dashed rounded-xl flex items-center justify-center mb-4 bg-white/60 shadow-inner hover:border-indigo-400 transition-all duration-300">
            {logo ? <img src={logo} alt="Logo" className="max-h-full max-w-full rounded-lg" /> : <Image size={32} className="text-gray-400" />}
          </div>
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="cursor-pointer w-[200px]" />
          <p className="text-xs text-gray-500 mt-2">Preview shows live</p>
        </div>

        {/* WebApp Icon */}
        <div className="flex flex-col items-center p-6  rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 border-transparent hover:border-purple-300 border-2">
          <h3 className="font-semibold mb-3 text-gray-800 text-lg">WebApp Icon</h3>
          <div className="w-28 h-28 border-2 border-dashed rounded-full flex items-center justify-center mb-4 bg-white/60 shadow-inner hover:border-purple-400 transition-all duration-300">
            {webAppIcon ? <img src={webAppIcon} alt="WebApp Icon" className="w-20 h-20 object-contain rounded-full" /> : <Image size={28} className="text-gray-400" />}
          </div>
          <input type="file" accept="image/*" onChange={handleIconUpload} className="cursor-pointer w-[200px]" />
          <p className="text-xs text-gray-500 mt-2">Recommended: 512px × 512px</p>
        </div>

        {/* Page Color Picker */}
        <div className="flex flex-col items-center p-6  rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 border-transparent hover:border-indigo-400 border-2">
          <h3 className="font-semibold mb-3 text-gray-800 text-lg">Page Theme Color</h3>
          <div className="flex flex-col items-center">
            <Palette size={32} className="mb-3 text-indigo-500" />
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-16 h-16 cursor-pointer rounded-full border shadow-lg transition-all duration-300" />
          </div>
          <p className="text-sm mt-3 font-mono text-gray-700">{color}</p>
          <p className="text-xs text-gray-500">Click to pick new color</p>
        </div>
      </div>

      {/* Live Login Page Preview */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-lg">
          Live Login Page Preview
        </h3>
        <div
          className="w-full h-[32rem] flex items-center justify-center rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500"
          style={{ background: `linear-gradient(135deg, ${color}, #1e3a8a)` }}
        >
          {/* Floating WebApp Icon */}
          {webAppIcon && (
            <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center animate-bounce z-20">
              <img src={webAppIcon} alt="Favicon" className="w-10 h-10 object-contain" />
            </div>
          )}

          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-96 flex flex-col items-center transform hover:scale-105 transition duration-300 z-10">
            {logo && (
              <div className="flex justify-center mb-6">
                <img src={logo} alt="Logo" className="h-16 object-contain" />
              </div>
            )}
            <div className="w-full space-y-5">
              <input type="text" placeholder="Phone / Roll Num" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm transition duration-300" />
              <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm transition duration-300" />
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold">
                Login
              </button>
              <div className="flex justify-between text-sm text-indigo-600">
                <a href="#" className="hover:underline">Forgot Password?</a>
                <a href="#" className="hover:underline">Signup</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-6 pt-6">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300 font-semibold transform"
        >
          Save Theme
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300 font-semibold transform"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
