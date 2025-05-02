import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1E2939] text-white w-full rounded-lg shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="lg:w-1/2">
            <h4 className="text-3xl font-bold mb-2">Let's keep in touch!</h4>
            <p className="text-base">
              Find us on any of these platforms. We usually respond within 1-2 business days.
            </p>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 flex flex-col sm:flex-row justify-end gap-8">
            {/* Useful Links */}
            <div>
              <h5 className="text-lg font-semibold mb-3 uppercase">Useful Links</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/aboutus"
                    className="hover:text-white text-sm transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/termsandconditions"
                    className="hover:text-white text-sm transition-colors duration-200"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-[#FAE6D1]/30" />

        {/* Footer Bottom */}
        <div className="text-center text-sm text-gray-300/70">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
