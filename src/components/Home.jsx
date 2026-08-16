import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Hero_page from "../assets/welyft-home.svg";
import B2B_banner from "../assets/welyft-B2B.svg";
import C2C_banner from "../assets/welyft-C2C-bb.svg";
import Logistics_Technology from "../assets/welyft-logistic.svg";

import MobileHero_page from "../assets/welyft-mobile-hom.svg";
import MobileB2B_banner from "../assets/welyft-mobile-b2.svg";
import MobileC2C_banner from "../assets/welyft-mobileC2.svg";
import MobileLogistics_Technology from "../assets/FINAL_Vertical_Banners2.svg";

import {
  RiShieldCheckLine,
  RiMapPinLine,
  RiTimeLine,
  RiCustomerService2Line,
  RiTruckLine,
  RiRoadMapLine,
  RiRadarLine,  
  RiFileList3Line,
  RiFlashlightLine,
  RiMoneyDollarCircleLine,
  RiLeafLine,
  RiCpuLine,
  RiRouteLine,
  RiNotification3Line,
  RiBuilding2Line,
} from "@remixicon/react";

const homeSlides = [
  {
    image: Hero_page,
    mobileImage: MobileHero_page,
    alt: "Welyft electric vehicle fleet delivering across Singapore",

    badge: "Fast, Reliable, Secure Every Time",

    title: ["DELIVERING TRUST", "MOVING LIFE FORWARD"],

    subtitle: "",

    features: [
      {
        icon: RiShieldCheckLine,
        title: "Secure",
        subtitle: "& Compliant",
      },
      {
        icon: RiRouteLine,
        title: "Transparent",
        subtitle: "Pricing",
      },
    ],

    stats: [
      {
        value: "Secure Delivery",
        icon: RiShieldCheckLine,
      },
      {
        value: "Live Tracking",
        icon: RiMapPinLine,
      },
      {
        value: "On-Time Service",
        icon: RiTimeLine,
      },
      {
        value: "Instant Support",
        icon: RiCustomerService2Line,
      },
    ],
  },

  {
    image: B2B_banner,
    mobileImage: MobileB2B_banner,
    alt: "Welyft B2B enterprise logistics platform with dedicated EV fleet",

    badge: "Enterprise B2B Platform",

    title: ["SMART LOGISTICS", "GROWING ENTERPRISES"],

    subtitle: "",

    features: [
      {
        icon: RiCpuLine,
        title: "Full",
        subtitle: "Automation",
      },

      {
        icon: RiRouteLine,
        title: "Scalable",
        subtitle: "& Reliable",
      },
    ],

    stats: [
      {
        value: "Bulk Shipping",
        icon: RiTruckLine,
      },
      {
        value: "Dedicated Fleet",
        icon: RiRoadMapLine,
      },
      {
        value: "Real-Time Tracking",
        icon: RiRadarLine,
      },
      {
        value: "Enterprise Billing",
        icon: RiFileList3Line,
      },
    ],
  },

  {
    image: C2C_banner,
    mobileImage: MobileC2C_banner,
    alt: "Welyft C2C parcel delivery with instant booking and CO2 tracking",

    badge: "WeMove powered by welyft",

    title: ["Ship It Green", "Right Now"],

    subtitle: "",

    features: [
      {
        icon: RiFileList3Line,
        title: "Digital",
        subtitle: "Proof",
      },
      {
        icon: RiCpuLine,
        title: "CO₂",
        subtitle: "Savings",
      },
    ],

    stats: [
      {
        value: "Instant Booking",
        icon: RiFlashlightLine,
      },
      {
        value: "Live Tracking",
        icon: RiMapPinLine,
      },
      {
        value: "Price Estimate",
        icon: RiMoneyDollarCircleLine,
      },
      {
        value: "Eco-Friendly",
        icon: RiLeafLine,
      },
    ],
  },

  {
    image: Logistics_Technology,
    mobileImage: MobileLogistics_Technology,
    alt: "Welyft smart logistics technology with route optimization",

    badge: "Logistics + Technology",

    title: ["DELIVERING POSSIBILITIES", "MOVING MORE THAN A PARCEL"],

    subtitle: "",

    features: [
      {
        icon: RiTruckLine,
        title: "100% Electric",
        subtitle: "Fleet",
      },
      {
        icon: RiRadarLine,
        title: "Anywhere,",
        subtitle: "Every Time",
      },
    ],

    stats: [
      {
        value: "Smart Dispatch",
        icon: RiCpuLine,
      },
      {
        value: "Route Optimization",
        icon: RiRouteLine,
      },
      {
        value: "Real-Time Updates",
        icon: RiNotification3Line,
      },
      {
        value: "Business Solutions",
        icon: RiBuilding2Line,
      },
    ],
  },
];

