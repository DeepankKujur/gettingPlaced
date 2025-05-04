import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative w-full max-w-4xl max-h-screen bg-white rounded-lg overflow-auto p-4 z-50">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
        >
          Close
        </button>

        <div className="w-full h-full flex items-center justify-center mt-8">
          <img
            src={imageUrl}
            alt="resume"
            className="max-w-full max-h-[80vh] object-contain rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
