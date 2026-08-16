import React from "react";

const TeamCard = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-3xl max-w-sm mx-auto overflow-hidden flex flex-col hover:shadow-2xl shadow-md hover:-translate-y-3 transition-all duration-300">
      <img src={image} className="w-full h-64 object-cover" alt="" />
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-[#0A1F44]">{title}</h2>
        <p className="text-[#0A1F44] mt-4 text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
