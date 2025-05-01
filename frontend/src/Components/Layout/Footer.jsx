import React from 'react';
import {Link} from 'react-router-dom'
  

export default function Footer() {
  return (
    <div className='border border-black rounded-lg'>
      {/* Footer */}
      <footer className="bg-[#1B262C] rounded-md pt-2 pb-2 w-full text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            {/* Left Section: Contact */}
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-4xl font-semibold text-[#FAE6D1]">Let's keep in touch!</h4>
              <h5 className="text-lg mt-0 mb-2 text-[#FAE6D1]">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className="mt-2 lg:mb-0 mb-2">
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                  integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <button
                  className="bg-white text-lightBlue-400 shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fa-brands fa-twitter"></i>
                </button>
                <button
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fa-brands fa-facebook"></i>
                </button>
                <button
                  className="bg-white text-lightBlue-800 shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  className="bg-white text-blueGray-800 shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fa-brands fa-github"></i>
                </button>
              </div>
            </div>

            {/* Right Section: Links */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-2">
                {/* Useful Links */}
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-[#FAE6D1] text-lg font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-[#FAE6D1] hover:text-white font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/presentation?ref=njs-profile"
                      >
                       <Link to="/aboutus"><span className='text-[#FAE6D1]'>About Us</span></Link>
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-[#FAE6D1] hover:text-white font-semibold block pb-2 text-sm"
                        href=""
                      >
                        <Link to="/termsandconditions" > <span className='text-[#FAE6D1]'>Terms & Conditions</span></Link>
                        
                      </a>
                    </li>

                    

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-2 border-blueGray-300" />
        </div>
      </footer>
    </div>
  );
}