import { Cloud, TreePine, Fuel, Car } from "lucide-react";
import { createCO2SavingsView, DEFAULT_CO2_SAVINGS_VIEW } from "./data";

const iconMap = { co2: Cloud, tree: TreePine, fuel: Fuel, car: Car };

export default function TotalImpactPanel({
  data: dashboardData = DEFAULT_CO2_SAVINGS_VIEW,
}) {
  const view = dashboardData?.totalImpact
    ? dashboardData
    : createCO2SavingsView();
  const palette = view.palette;
  const totalImpact = view.totalImpact;
  const apiResponse = view.apiResponse;
  return (
    <div
      className="w-full h-full rounded-xl bg-[#F6F5F0] p-4 sm:p-5 md:p-6 flex flex-col"
      style={{ borderColor: palette.co2Emission }}
    >
      <div className="mb-0 sm:mb-4 mt-0 text-center">
        <h3
          className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl"
          style={{ color: palette.text }}
        >
          Total Impact
        </h3>
        <p className="text-[10px] sm:text-sm mt-1 font-semibold" style={{ color: palette.text }}>
          (Year {apiResponse.year})
        </p>

        {/* New Heading */}
        <p
          className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl  leading-[1.5] font-bold"
          style={{ color: palette.text }}
        >
          Measured by data, Driven by sustainability, <br />And Powered by electric
          mobility
        </p>
      </div>

      {/* Boxes pushed further down */}
      <div className="mt-8 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {totalImpact.map((item, idx) => {
          const Icon = iconMap[item.icon];
          return (
            <div
              key={idx}
              className="flex md:flex-col min-h-[100px] items-center md:items-start gap-4 rounded-3xl border border-[#D1D5DB] p-3 sm:p-4"
            >
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#ffd600" }}
              >
                <Icon
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{ color: palette.co2Emission }}
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1 min-w-0 md:flex-col">
                <div
                  className="text-[10px] sm:text-xs leading-loose font-semibold"
                  style={{ color: palette.text }}
                >
                  {item.label}
                </div>
                <div
                  className="text-lg sm:text-xl font-semibold leading-loose"
                  style={{ color: palette.text }}
                >
                  {item.value}
                </div>
                <div
                  className="text-[10px] sm:text-xs leading-loose font-semibold"
                  style={{ color: palette.text }}
                >
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
