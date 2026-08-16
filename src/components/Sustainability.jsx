import React from "react";
import { useRef } from "react";
import SustainabilityCard from "./SustainabilityCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
const Sustainability = () => {
  const swiperRef = useRef(null);
  return (
    <section
      id="sustainability"
      className="fraunces relative overflow-hidden bg-[#F6F5F0] pt-8 sm:pt-10 lg:pt-12 scroll-mt-20 sm:scroll-mt-12 lg:scroll-mt-16"
    >
      <div className="relative z-10 flex flex-col mx-auto  max-w-8xl px-4 sm:px-5 lg:px-10">
        <div className="text-center mb-12 sm:mb:14">
          <p className="inline-block rounded-md bg-[#0A1F44] px-4 py-2 text-sm font-bold uppercase text-amber-300 tracking-[0.03em] sm:px-5 sm:text-xl">
            Sustainability
          </p>
        </div>
        <div className=" flex flex-col rounded-[28px]  bg-gradient-to-br from-[#0A1F44] to-[#163B7A] px-2 pb-6  sm:px-4  md:px-5  lg:px-6">
          {/* HEADING */}
          <div className="mx-auto max-w-7xl px-4 pt-2 pb-2 text-center sm:px-6 lg:px-10">
            <h2
              className=" text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  text-[#FFD600] mt-4
        "
            >
              Sustainable Logistics, Smarter Future
            </h2>
          </div>
          <div className="mt-6 w-full max-w-8xl">
            {/* MOBILE SLIDER */}
            <div className="px-1 md:px-2 xl:hidden">
              <Swiper
                modules={[Pagination, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={16}
                slidesPerView={1}
                centeredSlides={false}
                pagination={{ clickable: true }}
                grabCursor={true}
                breakpoints={{
                  640: { slidesPerView: 1.05 },
                  768: { slidesPerView: 1.6 },
                }}
              >
                <SwiperSlide
                  className="flex justify-center"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <SustainabilityCard
                    icon="💡"
                    title="Smart Innovation"
                    description="Technology that powers delivery visibility and dispatch control"
                  />
                </SwiperSlide>

                <SwiperSlide
                  className="flex justify-center"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <SustainabilityCard
                    icon="🚚"
                    title="Lower Emissions"
                    description="EV fleet solutions for greener, more sustainable transport"
                  />
                </SwiperSlide>

                <SwiperSlide
                  className="flex justify-center"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <SustainabilityCard
                    icon="🌏"
                    title="Better Planet"
                    description="Logistics designed with long-term sustainability at its core"
                  />
                </SwiperSlide>

                <SwiperSlide
                  className="flex justify-center"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <SustainabilityCard
                    icon="📈"
                    title="CO₂ Reporting"
                    description="Estimated carbon savings tracked for every single delivery"
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            {/* DESKTOP / TABLET GRID */}
            <div className="hidden relative gap-6 h-30 lg:h-50 place-items-stretch xl:grid xl:grid-cols-4 xl:gap-4">
              <SustainabilityCard
                icon="💡"
                title="Smart Innovation"
                description="Technology that powers delivery visibility and dispatch control"
              />
              <SustainabilityCard
                icon="🚚"
                title="Lower Emissions"
                description="EV fleet solutions for greener, more sustainable transport"
              />

              <SustainabilityCard
                icon="🌏"
                title="Better Planet"
                description="Logistics designed with long-term sustainability at its core"
              />

              <SustainabilityCard
                icon="📈"
                title="CO₂ Reporting"
                description="Estimated carbon savings tracked for every single delivery"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
