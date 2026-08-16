import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const vehicleRates = {
  Bike: { base: 8, perKm: 0.8, perStop: 0.5 },
  Van: { base: 25, perKm: 1.8, perStop: 1.5 },
};

const weightSurcharge = (kg) => {
  if (kg <= 5) return 0;
  if (kg <= 15) return 2;
  if (kg <= 30) return 5;
  return 10;
};

export default function GetQuote() {
  const [vehicle, setVehicle] = useState("Bike");
  const [distance, setDistance] = useState(5);
  const [weight, setWeight] = useState();
  const [stops, setStops] = useState(0);
  const [email, setEmail] = useState("");
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const rates = vehicleRates[vehicle];
  const baseFare = rates.base;
  const distanceFare = distance * rates.perKm;
  const stopsFare = Math.max(0, stops - 1) * rates.perStop;
  const weightFare = weightSurcharge(weight);
  const total = baseFare + distanceFare + stopsFare + weightFare;

  const breakdown = [
    { label: "Base Fare", val: baseFare },
    { label: `Distance (${distance}km × $${rates.perKm})`, val: distanceFare },
    { label: `Additional Stops (${Math.max(0, stops - 1)})`, val: stopsFare },
    { label: "Weight Surcharge", val: weightFare },
  ];

  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");

  const sendQuoteEmail = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    setLoading(true);
    emailjs
      .send(
        "service_maudind",
        "template_ed1249f",
        {
          vehicle,
          weight,
          distance,
          stops,
          pickupTime,
          dropoffTime,
          total: total.toFixed(2),
          email,
        },
        "fTLTs_oy63pz7P_Pa",
      )
      .then(() => {
        setLoading(false);
        setSuccess(true);

        Swal.fire({
          html: `
    <div style="text-align: center;">
      <div style="margin: 0 auto 20px; display: flex; height: 64px; width: 64px; align-items: center; justify-content: center; border-radius: 9999px; background-color: #FFD600;">
        <svg
          style="height: 32px; width: 32px; color: #0A1F44;"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h3 style="font-size: 24px; line-height: 32px; font-weight: bold; color: #0A1F44; margin-bottom: 12px;">
        Thank You for Your Enquiry!
      </h3>

      <p style="color: #0A1F44; line-height: 1.625; font-size: 14px; margin: 0;">
        We have received your enquiry successfully. Our
        team will review your request and contact
        you within <strong>3 business days</strong>.
      </p>
    </div>
  `,
          confirmButtonText: "Close",
          showConfirmButton: true,
          background: "#fff",
          width: "480px",
          customClass: {
            confirmButton: "swal-custom-btn",
          },
          buttonsStyling: false,
        }).then(() => {
          setEmail("");
          setShowEmailBox(false);
          setSuccess(false);
        });
      })
      .catch(() => {
        setLoading(false);
        alert("Failed to send email. Please try again.");
      });
  };

  return (
    <>
     <Helmet>
        <title>Get a Quote | Welyft EV Logistics</title>
        <meta name="description" content="Get an instant quote for eco-friendly EV logistics and delivery services across Singapore." />
        <link rel="canonical" href="https://www.welyft.org/get-quote" />
      </Helmet>
    <div className="bg-[#F6F5F0] fraunces relative z-10 flex flex-col mx-auto  max-w-8xl px-4 sm:px-5 lg:px-10 pt-10">
      <style>{`
  .swal2-popup {
    border-radius: 2rem !important;
    padding: 2.5rem 2rem !important;
  }
  .swal2-actions {
    width: 100% !important;
    margin-top: 0 !important;
  }
  .swal-custom-btn {
    background-color: #FFD600 !important;
    color: #0A1F44 !important;
    font-weight: bold !important;
    font-size: 16px !important;
    padding: 14px !important;
    border-radius: 1rem !important;
    border: none !important;
    box-shadow: none !important;
    margin-top: 20px !important;
    width: 100% !important;
  }
  .swal2-backdrop-show {
    background: rgba(0,0,0,0.5) !important;
    backdrop-filter: blur(4px) !important;
  }
`}</style>

      {/* Header */}
      <section id="quote" 
       className="pt-20 sm:pt-24 lg:pt-24 pb-0 px-5 sm:px-8 scroll-mt-20">
        <div className="mx-auto max-w-4xl  text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#0A1F44]">
            Calculate Delivery Quote
          </h2>

          <p className="mt-3 text-xs sm:text-lg lg:text-xl text-[#0A1F44]">
            Get an instant estimate for your delivery needs
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="pt-5 md:pt-8">
        <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left — Form */}
          <div className="bg-white rounded-3xl p-4 pl-6 pb-10 border border-black/8 shadow-sm">
            <h2 className="font-bold text-lg my-4" style={{ color: "#0A1F44" }}>
              Delivery Details
            </h2>

            <div className="flex flex-col gap-6">
              {/* Vehicle Type */}
              <div>
                <label
                  className="text-sm font-bold lg:my-2 block"
                  style={{ color: "#0A1F44" }}
                >
                  Vehicle Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(vehicleRates).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVehicle(v)}
                      className="py-3 text-[#0A1F44] rounded-xl text-sm font-semibold border-2 transition-all"
                      style={{
                        background:
                          vehicle === v ? "var(--navy)" : "transparent",
                        color: vehicle === v ? "var(--yellow)" : "#0A1F44",
                        borderColor:
                          vehicle === v ? "#0A1F44" : "rgba(10,31,68,0.15)",
                      }}
                    >
                      {v === "Bike" ? "🏍️" : "🚐"} {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div>
                <label
                  className="text-sm font-bold my-2 block"
                  style={{ color: "#0A1F44" }}
                >
                  Parcel Weight (kg)
                </label>
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                    {[5, 15, 30, 50].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWeight(w)}
                        className="py-2.5 w-12 lg:w-18 text-[#0A1F44] rounded-xl text-sm font-semibold border-2 transition-all"
                        style={{
                          background:
                            weight === w ? "var(--yellow)" : "transparent",
                          color: weight === w ? "#0A1F44" : "#0A1F44",
                          borderColor:
                            weight === w
                              ? "var(--yellow)"
                              : "rgba(10,31,68,0.15)",
                        }}
                      >
                        {w}kg
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value) || 0)}
                    placeholder="Custom weight"
                    className="w-full sm:w-1/2 py-3 px-5 rounded-xl text-xs text-[#0A1F44] placeholder:text-[#0A1F44] lg:text-sm border-2 outline-none focus:border-[#FFD600] transition-all"
                    style={{
                      borderColor: "rgba(10,31,68,0.15)",
                      color: "#0A1F44",
                    }}
                  />
                </div>
              </div>

              {/* Distance and Additional Stops */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label className="text-sm  text-[#0A1F44] font-bold lg:my-2 block">
                    Distance (km)
                  </label>
                  <div className="flex items-center mt-1 ">
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={distance === 0 ? "" : distance}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          setDistance(0);
                          return;
                        }
                        setDistance(parseInt(val.replace(/^0+/, "")) || 0);
                      }}
                      placeholder="Enter distance"
                      className="w-fit px-4 py-3 rounded-xl border-2 text-sm outline-none focus:border-[#FFD600] transition-all"
                      style={{
                        borderColor: "rgba(10,31,68,0.15)",
                        color: "#0A1F44",
                      }}
                    />
                    <span
                      className="shrink-0 px-4 py-3 rounded-xl font-bold text-sm"
                      style={{
                        background: "var(--navy)",
                        color: "#0A1F44",
                      }}
                    >
                      km
                    </span>
                  </div>
                </div>

                <div className="w-1/2">
                  <label
                    className="text-sm font-bold mb-2 lg:my-2 block"
                    style={{ color: "#0A1F44" }}
                  >
                    Additional Stops
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setStops(Math.max(0, stops - 1))}
                      className="w-10 h-10 rounded-xl border-2 text-lg font-bold flex items-center justify-center transition-all hover:border-[#FFD600]"
                      style={{
                        borderColor: "rgba(10,31,68,0.15)",
                        color: "#0A1F44",
                      }}
                    >
                      −
                    </button>
                    <span
                      className="fraunces text-3xl font-medium w-8 text-center"
                      style={{ color: "#0A1F44" }}
                    >
                      {stops}
                    </span>
                    <button
                      onClick={() => setStops(stops + 1)}
                      className="w-10 h-10 rounded-xl border-2 text-lg font-bold flex items-center justify-center transition-all hover:border-[#FFD600]"
                      style={{
                        borderColor: "rgba(10,31,68,0.15)",
                        color: "#0A1F44",
                      }}
                    >
                      +
                    </button>
                    <span
                      className="text-sm  block w-full md:w-auto"
                      style={{ color: "#0A1F44" }}
                    >
                      Per Stop Cost
                    </span>
                  </div>
                </div>
              </div>

              {/* Pickup & Dropoff Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-sm font-bold px-1 lg:my-2 block"
                    style={{ color: "#0A1F44" }}
                  >
                    Pick Up Time
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3 pr-12 mt-2 rounded-xl border text-sm outline-none focus:border-[#FFD600] transition-all appearance-none bg-no-repeat bg-[right_26px_center]"
                    style={{
                      borderColor: "rgba(10,31,68,0.15)",
                      color: "#0A1F44",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%230A1F44' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    }}
                  >
                    <option value="">Select time</option>
                    {[
                      "09:00 AM",
                      "10:00 AM",
                      "11:00 AM",
                      "12:00 PM",
                      "01:00 PM",
                      "02:00 PM",
                      "03:00 PM",
                      "04:00 PM",
                      "05:00 PM",
                      "06:00 PM",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="text-sm px-2 font-bold lg:my-2 block"
                    style={{ color: "#0A1F44" }}
                  >
                    Drop Off Time
                  </label>
                  <select
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="w-full px-4 py-3 pr-12 mt-2 rounded-xl border text-sm outline-none focus:border-[#FFD600] transition-all appearance-none bg-no-repeat bg-[right_26px_center]"
                    style={{
                      borderColor: "rgba(10,31,68,0.15)",
                      color: "#0A1F44",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%230A1F44' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    }}
                  >
                    <option value="">Select time</option>
                    {[
                      "09:00 AM",
                      "10:00 AM",
                      "11:00 AM",
                      "12:00 PM",
                      "01:00 PM",
                      "02:00 PM",
                      "03:00 PM",
                      "04:00 PM",
                      "05:00 PM",
                      "06:00 PM",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Estimated Bill */}
          <div className="flex flex-col justify-between  gap-5 sticky top-24 bg-[#F6F5F0] ">
            {/* Bill Card */}
            <div className="bg-white rounded-3xl p-4  border border-black/8 shadow-sm">
              {/* Top */}
              <div className="px-8 py-5 flex justify-between items-center bg-white">
                <h2 className="font-bold text-lg" style={{ color: "#0A1F44" }}>
                  Estimated Bill
                </h2>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,214,0,0.2)",
                    color: "var(--yellow)",
                  }}
                >
                  Instant Quote
                </span>
              </div>

              {/* Breakdown */}
              <div className="bg-white grid grid-cols-2 gap-6 px-8 py-0">
                {breakdown.map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-4 ${i !== breakdown.length - 1 ? "border-b border-black/6" : ""}`}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ color: "#0A1F44" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-base font-bold"
                      style={{
                        color: item.val > 0 ? "#0A1F44" : "#CBD5E0",
                      }}
                    >
                      {item.val > 0 ? `$${item.val.toFixed(2)}` : "—"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="px-8 py-8 flex justify-between items-center bg-white">
                <div>
                  <p
                    className="text-base font-bold uppercase tracking-normal mb-1"
                    style={{ color: "#0A1F44" }}
                  >
                    Total Estimate
                  </p>
                  <p className="text-sm" style={{ color: "#0A1F44" }}>
                    {vehicle} · {distance}km · {weight}kg
                  </p>
                </div>
                <span
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ color: "#0A1F44" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Vehicle info */}
            <div className="bg-white rounded-2xl p-3 border border-black/8">
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#0A1F44" }}
              >
                Selected Vehicle
              </p>
              <div className="flex items-center gap-0 lg:gap-4">
                <span className="text-3xl">
                  {vehicle === "Bike" ? "🏍️" : "🚐"}
                </span>
                <div className="w-full flex justify-between items-center">
                  <div>
                    <p
                      className="text-xl font-bold "
                      style={{ color: "#0A1F44" }}
                    >
                      {vehicle}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-sm md:text-base font-medium"
                      style={{ color: "#0A1F44" }}
                    >
                      Base{" "}
                      <strong style={{ color: "#0A1F44" }}>
                        ${rates.base}
                      </strong>{" "}
                      ·
                      <strong style={{ color: "#0A1F44" }}>
                        {" "}
                        ${rates.perKm}
                      </strong>
                      /km ·
                      <strong style={{ color: "#0A1F44" }}>
                        {" "}
                        ${rates.perStop}
                      </strong>
                      /extra stop
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!showEmailBox ? (
              <button
                onClick={() => setShowEmailBox(true)}
                className="w-full py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg "
                style={{
                  background: "white",
                  color: "#0A1F44",
                }}
              >
                📧 Request Detailed Quote via Email →
              </button>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-black/8">
                <label
                  className="text-sm font-bold block mb-3"
                  style={{ color: "#0A1F44" }}
                >
                  Your Email Address
                </label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-xl border text-[#0A1F44] placeholder:text-[#0A1F44]  text-sm outline-none focus:border-[#FFD600] transition-all"
                    style={{
                      borderColor: "rgba(10,31,68,0.15)",
                      color: "var(--navy)",
                    }}
                  />
                  <button
                    onClick={sendQuoteEmail}
                    disabled={loading}
                    className="px-6 text-[#0A1F44] rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60"
                    style={{
                      background: "var(--navy)",
                      color: "#0A1F44",
                    }}
                  >
                    {loading ? "Sending..." : success ? "Sent ✓" : "Send"}
                  </button>
                </div>
                {success && (
                  <p
                    className="text-xs mt-3 font-semibold"
                    style={{ color: "#16a34a" }}
                  >
                    ✅ Quote sent to your email successfully!
                  </p>
                )}
              </div>
            )}

            {/* <button
              onClick={() => setShowAppModal(true)}
              className="w-full h-14 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300"
              style={{
                background: "#FFD600",
                color: "#0A1F44",
                border: "2px solid #FFD600",
              }}
            >
              📱 Download Welyft App
            </button> */}

            {/* Disclaimer */}
            <p
              className="text-xs text-center mb-14 px-4"
              style={{ color: "#0A1F44" }}
            >
              * This is an estimated quote. Final price may vary based on actual
              delivery conditions. GST not included.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
