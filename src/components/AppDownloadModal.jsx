import { X } from "lucide-react";
import { useEffect } from "react";
import { Zap, MapPin, Truck } from "lucide-react";
import logo from "../assets/welyft_logo.png";
// import googlePlay from "../assets/google-play.png";
//  import appStore from "../assets/app-store.png";

const AppDownloadModal = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <div
     className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[95%] max-w-[460px] max-h-[90vh] overflow-y-auto rounded-[24px] bg-white shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
        >
          <X size={22} />
        </button>

        {/* Main Content */}
        <div className="px-5 py-5 sm:px-7 sm:py-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Welyft"
              className="h-12 sm:h-14 object-contain"
            />
          </div>

          {/* Heading */}
          <div className="mt-4 text-center">
            <h2 className="text-3xl sm:text-[2rem] font-bold text-gray-900 leading-tight">
              Download the <span className="text-[#FFD600]">Welyft</span> App
            </h2>

            <p className="mt-3 text-sm sm:text-base leading-6 text-gray-500">
              Book deliveries, track shipments and manage your logistics
              directly from your phone.
            </p>
          </div>

          {/* ---------- PART 2 STARTS HERE ---------- */}

          {/* Feature Cards */}

          {/* Google Play Button */}

          {/* App Store Button */}

          {/* Coming Soon Badge */}

          {/* ---------- END ---------- */}
          {/* Feature Cards */}

          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
            {/* Booking */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E2] shadow-sm">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E2] shadow-sm">
                  <Zap size={20} className="sm:w-6 sm:h-6 text-[#FFD600]" />
                </div>
              </div>

              <h3 className="mt-3 h-10 flex items-center justify-center text-[15px] sm:text-[18px] font-semibold text-gray-900 leading-5">
                Instant Booking
              </h3>

              <p className="mt-1 text-[12px] sm:text-sm leading-4 text-gray-500">
                Book in just a few taps
              </p>
            </div>

            {/* Tracking */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E2] shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E2] shadow-sm">
                  <MapPin size={20} className="sm:w-6 sm:h-6 text-[#FFD600]" />
                </div>
              </div>

              <h3 className="mt-3 h-10 flex items-center justify-center text-[15px] sm:text-[18px] font-semibold text-gray-900 leading-5">
                Live Tracking
              </h3>

              <p className="mt-1 text-[12px] sm:text-sm leading-4 text-gray-500">
                Track in real time
              </p>
            </div>

            {/* Delivery */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E2] shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E2] shadow-sm">
                  <Truck size={20} className="sm:w-6 sm:h-6 text-[#FFD600]" />
                </div>
              </div>

              <h3 className="mt-3 h-10 flex items-center justify-center text-[15px] sm:text-[18px] font-semibold text-gray-900 leading-5">
                Faster Deliveries
              </h3>

              <p className="mt-1 text-[12px] sm:text-sm leading-4 text-gray-500">
                Safe & on-time
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-dashed border-gray-200"></div>

          {/* Google Play */}
          <a
            href="#"
            className="mt-4 flex h-12 sm:h-14 items-center justify-center rounded-xl bg-black text-white font-semibold"
          >
            Google Play
          </a>

          <a
            href="#"
            className="mt-4 flex h-12 sm:h-14 items-center justify-center rounded-xl bg-black text-white font-semibold"
          >
            App Store
          </a>

          {/* Coming Soon */}
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-[#FFF7E2] px-5 py-3 text-xs sm:text-sm">
              <span>✨</span>
              <span className="font-medium text-gray-700">
                Available soon on Android & iOS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadModal;
