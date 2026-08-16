import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="contact-form"
     className="bg-[#F6F5F0] fraunces relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 scroll-mt-20 sm:scroll-mt-12 lg:scroll-mt-16"
    >
      <div className="relative z-10 flex flex-col mx-auto  max-w-8xl px-4 sm:px-5 lg:px-10">
        <div className="text-center">
          <p
            className="inline-block text-sm sm:text-xl text-[#FFD600] bg-[#0A1F44] tracking-[0.03em] mt-4 px-4 sm:px-5 py-2 rounded-md font-bold uppercase
        "
          >
            Contact Us
          </p>
          <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#0A1F44] mt-1">
            Get in Touch
          </h1>
        </div>
        <div className="mx-auto  grid w-full grid-cols-1 gap-8  py-6 lg:grid-cols-2 ">
          <article className="rounded-3xl h-[505px] md:h-[420px] lg:h-[500px] bg-white/90 p-6 shadow-sm ring-1 ring-black/5 sm:p-8 lg:sticky lg:top-6">
            <div className="flex items-center gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
              >
                <FaMapMarkerAlt className="text-3xl text-[#FFD600] transition-all duration-300 hover:scale-110 hover:text-red-500" />
              </a>
              <h2 className="text-xl font-semibold text-[#0A1F44] sm:text-2xl lg:text-3xl">
                Address
              </h2>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="text-base font-bold leading-relaxed text-[#0A1F44] sm:text-lg">
                  Welyft Pte. Ltd.{" "}
                  <span className="inline whitespace-nowrap">
                    (UEN 202440989G)
                  </span>
                </p>
                <p className="mt-3 text-base text-[#0A1F44] sm:text-lg">
                  101 Cecil Street,
                  <br className="block sm:hidden" />
                  <span className="hidden sm:inline"> </span>
                  #18-11 Tong Eng Building,
                  <br />
                  Singapore 069533
                </p>
              </div>

              <div>
                <p className="text-base font-bold text-[#0A1F44] sm:text-lg">
                  Registered office address:
                </p>
                <p className="mt-3 text-base text-[#0A1F44] sm:text-lg">
                  160 Robinson Road,
                  <br className="block sm:hidden" />
                  <span className="hidden sm:inline"> </span>
                  #14-04, SBF Center,
                  <br />
                  Singapore 068914
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <div className="flex items-center gap-3">
                  <a href="mailto:operations@welyft.com" className="shrink-0">
                    <FaEnvelope className="text-3xl text-[#FFD600] transition-all duration-300 hover:scale-110 hover:text-indigo-900" />
                  </a>
                  <h2 className="text-xl font-semibold text-[#0A1F44] sm:text-2xl">
                    Email
                  </h2>
                </div>
                <a
                  href="mailto:operations@welyft.com"
                  className="mt-3 inline-block break-words text-base text-[#0A1F44] transition-all duration-300 hover:text-[#0A1F44] sm:text-lg"
                >
                  info@welyft.org
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/6587601984?text=Hello%20Welyft"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <FaWhatsapp className="text-3xl text-[#FFD600] transition-all duration-300 hover:scale-110 hover:text-green-600" />
                    <h2 className="text-xl font-semibold text-[#0A1F44] underline transition group-hover:text-green-600 sm:text-2xl">
                      Chat with us
                    </h2>
                  </a>
                </div>
              </div>
            </div>
          </article>

          <form
            className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              try {
                const formData = new FormData(e.target);
                formData.append(
                  "access_key",
                  "3442aeca-762c-439d-a514-5ab764e3d8f8",
                );
                formData.append("subject", "New Contact Message - Welyft");

                const response = await fetch(
                  "https://api.web3forms.com/submit",
                  {
                    method: "POST",
                    body: formData,
                  },
                );

                const data = await response.json();

                if (data.success) {
                  setShowModal(true);
                  e.target.reset();
                }
              } catch (error) {
                alert("Failed to send message. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
          >
            <div className="grid gap-4">
              {/* Name */}
              <div className="relative w-full">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl placeholder:text-[#0A1F44]/80 border border-gray-300 bg-white p-3 text-xs text-[#0A1F44] outline-none transition focus:border-[#FFD600] focus:ring-2 focus:ring-yellow-200 sm:text-lg"
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 -top-1 text-[#0A1F44] text-sm font-bold bg-white px-2"
                >
                  Name <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Email */}
              <div className="relative w-full">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address (e.g. name@example.com)"
                  onChange={(e) => {
                    e.target.value = e.target.value.trim().replace(/\s/g, "");
                  }}
                  className="w-full rounded-xl placeholder:text-[#0A1F44]/80 border border-gray-300 bg-white p-3 text-xs text-[#0A1F44] outline-none transition focus:border-[#FFD600] focus:ring-2 focus:ring-yellow-200 sm:text-lg"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-1 text-[#0A1F44] text-sm font-bold bg-white px-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Phone */}
              <div className="relative w-full">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your number"
                  required
                  maxLength={8}
                  pattern="[689][0-9]{7}"
                  inputMode="numeric"
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 8);
                  }}
                  className="w-full rounded-xl placeholder:text-[#0A1F44]/80 border border-gray-300 bg-white p-3 text-xs text-[#0A1F44] outline-none transition focus:border-[#FFD600] focus:ring-2 focus:ring-yellow-200 sm:text-lg"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-3 -top-1 text-[#0A1F44] text-sm font-bold bg-white px-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Message */}
              <div className="relative w-full">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  rows="5"
                  required
                  onInput={(e) => {
                    const words = e.target.value.trim().split(/\s+/);
                    if (words.length > 1000) {
                      e.target.value = words.slice(0, 1000).join(" ");
                    }
                  }}
                  className="w-full rounded-xl placeholder:text-[#0A1F44]/80 border border-gray-300 bg-white  p-3 text-xs text-[#0A1F44] outline-none transition focus:border-[#FFD600] focus:ring-2 focus:ring-yellow-200 sm:text-lg"
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-3 -top-1 text-[#0A1F44] text-sm font-bold bg-white px-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-[#0A1F44] mt-1">Max 1000 words</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-fit mx-auto px-6 rounded-xl bg-[#FFD600] py-3 text-lg font-semibold text-[#0A1F44] transition hover:bg-[#0A1F44] hover:text-[#FFD600] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3 sm:text-xl"
              >
                {loading
                  ? "Sending..."
                  : success
                    ? "Message Sent ✓"
                    : "Send Message"}
              </button>
            </div>
          </form>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                {/* Checkmark icon */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD600]">
                  <svg
                    className="h-8 w-8 text-[#0A1F44]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-[#0A1F44] mb-3">
                  Thank You for Contacting Us!
                </h3>

                <p className="text-[#0A1F44] leading-relaxed text-sm">
                  We have received your message successfully. Our team will
                  review the information and get back to you within{" "}
                  <strong>2–3 business days</strong>.
                </p>

                <button
                  onClick={() => setShowModal(false)}
                  className="mt-6 w-full rounded-xl bg-[#FFD600] py-3 font-bold text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#FFD600] transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
