import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Navigation, MapPin, Clock, Play, Pause, Square,
  AlertTriangle, CheckCircle, Locate
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet icon fix for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

// Mock data: Central point reference (e.g. New Delhi for demo purposes)
const DEFAULT_CENTER = [28.6139, 77.2090];
const SOURCE_POS = [28.6139, 77.2090];
const DEST_POS = [28.5355, 77.3910]; // Noida

const MOCK_THREATS = [
  { id: 1, pos: [28.5800, 77.2500], type: "High Threat Zone", desc: "Past incidents reported in this sector." },
  { id: 2, pos: [28.5600, 77.3200], type: "Moderate Risk", desc: "Poorly lit area, avoid traversing alone at night." },
  { id: 3, pos: [28.6000, 77.3000], type: "Critical Incident", desc: "Recent harassment case reported nearby." }
];

// Mock Routing paths to draw Polylines since `leaflet-routing-machine` can be finicky inside React wrappers.
const DANGER_ROUTE = [
  SOURCE_POS,
  [28.5800, 77.2300], // Gets close to Threat 1
  [28.5650, 77.2800], // Gets close to Threat 2
  DEST_POS
];

const SAFE_ROUTE = [
  SOURCE_POS,
  [28.6300, 77.2800], // Detours north
  [28.6250, 77.3500], // Avoids the center threats completely
  [28.5800, 77.3900], // Approaches destination safely
  DEST_POS
];

const SafeJourney = () => {
  const [journeyState, setJourneyState] = useState("idle");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [showAlternative, setShowAlternative] = useState(false);

  useEffect(() => {
    if (journeyState === "active") {
      // Simulate discovering a threat and offering an alternative after 2 seconds
      const timer = setTimeout(() => {
        setShowAlternative(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowAlternative(false);
    }
  }, [journeyState]);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

      <motion.div variants={item}>
        <h1 className="text-3xl font-display font-bold text-slate-900">
          Safe Journey
        </h1>
        <p className="text-slate-500 mt-1">
          Track your route, identify risky zones, and ensure you arrive safely.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Map Area */}
        <motion.div variants={item} className="lg:col-span-2 space-y-4">

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="relative">
                <Locate className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Enter starting point (e.g. Connaught Place)"
                  className="w-full bg-slate-100 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination (e.g. Noida)"
                  className="w-full bg-slate-100 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {journeyState === "idle" ? (
                <button
                  onClick={() => setJourneyState("active")}
                  className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4" /> Start Protected Journey
                </button>
              ) : (
                <div className="flex w-full gap-2">
                  <button
                    onClick={() =>
                      setJourneyState(journeyState === "active" ? "paused" : "active")
                    }
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {journeyState === "active"
                      ? <Pause className="w-4 h-4" />
                      : <Play className="w-4 h-4" />}
                    {journeyState === "active" ? "Pause Tracking" : "Resume"}
                  </button>

                  <button
                    onClick={() => { setJourneyState("idle"); setShowAlternative(false); }}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Square className="w-4 h-4" /> End Journey
                  </button>
                </div>
              )}
            </div>

            {showAlternative && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-rose-900 text-sm">Threat Detected on Standard Route</h4>
                    <p className="text-xs text-rose-700 mt-1 mb-3">
                      Our AI has detected historical threat zones along your standard path. We highly recommend taking the highlighted Safe Alternative Route (Green).
                    </p>
                    <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-emerald-600 transition-colors">
                      Accept Safe Route
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative z-0">
            <div className="h-[500px] w-full bg-slate-50 relative">
              <MapContainer
                center={DEFAULT_CENTER}
                zoom={11}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Render Threat Markers */}
                {MOCK_THREATS.map(threat => (
                  <Marker key={threat.id} position={threat.pos} icon={redIcon}>
                    <Popup>
                      <strong className="text-rose-600">{threat.type}</strong><br />
                      {threat.desc}
                    </Popup>
                  </Marker>
                ))}

                {/* Standard Route (Red if Alternative is shown, otherwise Blue) */}
                {journeyState !== "idle" && (
                  <Polyline
                    positions={DANGER_ROUTE}
                    color={showAlternative ? "#ef4444" : "#3b82f6"}
                    weight={showAlternative ? 3 : 5}
                    dashArray={showAlternative ? "5, 10" : undefined}
                  />
                )}

                {/* Safe Alternative Route (Green) */}
                {showAlternative && (
                  <Polyline
                    positions={SAFE_ROUTE}
                    color="#10b981"
                    weight={5}
                  />
                )}

                {/* Start & End Markers */}
                {journeyState !== "idle" && (
                  <>
                    <Marker position={SOURCE_POS}>
                      <Popup>Start</Popup>
                    </Marker>
                    <Marker position={DEST_POS}>
                      <Popup>Destination</Popup>
                    </Marker>
                  </>
                )}
              </MapContainer>
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
                <span className="font-semibold text-emerald-600">
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
                <span className="text-slate-500">Est. Distance</span>
                <span className="text-slate-900">
                  {journeyState !== "idle" ? "18.4 km" : "—"}
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
                "Risk zone proximity scan",
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
            <button className="w-full bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
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