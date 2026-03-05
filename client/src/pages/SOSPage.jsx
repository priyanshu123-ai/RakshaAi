import { motion } from "framer-motion";
import { useState } from "react";
import {
AlertTriangle, Smartphone, Vibrate, Mic, Volume2,
Fingerprint, Keyboard, Hand, Power, CheckCircle, Settings
} from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const triggers = [
{ id: "one-tap", icon: Smartphone, label: "One-Tap SOS", desc: "Single button press to send emergency alert", category: "both" },
{ id: "shake", icon: Vibrate, label: "Shake Detection", desc: "Shake your phone rapidly 3 times to trigger", category: "external" },
{ id: "voice", icon: Mic, label: "Voice Keyword", desc: "Say a secret keyword to activate alert silently", category: "both" },
{ id: "power", icon: Power, label: "Power Button Pattern", desc: "Press power button 5 times rapidly", category: "external" },
{ id: "volume", icon: Volume2, label: "Volume Sequence", desc: "Secret volume button pattern triggers SOS", category: "internal" },
{ id: "keyword", icon: Keyboard, label: "Secret Keyword Typing", desc: "Type a hidden phrase anywhere to alert circle", category: "internal" },
{ id: "tap-pattern", icon: Hand, label: "Screen Tap Pattern", desc: "Tap a specific pattern on any screen", category: "internal" },
{ id: "fingerprint", icon: Fingerprint, label: "Silent Fingerprint", desc: "Use wrong finger to silently trigger alert", category: "internal" },
];

const SOSPage = () => {
const [enabledTriggers, setEnabledTriggers] = useState(["one-tap"]);
const [sosActivated, setSosActivated] = useState(false);
const [filter, setFilter] = useState("all");

const toggle = (id) => {
setEnabledTriggers((prev) =>
prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
);
};

const filtered = triggers.filter(
(t) => filter === "all" || t.category === filter || t.category === "both"
);

return (
<motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

```
  <motion.div variants={item} className="flex items-start justify-between">
    <div>
      <h1 className="text-3xl font-display font-bold text-slate-900">SOS Triggers</h1>
      <p className="text-slate-500 mt-1">Configure multiple ways to send emergency alerts.</p>
    </div>
    <span className="text-xs font-medium bg-rose-50 text-rose-700 px-3 py-1 rounded-full">
      {enabledTriggers.length} active
    </span>
  </motion.div>

  <div className="grid grid-cols-3 gap-6">

    {/* SOS Button + Triggers */}
    <div className="col-span-2 space-y-4">

      {/* Big SOS Button */}
      <motion.div variants={item} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md flex flex-col items-center">

        <div className="relative mb-4">

          <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-pulse-ring" />
          <div
            className="absolute inset-0 rounded-full bg-rose-500/15 animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
          />

          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setSosActivated(true);
              setTimeout(() => setSosActivated(false), 3000);
            }}
            className={`relative z-10 w-36 h-36 rounded-full font-display font-bold text-2xl tracking-wider text-white shadow-lg shadow-rose-500/30 transition-all duration-300 ${
              sosActivated
                ? "bg-emerald-500"
                : "bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700"
            }`}
          >
            {sosActivated ? "SENT!" : "SOS"}
          </motion.button>

        </div>

        <p className="text-sm text-slate-500 font-medium">
          {sosActivated
            ? "Emergency alerts sent to your Inner Circle"
            : "Tap to send emergency alert to all trusted contacts"}
        </p>

      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={item} className="flex gap-2">

        {["all", "external", "internal"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filter === f
                ? "bg-rose-500 text-white"
                : "bg-slate-100 text-slate-500 hover:text-slate-900"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} Triggers
          </button>
        ))}

      </motion.div>

      {/* Triggers Grid */}
      <motion.div variants={item} className="grid grid-cols-2 gap-3">

        {filtered.map((trigger) => {

          const enabled = enabledTriggers.includes(trigger.id);

          return (
            <div
              key={trigger.id}
              onClick={() => toggle(trigger.id)}
              className={`bg-white rounded-2xl p-4 border shadow-md cursor-pointer transition-all duration-200 ${
                enabled
                  ? "border-rose-500/50 shadow-lg shadow-rose-500/10"
                  : "border-slate-200 hover:border-rose-500/20"
              }`}
            >

              <div className="flex items-start justify-between mb-2">

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    enabled
                      ? "bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700"
                      : "bg-slate-100"
                  }`}
                >
                  <trigger.icon
                    className={`w-5 h-5 ${
                      enabled ? "text-white" : "text-slate-500"
                    }`}
                  />
                </div>

                <div
                  className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                    enabled
                      ? "bg-emerald-500 justify-end"
                      : "bg-slate-100 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>

              </div>

              <h3 className="font-display font-semibold text-sm text-slate-900">
                {trigger.label}
              </h3>

              <p className="text-xs text-slate-500 mt-0.5">
                {trigger.desc}
              </p>

              <span
                className={`inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  trigger.category === "external"
                    ? "bg-blue-500/10 text-blue-600"
                    : trigger.category === "internal"
                    ? "bg-purple-500/10 text-purple-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {trigger.category === "both"
                  ? "Both modes"
                  : trigger.category}
              </span>

            </div>
          );
        })}

      </motion.div>

    </div>

    {/* Sidebar */}
    <motion.div variants={item} className="space-y-4">

      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">
        <h3 className="font-display font-semibold text-sm text-slate-900 mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4 text-rose-500" />
          SOS Configuration
        </h3>

        <div className="space-y-4">

          <div>
            <label className="text-xs text-slate-500 block mb-1">
              Voice Keyword
            </label>
            <input
              type="text"
              placeholder="e.g., Help me now"
              className="w-full bg-slate-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1">
              Secret Typing Keyword
            </label>
            <input
              type="text"
              placeholder="e.g., x911x"
              className="w-full bg-slate-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1">
              Alert Delay (seconds)
            </label>
            <input
              type="number"
              defaultValue={3}
              className="w-full bg-slate-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button className="w-full bg-rose-500 text-white rounded-xl py-2.5 text-sm font-semibold">
            Save Settings
          </button>

        </div>
      </div>

    </motion.div>

  </div>

</motion.div>


);
};

export default SOSPage;
