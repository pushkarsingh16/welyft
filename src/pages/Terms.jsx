import React from "react";

const sections = [
  {
    num: "1",
    title: "Acceptance of Terms",
    content: `Welcome to the Welyft website ("Website"), which is owned and operated by Welyft Pte. Ltd. (hereinafter referred to as "welyft", "we", "us", or "our").

By accessing, browsing, or otherwise using this Website, you acknowledge that you have read, understood, and unconditionally agreed to be bound by these Terms of Use, along with all applicable laws, statutes, and regulations governing digital platforms. If you do not agree with, or cannot comply with any part of these Terms, you must discontinue your use of the Website immediately.`,
  },
  {
    num: "2",
    title: "Website Purpose and Scope",
    content:
      "The Website is established and maintained by welyft as a digital corporate touchpoint intended to:",
    bullets: [
      "Provide comprehensive, up-to-date information regarding Welyft's corporate profile, business operations, and service offerings.",
      "Allow corporate clients, individual users, and partners to explore, review, and evaluate our customized logistics and mobility solutions.",
      "Facilitate seamless access to customer support portals, helpdesks, and live communication features.",
      "Serve as an intake channel for users to submit commercial inquiries, request quotes, and register interest in our business solutions.",
      "Enable users to formally register for account-based digital services, corporate portals, or updates.",
      "Provide open access to educational blogs, industry resources, whitepapers, newsletters, and promotional marketing materials.",
    ],
    footer:
      "Welyft explicitly reserves the right, at its sole discretion, to modify, suspend, restrict, or discontinue any feature, page, database, or portion of the Website at any time, for any reason, and without prior notice or liability to any user.",
  },
  {
    num: "3",
    title: "Permitted and Prohibited Use",
    content:
      "Users are granted a non-exclusive, non-transferable, revocable, and limited license to access and use the Website strictly for its intended informational and interactive purposes. As a strict condition of this license, all users explicitly agree that they shall not:",
    bullets: [
      "Utilize the Website, its infrastructure, or its content to conduct, facilitate, or abet any illegal or unlawful activities, or violate local or international regulations.",
      "Attempt to gain unauthorized access to any restricted portions of the Website, other user accounts, or the servers, networks, and computer systems connected to Welyft through hacking, password mining, or any other illicit means.",
      "Introduce, transmit, or distribute any viruses, Trojan horses, worms, logic bombs, or other malicious, destructive, or technologically harmful software code or materials.",
      "Engage in automated or manual data harvesting, data mining, scraping, copying, replicating, extraction, or framing of any content, text, data, or media from the Website without obtaining prior, explicit written consent from an authorized representative of Welyft.",
      "Interfere with, disrupt, overburden, or compromise the functionality, performance, security, or integrity of the Website, its hosting infrastructure, or its underlying digital networks.",
    ],
  },
  {
    num: "4",
    title: "Intellectual Property Rights",
    content:
      "All right, title, and interest in and to the Website and its entire contents remain the exclusive property of Welyft Pte. Ltd. or its respective licensors. This comprehensive protection includes, but is not limited to:",
    bullets: [
      'The "Welyft" corporate name, branding elements, official logos, and slogans.',
      "All registered and unregistered trademarks, service marks, and trade dress.",
      "All textual content, articles, blogs, copy, data sheets, and documentation.",
      "All graphics, custom designs, user interfaces, button icons, and photographic images.",
      "All promotional audio tracks, videos, animations, and multimedia presentations.",
      "All software, underlying source code, object code, system scripts, website layouts, and digital architecture.",
    ],
    footer:
      "Except as expressly permitted under these Terms, users are strictly prohibited from copying, reproducing, distributing, modifying, publishing, broadcasting, transmitting, creating derivative works from, or commercially exploiting any part of the Website's intellectual property without obtaining our prior written consent.",
  },
  {
    num: "5",
    title: "Website Information Disclaimer",
    content:
      'While Welyft endeavors to ensure that all information, materials, and data published on this Website are accurate, current, and reliable, the Website is provided strictly on an "as-is" and "as-available" basis. Welyft makes no representations, warranties, or guarantees of any kind, express or implied, regarding:',
    bullets: [
      "The absolute accuracy, completeness, precision, or timelines of the information provided.",
      "The operational availability, uptime, security, or continuous accessibility of the Website.",
      "The reliability or fitness for a particular purpose of any tools, Calculators, or advice found on the site.",
      "The complete absence of software bugs, server errors, malware, or operational interruptions.",
    ],
    footer:
      "Welyft maintains the absolute right to correct any errors, inaccuracies, or omissions, and to change, update, or remove website information at any time without prior notice.",
  },
  {
    num: "6",
    title: "Third-Party Links and Integrations",
    content:
      "The Website may occasionally feature hyperlinks or navigational paths routing users to external websites, platforms, or digital resources owned and operated by independent third parties. These links are provided solely as a matter of user convenience. The inclusion of any third-party link does not mean that Welyft endorses, sponsors, reviews, or approves of the external platform, its owners, or its commercial offerings. Welyft exerts no operational control over, and assumes zero legal responsibility for, the content, privacy policies, tracking mechanisms, terms of use, or security standards of any third-party websites. Users access external links entirely at their own risk.",
  },
  {
    num: "7",
    title: "Privacy and Data Protection",
    content:
      "Welyft is deeply committed to safeguarding user privacy and transparency. Any personal data, corporate details, or digital telemetry collected through your interaction with the Website will be processed strictly in accordance with the official Welyft Privacy Policy, the Singapore Personal Data Protection Act 2012 (PDPA), and all other applicable regional data protection laws. By utilizing the Website, you hereby grant Welyft your explicit consent to collect, store, log, transfer, and process your personal data for the following essential purposes:",
    bullets: [
      "Responding to service inquiries, executing contract requests, and managing corporate leads.",
      "Distributing marketing communications, newsletters, service promotions, and relevant corporate updates.",
      "Providing customer support, resolving technical issues, and managing client relations.",
      "Running system diagnostics, user behavior analytics, traffic monitoring, and deploying general Website improvements.",
    ],
  },
  {
    num: "8",
    title: "Cookies and Tracking Policy",
    content:
      "To optimize your browsing experience, analyze site performance, and customize digital presentation layouts, the Website may deploy cookies, web beacons, pixel tags, analytics tools, and similar tracking technologies. These tools are utilized to:",
    bullets: [
      "Improve general Website performance, responsive layouts, and page loading speeds.",
      "Understand aggregated user behavior, track visitor navigation flows, and monitor demographic patterns.",
      "Personalize displayed content, remember user preferences, and optimize online interactions.",
      "Enhance overall user session browsing experiences.",
    ],
    footer:
      "Most modern internet browsers are pre-configured to accept cookies automatically. If you wish to reject or restrict cookies, you must manually adjust your individual browser settings.",
  },
  {
    num: "9",
    title: "Electronic Communications",
    content:
      "By utilizing the Website and providing your contact credentials, you expressly consent to receive electronic communications from Welyft. These communications may include:",
    bullets: [
      "Service updates, platform modifications, and account security notifications.",
      "Corporate newsletters, educational insights, and industry updates.",
      "Promotional campaigns, marketing offers, and special service discounts.",
      "Mandatory legal notices, revisions to policy documents, and corporate disclosures.",
      "Customer support answers, inquiry responses, and standard client communications.",
    ],
    footer:
      "You retain the right to opt out of promotional materials at any time via the provided unsubscribe links, though critical operational and legal notices will continue to be delivered as required.",
  },
  {
    num: "10",
    title: "Limitation of Liability",
    content:
      "To the maximum extent permitted under applicable law, Welyft, its parent entities, subsidiaries, affiliates, directors, officers, employees, agents, and licensors shall not be held liable for any damages whatsoever arising out of or in connection with your use of the Website. This limitation applies to:",
    bullets: [
      "Indirect, incidental, punitive, exemplary, special, or consequential damages.",
      "Loss of corporate profits, business revenue, commercial goodwill, or anticipated savings.",
      "Business interruption, loss of data, file corruption, or system replacement costs.",
      "Website downtime, temporary service suspensions, or delayed transmissions.",
      "Destructive actions caused by cyberattacks, data breaches, server hacks, or digital intrusions.",
      "Technical failures, hardware malfunctions, internet outages, or communication line disruptions.",
    ],
  },
  {
    num: "11",
    title: "Website Availability and Maintenance",
    content:
      "While Welyft strives to maximize platform uptime, we do not guarantee continuous, uninterrupted, or perfectly secure access to the Website. The Website may experience unavailability or operational interruptions due to:",
    bullets: [
      "Scheduled backend maintenance, critical software updates, or server patching.",
      "Unforeseen technical failures, hardware breakdowns, or database corruptions.",
      "Cybersecurity incidents, DDoS attacks, or malicious hacks.",
      "Widespread internet service disruptions, telecommunication grid failure, or routing errors.",
      "Force majeure events or external emergencies outside our reasonable domain of control.",
    ],
  },
  {
    num: "12",
    title: "User Submissions and Feedback",
    content:
      "If you choose to submit, post, upload, or transmit any materials via the Website — including feedback, feature suggestions, testimonials, or comments — you grant Welyft an unrestricted, perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and commercially exploit such submissions. Welyft shall be under no obligation of confidentiality regarding these submissions.",
  },
  {
    num: "13",
    title: "Indemnity",
    content:
      "You explicitly agree to defend, indemnify, and hold completely harmless Welyft, its parent organizations, subsidiaries, affiliates, and their respective officers, directors, employees, agents, and legal representatives from and against any and all claims, liabilities, damages, losses, costs, expenses, and legal fees arising directly or indirectly out of:",
    bullets: [
      "Your explicit violation or breach of any provision within these Terms of Use.",
      "Any illegal activities, fraudulent actions, or regulatory violations committed by you on or through the Website.",
      "Any third-party claims alleging that your submissions or actions violated their intellectual property, privacy, or proprietary rights.",
      "Your unauthorized usage, modification, or distribution of the Website's assets and layout.",
    ],
  },
  {
    num: "14",
    title: "Force Majeure",
    content:
      "Welyft shall not be held responsible, liable, or deemed in breach of these Terms due to any delay, performance failure, or operational outage resulting from acts completely beyond its reasonable control. Such force majeure events include:",
    bullets: [
      "Natural disasters, acts of God, lightning strikes, earthquakes, floods, storms, or fires.",
      "Public health emergencies, regional epidemics, global pandemics, or mandatory quarantine lockdowns.",
      "Governmental restrictions, national decrees, changes in law, import/export embargoes, or military actions.",
      "State-sponsored cyberattacks, widespread malware incursions, or targeted hacking campaigns.",
      "Widespread internet backbone outages, regional telecommunication dropouts, or cloud provider failures.",
    ],
  },
  {
    num: "15",
    title: "Governing Law and Dispute Resolution",
    content:
      "These Terms of Use shall be governed by, construed, and enforced strictly in accordance with the laws of the Republic of Singapore. In the event of any dispute, both parties agree to:",
    bullets: [
      "Amicable Settlement: First attempt in good faith to resolve the matter via private negotiations or corporate mediation.",
      "Arbitration: If the dispute cannot be settled within thirty (30) days, the matter shall be referred to formal, binding arbitration in Singapore.",
    ],
  },
  {
    num: "16",
    title: "Changes to These Terms",
    content:
      "Welyft reserves the absolute right, at its sole discretion, to amend, update, restate, or modify these Terms of Use at any time to reflect operational, legal, or regulatory modifications. Any revised version will become legally effective immediately upon its official publication on the Website. Your continued use of the Website following the publication of revised Terms constitutes your explicit acceptance of those updated terms.",
  },
  {
    num: "17",
    title: "Contact Information",
    content:
      "If you have any questions, clarifications, legal inquiries, or compliance notices regarding these Website Terms of Use, please reach out to us:",
    contact: true,
  },
];

