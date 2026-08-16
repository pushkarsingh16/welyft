import React from "react";

const Blog = () => {
  return (
    <section
      id="blog"
      className="fraunces scroll-mt-20 sm:scroll-mt-12 lg:scroll-mt-16 relative overflow-hidden bg-[#F6F5F0] pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12 px-4 sm:px-5 lg:px-10"
    >
      <div className="relative z-10 mx-auto max-w-8xl">
        <div className="text-center">
          <p className="inline-block text-xs sm:text-sm md:text-xl text-[#FFD600] bg-[#0A1F44] tracking-[0.03em] mt-2 px-3 sm:px-5 py-1 sm:py-2 rounded-md font-bold uppercase">
            Latest Blog
          </p>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#0A1F44] mt-3">
            News & Insights
          </h2>
          <p className="text-[#0A1F44] text-sm sm:text-md md:text-lg lg:text-xl mt-1 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest insights, news, and updates from welyft
          </p>
        </div>

        <div className="mt-4">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white transition-all duration-300 hover:-translate-y-2 w-full max-w-full"
             style={{
                  border:"2px solid #0A1F44",
                }}>
            {/* Top bar full width */}

            {/* Article content with responsive padding */}
            <div className="px-5 sm:px-8 md:px-10 py-6 sm:py-8">
              {/* Breadcrumb */}
              <p className="text-xs sm:text-sm text-[#0A1F44]">
                Home &gt; Breaking &gt; Welyft Accelerates Green Logistics in
                Singapore with All-Electric Fleet
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-3 text-xs sm:text-sm uppercase">
                <span className="text-[#0A1F44]">Breaking</span>
                <span className="text-[#0A1F44]">•</span>
                <span className="text-[#0A1F44]">Business</span>
                <span className="text-[#0A1F44]">•</span>
                <span className="text-[#0A1F44]">Business & Finance</span>
                <span className="text-[#0A1F44]">•</span>
                <span className="text-[#0A1F44]">Technology</span>
              </div>

              {/* Heading */}
              <h2
                className="mt-3 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug"
                style={{
                  color: "#0A1F44",
                  fontFamily: "Georgia, serif",
                }}
              >
                <span className="block">
                  Welyft Accelerates Green Logistics in Singapore with
                </span>
                <span className="block">All-Electric Fleet</span>
              </h2>

              {/* Meta + Button row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs sm:text-sm text-[#0A1F44]">
                  written by <strong>Joseph Wilson</strong>
                  &nbsp; • &nbsp; December 8, 2025 &nbsp; • &nbsp; 5 minutes
                  read
                </p>

                <a
                  href="https://cbherald.com/welyft-accelerates-green-logistics-in-singapore-with-all-electric-fleet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFD600] text-[#0A1F44] font-bold rounded-lg sm:rounded-xl px-5 sm:px-7 py-2 sm:py-3 text-xs sm:text-sm md:text-base whitespace-nowrap self-start sm:self-auto"
                >
                  Read Article →
                </a>
              </div>
            </div>

            {/* Bottom bar full width */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
