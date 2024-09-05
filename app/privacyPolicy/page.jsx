// AboutUs.js

import React from "react";
import styles from "../constant/style";
import { CardDeal } from "../components";
import Logo from "../components/common/logo";

const PrivacyPolicy = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Logo />
        </div>
      </div>

      <main>
        <section className="">
          {/* About Us */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-indigo-500">
              Qwaath Privacy Policy
            </h2>
            <p className="text-xl text-indigo-300">
              Effective Date: [26 Feb 2024]
            </p>
            {/* Add more content as needed */}
          </div>
        </section>

        <section className="">
          {/* Introduction */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              Introduction
            </h2>
            <p className="text-xl text-indigo-300 pb-2">
              Qwaath Private Limited ("we," "our," or "us") is committed to
              protecting the privacy and security of your personal information.
              This Privacy Policy outlines the types of information we may
              collect, how we use and protect that information, and your choices
              regarding the collection and use of your information.
            </p>
          </div>
        </section>

        <section className="">
          {/* Information We Collect */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6">
              <li className="text-xl text-indigo-300 pb-2">
                Personal Information: We may collect personal information such
                as names, contact details, job titles, and company information
                when you interact with us, including but not limited to when you
                inquire about our services, sign up for newsletters, or attend
                events.
              </li>
              <li className="text-xl text-indigo-300 pb-2">
                Website Usage Data: We may collect non-personal information
                related to your use of our website, including IP addresses,
                browser type, pages viewed, and other analytics data to enhance
                our website's performance and user experience.
              </li>

              {/* Add more services as needed */}
            </ul>
          </div>
        </section>

        <section className="">
          {/* How We Use Your Information */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              How We Use Your Information
            </h2>

            <p className="text-xl text-indigo-300 pb-2">
              We use the collected information for the following purposes:
            </p>
            <div className="mt-4">
              <li className="text-base text-indigo-300 pb-2">
                Providing and improving our consultancy services.
              </li>
              <li className="text-base text-indigo-300 pb-2">
                Sending newsletters, updates, and marketing communications.
              </li>
              <li className="text-base text-indigo-300 pb-2">
                Analyzing website usage and trends to enhance our online
                presence.
              </li>
              <li className="text-base text-indigo-300 pb-2">
                Complying with legal obligations and protecting against fraud or
                other security risks.
              </li>
            </div>
          </div>
        </section>

        <section className="">
          {/*  Data Security */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              Data Security
            </h2>
            <p className="text-xl text-indigo-300 pb-2">
              We take appropriate measures to safeguard your information from
              unauthorized access, disclosure, alteration, and destruction.
              These measures include encryption, access controls, and regular
              security assessments.
            </p>
          </div>
        </section>

        <section className="">
          {/* Sharing Your Information */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              Sharing Your Information
            </h2>
            <p className="text-xl text-indigo-300 pb-2">
              We do not sell or rent your personal information to third parties.
              We may share your information with trusted partners and service
              providers who assist us in delivering our services, but they are
              obligated to maintain the confidentiality of your information.
            </p>
          </div>
        </section>

        <section className="">
          {/* Your Choices */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              Your Choices
            </h2>
            <p className="text-xl text-indigo-300 pb-2">
              You have the right to:
            </p>

            <li className="text-base text-indigo-300 pb-2">
              Access, correct, or delete your personal information.
            </li>

            <li className="text-base text-indigo-300 pb-2">
              Opt-out of receiving marketing communications.
            </li>

            <li className="text-base text-indigo-300 pb-2">
              Exercise any other rights granted by applicable data protection
              laws.
            </li>
          </div>
        </section>

        <section className="">
          {/* Cookies and Tracking Technologies */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-xl text-indigo-300 pb-2">
              We may use cookies and similar tracking technologies to enhance
              your experience on our website. You can modify your browser
              settings to control or reject cookies.
            </p>
          </div>
        </section>

        <section className="">
          {/* Changes to the Privacy Policy */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              Changes to the Privacy Policy
            </h2>
            <p className="text-xl text-indigo-300 pb-2">
              We may update this Privacy Policy to reflect changes in our
              practices. We will notify you of any material changes by posting
              the updated policy on our website.
            </p>
          </div>
        </section>

        <section className="">
          {/* Contact Us */}
          <div className=" p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4  text-indigo-500">
              Contact Us
            </h2>
            <p className="text-xl text-indigo-300 pb-2">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at [info@qwaath.com].
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
