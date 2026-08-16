import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ApplyPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetch(`https://api.dki3zbla6qqu6.amplifyapp.com/api/careers/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setJobLoading(false);
      })
      .catch(() => setJobLoading(false));
  }, [jobId]);

  if (jobLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
        <p className="text-[#0A1F44] text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <section className="bg-[#F5F3EE] fraunces py-16 sm:py-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#0A1F44] font-semibold mb-8 hover:underline"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1F44] leading-tight">
            Apply for Position
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            {job ? job.title : "Fill out the application form below"}
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              const formData = new FormData(e.target);
              formData.append("job_id", jobId || "");
              formData.append("resume", e.target.resumeUpload.files[0]);

              try {
                const response = await fetch(
                  "https://api.dki3zbla6qqu6.amplifyapp.com/api/careers/applications",
                  {
                    method: "POST",
                    body: formData,
                  },
                );

                const data = await response.json();

                if (response.ok) {
                  setSuccess(true);
                  setShowSuccessModal(true);
                  e.target.reset();
                  setResumeUrl("");
                  setUploadSuccess(false);
                } else {
                  alert("Error: " + (data.error || "Something went wrong"));
                }
              } catch (err) {
                alert("Failed to submit. Please try again.");
              }

              setLoading(false);
            }}
          >
            <div>
              <label className="block mb-2 font-semibold text-[#0A1F44]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 text-base sm:text-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#0A1F44]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 text-base sm:text-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#0A1F44]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                required
                className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 text-base sm:text-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#0A1F44]">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                name="linkedin"
                placeholder="Paste LinkedIn profile link"
                className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 text-base sm:text-lg focus:outline-none"
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 sm:p-8 text-center hover:border-[#FFD600] transition-all duration-300">
              <p className="text-lg font-semibold text-[#0A1F44]">
                Upload Resume
              </p>
              <p className="text-gray-500 text-sm mt-2">
                PDF or DOC files only
              </p>

              <label
                htmlFor="resumeUpload"
                className="inline-block mt-5 bg-[#0A1F44] text-[#FFD600] px-6 py-3 rounded-xl cursor-pointer hover:bg-[#FFD600] hover:text-black transition-all duration-300"
              >
                Choose Resume
              </label>

              <input
                id="resumeUpload"
                type="file"
                required
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) {
                    alert("File must be under 5MB");
                    return;
                  }
                  setResumeUrl(file.name);
                  setUploadSuccess(true);
                }}
              />

              {uploadSuccess && (
                <p className="text-green-600 mt-3 font-medium">
                  Resume Uploaded Successfully ✓
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !resumeUrl}
              className="w-full bg-[#0A1F44] text-[#FFD600] py-4 rounded-2xl font-semibold hover:bg-[#FFD600] hover:text-black transition-all duration-300 disabled:opacity-70"
            >
              {loading
                ? "Submitting..."
                : success
                  ? "Application Submitted ✓"
                  : "Submit Application"}
            </button>
          </form>
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
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
                  Thank You for Applying!
                </h3>

                <p className="text-[#0A1F44] leading-relaxed text-sm">
                  We have received your application successfully. Our team will
                  review it and get back to you within{" "}
                  <strong>3–5 business days</strong>.
                </p>

                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/careers");
                  }}
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

export default ApplyPage;