const Home = () => {
  const swiperRef = React.useRef(null);
  const homeRef = React.useRef(null);

  React.useEffect(() => {
    const section = homeRef.current;
    if (!section) return;

    const preventZoom = (event) => {
      if (
        event.ctrlKey &&
        (event.type === "wheel" || event.type === "keydown")
      ) {
        event.preventDefault();
      }

      if (event.touches && event.touches.length > 1) {
        event.preventDefault();
      }
    };

    const preventGesture = (event) => {
      event.preventDefault();
    };

    section.addEventListener("wheel", preventZoom, { passive: false });
    section.addEventListener("keydown", preventZoom, { passive: false });
    section.addEventListener("touchstart", preventZoom, { passive: false });
    section.addEventListener("touchmove", preventZoom, { passive: false });
    section.addEventListener("gesturestart", preventGesture, {
      passive: false,
    });
    section.addEventListener("gesturechange", preventGesture, {
      passive: false,
    });

    return () => {
      section.removeEventListener("wheel", preventZoom);
      section.removeEventListener("keydown", preventZoom);
      section.removeEventListener("touchstart", preventZoom);
      section.removeEventListener("touchmove", preventZoom);
      section.removeEventListener("gesturestart", preventGesture);
      section.removeEventListener("gesturechange", preventGesture);
    };
  }, []);

  return (
    <section
      id="home"
      ref={homeRef}
      className="fraunces relative w-full"
      style={{ touchAction: "pan-x pan-y" }}
    >
      <div className="relative w-full overflow-hidden rounded-none bg-[#F5F3EE]">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="home-slider bg-transparent"
          style={{ background: "transparent" }}
        >
          {homeSlides.map((slide) => (
            <SwiperSlide key={slide.alt} className="bg-transparent">
              <div className="relative flex h-[80vh] md:h-[100vh] xl:h-screen xl:min-h-screen items-center justify-center overflow-hidden bg-transparent ">
                <div className="block h-full w-full">
                  {/* Desktop Banner */}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="h-full w-full object-cover object-center"
                     loading={homeSlides.indexOf(slide) === 0 ? "eager" : "lazy"}
                  />
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,18,35,0.6)_0%,rgba(5,18,35,0)_35%)]" />

                  {/* Mobile & Tablet Banner */}
                  <img
                    src={slide.mobileImage}
                    alt={slide.alt}
                    className="absolute inset-0 block h-full w-full xl:hidden object-cover object-center"
                     loading={homeSlides.indexOf(slide) === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 xl:hidden bg-[linear-gradient(to_bottom,rgba(5,18,35,0.85)_0%,rgba(5,18,35,0.55)_20%,rgba(5,18,35,0.15)_40%,rgba(5,18,35,0.0)_55%)]" />

                  {/* LEFT CONTENT */}

                  <div className="absolute left-[3%] top-[18%] z-20 hidden w-full max-w-xl flex-col gap-4 xl:flex xl:left-[4%] 2xl:w-[33%] ">
                    {slide.badge && (
                      <div className="mb-5">
                        <span
                          className="rounded-2xl px-4 py-1.5 lg:py-2 text-xs 2xl:text-xs font-bold bg-white/10 border-2 border-white text-white "
                          style={{
                            filter: "drop-shadow(0 2px 6px rgba(0,0,0,2))",
                          }}
                        >
                          {slide.badge}
                        </span>
                      </div>
                    )}

                    <div className="space-y-1 ">
                      {slide.title.map((line, index) => (
                        <h1
                          key={index}
                          className="text-xl xl:text-2xl 2xl:text-3xl font-bold uppercase  text-white"
                          style={{
                            textShadow:
                              "2px 2px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)",
                          }}
                        >
                          {line}
                        </h1>
                      ))}
                    </div>

                    {slide.subtitle && (
                      <p
                        className="mt-5 text-md xl:text-lg "
                        style={{
                          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9))",
                        }}
                      >
                        {slide.subtitle}
                      </p>
                    )}

                    <div className="mt-60 hidden xl:grid xl:grid-cols-2 gap-y-6 gap-x-0 max-w-xs">
                      {slide.features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center gap-3"
                          >
                            <Icon
                              className="size-9 shrink-0 text-white"
                              style={{
                                filter:
                                  "drop-shadow(0 4px 12px rgba(0,0,0,1)) drop-shadow(0 0 8px rgba(0,0,0,1))",
                              }}
                            />
                            <div className="flex flex-col">
                              <p
                                className="text-sm font-bold text-white leading-tight"
                                style={{
                                  textShadow: "1px 1px 8px rgba(0,0,0,0.9)",
                                }}
                              >
                                {item.title}
                              </p>
                              <p
                                className="text-sm font-bold text-white leading-tight"
                                style={{
                                  textShadow: "1px 1px 8px rgba(0,0,0,0.9)",
                                }}
                              >
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile & Tablet Content */}
                  <div className="absolute top-[8%] inset-0 z-20 flex flex-col justify-between px-4 pt-5 pb-19 md:pb-26 xl:hidden">
                    <div className="w-full  max-w-3xl">
                      {slide.badge && (
                        <span
                          className="inline-block rounded-2xl px-3 py-1 text-[8px] md:px-5 md:py-2 md:text-[10px] bg-white/10 font-bold border border-white text-white"
                          style={{
                            filter: "drop-shadow(0 2px 6px rgba(0,0,0,2))",
                          }}
                        >
                          {slide.badge}
                        </span>
                      )}

                      <div className="mt-3 space-y-2">
                        {slide.title.map((line, index) => (
                          <h1
                            key={index}
                            className="text-[20px] font-bold uppercase leading-tight text-white sm:text-[30px] md:text-[38px] lg:text-[42px]"
                            style={{
                              textShadow:
                                "2px 2px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)",
                            }}
                          >
                            {line}
                          </h1>
                        ))}
                      </div>

                      {slide.subtitle && (
                        <p
                          className="mt-3 text-xs sm:text-sm md:text-base text-white"
                          style={{
                            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9))",
                          }}
                        >
                          {slide.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="mb-1 flex lg:grid w-full gap-3 lg:gap-3 grid-cols-8">
                      {slide.features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center gap-2"
                          >
                            <Icon
                              className="text-white size-6 sm:size-7 md:size-8 shrink-0"
                              style={{
                                filter:
                                  "drop-shadow(0 2px 4px rgba(0,0,0,1)) drop-shadow(0 0 6px rgba(0,0,0,1))",
                              }}
                            />

                            <div className="flex flex-col">
                              <p
                                className="font-bold text-[11px] sm:text-[13px] md:text-[15px] text-white leading-tight"
                                style={{
                                  filter:
                                    "drop-shadow(0 2px 4px rgba(0,0,0,1)) drop-shadow(0 0 6px rgba(0,0,0,1))",
                                }}
                              >
                                {item.title}
                              </p>

                              <p
                                className="font-bold text-[11px] sm:text-[13px] md:text-[15px] text-white leading-tight"
                                style={{
                                  filter:
                                    "drop-shadow(0 2px 4px rgba(0,0,0,1)) drop-shadow(0 0 6px rgba(0,0,0,1))",
                                }}
                              >
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="fraunces absolute bottom-3 left-1/2 z-20 flex w-full max-w-6xl -translate-x-1/2  flex-nowrap justify-center gap-1 sm:gap-2 px-0 sm:bottom-4 sm:px-4 md:bottom-5 lg:bottom-6 lg:gap-4 xl:bottom-5">
                    {slide.stats.map((stat, statIndex) => {
                      const Icon = stat.icon;

                      return (
                        <div
                          key={statIndex}
                          className="flex flex-1 min-w-[80px] items-center justify-center
             gap-1 rounded-xl bg-[#FFD600]
             px-1 py-2
             text-[#0A1F44]
             hover:bg-[#0A1F44] hover:text-white
             transition"
                        >
                          <Icon className="shrink-0 size-4 md:size-5 lg:size-6" />
                          <h2 className="text-[10px] sm:text-xs md:text-sm font-semibold leading-4 text-center line-clamp-2 h-8 flex items-center justify-center">
                            {stat.value}
                          </h2>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-sm text-white shadow-md transition hover:bg-black/70 sm:left-4 sm:p-3 sm:text-base lg:left-6"
          aria-label="Previous slide"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-sm text-white shadow-md transition hover:bg-black/70 sm:right-4 sm:p-3 sm:text-base lg:right-6"
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default Home;
