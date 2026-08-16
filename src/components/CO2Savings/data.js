const defaultMonthlyData = [
  { month: "Jan", co2SavedTon: 2.1, co2EmissionTon: 5.8, evDeliveries: 1100, fuelSavedLiters: 42000 },
  { month: "Feb", co2SavedTon: 2.4, co2EmissionTon: 5.2, evDeliveries: 1280, fuelSavedLiters: 45600 },
  { month: "Mar", co2SavedTon: 2.8, co2EmissionTon: 4.9, evDeliveries: 1460, fuelSavedLiters: 49200 },
  { month: "Apr", co2SavedTon: 3.4, co2EmissionTon: 4.3, evDeliveries: 1780, fuelSavedLiters: 55600 },
  { month: "May", co2SavedTon: 3.9, co2EmissionTon: 3.8, evDeliveries: 2100, fuelSavedLiters: 62000 },
  { month: "Jun", co2SavedTon: 4.2, co2EmissionTon: 3.5, evDeliveries: 2320, fuelSavedLiters: 66400 },
  { month: "Jul", co2SavedTon: 4.5, co2EmissionTon: 3.1, evDeliveries: 2560, fuelSavedLiters: 71200 },
  { month: "Aug", co2SavedTon: 4.9, co2EmissionTon: 2.8, evDeliveries: 2820, fuelSavedLiters: 76400 },
  { month: "Sep", co2SavedTon: 5.1, co2EmissionTon: 2.5, evDeliveries: 3010, fuelSavedLiters: 80200 },
  { month: "Oct", co2SavedTon: 5.4, co2EmissionTon: 2.2, evDeliveries: 3250, fuelSavedLiters: 85000 },
  { month: "Nov", co2SavedTon: 5.8, co2EmissionTon: 1.9, evDeliveries: 3480, fuelSavedLiters: 89600 },
  { month: "Dec", co2SavedTon: 6.2, co2EmissionTon: 1.5, evDeliveries: 3750, fuelSavedLiters: 95000 },
];

const defaultPalette = {
  co2Saved: "#ffd600",
  co2Emission: "#0a1f44",
  evDeliveries: "#059669",
  text: "#0A1F44",
  pie: ["#ffd600", "#0a1f44"],
};

const normalizeMonthlyData = (items = defaultMonthlyData) =>
  (Array.isArray(items) ? items : []).map((item) => ({
    month: item.month ?? item.label ?? "",
    co2SavedTon: Number(item.co2SavedTon ?? item.co2Saved ?? 0),
    co2EmissionTon: Number(item.co2EmissionTon ?? item.co2Emission ?? 0),
    evDeliveries: Number(item.evDeliveries ?? item.ev ?? 0),
    fuelSavedLiters: Number(item.fuelSavedLiters ?? item.fuelSaved ?? 0),
  }));

const sumMonthly = (items, key) =>
  Number(items.reduce((total, item) => total + (Number(item[key]) || 0), 0).toFixed(2));

export function createCO2SavingsView(
  rawMonthlyData = defaultMonthlyData,
  year = 2024,
  paletteOverrides = {}
) {
  const monthlyData = normalizeMonthlyData(rawMonthlyData);
  const totalCO2SavedTon = sumMonthly(monthlyData, "co2SavedTon");
  const totalCO2EmissionTon = sumMonthly(monthlyData, "co2EmissionTon");
  const totalEVDeliveries = sumMonthly(monthlyData, "evDeliveries");
  const dieselSavedLiters = sumMonthly(monthlyData, "fuelSavedLiters");

  const summary = {
    totalCO2SavedTon,
    totalEmissionReducedTon: totalCO2SavedTon,
    totalEVDeliveries,
    treesEquivalent: Math.round(totalCO2SavedTon / 0.02177),
    dieselSavedLiters,
  };

  const palette = { ...defaultPalette, ...paletteOverrides };

  const apiResponse = {
    year,
    summary,
    monthlyData,
    emissionData: [
      { category: "CO2 Saved", value: totalCO2SavedTon },
      { category: "CO2 Emission", value: totalCO2EmissionTon },
    ],
    chartConfig: {
      lineChart: { label: "Monthly CO2 Saved (Ton)", dataKey: "co2SavedTon", borderColor: "#EAB308" },
      barChart: { label: "EV Deliveries", dataKey: "evDeliveries", backgroundColor: "#4CAF50" },
      pieChart: { label: "CO2 Reduction Ratio", colors: ["#4CAF50", "#EF4444"] },
    },
  };

  const chartData = monthlyData.map((d) => ({
    month: d.month,
    co2Saved: d.co2SavedTon,
    co2Emission: d.co2EmissionTon,
    ev: d.evDeliveries,
  }));

  const pieData = apiResponse.emissionData;

  const totalImpact = [
    {
      icon: "co2",
      label: "Total CO2 Saved",
      value: `${summary.totalCO2SavedTon}`,
      sub: "Metric Tons",
    },
    {
      icon: "tree",
      label: "Equivalent to Planting",
      value: `~${summary.treesEquivalent.toLocaleString()}`,
      sub: "Trees",
    },
    {
      icon: "fuel",
      label: "Equivalent to Avoiding",
      value: `~${summary.dieselSavedLiters.toLocaleString()}`,
      sub: "Liters of Diesel",
    },
    {
      icon: "car",
      label: "Total EV Deliveries",
      value: `~${summary.totalEVDeliveries.toLocaleString()}`,
      sub: "Deliveries this Year",
    },
  ];

  const avgFuelPerDelivery =
    totalEVDeliveries > 0 ? dieselSavedLiters / totalEVDeliveries : 0;

  const deliveriesReplaced = {
    totalReplaced: summary.totalEVDeliveries,
    avgFuelPerDelivery: avgFuelPerDelivery.toFixed(2),
    monthly: monthlyData.map((d) => ({ month: d.month, replaced: d.evDeliveries })),
    peakMonth: monthlyData.reduce((a, b) => (b.evDeliveries > a.evDeliveries ? b : a)),
  };

  return { apiResponse, palette, chartData, pieData, totalImpact, deliveriesReplaced };
}

export const DEFAULT_CO2_SAVINGS_VIEW = createCO2SavingsView();

export const {
  apiResponse,
  palette,
  chartData,
  pieData,
  totalImpact,
  deliveriesReplaced,
} = DEFAULT_CO2_SAVINGS_VIEW;
