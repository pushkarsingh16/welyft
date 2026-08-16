import { useEffect, useRef, useState } from "react";
import ChartHeader from "./ChartHeader";
import CO2Chart from "./CO2Chart";
import TotalImpactPanel from "./TotalImpactPanel";
import CO2PieChart from "./CO2PieChart";
import DeliveriesReplaced from "./DeliveriesReplaced";
import FooterNote from "./FooterNote";
import { createCO2SavingsView } from "./data";
import { fetchCO2SavingsView } from "./co2SavingsService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CO2Dashboard() {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [dashboardData, setDashboardData] = useState(() => createCO2SavingsView());
  const slideClass = "flex w-full justify-center !h-auto pb-2";
  const cardClass =
    "w-full min-w-0 h-full rounded-xl border-2 bg-[#0A1F44] shadow-sm min-h-[24rem] sm:min-h-[26rem] md:min-h-[28rem] lg:min-h-[30rem] xl:min-h-[32rem]";

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      const liveData = await fetchCO2SavingsView();
      if (isMounted) {
        setDashboardData(liveData);
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);
  const slideLabels = [
    "CO2 chart",
    "CO2 reduction ratio",
    "Deliveries replaced",
    "Total impact",
  ];

  return (
    <section
      id="sustainability"
      className="scroll-mt-16 bg-[#F6F5F0] pt-0 sm:pt-3">
    <div className="relative z-10 flex flex-col mx-auto  max-w-8xl px-4 sm:px-5 lg:px-10">
      <ChartHeader />

      <div className="w-full px-1 sm:px-2 lg:px-0">
        <Swiper
          className="w-full"
          spaceBetween={14}
          slidesPerView={1}
          centeredSlides={false}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.activeIndex);
          }}
        >
          <SwiperSlide className={slideClass}>
            <div className={`${cardClass}`}>
              <DeliveriesReplaced data={dashboardData} />
            </div>
          </SwiperSlide>

          <SwiperSlide className={slideClass}>
            <div className={`${cardClass} *:h-full`}>
              <CO2PieChart data={dashboardData} />
            </div>
          </SwiperSlide>

          <SwiperSlide className={slideClass}>
            <div className={`${cardClass} *:h-full`}>
              <CO2Chart data={dashboardData} />
            </div>
          </SwiperSlide>

          <SwiperSlide className={slideClass}>
            <div className={`${cardClass} *:h-full`}>
              <TotalImpactPanel data={dashboardData} />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="mt-5 flex items-center justify-center gap-3">
          {slideLabels.map((slideLabel, index) => {
            const isActive = activeSlide === index;

            return (
              <button
                key={slideLabel}
                type="button"
                aria-label={`Go to ${slideLabel}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  isActive ? "w-14 shadow-sm" : "w-3 opacity-35"
                }`}
                style={{ backgroundColor: dashboardData.palette.co2Emission }}
              />
            );
          })}
        </div>
      </div>

      <FooterNote />
    </div>
    </section>
  );
}
