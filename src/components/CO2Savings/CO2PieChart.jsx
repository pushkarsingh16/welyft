import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { createCO2SavingsView, DEFAULT_CO2_SAVINGS_VIEW } from "./data";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function CO2PieChart({ data: dashboardData = DEFAULT_CO2_SAVINGS_VIEW }) {
  const view = dashboardData?.pieData ? dashboardData : createCO2SavingsView();
  const colors = view.palette.pie;
  const pieData = view.pieData;
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  const data = {
    labels: pieData.map((item) => item.category),
    datasets: [
      {
        data: pieData.map((item) => item.value),
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed} Ton`,
        },
      },
      datalabels: {
        color: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex];
          const percentage = (value / total) * 100;
          return percentage <= 50 ? "#ffffff" : "#0A1F44";
        },
        font: { weight: "bold", size: 17 },
        formatter: (value) => `${((value / total) * 100).toFixed(1)}%`,
        textStrokeColor: "#0a1f44",
        textStrokeWidth: 0,
      },
    },
  };

  return (
    <div
      className="w-full h-full rounded-xl bg-[#F6F5F0] p-4 sm:p-5 md:p-6 flex flex-col"
      style={{ borderColor: view.palette.co2Emission }}
    >
      <div className="mb-3 mt-0 text-center">
        <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl" style={{ color: view.palette.text }}>
          CO2 Reduction Ratio
        </h3>
        <p className="text-[10px] sm:text-sm font-semibold" style={{ color: view.palette.text }}>
          CO2 Saved vs CO2 Emission (Tons)
        </p>
      </div>

      <div className="relative mt-6 flex-1 min-h-[11rem] sm:min-h-[12rem] md:min-h-[13rem] lg:min-h-[14rem] xl:min-h-[13rem]">
        <Pie data={data} options={options} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs sm:gap-4 sm:text-sm lg:mt-6">
        {pieData.map((item, index) => (
          <div key={item.category} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="font-semibold" style={{ color: view.palette.text }}>
              {item.category} - <span className="font-semibold">{item.value} Ton</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