const Terms = () => {
  return (
    <>

      {/* Header */}
      <section
        className="py-14 md:py-20 px-5 md:px-8 text-center"
        style={{ background: "#0A1F44" }}
      >
        <div className="max-w-4xl mx-auto">
          <span
            className="inline-block text-sm pt-8 font-bold  uppercase px-4 py-2 rounded-full"
            style={{ color: "white" }}
          >
            Legal
          </span>
          <h1
            className="serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{ color: "white" }}
          >
            Terms of Use
          </h1>

          <p className="text-base" style={{ color: "white" }}>
            Welyft Pte. Ltd. • Last Updated: June 24, 2026
          </p>
        </div>
      </section>

      {/* Company Info */}
      <div
        className="px-5 md:px-8 py-4 text-center text-sm leading-relaxed"
        style={{
          background: "#081730",
          color: "white",
        }}
      >
        <p>
          Registered office: 160 Robinson Road, #14-04, SBF Centre, Singapore -
          068914
        </p>
        <p>
          Corporate Office: 101 Cecil Street, #18-11 Tong Eng Building,
          Singapore 069533
        </p>
      </div>

      {/* Content */}
      <section
        className="py-12 px-5 md:px-8"
        style={{ background: "var(--cream)" }}
      >
        <div className="w-full">
          {/* Intro */}
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
              Please read these Terms of Use carefully before browsing or using
              our platform.
            </p>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-5">
            {sections.map((sec, i) => (
              <div
                key={i}
               className="bg-white rounded-[28px] min-h-[180px] p-6 sm:p-10 lg:p-12 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="mb-6 border-l-4 border-[#FFD600] pl-6">
                  <h2 className="fraunces text-2xl md:text-3xl font-semibold text-[#0A1F44]">
                    {sec.num}. {sec.title}
                  </h2>
                </div>

                {sec.content && (
                  <p className="text-[18px] leading-8 text-[#0A1F44] mb-4 whitespace-pre-line">
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
                        <p
                          className="text-[18px] leading-8"
                          style={{ color: "#0A1F44" }}
                        >
                          {b}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.footer && (
                  <p
                    className="text-[18px] leading-8 mt-2"
                    style={{ color: "#0A1F44" }}
                  >
                    {sec.footer}
                  </p>
                )}

                {sec.contact && (
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { label: "Entity Name", val: "Welyft Pte. Ltd." },
                      {
                        label: "Official Corporate Email",
                        val: "support@welyft.org",
                      },
                      {
                        label: "Official Corporate Website",
                        val: "www.welyft.org",
                      },
                    ].map((item, j) => (
                      <div key={j} className="flex gap-2 text-sm">
                        <span
                          className="font-bold"
                          style={{ color: "#0A1F44" }}
                        >
                          {item.label}:
                        </span>

                        {item.val === "support@welyft.org" ? (
                          <a
                            href="mailto:support@welyft.org"
                            className="underline hover:text-[#FFD600] transition-colors"
                            style={{ color: "#0A1F44" }}
                          >
                            {item.val}
                          </a>
                        ) : item.val === "www.welyft.org" ? (
                          <a
                            href="https://www.welyft.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[#FFD600] transition-colors"
                            style={{ color: "#0A1F44" }}
                          >
                            {item.val}
                          </a>
                        ) : (
                          <span style={{ color: "#0A1F44" }}>{item.val}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;
