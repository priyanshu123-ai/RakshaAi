import { motion } from "framer-motion";
import { Map, Info } from "lucide-react";
import { useState } from "react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const zones = [
  { name: "MG Road", risk: "high", incidents: 12, type: "Harassment" },
  { name: "Railway Station Area", risk: "high", incidents: 8, type: "Stalking" },
  { name: "University Campus", risk: "low", incidents: 1, type: "Safe Zone" },
  { name: "Central Market", risk: "medium", incidents: 5, type: "Theft" },
  { name: "Park Street", risk: "medium", incidents: 4, type: "Unsafe at night" },
  { name: "Tech Park", risk: "low", incidents: 0, type: "Safe Zone" },
];

const HeatmapPage = () => {
  const [riskFilter, setRiskFilter] = useState("all");

  const filtered = zones.filter(
    (z) => riskFilter === "all" || z.risk === riskFilter
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

      <motion.div variants={item}>
        <h1 className="text-3xl font-display font-bold text-slate-900">
          Safety Heatmap
        </h1>
        <p className="text-slate-500 mt-1">
          View risk zones based on community reports and alert data.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">

        {/* Map */}
        <motion.div variants={item} className="col-span-2 space-y-4">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">

            <div className="h-[500px] bg-slate-50 relative flex items-center justify-center">

              {/* Simulated heatmap zones */}
              <div className="absolute inset-0">
                <div className="absolute top-[15%] left-[20%] w-32 h-32 rounded-full bg-red-500/20 blur-2xl" />
                <div className="absolute top-[30%] right-[25%] w-28 h-28 rounded-full bg-red-500/15 blur-2xl" />
                <div className="absolute bottom-[25%] left-[40%] w-24 h-24 rounded-full bg-amber-500/20 blur-2xl" />
                <div className="absolute top-[55%] left-[15%] w-20 h-20 rounded-full bg-amber-500/15 blur-2xl" />
                <div className="absolute bottom-[15%] right-[15%] w-36 h-36 rounded-full bg-emerald-500/15 blur-2xl" />
                <div className="absolute top-[10%] right-[10%] w-28 h-28 rounded-full bg-emerald-500/20 blur-2xl" />
              </div>

              <div className="relative z-10 text-center space-y-2">
                <Map className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm text-slate-500">Interactive safety map</p>
                <p className="text-xs text-slate-400">
                  Red = high risk · Yellow = moderate · Green = safe
                </p>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200 shadow-md">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    High Risk
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    Moderate
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    Safe
                  </div>
                </div>
              </div>

            </div>

          </div>

        </motion.div>

        {/* Zone List */}
        <motion.div variants={item} className="space-y-4">

          <div className="flex gap-2">

            {["all", "high", "medium", "low"].map((f) => (
              <button
                key={f}
                onClick={() => setRiskFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                  riskFilter === f
                    ? "bg-rose-500 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}

          </div>

          <div className="space-y-2">

            {filtered.map((zone) => (
              <div
                key={zone.name}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-md"
              >

                <div className="flex items-center justify-between mb-1">

                  <h4 className="font-display font-semibold text-sm text-slate-900">
                    {zone.name}
                  </h4>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      zone.risk === "high"
                        ? "bg-red-500/10 text-red-500"
                        : zone.risk === "medium"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-emerald-500/10 text-emerald-500"
                    }`}
                  >
                    {zone.risk}
                  </span>

                </div>

                <p className="text-xs text-slate-500">
                  {zone.type} · {zone.incidents} reports
                </p>

              </div>
            ))}

          </div>

          <div className="bg-rose-50 rounded-2xl p-4 border border-slate-200">

            <div className="flex items-start gap-2">

              <Info className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />

              <div>
                <p className="text-xs font-medium text-rose-700">
                  Auto-warning enabled
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  You'll be warned when entering high-risk areas during journeys.
                </p>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </motion.div>
  );
};

export default HeatmapPage;