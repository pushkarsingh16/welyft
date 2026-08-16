import { useParams, Link } from "react-router-dom";
import b2c from "../assets/b2c.png";
import c2c from "../assets/c2c.png";
import platform from "../assets/plate.png";
import rental from "../assets/rental.png";
const servicesData = {
  b2b: {
    badge: "B2B",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&auto=format&fit=crop&q=80",
    headline: "Enterprise Deliveries That Perform",
    tagline: "Bulk moves, zero excuses",
    desc: 'From healthcare equipment to FMCG distribution, Welyft runs enterprise-grade B2B deliveries on a 100% electric fleet. You get dedicated capacity, SLA-backed reliability, and real-time CO₂ evidence for your Scope-3 ESG reporting — not estimates, not "we\'ll send a report at quarter-end." Every delivery generates a verifiable carbon savings record the moment your shipment is booked.',
    features: [
      {
        title: "B2B & bulk delivery runs",
        desc: "Scheduled, SLA-bound, enterprise-ready capacity",
      },
      {
        title: "Real-time GPS tracking",
        desc: "Know exactly where your cargo is live",
      },
      {
        title: "Electronic Proof of Delivery",
        desc: "Digital signatures + photos, auto-synced",
      },
      {
        title: "Auto-invoicing",
        desc: "No more billing delays or disputed PODs",
      },
      {
        title: "Live CO₂ ledger per booking",
        desc: "Scope-3 evidence your procurement team will love",
      },
      {
        title: "Enterprise dashboard",
        desc: "SLA enforcement, capacity visibility, full audit trail",
      },
    ],
    customers: [
      "Healthcare & Medical devices",
      "FMCG",
      "Retail & e-commerce",
      "Electronics",
      "Enterprise shippers",
    ],
    color: "#0A1F44",
    cta: "Get a B2B Quote",
  },
  b2c: {
    badge: "B2C",
    image: b2c,
    headline: "Last-Mile That Doesn't Drop the Ball",
    tagline: "Your brand, delivered right",
    desc: "Your customer placed an order. Now the most visible part of your brand is a delivery van and a driver. Welyft handles B2C last-mile and e-commerce fulfilment with multi-stop route optimization, automated customer notifications, and proof of delivery — so you're not fielding \"where's my order?\" calls all day. On a 100% EV fleet, your sustainability claims aren't just words; they're backed by real emissions data per delivery.",
    features: [
      {
        title: "Last-mile & multi-stop delivery",
        desc: "Optimised routes, fewer failed attempts",
      },
      {
        title: "AI route optimisation",
        desc: "12–20% cost reduction vs manual routing",
      },
      {
        title: "SMS/email notifications",
        desc: "Delivery ETAs auto-sent — fewer missed deliveries",
      },
      {
        title: "ePOD with photos & signatures",
        desc: "Dispute resolution made instant",
      },
      {
        title: "Live order tracking for customers",
        desc: "End-to-end visibility for you and your buyers",
      },
      {
        title: "Auto-billing & reporting",
        desc: "Clean invoicing tied directly to delivery completion",
      },
    ],
    customers: [
      "Online stores",
      "Marketplaces",
      "Retail chains",
      "Food & beverage brands",
      "Subscription box companies",
    ],
    color: "#0A1F44",
    cta: "Get a B2C Quote",
  },
  c2c: {
    badge: "C2C",
    image: c2c,
    headline: "Ship It Green, Right Now",
    tagline: "Parcel booking that's actually instant",
    desc: "Need to send a parcel across town? Welyft's C2C app lets consumers and SMEs book instant green deliveries — no fleet, no contracts, no complexity. Book, track, get proof, done. Every booking is matched to our EV fleet, meaning your parcel moves without adding to Singapore's carbon footprint. And because we measure emissions at the point of every booking, you'll know exactly how much CO₂ you saved by choosing us over a diesel courier.",
    features: [
      {
        title: "Instant booking via app",
        desc: "Book in seconds — no account manager needed",
      },
      {
        title: "Always-on EV fleet",
        desc: "Your parcel moves green, guaranteed",
      },
      {
        title: "Live parcel tracking",
        desc: "Real-time visibility from pickup to drop-off",
      },
      {
        title: "CO₂ savings per booking",
        desc: "See your environmental impact instantly",
      },
      {
        title: "ePOD & dispute resolution",
        desc: 'Digital proof, no "lost parcel" arguments',
      },
      {
        title: "Transparent pricing",
        desc: "No surprise charges — what you see is what you pay",
      },
    ],
    customers: [
      "Individual consumers",
      "SME merchants",
      "Online resellers",
      "Marketplace sellers",
      "Small retail businesses",
    ],
    color: "#0A1F44",
    cta: "Coming Soon — WeMove App",
  },
  platform: {
    badge: "Platform",
    image: platform,
    headline: "The Operating System Your Fleet Has Been Missing",
    tagline: "Stop managing your fleet on WhatsApp",
    desc: "Built for fleet operators, 3PLs, and enterprise shippers who are done with spreadsheets, missed PODs, and late invoices. The Welyft OS is one unified intelligence layer — fleet management, dispatch automation, route optimisation, ePOD, procurement, and a live CO₂ ledger — all in a single dashboard. It's the software layer that turns fragmented logistics capacity into an organised, profitable operation.",
    features: [
      {
        title: "Real-time tracking",
        desc: "Full fleet visibility at all times",
      },
      { title: "AI route sequencing", desc: "12–20% cost savings guaranteed" },
      {
        title: "Driver app with KPI dashboards",
        desc: "Attendance, performance, all in one place",
      },
      {
        title: "ePOD with photos/signatures",
        desc: "Auto-synced, dispute-proof",
      },
      {
        title: "Real-time CO₂ tracking",
        desc: "First in Singapore — live carbon ledger",
      },
      {
        title: "SLA enforcement & analytics",
        desc: "Enterprise-grade audit-ready reports",
      },
    ],
    customers: [
      "SME fleet operators",
      "Courier & logistics companies",
      "3PLs",
      "Enterprise shippers",
      "Field-service operations",
    ],
    color: "#0A1F44",
    cta: "Request a Demo",
  },
  rental: {
    badge: "Rental",
    image: rental,
    headline: "Need a Van? We've Got You Green",
    tagline: "Half-day, full-day, or monthly — on your terms",
    desc: "Whether you need a van for a one-time move or want an EV on-call for your growing team, Welyft offers flexible EV van rental. Half-day, full-day, and monthly hire options — all electric, all tracked, all with optional driver support. A smarter, greener alternative to maintaining your own fleet.",
    features: [
      {
        title: "Half-day vehicle hire",
        desc: "Perfect for short-term delivery needs",
      },
      {
        title: "Full-day vehicle hire",
        desc: "All-day capacity with EV efficiency",
      },
      {
        title: "Monthly EV van rental",
        desc: "Predictable costs for growing teams",
      },
      {
        title: "On-call driver support",
        desc: "Optional driver available on request",
      },
      {
        title: "Fluid fleet scaling",
        desc: "Scale up or down as your business needs change",
      },
      { title: "100% Electric fleet", desc: "Zero emissions, full compliance" },
    ],
    customers: [
      "Growing SMEs",
      "Event companies",
      "Moving services",
      "Retail businesses",
      "Pop-up operations",
    ],
    color: "#0A1F44",
    cta: "Check Van Availability",
  },
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = servicesData[slug];

  if (!service) {
    return (
      <div style={{ background: "#F6F5F0" }}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-8">
          <h2 className="text-3xl font-black text-[#0A1F44] mb-4">
            Service not found
          </h2>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-[#0A1F44] text-[#FFD600] font-bold"
          >
            ← Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#F6F5F0" }}>

      {/* HERO with Image */}
      <section className="pt-16 pb-0 relative overflow-hidden">
        <div className="relative h-[480px] w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.headline}
            className="w-full h-full object-cover"
            style={{
              objectPosition:
                service.badge === "B2C"
                  ? "center 30%"
                  : service.badge === "RENTAL"
                    ? "center 25%"
                    : service.badge === "PLATFORM"
                      ? "top center"
                      : service.badge === "C2C"
                        ? "center 20%"
                        : "center center",
            }}
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${service.color}f0 0%, ${service.color}aa 50%, ${service.color}55 100%)`,
            }}
          />

          {/* Content over image */}
          <div className="absolute inset-0 flex items-end px-6 lg:px-16 pb-14">
            <div className="max-w-5xl mx-auto w-full">
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 text-sm font-semibold mb-6 text-white hover:text-white transition-all"
              >
                ← All Services
              </Link>
              <div>
                <span
                  className="inline-block text-[11px] font-black tracking-normal uppercase px-3 py-1.5 rounded-full mb-4"
                  style={{ background: "#FFD600", color: "#0A1F44" }}
                >
                  {service.badge}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-3">
                  {service.headline}
                </h1>
                <p className="text-xl italic font-medium mb-6 text-white">
                  "{service.tagline}"
                </p>
                {service.badge === "C2C" ? (
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <button
                      className="px-6 py-2 rounded-xl font-black text-sm opacity-70 cursor-not-allowed"
                      style={{ background: "#FFD600", color: "#0A1F44" }}
                    >
                      {service.cta}
                    </button>
                  </a>
                ) : (
                  <a
                    href={
                      service.cta === "Request a Demo" ||
                      service.cta === "Check Van Availability"
                        ? "/#contact-form"
                        : service.badge === "B2B" || service.badge === "B2C"
                          ? "/get-quote"
                          : "/#contact"
                    }
                  >
                    <button
                      className="px-6 py-2 rounded-xl font-black text-sm transition-all hover:-translate-y-0.5"
                      style={{ background: "#FFD600", color: "#0A1F44" }}
                    >
                      {service.cta} →
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          {/* TOP ROW — About + Who It's For */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">
            <div
              className="lg:col-span-2 bg-white rounded-3xl p-8 border border-black/6 flex flex-col justify-center"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <h2 className="text-2xl font-black text-[#0A1F44] mb-4">
                About This Service
              </h2>
              <p className="text-base leading-relaxed text-[#0A1F44]">
                {service.desc}
              </p>
            </div>

            <div
              className="bg-white rounded-3xl p-7 border border-black/6 flex flex-col justify-center"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <h3 className="text-lg font-black text-[#0A1F44] mb-4">
                Who It's For
              </h3>
              <div className="flex flex-col gap-3">
                {service.customers.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-[#0A1F44]"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: service.color }}
                    />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW — What's Included + CTA/Other Services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div
              className="lg:col-span-2 bg-white rounded-3xl p-8 border border-black/6"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <h2 className="text-2xl font-black text-[#0A1F44] mb-6">
                What's Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start p-4 rounded-2xl"
                    style={{ background: "#F6F5F0" }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
                      style={{ background: "#FFD600", color: "#0A1F44" }}
                    >
                      ✓
                    </span>
                    <div>
                      <p className="font-bold text-[#0A1F44] text-sm">
                        {f.title}
                      </p>
                      <p className="text-xs text-[#0A1F44] mt-0.5 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div
                className="rounded-3xl p-6 text-center"
                style={{ background: service.color }}
              >
                <h3 className="text-lg font-black text-white mb-1.5">
                  Ready to get started?
                </h3>
                <p className="text-sm mb-4 text-white">
                  Talk to our team today.
                </p>
                {service.badge === "C2C" ? (
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <button
                      className="px-6 py-2 rounded-xl font-black text-sm opacity-70 cursor-not-allowed"
                      style={{ background: "#FFD600", color: "#0A1F44" }}
                    >
                      {service.cta}
                    </button>
                  </a>
                ) : (
                  <a
                    href={
                      service.cta === "Request a Demo" ||
                      service.cta === "Check Van Availability"
                        ? "/#contact-form"
                        : service.badge === "B2B" || service.badge === "B2C"
                          ? "/get-quote"
                          : "/#contact"
                    }
                  >
                    <button
                      className="px-6 py-2 rounded-xl font-black text-sm transition-all hover:-translate-y-0.5"
                      style={{ background: "#FFD600", color: "#0A1F44" }}
                    >
                      {service.cta} →
                    </button>
                  </a>
                )}
              </div>

              <div
                className="bg-white rounded-3xl p-3 border border-black/6 flex-1"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <h3 className="text-sm font-black uppercase tracking-widest text-[#0A1F44] mb-4">
                  Other Services
                </h3>
                <div className="flex flex-col gap-1">
                  {Object.entries(servicesData)
                    .filter(([key]) => key !== slug)
                    .map(([key, s]) => (
                      <Link
                        key={key}
                        to={`/services/${key}`}
                        className="flex items-center gap-2 text-sm font-semibold text-[#0A1F44] hover:text-[#FFD600] transition-colors py-2 border-b border-gray-50 last:border-0"
                      >
                        <span
                          className="w-14 flex items-center justify-center text-[9px] font-black tracking-widest py-1 rounded-full shrink-0"
                          style={{ background: "#0A1F44", color: "#FFD600" }}
                        >
                          {s.badge}
                        </span>
                        <span className="truncate">
                          {s.badge === "Platform"
                            ? "Welyft OS"
                            : s.headline.split(" ").slice(0, 10).join(" ")}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
