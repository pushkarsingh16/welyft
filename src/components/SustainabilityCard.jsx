import React from "react";

const SustainabilityCard = ({ icon, title, description }) => {
  return (
    <div
      className="group mx-auto flex h-full min-h-30 w-full max-w-125 flex-col items-start rounded-3xl bg-[#F5F1E6] px-4 py-6 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:bg-[#FFD600] sm:min-h-45 sm:px-6 sm:py-7 md:min-h-50"
    >
      <div className="w-12 h-12 text-5xl  -ml-1.5 leading-none ">
        {icon}
      </div>

      <h1 className="mt-3 text-xl font-semibold leading-relaxed text-black group-hover:text-[#0A1F44] sm:text-2xl">
        {title}
      </h1>

      <p className="flex-1 text-base font-semibold leading-relaxed text-black group-hover:text-[#0A1F44] sm:text-md">
        {description}
      </p>
    </div>
  );
};

export default SustainabilityCard;