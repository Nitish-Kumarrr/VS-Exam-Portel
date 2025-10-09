import React from "react";
import HeadingDescription from "../HeadingDescription";

const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      title: "System Maintenance Scheduled",
      date: "October 10, 2025",
      content:
        "The system will be unavailable from 12:00 AM to 3:00 AM due to scheduled maintenance.",
    },
    {
      id: 2,
      title: "New Policy Update",
      date: "October 8, 2025",
      content:
        "Please review the updated company policies regarding remote work and attendance.",
    },
    {
      id: 3,
      title: "Holiday Announcement",
      date: "October 5, 2025",
      content:
        "The office will remain closed on October 15, 2025, in observance of Dussehra.",
    },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-4 bg-white rounded-xl shadow-md">
      {/* Heading */}
      <HeadingDescription
        heading="Notice Board"
        description="View important announcements and notices"
      />

      {/* Notice list */}
      <div className="flex flex-col gap-3 mt-2">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {notice.title}
              </h3>
              <span className="text-sm text-gray-500">{notice.date}</span>
            </div>
            <p className="text-gray-600 mt-1">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
