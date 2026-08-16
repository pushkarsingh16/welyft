import { createCO2SavingsView } from "./data";

const CO2_SAVINGS_API_URL =
  import.meta.env.VITE_CO2_SAVINGS_API_URL || "/api/co2-savings";

export async function fetchCO2SavingsView(url = CO2_SAVINGS_API_URL) {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const monthlyData = payload.monthlyData ?? payload.data?.monthlyData ?? payload.monthly ?? null;

    if (!Array.isArray(monthlyData) || monthlyData.length === 0) {
      throw new Error("No monthly CO2 data was returned by the backend.");
    }

    return createCO2SavingsView(
      monthlyData,
      payload.year ?? 2024,
      payload.palette ?? {}
    );
  } catch (error) {
    console.warn("Using the local CO2Savings fallback data.", error);
    return createCO2SavingsView();
  }
}

export { CO2_SAVINGS_API_URL };
