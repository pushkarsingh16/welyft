import React from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesCard = ({
  tag,
  Icon,
  title,
  description,
  features = [],
  highlight,
  ctaLabel,
  slug,
}) => {
  return (
    <article className="group flex h-full min-h-[440px] flex-col rounded-[28px] border border-slate-200 bg-gradient-to-b from-[#0A1F44] to-[#14315F] p-6 shadow-[0_18px_45px_-25px_rgba(10,31,68,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-18px_rgba(10,31,68,0.45)] sm:min-h-[470px] sm:p-7 lg:min-h-[510px]">

      {/* Title — fixed min-height so hr/features align across cards regardless of 1 or 2 line titles */}
      <h3 className="min-h-[64px] text-2xl font-bold leading-tight text-white sm:min-h-[72px]">
        {title}
      </h3>

      <hr className="mt-4 mb-5 border-slate-200/30" />

      {/* Feature list */}
      <ul className="space-y-3.5">
        {features.map((f, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-[13px] text-white md:text-[15px]"
          >
            <Check
              className="h-4 w-4 shrink-0 text-emerald-400"
              strokeWidth={3}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      {/* Highlight pill */}
      {highlight && (
        <div className="mt-3 flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-left md:px-4">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="text-xs font-semibold leading-snug text-[#0A1F44] md:text-[13px]">
            {highlight}
          </span>
        </div>
      )}

      {/* CTA Button */}
      {slug && (
        <Link
          to={`/services/${slug}`}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition-all hover:-translate-y-0.5"
          style={{ background: "#FFD600", color: "#0A1F44" }}
        >
          {ctaLabel} →
        </Link>
      )}
    </article>
  );
};

export default ServicesCard;
