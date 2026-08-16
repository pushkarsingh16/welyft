import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import popup from "../assets/poppp.png";

export default function MooncakePopup() {
  const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

   useEffect(() => {
    if (location.pathname === "/") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExplore = () => {
    setOpen(false);
     navigate("/mid-autumn-festival");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-fit">
        {/* Popup Image */}
        <img
          src={popup}
          alt="Mooncake Festival"
          className="max-w-[92vw] max-h-[88vh] object-contain select-none block"
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="
            absolute
            top-[11%]
            right-[14%]
            z-50
            flex
            h-8
            w-8
            md:h-10
            md:w-10
            items-center
            justify-center
            transition-all
            hover:scale-110
          "
        >
          <FaTimes className="text-white text-2xl md:text-3xl" />
        </button>

        {/* Explore Now Button - responsive */}
        <button
          onClick={handleExplore}
          className="
            absolute
            bottom-[25%]
            left-1/2
            -translate-x-1/2
            z-50
            px-3
            py-1
            text-xs
            sm:px-4
            sm:py-1.5
            sm:text-sm
            md:px-5
            md:py-2
            md:text-base
            rounded-full
            bg-transparent
            border-2
            border-[#FFCC00]
            text-[#FFCC00]
            font-bold
            transition-all
            hover:text-red-500
            hover:bg-[#FFD600]
          "
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}