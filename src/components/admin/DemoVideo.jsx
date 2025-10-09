import React, { useState } from "react";

export default function DemoVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    } else {
      alert("Please upload a valid video file");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Demo Video Upload</h2>

      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Upload Video
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
        />
      </label>

      {videoFile && (
        <p className="text-gray-600">📁 {videoFile.name}</p>
      )}

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      )}
    </div>
  );
}
