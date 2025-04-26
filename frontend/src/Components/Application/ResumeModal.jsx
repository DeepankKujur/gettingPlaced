import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative p-6 w-full h-screen mx-4 z-50">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
          >
            ✕
          </button>
          <div className="w-full h-full flex justify-center"><img src={imageUrl} alt="resume"/></div>
        </div>
      </div>
    </>
  );
};

export default ResumeModal;
