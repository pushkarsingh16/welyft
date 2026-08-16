import { Leaf } from "lucide-react";
import { palette } from "./data";

export default function FooterNote() {
  return (
    <div className="fraunces mt-6  rounded-lg px-4 sm:px-5 py-2 flex items-start justify-center sm:items-center gap-3 bg-gradient-to-br from-[#0A1F44] to-[#163B7A]">
      <div className="w-7 h-7 rounded-full bg-[#F6F5F0] flex items-center justify-center shrink-0">
        <Leaf className="w-4 h-4" style={{ color: palette.co2Emission }} />
      </div>
      <p className="text-xs sm:text-sm text-[#F6F5F0]">
        By accelerating EV adoption in our logistics operations, we are driving
        sustainable growth while significantly reducing our carbon footprint
      </p>
    </div>
  );
}
