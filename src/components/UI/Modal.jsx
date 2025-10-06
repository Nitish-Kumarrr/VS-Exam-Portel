import React from "react";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50" onClick={(e)=>{
        e.stopPropagation();
        onClose();
    }}>
      <div className="bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
        >
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
