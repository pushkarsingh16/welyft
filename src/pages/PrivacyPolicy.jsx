import React from "react";
import { Helmet } from 'react-helmet-async';
const privacySections = [
  {
    num: "1",
    title: "Purpose and Legal Basis",
    content: `Welyft collects and processes personal information to provide
    end-mile transportation services, package tracking, delivery fulfilment,
    and logistics operations.`,
  },
  {
    num: "2",
    title: "Information We Collect",
    bullets: [
      "Name, mobile number, and email address",
      "Delivery addresses and recipient details",
      "GPS and location information",
      "Device and browser information",
      "Proof of delivery and timestamps",
    ],
  },
  {
    num: "3",
    title: "How We Share Information",
    content: `We do not sell personal information. Data may be shared with
    logistics partners, cloud providers, and legal authorities where required.`,
  },
  {
    num: "4",
    title: "Data Security",
    content: `We implement appropriate technical and organisational measures—such
    as encryption and access controls—to prevent unauthorised access, loss, or
    destruction of your personal information. These measures conform to Singapore
    industry standards and PDPA requirements.`,
  },
  {
    num: "5",
    title: "Retention of Information",
    content: `We retain personal information only for as long as necessary to fulfill
    the delivery service and for legal or business purposes (e.g., resolving claims
    or tax audits). In Singapore, this is typically for a period of 7 years in
    accordance with standard limitation periods for contract claims.`,
  },
  {
    num: "6",
    title: "Your Rights",
    bullets: [
      "Request access to your personal information",
      "Correct inaccurate or outdated data",
      "Withdraw consent for data processing",
      "Request deletion of personal information",
    ],
  },
  {
    num: "7",
    title: "International Transfers",
    content: `As Welyft utilizes global cloud infrastructure, your data may be stored
    outside of Singapore. We ensure that any such transfer provides a standard of
    protection comparable to the PDPA.`,
  },
  {
    num: "8",
    title: "Children",
    content: `Welyft services are not intended for individuals under the age of 13,
    and we do not knowingly collect personal information from minors.`,
  },
  {
    num: "9",
    title: "Contact Us",
    content: `Welyft Pte. Ltd.
    support@welyft.org
    Singapore`,
  },
  {
    num: "10",
    title: "Changes Policy Updates",
    content: `We may update this policy periodically to reflect changes in our
    services or Singapore law.`,
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Welyft</title>
        <meta name="description" content="Read Welyft's privacy policy to understand how we collect, use, and protect your data." />
        <link rel="canonical" href="https://www.welyft.org/privacy-policy" />
      </Helmet>
      {/* Header Banner */}
      <section
        className="py-14 md:py-20 px-5 md:px-8 text-center"
        style={{ background: "#0A1F44" }}
      >
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm pt-8 font-bold uppercase px-4 py-2 rounded-full text-white">
            Legal Information
          </span>
          <h1 className="serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-white">
            Privacy Policy
          </h1>
           <p className="text-base" style={{ color: "white" }}>
            Welyft Pte. Ltd. • Last Updated: June 24, 2026
          </p>
          <p className="text-base text-white max-w-3xl mx-auto mt-3 leading-relaxed">
            Learn how Welyft collects, protects, and manages your information
            while providing secure logistics services.
          </p>
        </div>
      </section>

      {/* Content Boxes */}
      <section
        className="py-12 px-5 md:px-8"
        style={{ background: "var(--cream)" }}
      >
        <div className="flex flex-col gap-5 max-w-8xl mx-auto">

          <div
           className="bg-[#FFFDF8] rounded-[28px] min-h-[180px] p-6 sm:p-10 lg:p-12 border-l-4 border-[#FFD600] shadow-sm mb-6"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <p
              className="text-lg leading-8 text-[#0A1F44]"
              style={{ color: "#0A1F44" }}
            >
              Welcome to the website of{" "}
              <strong style={{ color: "#0A1F44" }}>Welyft Pte. Ltd.</strong>{" "}
              Please read these Privacy Policy carefully before browsing or using
              our platform.
            </p>
          </div>
          {privacySections.map((sec, i) => (
            <div
              key={i}
              className="bg-white rounded-[28px] min-h-[180px] p-6 sm:p-10 lg:p-12 
                         border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="mb-6 border-l-4 border-[#FFD600] pl-6">
                <h2 className="fraunces text-2xl md:text-3xl font-semibold text-[#0A1F44]">
                  {sec.num}. {sec.title}
                </h2>
              </div>

              {sec.content && (
                <p className="text-lg leading-8 w-full text-[#0A1F44] mb-4">
                  {sec.content}
                </p>
              )}

              {sec.bullets && (
                <ul
                  className="flex flex-col gap-4 mb-4 pl-4"
                  style={{ borderLeft: "4px solid #FFD600" }}
                >
                  {sec.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 items-start pl-4">
                      <span
                        className="mt-2.5 w-2 h-2 rounded-full shrink-0"
                        style={{ background: "#0A1F44" }}
                      />
                      <p className="text-[18px] leading-8 text-[#0A1F44]">
                        {b}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
