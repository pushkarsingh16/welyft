import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaUser, FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";

export default function BusinessQuoteForm() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "96f12864-aef1-4020-8831-e8d5b5335174", // Business Quote form ki access key daalo
          subject: "New Business Quote Request - Welyft",
          from_name: "Welyft Business Quote Form",
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting business quote:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent transition-all text-[#0A1F44] placeholder:text-gray-400";
  const labelClass = "block text-sm font-bold text-[#0A1F44] mb-2";

  if (submitted) {
    return (
      <div className="fraunces bg-[#F6F5F0] min-h-screen flex items-center justify-center pt-24 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-[28px] shadow-[0_18px_45px_-25px_rgba(10,31,68,0.35)] border border-black/5 p-10 md:p-12 text-center">
          <div className="h-20 w-20 rounded-full bg-[#0A1F44] flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-4xl text-[#FFD600]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0A1F44] mb-3">
            Request Received!
          </h1>
          <p className="text-[#0A1F44]/70 mb-8 leading-relaxed">
            Thanks for reaching out. Our business team will get back to you
            with a tailored quote shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#FFD600] text-[#0A1F44] font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-yellow-300/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fraunces bg-[#F6F5F0] min-h-screen pt-36 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="inline-block text-sm sm:text-xl text-[#FFD600] bg-[#0A1F44] tracking-[0.03em] px-5 py-2 rounded-md font-bold uppercase mb-6">
            Business Deliveries
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-[#0A1F44]">
            Business Quote Request
          </h1>
          <p className="text-[#0A1F44]/70 mt-4 max-w-xl mx-auto leading-relaxed">
            Share your details and our business team will get back to you
            with a tailored quote for your Mid-Autumn deliveries.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[28px] shadow-[0_18px_45px_-25px_rgba(10,31,68,0.35)] border border-black/5 p-6 sm:p-10 space-y-6"
        >
          <div>
            <label className={labelClass}>
              <FaBuilding className="inline text-[#FFD600] mr-1.5 mb-0.5" />
              Company Name *
            </label>
            <input
              required
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., Marina Bay Hotel"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <FaUser className="inline text-[#FFD600] mr-1.5 mb-0.5" />
              Contact Person Name *
            </label>
            <input
              required
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                <FaEnvelope className="inline text-[#FFD600] mr-1.5 mb-0.5" />
                Email *
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                <FaPhone className="inline text-[#FFD600] mr-1.5 mb-0.5" />
                Phone Number *
              </label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+65 XXXX XXXX"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Message *</label>
            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us about your Mid-Autumn delivery needs — order volume, delivery locations, mooncake type, preferred dates, etc."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#FFD600] text-[#0A1F44] font-bold px-10 py-3.5 rounded-2xl shadow-lg hover:shadow-yellow-300/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}