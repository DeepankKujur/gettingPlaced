import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';

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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
            <p className="mb-4">
              Welcome to <span className="font-semibold text-blue-600">
                <Link to="/" className="hover:underline">[GG-OG]</Link><span className='text-gray-800'>Resume-Builder</span>
              </span>! By accessing or using our platform, you agree to comply with the terms and conditions outlined below. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of the Website</h2>
            <p className="mb-4">
              Our platform provides tools for users to create, edit, view, delete, and download resumes using predefined templates and AI-powered features. You agree not to use this website for any unlawful or prohibited activities.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Do not upload or create misleading or false resume information.</li>
              <li>Do not use AI-generated content in a deceptive or unethical manner.</li>
              <li>Respect intellectual property rights and do not plagiarize content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
            <p className="mb-4">
              As a user of our platform, you are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Providing accurate and truthful information in your resumes.</li>
              <li>Using the AI features responsibly and ethically.</li>
              <li>Keeping your account credentials secure and not sharing them with others.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI Features and Limitations</h2>
            <p className="mb-4">
              Our AI-powered tools, including ATS-score analysis, AI chat assistance, and resume summaries, are designed to enhance your resume-building experience. However, we do not guarantee the accuracy or success of AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Privacy and Security</h2>
            <p className="mb-4">
              Your privacy is important to us. We do not sell your personal data. Please review our <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span> to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Liability</h2>
            <p className="mb-4">
              We are not responsible for any consequences resulting from the use of our resume-building tools or AI features. It is the user's responsibility to verify the accuracy and effectiveness of their resume before submission to employers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to the Terms</h2>
            <p className="mb-4">
              We reserve the right to update these Terms and Conditions at any time. Any changes will be posted on this page, and we encourage you to review it regularly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions regarding these Terms and Conditions, feel free to contact us at:
              <a href="mailto:support@yourwebsite.com" className="text-blue-600 hover:underline"> support@yourwebsite.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
