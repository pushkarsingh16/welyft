import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.dki3zbla6qqu6.amplifyapp.com/api/careers/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
        <p className="text-[#0A1F44] text-lg">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
        <p className="text-[#0A1F44] text-lg">Job not found.</p>
      </div>
    );
  }

  return (
    <section className="bg-[#F5F3EE] fraunces pt-32 sm:pt-40 pb-16 sm:pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#0A1F44] font-semibold mb-8 hover:underline"
        >
          <FaArrowLeft /> Back to Careers
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A1F44]">
            {job.title}
          </h1>
          <p className="text-[#0A1F44] text-lg mt-3">
            {job.type} • {job.location}
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#0A1F44] mb-3">
              About the Role
            </h2>
            <div className="prose prose-headings:text-[#0A1F44] prose-strong:text-[#0A1F44] prose-li:text-[#0A1F44] max-w-none">
              <ReactMarkdown>{job.description}</ReactMarkdown>
            </div>
          </div>

          {job.responsibilities?.length > 0 && job.requirements?.length > 0 ? (
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-[#0A1F44] mb-3">
                  Responsibilities
                </h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[#0A1F44]"
                    >
                      <span className="text-[#FFD600] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0A1F44] mb-3">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[#0A1F44]"
                    >
                      <span className="text-[#FFD600] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {job.benefits?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#0A1F44] mb-3">
                Benefits
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#0A1F44]">
                    <span className="text-[#FFD600] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => navigate(`/careers/apply/${job.id}`)}
            className="mt-10 bg-[#0A1F44] text-[#FFD600] px-8 py-4 rounded-xl font-semibold hover:bg-[#FFD600] hover:text-black transition-all duration-300"
          >
            Apply for This Position
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobDetailPage;
