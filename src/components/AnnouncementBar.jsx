const text =
  "🌿 Celebrate Mid-Autumn Sustainably ✨ Mooncake Deliveries Across Singapore 💫  Powered by Welyft's 100% Electric Fleet  🚚";

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-10 bg-red-700 z-[1001] overflow-hidden whitespace-nowrap">
      <div className="marquee-track h-full flex items-center">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="mx-10 font-semibold text-white"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}