import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import rabbitBadge from "../assets/rabbitbadge.png";

export default function FloatingBadge() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

   if (location.pathname !== "/") return null;
   if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[900]">
      <div className="relative inline-block">
        <img
          src={rabbitBadge}
          alt="Mid-Autumn Festival"
          onClick={() => navigate("/mid-autumn-festival")}
          className="
            h-26 w-26
            sm:h-32 sm:w-32
            md:h-36 md:w-36
            rounded-full
            object-cover
            cursor-pointer
            block
          "
        />

        {/* <button
          onClick={() => setVisible(false)}
          className="
            absolute
            top-5
            right-10
            flex
            h-6
            w-6
            items-center
            justify-center
            hover:scale-110
            transition-all
            z-10
          "
        >
          <FaTimes className="text-white text-sm md:text-xl" />
        </button> */}
      </div>
    </div>
  );
}
