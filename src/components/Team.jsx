import React from "react";
import TeamCard from "./TeamCard";
import team1 from "../assets/team1.avif";
import team2 from "../assets/team2.avif";
import team3 from "../assets/team3.avif";

const Team = () => {
  return (
    <>
      <section id="team" className="bg-[#F8F5EF] py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-10">
          <p className=" inline-block text-xl bg-indigo-900 text-amber-400  tracking-widest  mb-8 px-5 py-2 rounded-xl font-bold uppercase">
            Our Team
          </p>

          <h1 className="text-3xl sm:text-5xl lg:text-3xl sm:text-5xl lg:text-6xl italic text-black mt-8 font-semibold">
            Meet Our Team of Workplace Experts
          </h1>

          <hr className="w-full sm:w-80 border-4 mx-auto rounded-xl border-yellow-200 my-8" />
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto mt-25">
          <TeamCard
            image={team1}
            title="Operations Lead"
            description="Focused on daily delivery performance and customer success."
          />

          <TeamCard
            image={team2}
            title="Customer Success"
            description="Supporting enterprise clients with responsive service."
          />

          <TeamCard
            image={team3}
            title="Technology Partner"
            description="Building tools for dispatch, tracking, and emissions reporting."
          />
        </div>
        <button className="px-6 py-3 flex mx-auto mt-20 font-semibold bg-amber-300  rounded-3xl text-xl hover:bg-indigo-900 hover:text-[#FFD600]  transition">
          See All Experts →{" "}
        </button>
      </section>
    </>
  );
};

export default Team;
