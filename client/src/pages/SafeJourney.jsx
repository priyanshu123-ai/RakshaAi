import { motion } from "framer-motion";
import { useState } from "react";
import {
  Navigation, MapPin, Clock, Play, Pause, Square,
  AlertTriangle, CheckCircle, Locate
} from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const SafeJourney = () => {
  const [journeyState, setJourneyState] = useState("idle");
  const [destination, setDestination] = useState("");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

      <motion.div variants={item}>
        <h1 className="text-3xl font-display font-bold text-slate-900">
          Safe Journey
        </h1>
        <p className="text-slate-500 mt-1">
          Track your route and stay protected while travelling.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">

        {/* Main Map Area */}
        <motion.div variants={item} className="col-span-2 space-y-4">

          {/* Destination input */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">

            <div className="flex items-center gap-3">

              <div className="flex-1 relative">

                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />

                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter your destination..."
                  className="w-full bg-slate-100 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                />

              </div>

              {journeyState === "idle" ? (

                <button
                  onClick={() => setJourneyState("active")}
                  className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl px-6 py-3 text-sm font-semibold flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Start Journey
                </button>

              ) : (

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      setJourneyState(journeyState === "active" ? "paused" : "active")
                    }
                    className="bg-amber-500 text-white rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2"
                  >
                    {journeyState === "active"
                      ? <Pause className="w-4 h-4" />
                      : <Play className="w-4 h-4" />}
                    {journeyState === "active" ? "Pause" : "Resume"}
                  </button>

                  <button
                    onClick={() => setJourneyState("idle")}
                    className="bg-red-500 text-white rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2"
                  >
                    <Square className="w-4 h-4" /> End
                  </button>

                </div>

              )}

            </div>

          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">

            <div className="h-[400px] bg-slate-50 relative flex items-center justify-center">

              {journeyState !== "idle" ? (

                <div className="text-center space-y-3">

                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <p className="font-semibold text-slate-900">
                    Live Tracking Active
                  </p>

                  <p className="text-sm text-slate-500">
                    GPS location being shared with your Inner Circle
                  </p>

                </div>

              ) : (

                <div className="text-center space-y-3">
                  <Navigation className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-slate-500 text-sm">
                    Enter a destination to start tracking
                  </p>
                </div>

              )}

              {/* Map control */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-xl shadow-md border border-slate-200 flex items-center justify-center">
                  <Locate className="w-4 h-4 text-slate-900" />
                </button>
              </div>

            </div>

          </div>

        </motion.div>

        {/* Sidebar */}
        <motion.div variants={item} className="space-y-4">

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">

            <h3 className="font-semibold text-sm text-slate-900 mb-4">
              Journey Status
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold">
                  {journeyState}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Duration</span>
                <span className="text-slate-900 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {journeyState !== "idle" ? "00:12:34" : "--:--:--"}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Distance</span>
                <span className="text-slate-900">
                  {journeyState !== "idle" ? "2.4 km" : "—"}
                </span>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">

            <h3 className="font-semibold text-sm text-slate-900 mb-3">
              Auto Safety Checks
            </h3>

            <div className="space-y-2">

              {[
                "Route deviation alert",
                "Long stop detection",
                "Timed check-ins",
                "Arrival confirmation"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{feat}</span>
                </div>
              ))}

            </div>

          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">

            <h3 className="font-semibold text-sm text-slate-900 mb-3">
              Quick Alert
            </h3>

            <button className="w-full bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Send SOS Alert
            </button>

          </div>

        </motion.div>

      </div>

    </motion.div>
  );
};

export default SafeJourney;