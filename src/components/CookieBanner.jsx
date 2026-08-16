import { useState, useEffect } from "react";

const cookieCategories = [
  {
    id: "essential",
    label: "Essential Cookies",
    count: 8,
    required: true,
    description:
      "These cookies are necessary to the core functionality of our website and some of its features, such as access to secure areas.",
  },
  {
    id: "performance",
    label: "Performance and Functionality Cookies",
    count: 16,
    required: false,
    description:
      "These cookies are used to enhance the performance and functionality of our websites but are nonessential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.",
  },
  {
    id: "analytics",
    label: "Analytics and Customization Cookies",
    count: 29,
    required: false,
    description:
      "These cookies collect information that can help us understand how our websites are being used. This information can also be used to measure effectiveness in our marketing campaigns or to curate a personalized site experience for you.",
  },
  {
    id: "advertising",
    label: "Advertising Cookies",
    count: 32,
    required: false,
    description:
      "These cookies are used to make advertising messages more relevant to you. They prevent the same ad from continuously reappearing, ensure that ads are properly displayed for advertisers, and in some cases select advertisements that are based on your interests.",
  },
  {
    id: "social",
    label: "Social Networking Cookies",
    count: 0,
    required: false,
    description:
      "These cookies enable you to share our website's content through third-party social networks and other websites. These cookies may also be used for advertising purposes.",
  },
  {
    id: "unclassified",
    label: "Unclassified Cookies",
    count: 0,
    required: false,
    description:
      "These are cookies that have not yet been categorized. We are in the process of classifying these cookies with the help of their providers.",
  },
];

const Toggle = ({ checked, onChange, disabled }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => !disabled && onChange(!checked)}
    className="relative shrink-0 w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none"
    style={{
      background: disabled
        ? "rgba(10,31,68,0.25)"
        : checked
        ? "var(--navy, #0A1F44)"
        : "rgba(10,31,68,0.15)",
      cursor: disabled ? "not-allowed" : "pointer",
    }}
  >
    <span
      className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
      style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
    />
  </button>
);

const PreferencesModal = ({ onClose, onSave }) => {
  const [prefs, setPrefs] = useState({
    essential: true,
    performance: true,
    analytics: true,
    advertising: true,
    social: false,
    unclassified: false,
  });

  const toggle = (id, val) => setPrefs((p) => ({ ...p, [id]: val }));

  const handleDeclineAll = () => {
    const declined = {};
    cookieCategories.forEach((c) => (declined[c.id] = c.required));
    onSave(declined);
  };

  const handleAllowAll = () => {
    const all = {};
    cookieCategories.forEach((c) => (all[c.id] = true));
    onSave(all);
  };

  const handleSave = () => onSave(prefs);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl flex flex-col"
        style={{
          maxHeight: "85vh",
          border: "1px solid rgba(10,31,68,0.1)",
        }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "rgba(10,31,68,0.08)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold" style={{ color: "var(--navy, #0A1F44)" }}>
              Preferences
            </h2>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-lg font-light transition-colors hover:bg-gray-100"
              style={{ color: "var(--slate, #4A5568)" }}
            >
              ×
            </button>
          </div>
          <p className="text-xs leading-relaxed mt-2" style={{ color: "var(--slate, #4A5568)" }}>
            We use different types of cookies to optimize your experience on our website. You may choose
            which types of cookies to allow and can change your preferences at any time. The choices you make
            are saved under the key <span className="font-mono font-semibold">WELYFT_COOKIE_CONSENT</span> for
            up to 12 months. You can learn more by visiting our{" "}
            <a
              href="/cookie-policy"
              className="underline font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "var(--navy, #0A1F44)" }}
            >
              Cookie Policy
            </a>
            .
          </p>
        </div>

        {/* Scrollable categories */}
        <div className="overflow-y-auto flex-1 px-6 py-2">
          {cookieCategories.map((cat, idx) => (
            <div
              key={cat.id}
              className="py-4"
              style={{
                borderBottom:
                  idx < cookieCategories.length - 1
                    ? "1px solid rgba(10,31,68,0.07)"
                    : "none",
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span
                  className="text-sm font-bold"
                  style={{
                    color: cat.required
                      ? "rgba(10,31,68,0.4)"
                      : "var(--navy, #0A1F44)",
                  }}
                >
                  {cat.label}{" "}
                  <span
                    className="font-normal"
                    style={{ color: "rgba(10,31,68,0.4)" }}
                  >
                    ({cat.count})
                  </span>
                </span>
                <Toggle
                  checked={cat.required ? true : prefs[cat.id]}
                  onChange={(val) => toggle(cat.id, val)}
                  disabled={cat.required}
                />
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--slate, #4A5568)" }}
              >
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div
          className="px-6 py-4 flex gap-3 border-t"
          style={{ borderColor: "rgba(10,31,68,0.08)" }}
        >
          <button
            onClick={handleDeclineAll}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:-translate-y-0.5"
            style={{ borderColor: "rgba(10,31,68,0.2)", color: "var(--slate, #4A5568)" }}
          >
            Decline All
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:-translate-y-0.5"
            style={{ borderColor: "var(--navy, #0A1F44)", color: "var(--navy, #0A1F44)" }}
          >
            Save Preferences
          </button>
          <button
            onClick={handleAllowAll}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
            style={{ background: "var(--navy, #0A1F44)", color: "var(--yellow, #FFD600)" }}
          >
            Allow All
          </button>
        </div>
      </div>
    </div>
  );
};

const CookieBanner = () => {
  const [show, setShow] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("welyft_cookies");
    if (!saved) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("welyft_cookies", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("welyft_cookies", "declined");
    setShow(false);
  };

  const savePrefs = (prefs) => {
    localStorage.setItem("welyft_cookies", JSON.stringify(prefs));
    setShowPrefs(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Preferences Modal */}
      {showPrefs && (
        <PreferencesModal
          onClose={() => setShowPrefs(false)}
          onSave={savePrefs}
        />
      )}

      {/* Cookie Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] px-4 py-4 sm:px-8"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      >
        <div
          className="max-w-5xl mx-auto bg-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl"
          style={{ border: "1px solid rgba(10,31,68,0.1)" }}
        >
          {/* Icon */}
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "rgba(255,214,0,0.15)" }}
          >
            🍪
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="font-bold text-sm mb-1" style={{ color: "var(--navy, #0A1F44)" }}>
              We use cookies
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--slate, #4A5568)" }}>
              We use cookies to improve your browsing experience, analyze site traffic, and personalize
              content. By clicking "Accept", you consent to our use of cookies in accordance with our{" "}
              <a
                href="/privacy-policy"
                className="underline font-semibold hover:opacity-70 transition-opacity"
                style={{ color: "var(--navy, #0A1F44)" }}
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setShowPrefs(true)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:-translate-y-0.5"
              style={{ borderColor: "rgba(10,31,68,0.2)", color: "var(--slate, #4A5568)" }}
            >
              Preferences
            </button>
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{ background: "var(--navy, #0A1F44)", color: "var(--yellow, #FFD600)" }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
