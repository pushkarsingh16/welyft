import React from "react";
import ServicesCard from "./ServicesCard";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Building2,
  Package,
  Smartphone,
  LayoutDashboard,
  BusFront,
} from "lucide-react";

const services = [
  {
    tag: "B2B",
    slug: "b2b",
    Icon: Building2,
    title: "Enterprise Logistics",
    description:
      "Reliable enterprise-grade logistics powered by a 100% electric fleet and real-time carbon visibility.",
    features: [
      "Dedicated fleet capacity",
      "SLA-backed delivery",
      "Live GPS tracking",
      "ePOD execution",
      "Auto invoicing",
    ],
    highlight: "Live Scope-3 Carbon Reporting",
    ctaLabel: "Explore B2B",
  },
  {
    tag: "B2C",
    slug: "b2c",
    Icon: Package,
    title: "Last-Mile Fulfilment",
    description:
      "Fast, reliable last-mile delivery with full visibility for customers and operators.",
    features: [
      "Multi-stop routing",
      "Customer notifications",
      "Live tracking",
      "ePOD confirmation",
      "Delivery analytics",
    ],
    highlight: "12–20% Route Cost Reduction",
    ctaLabel: "Explore B2C",
  },
  {
    tag: "C2C",
    slug: "c2c",
    Icon: Smartphone,
    title: "WeMove - by Welyft",
    description:
      "Instant peer-to-peer parcel delivery with transparent pricing and verified security.",
    features: [
      "Instant booking system",
      "Live parcel tracking",
      "Transparent pricing",
      "Digital security proof",
      "Real-time Delivery",
    ],
    highlight: "Carbon savings per booking",
    ctaLabel: "Explore WeMove",
  },
  {
    tag: "Platform",
    slug: "platform",
    Icon: LayoutDashboard,
    title: "Welyft OS Platform",
    description:
      "An operating system for modern logistics — fleet, dispatch, routing and analytics in one place.",
    features: [
      "Fleet asset management",
      "Dispatch automation",
      "Route optimization",
      "ePOD workflows",
      "Analytics dashboard",
    ],
    highlight: "Singapore's First Live CO₂ Ledger",
    ctaLabel: "Explore Platform",
  },
  {
    tag: "Rental",
    slug: "rental",
    Icon: BusFront,
    title: "EV Van Rental Service",
    description:
      "Flexible electric van hire with predictable pricing and on-call driver support.",
    features: [
      "Half-day vehicle hire",
      "Full-day vehicle hire",
      "Predictable forecast",
      "On-call driver support",
      "Fluid fleet scaling",
    ],
    highlight: "100% Electric Fleet Commitment",
    ctaLabel: "Explore Rental",
  },
];

const Services = () => {
  const swiperRef = useRef(null);
  return (
    <section
      id="services"
      className="scroll-mt-20 sm:scroll-mt-12 lg:scroll-mt-16 relative overflow-hidden bg-[#F6F5F0] pt-8 sm:pt-10 lg:pt-12 lg:min-h-screen"
    >
      <div className="relative z-10 flex flex-col mx-auto  max-w-8xl px-4 sm:px-5 lg:px-10 ">
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#F6F5F0] to-transparent" />

        {/* HEADING */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p className="mt-4 inline-block rounded-md bg-[#0A1F44] px-4 py-2 text-sm font-bold uppercase text-amber-300 tracking-[0.03em] sm:px-5 sm:text-xl">
            Our Services
          </p>
        </div>

        {/* DESKTOP GRID */}
        <div className="relative z-10 mx-auto mt-12 hidden items-stretch gap-6 px-4 md:px-0 xl:grid xl:grid-cols-5">
          {services.map((s, i) => (
            <ServicesCard key={i} {...s} />
          ))}
        </div>

        {/* MOBILE SLIDER */}
        <div className="relative z-10 mt-10  xl:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={18}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.05 },
              768: { slidesPerView: 1.6 },
            }}
            className="service-slider bg-transparent"
            style={{ background: "transparent" }}
          >
            {services.map((s, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div onClick={() => swiperRef.current?.slideNext()}>
                  <ServicesCard {...s} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Services;
