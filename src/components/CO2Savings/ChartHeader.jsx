import { palette } from "./data";

export default function ChartHeader() {
  return (
    <div className="fraunces text-center mb-6">
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
        <p className="inline-block rounded-md bg-[#0A1F44] px-4 py-2 text-sm font-bold uppercase text-amber-300 tracking-[0.03em] sm:px-5 sm:text-xl">
          Sustainability
        </p>
      </div>
      <h1 className=" text-2xl mt-4 sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#0A1F44]">
        Sustainability <span className="">Performance</span>
      </h1>

      <p
        className=" mt-2 text-md sm:text-lg lg:text-xl"
        style={{ color: palette.text }}
      >
        Impact of EV Utilisation on Transportation Emissions (Monthly)
      </p>
    </div>
  );
}
