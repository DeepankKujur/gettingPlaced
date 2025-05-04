import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <div className="text-center p-6 sm:p-10 bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        <img
          src="/error-404.avif"
          alt="Page not found"
          className="mx-auto w-40 sm:w-48 h-40 sm:h-48 mb-6 object-contain"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Return To Home
        </Link>
      </div>
    </section>
  );
}
