import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "react-chartjs-2";
import { createCO2SavingsView, DEFAULT_CO2_SAVINGS_VIEW } from "./data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function CO2Chart({ data: dashboardData = DEFAULT_CO2_SAVINGS_VIEW }) {
  const view = dashboardData?.chartData ? dashboardData : createCO2SavingsView();
  const labels = view.chartData.map((d) => d.month);
  const palette = view.palette;
  const co2ScaleMax = Math.max(
    8,
    ...view.chartData.flatMap((d) => [d.co2Saved, d.co2Emission])
  );
  const deliveryScaleMax = co2ScaleMax * 1000;

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "EV Deliveries",
        data: view.chartData.map((d) => d.ev),
        borderColor: palette.evDeliveries,
        backgroundColor: palette.evDeliveries,
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: palette.evDeliveries,
        pointBorderColor: palette.evDeliveries,
        yAxisID: "y1",
        tension: 0.35,
        order: 0,
        datalabels: { display: false },
      },
      {
        type: "bar",
        label: "CO2 Saved (Ton)",
        data: view.chartData.map((d) => d.co2Saved),
        backgroundColor: palette.co2Saved,
        borderColor: palette.co2Saved,
        borderWidth: 0,
        barPercentage: 0.78,
        categoryPercentage: 0.66,
        yAxisID: "y",
        order: 1,
        datalabels: {
          display: (ctx) => ctx.chart.width >= 520,
          align: "top",
          anchor: "end",
          color: palette.co2Saved,
          font: { size: 9, weight: "bold" },
          formatter: (v) => v,
        },
      },
      {
        type: "bar",
        label: "CO2 Emission (Ton)",
        data: view.chartData.map((d) => d.co2Emission),
        backgroundColor: palette.co2Emission,
        borderColor: palette.co2Emission,
        borderWidth: 0,
        barPercentage: 0.78,
        categoryPercentage: 0.66,
        yAxisID: "y",
        order: 1,
        datalabels: {
          display: (ctx) => ctx.chart.width >= 520,
          align: "top",
          anchor: "end",
          color: palette.co2Emission,
          font: { size: 9, weight: "bold" },
          formatter: (v) => v,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    layout: { padding: { top: 24, right: 8, left: 0, bottom: 0 } },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: palette.text,
          font: { size: 14, weight: "bold" },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          callback: function tickLabel(value, index) {
            const label = this.getLabelForValue(value);
            return this.chart.width < 420 && index % 2 === 1 ? "" : label;
          },
        },
        title: {
          display: true,
          text: "Month (2024)",
          color: palette.text,
          font: { weight: "bold", size: 12 },
          padding: { top: 8 },
        },
      },
      y: {
        position: "left",
        beginAtZero: true,
        max: co2ScaleMax,
        ticks: { stepSize: 1, color: "#000000", font: { size: 14, weight: "bold" } },
        grid: { color: "#E5E7EB" },
        title: {
          display: false,
          text: "CO\u2082 (Metric Tons)",
          color: palette.co2Saved,
          font: { weight: "bold", size: 11 },
        },
      },
      y1: {
        position: "right",
        beginAtZero: true,
        max: deliveryScaleMax,
        ticks: { stepSize: 1000, color: "#000000", font: { size: 14, weight: "bold" } },
        grid: { drawOnChartArea: false },
        title: {
          display: false,
          text: "EV Deliveries",
          color: palette.evDeliveries,
          font: { weight: "bold", size: 11 },
        },
      },
    },
  };

  return (
    <div 
      className="w-full h-full rounded-xl bg-[#F6F5F0] p-4 sm:p-5 md:p-6 flex flex-col"
      style={{ borderColor: view.palette.co2Emission }}>
      <div className="flex shrink-0 flex-wrap justify-center gap-x-4 gap-y-3 pt-2 text-xs sm:gap-x-6 sm:text-sm lg:pt-0 mt-0 lg:mt-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-3" style={{ background: palette.co2Saved }} />
          <span className="font-semibold" style={{ color: palette.text }}>
            CO<sub>2</sub> Saved (Ton)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-3" style={{ background: palette.co2Emission }} />
          <span className="font-semibold" style={{ color: palette.text }}>
            CO<sub>2</sub> Emission (Ton)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center">
            <span className="w-6 h-0.5" style={{ background: palette.evDeliveries }} />
            <span className="w-2.5 h-2.5 rounded-full -mx-1" style={{ background: palette.evDeliveries }} />
            <span className="w-6 h-0.5" style={{ background: palette.evDeliveries }} />
          </span>
          <span className="font-semibold" style={{ color: palette.text }}>EV Deliveries</span>
        </div>
      </div>
      <div className="relative mt-2 flex-1 min-h-[9rem] sm:min-h-[10rem] md:min-h-[11rem] lg:min-h-[12rem] xl:min-h-[13rem]">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
}
