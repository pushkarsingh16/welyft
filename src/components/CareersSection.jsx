import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
const CareersSection = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.dki3zbla6qqu6.amplifyapp.com/api/careers/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setJobsLoading(false);
      })
      .catch(() => setJobsLoading(false));
  }, []);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [country, setCountry] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTypes = type === "All Types" || job.type === type;
    const matchesCountry =
      country === "All" ||
      job.location.toLowerCase().includes(country.toLowerCase());

    return matchesSearch && matchesTypes && matchesCountry;
  });

  return (
    <section
      id="jobs"
      className="bg-[#F5F3EE] fraunces py-16 sm:py-24 lg:py-28"
    >
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center">
          <p className="inline-block bg-[#0A1F44] text-[#FFD600] uppercase tracking-widest px-5 py-2 rounded-xl text-sm font-semibold">
            Open Positions
          </p>
          <h1 className="text-5xl md:text-3xl sm:text-5xl lg:text-3xl  lg:text-6xl font-bold mt-6 text-[#0A1F44]">
            Join the Welyft Team
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-center mt-14">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white text-[#0A1F44] placeholder:text-[#0A1F44] px-5 py-4 rounded-2xl border border-gray-300 text-lg w-full md:w-[400px] shadow-sm focus:outline-none"
          />

          <div className="relative w-full md:w-auto">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="appearance-none text-[#0A1F44] placeholder:text-[#0A1F44] bg-white px-5 py-4 pr-12 rounded-2xl border border-gray-300 text-lg shadow-sm focus:outline-none w-full md:w-auto"
            >
              <option>All Types</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center z-10">
              <svg
                className="w-5 h-5 text-[#0A1F44] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="relative w-full md:w-auto">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="appearance-none text-[#0A1F44] placeholder:text-[#0A1F44] bg-white px-5 py-4 pr-12 rounded-2xl border border-gray-300 text-lg shadow-sm focus:outline-none w-full md:w-auto"
            >
              <option>All</option>
              <option>India</option>
              <option>Singapore</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center z-10">
              <svg
                className="w-5 h-5 text-[#0A1F44] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-6 max-h-[700px] overflow-y-auto pr-3">
          {jobsLoading ? (
            <div className="text-center py-16 text-[#0A1F44]">
              Loading jobs...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16 text-[#0A1F44]">
              No jobs found.
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-[#FFD600] rounded-xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0A1F44]">
                      {job.title}
                    </h2>

                    <p className="text-[#0A1F44] text-lg mt-3">
                      {job.type} • {job.location}
                    </p>
                    <p className="text-[#0A1F44] text-lg mt-2 leading-relaxed line-clamp-2">
                      {job.description.replace(/\*\*/g, "")}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-6 bg-[#0A1F44] w-fit whitespace-nowrap flex items-center gap-2 text-[#FFD600] px-7 py-3 rounded-xl font-semibold hover:bg-[#FFD600] hover:text-black transition-all duration-300"
                    onClick={() => navigate(`/careers/${job.id}`)}
                  >
                    View Details
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
