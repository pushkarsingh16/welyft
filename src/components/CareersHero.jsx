import React from "react";
import careerBg from "../assets/caree.png";

const CareersHero = () => {
  return (
    <section
      id="careers"
        className="relative mt-12 sm:mt-14 md:mt-16 pt-20 pb-20 flex min-h-[auto] sm:min-h-[100vh] items-center justify-center overflow-hidden bg-[#051223]"
    >
      <img
        src={careerBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover xl:object-fill object-center"
      />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(5,18,35,0.25),rgba(5,18,35,0.40))]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold text-white mt-8 leading-tight">
          Build the Future of
          <br />
          Sustainable Logistics
        </h1>

        <p className="text-white text-base sm:text-lg mt-6 max-w-3xl mx-auto font-bold leading-8">
          Join Welyft and help transform delivery operations through EV-powered
          logistics, technology, and sustainability innovation
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 mr-0 md:mr-11 lg:mr-0">
          <a href="#jobs">
            <button className="border lg:w-50 border-white text-white px-7 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300">
              View Open Roles
            </button>
          </a>

          <a href="/#about">
            <button className="border lg:w-50 border-white text-white px-7 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300">
              Learn More
            </button>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:flex  gap-4  mt-14 sm:mt-12 justify-center">
          <div className="bg-[#FFD600] lg:w-50 hover:bg-white backdrop-blur-md rounded-2xl xl:px-5 py-0.5 border border-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold text-black">20+</h2>
            <h5 className="text-black text-sm font-semibold">Team Members</h5>
          </div>

          <div className="bg-[#FFD600] lg:w-50 hover:bg-white backdrop-blur-md rounded-2xl xl:px-6 py-0.5 border border-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold text-black">100%</h2>
            <h5 className="text-black text-sm font-semibold">Electric Fleet</h5>
          </div>

          <div className="bg-[#FFD600] lg:w-50 hover:bg-white backdrop-blur-md rounded-2xl xl:px-7.5 py-0.5 border border-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold text-black">24/7</h2>
            <h5 className="text-black text-sm font-semibold">Operations</h5>
          </div>

          <div className="bg-[#FFD600] lg:w-50 hover:bg-white backdrop-blur-md rounded-2xl xl:px-4 py-0.5 border border-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold text-black">Singapore</h2>
            <h5 className="text-black text-sm font-semibold">Headquarters</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
