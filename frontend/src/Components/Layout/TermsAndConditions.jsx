import { useEffect } from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-gray-300 shadow-xl p-8 rounded-lg border border-gray-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Terms and Conditions
        </h1>

        <div className="text-lg text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Introduction
            </h2>
            <p>
              Welcome to{" "}
              <span className="font-semibold text-blue-600">
                <Link to="/" className="hover:underline">
                  JobZee
                </Link>
              </span>{" "}
              — a platform designed to connect job seekers with potential
              employers. By accessing or using our services, you agree to abide
              by the terms outlined below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Platform Overview
            </h2>
            <p>
              JobConnect provides tools and features for two types of users:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Job Seekers</strong> can create profiles, upload
                resumes, apply for listed jobs, and potentially receive
                interview invitations via Zoom.
              </li>
              <li>
                <strong>Employers</strong> can create job postings, view
                applicant resumes, and schedule interviews.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Users must provide accurate and up-to-date information in
                profiles, resumes, and job postings.
              </li>
              <li>
                Job Seekers should only apply for jobs they are genuinely
                interested in and qualified for.
              </li>
              <li>
                Employers are expected to review applications fairly and respond
                professionally.
              </li>
              <li>
                Misuse of the platform, including fake job posts or spam
                applications, is strictly prohibited.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Application Process
            </h2>
            <p>When a job seeker applies for a job:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Their resume and profile are shared with the employer.</li>
              <li>
                Employers may review applications and schedule Zoom interviews
                if the applicant is shortlisted.
              </li>
              <li>
                Job seekers will receive notifications or emails about interview
                invitations or updates.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Privacy and Data Handling
            </h2>
            <p>
              We value your privacy. Resumes and user data are only shared with
              relevant employers for the jobs you've applied to. For full
              details, see our{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Prohibited Conduct
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                No fraudulent, misleading, or discriminatory job postings or
                resumes.
              </li>
              <li>
                No harassment, offensive communication, or impersonation of
                others.
              </li>
              <li>No unauthorized advertising or solicitation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Disclaimer
            </h2>
            <p>
              JobConnect is not responsible for the outcome of interviews or
              hiring decisions. We facilitate connections but do not guarantee
              employment or candidate quality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Changes to Terms
            </h2>
            <p>
              We may update these Terms and Conditions periodically. Changes
              will be posted on this page. Continued use of the platform
              indicates your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p>
              For questions or concerns regarding these Terms, please contact us
              at:{" "}
              <a
                href="mailto:support@jobconnect.com"
                className="text-blue-600 hover:underline"
              >
                support@jobconnect.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
