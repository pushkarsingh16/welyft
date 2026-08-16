import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/Moonncake.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import traditionalMooncake from "../assets/tradi.png";
import snowSkinMooncake from "../assets/snowcake.png";
import { useRef } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import mooncakeBanner from "../assets/Mooncake_Banner_.svg";

import {
  FaWhatsapp,
  FaMoon,
  FaCookieBite,
  FaSnowflake,
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaTruck,
  FaThermometerHalf,
  FaBox,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaShippingFast,
  FaGift,
  FaWarehouse,
  FaMapMarkedAlt,
  FaHeadset,
  FaMobileAlt,
  FaCalendarCheck,
  FaBoxOpen,
  FaBoxes,
  FaShieldAlt,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import Footer from "../components/Footer";

const mooncakeTypes = [
  {
    image: traditionalMooncake,
    title: "Traditional Baked Mooncakes",
    points: [
      "Stable at room temperature",
      "Protected from crushing",
      "Careful stacking",
      "Same-day delivery available",
    ],
  },
  {
    image: snowSkinMooncake,
    title: "Snow Skin Mooncakes",
    points: [
      "Temperature-controlled handling",
      "Chilled transportation",
      "Freshness maintained",
      "Immediate delivery after pickup",
    ],
  },
];

const processSteps = [
  {
    icon: FaClipboardList,
    title: "Order Placed",
    desc: "Book your pickup in seconds",
  },
  {
    icon: FaTruck,
    title: "Pickup",
    desc: "Collected from bakery, hotel, home, or office",
  },
  {
    icon: FaThermometerHalf,
    title: "Proper Handling",
    desc: "Room temperature or chilled, as needed",
  },
  {
    icon: FaBox,
    title: "Careful Transit",
    desc: "Protected from crushing and damage",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Live Tracking",
    desc: "Watch your delivery in the app",
  },
  {
    icon: FaCheckCircle,
    title: "Delivered & Confirmed",
    desc: "Safely delivered, confirmed instantly",
  },
];

const personalDeliveries = [
  { icon: FaShippingFast, label: "Same-day and next-day delivery islandwide" },
  {
    icon: FaGift,
    label: "Careful handling so gift boxes arrive presentation-ready",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Track your delivery live, right in the Welyft app",
  },
  {
    icon: FaUsers,
    label:
      "Perfect for family gifting, friend-to-friend surprises, or last-minute orders",
  },
];

const businessDeliveries = [
  {
    icon: FaWarehouse,
    label: "Bulk orders picked up and delivered from one location",
  },
  {
    icon: FaMapMarkedAlt,
    label: "Multi-location delivery across Singapore, same day",
  },
  {
    icon: FaHeadset,
    label: "Dedicated support for high-volume festive orders",
  },
  {
    icon: FaMobileAlt,
    label: "Live tracking for every delivery, right in the app",
  },
];

const whyChooseWelyft = [
  {
    icon: FaCalendarCheck,
    title: "Reliable Scheduling",
    desc: "Deliver exactly when customers expect",
  },
  {
    icon: FaBoxOpen,
    title: "Professional Handling",
    desc: "Every gift box handled with care",
  },
  {
    icon: FaBoxes,
    title: "Bulk Delivery Support",
    desc: "Hundreds of deliveries from one pickup",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Network Coverage",
    desc: "Deliver anywhere in Singapore",
  },
];

export default function MidAutumnFestival() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const scrollOrGoToContact = () => {
    navigate("/#contact-form");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fraunces bg-[#F6F5F0]">
        {/* HERO */}
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-10">
          <img
            src={mooncakeBanner}
            alt="mid-autumn welyft celebrate"
            className="absolute inset-0 w-full h-full object-cover object-center translate-y-26"
          />
          {/* <div
            className="absolute top-10 left-1/2 -translate-x-1/2 h-72 w-72 md:h-96 md:w-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,214,0,0.15) 0%, transparent 70%)",
            }}
          /> */}

          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-8 sm:mt-12">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#FFD600] bg-white/10 border border-[#FFD600]/30 tracking-[0.08em] px-4 py-1.5 rounded-full font-bold uppercase mb-6">
                Mid-Autumn Festival
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Mid-Autumn Mooncake
                <br />
                <span className="text-[#FFD600]">Delivery in Singapore</span>
              </h1>
              <p className="text-white text-base md:text-lg font-semibold leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Deliver Traditional & Snow Skin Mooncakes safely, on time, and
                in perfect condition — for the people you love, and the clients
                and teams you work with.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={scrollOrGoToContact}
                  className="bg-[#FFD600] text-[#0A1F44] font-bold px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-base rounded-xl shadow-lg hover:shadow-yellow-300/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Schedule Your Delivery
                </button>
                <a
                  href="https://wa.me/6587601984?text=Hello%20Welyft"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-[#FFD600] text-[#FFD600] font-bold px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-base rounded-xl hover:bg-[#FFD600] hover:text-[#0A1F44] transition-all duration-300"
                >
                  <FaWhatsapp className="text-lg sm:text-xl" />
                  Chat with us
                </a>
              </div>
            </div>

            {/* <div className="order-1 lg:order-2 flex justify-center">
              <img
                src={heroImage}
                alt="Mid-Autumn Festival Rabbit"
                className="w-96 sm:w-[32rem] md:w-[44rem] lg:w-[56rem] h-auto rounded-2xl drop-shadow-2xl"
              />
            </div> */}
          </div>
        </section>

        {/* AUDIENCE SPLIT */}
        <section className="pt-12 md:pt-16 px-4 sm:px-6 lg:px-10 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="inline-block text-sm sm:text-xl text-[#FFD600] bg-[#0A1F44] tracking-[0.03em] px-5 py-2 rounded-md font-bold uppercase">
                Choose Your Delivery
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0A1F44] mt-5">
                Two Ways We Deliver This Mid-Autumn
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Personal card */}
              <div className="h-full bg-white rounded-2xl p-8 md:p-10 shadow-[0_18px_45px_-25px_rgba(10,31,68,0.35)] border border-black/5 flex flex-col">
                <div className="h-14 w-14 rounded-2xl bg-[#0A1F44] flex items-center justify-center mb-5">
                  <FaUsers className="text-2xl text-[#FFD600]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#0A1F44] mb-3">
                  For You & Your Family
                </h3>
                <p className="text-[#0A1F44] leading-relaxed mb-6 flex-1">
                  Send mooncakes to parents, relatives, or friends — fresh, on
                  time, beautifully presented, anywhere in Singapore.
                </p>
                <button
                  onClick={() => scrollToSection("personal-delivery")}
                  className="text-[#0A1F44] font-bold underline hover:text-[#FFD600] transition-colors text-left"
                >
                  See personal delivery options ↓
                </button>
              </div>

              {/* Business card */}
              <div className="h-full bg-gradient-to-br from-[#0A1F44] to-[#163B7A] rounded-2xl p-8 md:p-10 shadow-[0_18px_45px_-25px_rgba(10,31,68,0.4)] flex flex-col">
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <FaBuilding className="text-2xl text-[#FFD600]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  For Your Business
                </h3>
                <p className="text-white leading-relaxed mb-6 flex-1">
                  Deliver mooncakes for corporate gifting, hotel partnerships,
                  or bulk office orders — fresh, on time, professionally
                  handled, at any scale.
                </p>
                <button
                  onClick={() => scrollToSection("business-delivery")}
                  className="text-[#FFD600] font-bold underline hover:text-white transition-colors text-left"
                >
                  See business delivery options ↓
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* EVERY MOONCAKE DESERVES CARE */}
        <section className="px-4 sm:px-6 lg:px-10 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_18px_45px_-25px_rgba(10,31,68,0.35)] border border-black/5 p-8 md:p-12 text-center">
            <div className="h-14 w-14 rounded-2xl bg-[#0A1F44] flex items-center justify-center mx-auto mb-5">
              <FaShieldAlt className="text-2xl text-[#FFD600]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F44] mb-4">
              Every Mooncake Deserves Care
            </h2>
            <p className="text-[#0A1F44] font-medium leading-relaxed">
              Mooncakes aren't ordinary parcels. Whether it's a single gift box
              for your loved one or a corporate order for the whole office,
              Welyft makes sure every mooncake arrives fresh, intact, and
              beautifully presented.
            </p>
          </div>
        </section>

        {/* WE DELIVER EVERY TYPE OF MOONCAKE */}
        <section className="px-4 sm:px-6 lg:px-10 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="inline-block text-sm sm:text-xl text-[#FFD600] bg-[#0A1F44] tracking-[0.03em] px-5 py-2 rounded-md font-bold uppercase">
                Our Range
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0A1F44] mt-5">
                We Deliver Every Type of Mooncake
              </h2>
            </div>

            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                grabCursor={true}
                breakpoints={{ 640: { slidesPerView: 1.05 } }}
              >
                {mooncakeTypes.map((m, i) => (
                  <SwiperSlide
                    key={i}
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1F44] to-[#163B7A] rounded-2xl p-8 shadow-[0_18px_45px_-25px_rgba(10,31,68,0.4)] min-h-[340px] flex flex-col justify-center">
                      <img
                        src={m.image}
                        alt={m.title}
                        className="absolute top-4 left-4 w-24 h-24 object-contain drop-shadow-2xl"
                      />

                      <div className="relative z-10 mt-16">
                        <h3 className="text-xl font-bold text-white mb-5">
                          {m.title}
                        </h3>
                        <ul className="space-y-2.5">
                          {m.points.map((p, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2.5 text-white text-sm"
                            >
                              <FaCheckCircle className="text-[#FFD600] mt-0.5 shrink-0" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid */}
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              {mooncakeTypes.map((m, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden h-full bg-gradient-to-br from-[#0A1F44] to-[#163B7A] rounded-2xl p-8 md:p-10 shadow-[0_18px_45px_-25px_rgba(10,31,68,0.4)] flex flex-col justify-center min-h-[320px]"
                >
                  <div className="relative z-10 max-w-[55%]">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-5">
                      {m.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {m.points.map((p, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-white text-sm"
                        >
                          <FaCheckCircle className="text-[#FFD600] mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <img
                    src={m.image}
                    alt={m.title}
                    className="absolute top-1/2 -translate-y-1/2 right-8 translate-x-4 lg:translate-x-8 w-64 h-64 lg:w-78 lg:h-78 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WELYFT DELIVERS THEM */}
        <section className="px-4 sm:px-6 lg:px-10 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="inline-block text-sm sm:text-xl text-[#FFD600] bg-[#0A1F44] tracking-[0.03em] px-5 py-2 rounded-md font-bold uppercase">
                Our Process
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0A1F44] mt-5">
                How Welyft Delivers Them
              </h2>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden relative pl-8">
              <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-[#FFD600]" />
              <div className="space-y-8">
                {processSteps.map((s, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-8 top-0 h-12 w-12 rounded-full bg-[#0A1F44] flex items-center justify-center shrink-0 z-10">
                      <s.icon className="text-lg text-[#FFD600]" />
                    </div>
                    <div className="bg-white rounded-2xl p-5 pl-6 shadow-[0_18px_45px_-30px_rgba(10,31,68,0.35)] border border-black/5 min-h-[110px]">
                      <p className="text-[10px] font-bold text-[#FFD600] bg-[#0A1F44] inline-block px-2 py-0.5 rounded-full mb-2">
                        STEP {i + 1}
                      </p>
                      <h3 className="font-bold text-[#0A1F44] mb-1">
                        {s.title}
                      </h3>
                      <p className="text-sm text-[#0A1F44]">{s.desc}</p>
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="flex justify-start -ml-8 mt-2">
                        <span className="text-[#FFD600] text-lg">↓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:flex items-start justify-between gap-2">
              {processSteps.map((s, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="h-16 w-16 shrink-0 rounded-full bg-white shadow-[0_18px_45px_-25px_rgba(10,31,68,0.35)] border border-black/5 flex items-center justify-center mb-3">
                      <s.icon className="text-2xl text-[#0A1F44]" />
                    </div>
                    <p className="text-[10px] font-bold text-[#FFD600] bg-[#0A1F44] px-2 py-0.5 rounded-full mb-2">
                      STEP {i + 1}
                    </p>
                    <div className="min-h-[56px]">
                      <p className="text-sm font-bold text-[#0A1F44] leading-tight px-1">
                        {s.title}
                      </p>
                      <p className="text-xs text-[#0A1F44] mt-1 px-1">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="text-[#FFD600] text-xl mb-16 shrink-0">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOR YOU & YOUR FAMILY — B2C */}
        <section
          id="personal-delivery"
          className="px-4 sm:px-6 lg:px-10 pb-16 md:pb-20 scroll-mt-24"
        >
          <div className="max-w-6xl mx-auto bg-white rounded-[28px] p-6 md:p-8 shadow-[0_18px_45px_-25px_rgba(10,31,68,0.35)] border border-black/5">
            <div className="text-center mb-6">
              <p className="inline-block text-sm sm:text-xl text-[#FFD600] bg-[#0A1F44] tracking-[0.03em] px-5 py-2 rounded-md font-bold uppercase">
                Personal Deliveries
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0A1F44] mt-5">
                Sending Mooncakes to Someone You Love
              </h2>
              <p className="text-[#0A1F44] leading-relaxed max-w-2xl mx-auto mt-5">
                Whether it's your parents across town, a friend you haven't seen
                in months, or a thank-you gift for someone special, we make
                sending mooncakes as easy as a few taps.
              </p>
            </div>

            {/* Mobile Swiper */}
            <div className="md:hidden mb-10">
              <Swiper
                modules={[Pagination, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                grabCursor={true}
                breakpoints={{ 640: { slidesPerView: 1.05 } }}
              >
                {personalDeliveries.map((p, i) => (
                  <SwiperSlide
                    key={i}
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <div className="flex flex-col items-center text-center gap-3 bg-[#F6F5F0] rounded-2xl p-8 min-h-[190px] justify-center">
                      <div className="h-12 w-12 rounded-full bg-[#0A1F44] flex items-center justify-center">
                        <p.icon className="text-lg text-[#FFD600]" />
                      </div>
                      <span className="text-sm text-[#0A1F44] font-medium leading-relaxed">
                        {p.label}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 gap-5 mb-10 items-stretch">
              {personalDeliveries.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-[#F6F5F0] rounded-xl p-5 min-h-[72px]"
                >
                  <div className="h-10 w-10 shrink-0 rounded-full bg-[#0A1F44] flex items-center justify-center">
                    <p.icon className="text-base text-[#FFD600]" />
                  </div>
                  <span className="text-sm text-[#0A1F44] font-medium leading-relaxed">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/get-quote">
                <button className="bg-[#FFD600] text-[#0A1F44] font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-yellow-300/50 hover:-translate-y-0.5 transition-all duration-300">
                  Schedule a Personal Delivery
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* FOR YOUR BUSINESS — B2B */}
        <section
          id="business-delivery"
          className="px-4 sm:px-6 lg:px-10 pb-16 md:pb-20 scroll-mt-24"
        >
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0A1F44] to-[#163B7A] rounded-[28px] p-6 md:p-8">
            <div className="text-center mb-6">
              <p className="inline-block text-sm sm:text-xl text-[#FFD600] bg-white/10 border border-[#FFD600]/30 tracking-[0.03em] px-5 py-2 rounded-md font-bold uppercase">
                Business Deliveries
              </p>
              <h2
                className="text-2xl md:text-4xl font-bold text-white mt-5 leading-tight"
                style={{ fontVariantLigatures: "none" }}
              >
                Fulfilling Your Business's Delivery Needs This Mid-Autumn
              </h2>
              <p className="text-white leading-relaxed max-w-2xl mx-auto mt-5">
                From a single hotel partnership to thousands of office gift
                boxes, Welyft scales with your festive season.
              </p>
            </div>

            {/* Mobile Swiper */}
            <div className="md:hidden mb-10">
              <Swiper
                modules={[Pagination, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                grabCursor={true}
                breakpoints={{ 640: { slidesPerView: 1.05 } }}
              >
                {businessDeliveries.map((b, i) => (
                  <SwiperSlide
                    key={i}
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <div className="flex flex-col items-center text-center gap-3 bg-white/10 border border-white/10 rounded-2xl p-8 min-h-[190px] justify-center">
                      <div className="h-12 w-12 rounded-full bg-[#FFD600] flex items-center justify-center">
                        <b.icon className="text-lg text-[#0A1F44]" />
                      </div>
                      <span className="text-sm text-white font-medium leading-relaxed">
                        {b.label}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 gap-5 mb-10 items-stretch">
              {businessDeliveries.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-xl p-5 min-h-[72px]"
                >
                  <div className="h-10 w-10 shrink-0 rounded-full bg-[#FFD600] flex items-center justify-center">
                    <b.icon className="text-base text-[#0A1F44]" />
                  </div>
                  <span className="text-sm text-white font-medium leading-relaxed">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={scrollOrGoToContact}
                className="bg-[#FFD600] text-[#0A1F44] font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-yellow-300/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                Talk to Our Business Team
              </button>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE WELYFT */}
        <section className="px-4 sm:px-6 lg:px-10 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="inline-block text-sm sm:text-xl text-[#FFD600] bg-[#0A1F44] tracking-[0.03em] px-5 py-2 rounded-md font-bold uppercase">
                Why Welyft
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0A1F44] mt-5">
                Why Choose Welyft
              </h2>
            </div>

            {/* Mobile swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                grabCursor={true}
              >
                {whyChooseWelyft.map((w, i) => (
                  <SwiperSlide
                    key={i}
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <div className="bg-white rounded-2xl p-7 shadow-xl border border-black/5 text-center h-[230px] flex flex-col justify-center items-center">
                      <div className="h-14 w-14 rounded-2xl bg-[#0A1F44] flex items-center justify-center mb-4">
                        <w.icon className="text-2xl text-[#FFD600]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0A1F44] mb-2">
                        {w.title}
                      </h3>
                      <p className="text-sm text-[#0A1F44]">{w.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-5 items-stretch">
              {whyChooseWelyft.map((w, i) => (
                <div
                  key={i}
                  className="h-full bg-white rounded-2xl p-6 shadow-[0_18px_45px_-30px_rgba(10,31,68,0.35)] border border-black/5 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center"
                >
                  <div className="h-14 w-14 rounded-2xl bg-[#0A1F44] flex items-center justify-center mb-4">
                    <w.icon className="text-2xl text-[#FFD600]" />
                  </div>
                  <h3 className="font-bold text-[#0A1F44] mb-2">{w.title}</h3>
                  <p className="text-sm text-[#0A1F44]">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING / CONTACT — SPLIT CTA */}
        <section className="px-4 sm:px-6 lg:px-10 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0A1F44] to-[#163B7A] rounded-[28px] text-center py-14 px-6 md:py-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Your Mid-Autumn Deliveries?
            </h2>
            <p className="text-white max-w-2xl mx-auto mb-3">
              Mid-Autumn is almost here — book your delivery before the rush.
            </p>
            <p className="text-white max-w-3xl mx-auto mb-8 text-sm">
              Mid-Autumn is about reunion and gratitude — Welyft makes sure that
              tradition arrives exactly as it should, for the people who matter
              to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-quote">
                <button className="bg-[#FFD600] text-[#0A1F44] font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-yellow-300/50 hover:-translate-y-0.5 transition-all duration-300">
                  Schedule a Personal Delivery
                </button>
              </Link>
              <Link to="/business-quote">
                <button className="border-2 border-[#FFD600] text-[#FFD600] font-bold px-8 py-3.5 rounded-2xl hover:bg-[#FFD600] hover:text-[#0A1F44] transition-all duration-300">
                  Get a Business Quote
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
