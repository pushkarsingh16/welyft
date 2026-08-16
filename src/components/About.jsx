import React, { useEffect, useState } from "react";
import { Truck, Cpu, Network, Leaf } from "lucide-react";

const cards = [
  {
    icon: <Truck className="w-8 h-8 text-[#FFD600]" />,
    tag: "B2B Logistics",
    title: "The Engine",
    subtitle: "Powering Business In Motion",
    desc: "Our EV fleet powers daily B2B operations across Singapore, helping businesses manage bulk deliveries, distribution, and last-mile logistics with reliability and efficiency.",
    bg: "from-[#061533] to-[#0A1F44]",
    accent: "text-[#FFD600]",
    tagBg: "bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]/20",
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#0A1F44]" />,
    tag: "Logistics Technology",
    title: "The Intelligence",
    subtitle: "The Brain Behind Every Move",
    desc: "Welyft's technology platform helps businesses optimize routes, manage fleets, automate workflows, and gain real-time operational insights — all in one place.",
    bg: "from-yellow-400 to-yellow-300",
    accent: "text-[#0A1F44]",
    tagBg: "bg-[#0A1F44]/10 text-[#0A1F44] border border-[#0A1F44]/20",
  },
  {
    icon: <Network className="w-8 h-8 text-[#FFD600]" />,
    tag: "B2C & C2C Deliveries",
    title: "The Network",
    subtitle: "Where Demand Meets Delivery",
    desc: "From personal parcel deliveries to SME shipments, Welyft connects businesses and customers through one seamless, scalable logistics platform.",

    // SAME AS THE ENGINE
    bg: "from-[#061533] to-[#0A1F44]",

    accent: "text-[#FFD600]",
    tagBg: "bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]/20",
  },
  {
    icon: <Leaf className="w-8 h-8 text-[#0A1F44]" />,
    tag: "Eco-Friendly Promise",
    title: "The Impact",
    subtitle: "Green By Design",
    desc: "Every Welyft delivery contributes to a greener future through our 100% electric fleet, carbon tracking capabilities, and deep commitment to sustainable logistics.",
    bg: "from-[#FFD600] to-[#F7C800]",
    accent: "text-[#0A1F44]",
    tagBg: "bg-[#0A1F44]/10 text-[#0A1F44] border border-[#0A1F44]/20",
  },
];

const About = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % cards.length);
        setAnimating(false);
      }, 300);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleDot = (i) => {
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 300);
  };
  const nextCard = () => {
    if (animating) return;

    setAnimating(true);

    setTimeout(() => {
      setActive((prev) => (prev + 1) % cards.length);
      setAnimating(false);
    }, 300);
  };

  const card = cards[active];
  const isDark = active === 0 || active === 2;
  const isYellow = active === 1 || active === 3;

  return (
    <section
      id="about"
      className="scroll-mt-20 sm:scroll-mt-12 lg:scroll-mt-16 relative overflow-hidden pt-8 sm:pt-10 lg:pt-12"
      style={{ background: "#F6F5F0" }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 left-0 h-150 w-150 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,214,0,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-100 w-100 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(10,31,68,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col mx-auto  max-w-8xl px-4 sm:px-5 lg:px-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="mt-4 inline-block rounded-md bg-[#0A1F44] px-4 py-2 text-sm font-bold uppercase  text-[#FFD600] sm:px-5 sm:text-xl tracking-[0.03em]">
            About Welyft
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 max-w-9xl gap-5 lg:gap-20 items-start lg:grid-cols-2">
          {/* LEFT — CARD */}
          <div className="mt-8  sm:mt-10 lg:mt-12">
            <div
              onClick={nextCard}
              className={`relative flex h-[400px] lg:h-[400px]  flex-col justify-start overflow-hidden rounded-4xl bg-linear-to-br p-6 pt-8 cursor-pointer transition-opacity duration-300  sm:p-8  lg:p-10 ${card.bg} ${animating ? "opacity-0" : "opacity-100"}`}
            >
              {/* Decorative circle */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
                style={{ background: "white" }}
              />

              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                  {card.icon}
                </div>
                <span
                  className={`text-sm sm:text-base font-bold mt-4 uppercase tracking-widest ${card.accent}`}
                >
                  {card.tag}
                </span>
              </div>

              {/* Content */}
              <div className="mt-5 sm:mt-8">
                <h3
                  className={`text-3xl sm:text-5xl font-black tracking-tight mb-2 ${isDark ? "text-white" : isYellow ? "text-[#0A1F44]" : "text-[#0A1F44]"}`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm sm:text-base italic mb-4 font-medium ${isDark ? "text-white" : isYellow ? "text-[#0A1F44]" : "text-[#0A1F44]"}`}
                >
                  "{card.subtitle}"
                </p>
                <p
                  className={`text-sm leading-7 sm:text-base sm:leading-8 max-w-xl ${isDark ? "text-white" : isYellow ? "text-[#0A1F44]" : "text-[#0A1F44]"}`}
                >
                  {card.desc}
                </p>
              </div>
            </div>

            {/* DOTS + ARROWS */}
            <div className="mt-5 flex flex-wrap justify-center items-center gap-4 px-2">
              <div className="flex items-center gap-2">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-8 bg-[#FFD600]" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — VIDEO ONLY */}
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <div
              className="relative flex h-[400px] flex-col justify-center overflow-hidden rounded-4xl p-4  sm:p-6  lg:p-6"
              style={{ background: "#0A1F44" }}
            >
              <div className="p-2 sm:p-3 lg:p-4 mb-3">
                <h4 className="text-white text-xl font-black leading-tight tracking-tight mb-2">
                  Transforming Urban Logistics Across Singapore
                </h4>
                <p className="text-white text-sm leading-6">
                  Zero-emission workflows tailored for modern commerce — powered
                  by smart tech.
                </p>
              </div>
              <div className="w-full mt-2 rounded-2xl overflow-hidden border border-white/10 aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/YwGZerRU0Dc"
                  title="Welyft sustainable EV logistics overview - Singapore operations"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
