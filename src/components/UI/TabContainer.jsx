import React from 'react'

const TabContainer = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full">
      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm focus:outline-none cursor-pointer w-[150px] h-7 flex items-center justify-center rounded-lg shadow-md ${
              activeTab === tab
                ? "border-b-2 border-blue-500 bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabContainer