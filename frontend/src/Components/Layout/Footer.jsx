import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1E2939] text-white w-full shadow-md">
      <div className="w-full mx-auto p-3 lg:px-30">
        <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
          {/* Left Section */}
          <div className="lg:w-1/2">
            <h4 className="text-3xl font-bold mb-2">Let's keep in touch!</h4>
            <p className="text-base text-gray-300">
              Find us on any of these platforms. We usually respond within 1–2
              business days.
            </p>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 flex flex-col  sm:flex-row lg:justify-end gap-8">
            {/* Useful Links */}
            <div>
              <h5 className="text-lg font-semibold mb-1 uppercase">
                Useful Links
              </h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link
                    to="/aboutus"
                    className="hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/termsandconditions"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* (Optional) Add more sections here like Contact, Social Links, etc. */}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-2 border-gray-500/30" />

        {/* Footer Bottom */}
        <div className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
