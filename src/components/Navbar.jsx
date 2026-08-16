import React, { useState, useRef } from "react";
import logo from "../assets/welyft_logo.png";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

const serviceLinks = [
  {
    label: "B2B Enterprise Logistics",
    path: "/services/b2b",
    badge: "B2B",
    desc: "Fleet-powered bulk delivery",
  },
  {
    label: "B2C Last-Mile Fulfilment",
    path: "/services/b2c",
    badge: "B2C",
    desc: "Fast last-mile delivery",
  },
  {
    label: "C2C On-Demand App",
    path: "/services/c2c",
    badge: "C2C",
    desc: "Instant parcel booking",
  },
  {
    label: "Welyft OS Platform",
    path: "/services/platform",
    badge: "Platform",
    desc: "Fleet management SaaS",
  },
  {
    label: "EV Van Rental",
    path: "/services/rental",
    badge: "Rental",
    desc: "Flexible EV van hire",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 200);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    setOpen(false);

    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(id), 400);
    }
  };

  const handleLogoClick = () => {
    setOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 400);
    }
  };

  return (
    <nav className="fraunces w-full fixed top-10 left-0 z-[999] pl-0 pr-2 sm:px-4 md:px-8 bg-white shadow-md h-17 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" onClick={handleLogoClick}>
        <div className="flex items-center -ml-2 sm:ml-0">
          <img
            src={logo}
            className="h-16 w-auto object-contain"
            alt="welyft_logo"
          />
        </div>
      </Link>

      {/* DESKTOP LINKS */}
      <div className="hidden xl:flex font-bold mr-4 text-xl gap-6 items-center">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex flex-col items-center text-[#0a1f44]"
        >
          Home
          <span className="w-0 h-0.5 bg-[#FFD600] mt-1 transition-all duration-300 group-hover:w-full" />
        </Link>

        <a
          href="/#about"
          onClick={(e) => handleSectionClick(e, "about")}
          className="group flex flex-col items-center text-[#0a1f44]"
        >
          About
          <span className="w-0 h-0.5 bg-[#FFD600] mt-1 transition-all duration-300 group-hover:w-full" />
        </a>

        {/* SERVICES DROPDOWN */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex flex-col items-center focus:outline-none">
            <span className="flex items-center gap-1.5 text-[#0a1f44]">
              Services
              <FaChevronDown
                className={`text-sm transition-transform text-[#0a1f44] duration-300 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </span>
            <span
              className={`h-0.5 bg-[#FFD600] mt-1 transition-all duration-300 ${
                servicesOpen ? "w-full" : "w-0"
              }`}
            />
          </button>

          {/* DROPDOWN */}
          {servicesOpen && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl overflow-hidden z-50 text-[#0a1f44]"
              style={{
                boxShadow: "0 20px 60px rgba(10,31,68,0.15)",
                border: "1px solid rgba(10,31,68,0.08)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dropdown header */}
              <div className="px-5 py-3 bg-[#0A1F44]">
                <p className="text-xs font-black uppercase tracking-widest text-[#FFD600]">
                  Our Services
                </p>
              </div>

              {/* Links */}
              <div className="bg-white">
                {serviceLinks.map((s, i) => (
                  <Link
                    key={i}
                    to={s.path}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#F6F5F0] transition-all border-b border-gray-50 last:border-0 group"
                  >
                    <span
                      className="text-[9px] font-black flex justify-center tracking-widest px-2 py-1 rounded-full shrink-0 w-15"
                      style={{ background: "#0A1F44", color: "#FFD600" }}
                    >
                      {s.badge}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#0A1F44] group-hover:text-[#FFD600] transition-colors leading-tight">
                        {s.label}
                      </p>
                      <p className="text-xs text-[#0A1F44] mt-0.5">{s.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-[#F6F5F0] border-t border-gray-100">
                <a
                  href="/#services"
                  onClick={(e) => {
                    handleSectionClick(e, "services");
                    setServicesOpen(false);
                  }}
                  className="text-xs font-bold text-[#0A1F44] hover:text-[#FFD600] transition-colors"
                >
                  View All Services →
                </a>
              </div>
            </div>
          )}
        </div>

        <a
          href="/#sustainability"
          onClick={(e) => handleSectionClick(e, "sustainability")}
          className="group flex flex-col items-center text-[#0a1f44]"
        >
          Sustainability
          <span className="w-0 h-0.5 bg-[#FFD600] mt-1 transition-all duration-300 group-hover:w-full" />
        </a>

        <a
          href="/#blog"
          onClick={(e) => handleSectionClick(e, "blog")}
          className="group flex flex-col items-center text-[#0a1f44]"
        >
          Blog
          <span className="w-0 h-0.5 bg-[#FFD600] mt-1 transition-all duration-300 group-hover:w-full" />
        </a>

        <Link
          to="/careers"
          className="group flex flex-col items-center text-[#0a1f44]"
        >
          Careers
          <span className="w-0 h-0.5 bg-[#FFD600] mt-1 transition-all duration-300 group-hover:w-full" />
        </Link>

        <a
          href="/#contact-form"
          onClick={(e) => handleSectionClick(e, "contact-form")}
          className="group flex flex-col items-center text-[#0a1f44]"
        >
          Contact Us
          <span className="w-0 h-0.5 bg-[#FFD600] mt-1 transition-all duration-300 group-hover:w-full" />
        </a>
      </div>

      <Link to="/get-quote">
        <button className="hidden xl:block bg-[#FFD600] font-bold cursor-pointer px-7 py-3 rounded-2xl shadow-base shadow-yellow-400/50 mr-10 hover:shadow-yellow-300 transition-all duration-300 text-[#0a1f44]">
          Get Quote
        </button>
      </Link>

      {/* MOBILE ICON */}
      <div
        onClick={() => setOpen(!open)}
        className="xl:hidden text-2xl sm:text-3xl cursor-pointer text-[#0A1F44]"
      >
        {open ? <FaTimes /> : <FaBars />}
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed top-9 left-0 w-full h-auto min-h-[60vh] w-full bg-white z-[999] px-6 py-5 xl:hidden flex flex-col animate-slideIn rounded-b-3xl shadow-xl overflow-y-auto">

          <div className="flex items-center justify-between pb-4 border-b border-gray-200 -ml-2">
            <Link to="/" onClick={handleLogoClick} className="-ml-5" >
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  className="h-14 w-auto object-contain"
                  alt="welyft_logo"
                />
              </div>
            </Link>

            <FaTimes
              onClick={() => setOpen(false)}
              className="text-2xl text-[#0A1F44] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4 mt-7 text-lg font-semibold text-[#0a1f44]">
            <a href="/#about" onClick={(e) => handleSectionClick(e, "about")}>
              About
            </a>

            {/* Mobile Services */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center gap-2 w-full text-[#0a1f44]"
              >
                Services
                <FaChevronDown
                  className={`text-lg text-[#0a1f44] transition-transform duration-300 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="mt-4 ml-2 flex flex-col gap-3 border-l-2 border-[#FFD600] pl-4">
                  {serviceLinks.map((s, i) => (
                    <Link
                      key={i}
                      to={s.path}
                      onClick={() => {
                        setOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="text-[8px] w-12 flex justify-center font-black px-2 py-1 rounded-full shrink-0"
                        style={{ background: "#0A1F44", color: "#FFD600" }}
                      >
                        {s.badge}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#0A1F44] leading-tight">
                          {s.label}
                        </p>
                        <p className="text-[11px] leading-4 text-[#0A1F44]">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/#sustainability"
              className="text-[#0a1f44]"
              onClick={(e) => handleSectionClick(e, "sustainability")}
            >
              Sustainability
            </a>

            <a
              href="/#blog"
              className="text-[#0a1f44]"
              onClick={(e) => handleSectionClick(e, "blog")}
            >
              Blog
            </a>

            <Link
              to="/careers"
              className="text-[#0a1f44]"
              onClick={() => setOpen(false)}
            >
              Careers
            </Link>

            <a
              href="/#contact-form"
              className="text-[#0a1f44]"
              onClick={(e) => handleSectionClick(e, "contact-form")}
            >
              Contact Us
            </a>
          </div>

          <Link to="/get-quote">
            <button className="fraunces mt-6 bg-[#FFD600] text-[#0a1f44] py-2.5 rounded-xl text-base font-semibold shadow-lg w-full">
              Get Quote
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
