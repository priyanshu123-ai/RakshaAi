import { motion } from "framer-motion";
import { useState } from "react";
import {
  EyeOff, Eye, Shield, Smartphone, StickyNote, Heart,
  Calculator, CheckCircle, AlertTriangle, Lock
} from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const disguiseOptions = [
  { id: "notes", icon: StickyNote, label: "Notes App", desc: "Appears as a simple note-taking app", color: "bg-yellow-500/10 text-yellow-600" },
  { id: "wellness", icon: Heart, label: "Wellness Tracker", desc: "Appears as a health & wellness app", color: "bg-pink-500/10 text-pink-600" },
  { id: "calculator", icon: Calculator, label: "Calculator", desc: "Appears as a basic calculator", color: "bg-blue-500/10 text-blue-600" },
];

const DisguiseMode = () => {
  const [enabled, setEnabled] = useState(false);
  const [selectedDisguise, setSelectedDisguise] = useState("notes");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-3xl font-display font-bold text-slate-900">Disguise Mode</h1>
        <p className="text-slate-500 mt-1">Make the app appear as a normal utility to prevent suspicion from abusers.</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div variants={item} className="col-span-2 space-y-4">
          {/* Enable Toggle */}
          <div className={`bg-white rounded-2xl p-6 border shadow-md transition-all ${enabled ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10" : "border-slate-200"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${enabled ? "bg-emerald-500/10" : "bg-slate-100"}`}>
                  {enabled ? <EyeOff className="w-6 h-6 text-emerald-500" /> : <Eye className="w-6 h-6 text-slate-500" />}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-900">Disguise Mode</h3>
                  <p className="text-sm text-slate-500">{enabled ? "App is currently disguised" : "App is showing normally"}</p>
                </div>
              </div>
              <button
                onClick={() => setEnabled(!enabled)}
                className={`w-14 h-7 rounded-full flex items-center px-0.5 transition-all duration-300 ${
                  enabled ? "bg-emerald-500 justify-end" : "bg-slate-100 justify-start"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>

          {/* Disguise Options */}
          <h3 className="font-display font-semibold text-sm text-slate-900">Choose Disguise</h3>
          <div className="grid grid-cols-3 gap-3">
            {disguiseOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDisguise(opt.id)}
                className={`bg-white rounded-2xl p-5 border shadow-md text-left transition-all ${
                  selectedDisguise === opt.id ? "border-rose-500/50 shadow-lg shadow-rose-500/10" : "border-slate-200 hover:border-rose-500/20"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${opt.color}`}>
                  <opt.icon className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-sm text-slate-900">{opt.label}</h4>
                <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                {selectedDisguise === opt.id && (
                  <div className="flex items-center gap-1 mt-2 text-rose-500 text-[10px] font-semibold">
                    <CheckCircle className="w-3 h-3" /> Selected
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">
            <h3 className="font-display font-semibold text-sm text-slate-900 mb-3">Preview</h3>
            <div className="bg-slate-100 rounded-xl h-48 flex items-center justify-center">
              {selectedDisguise === "notes" && (
                <div className="text-center space-y-2">
                  <StickyNote className="w-8 h-8 text-yellow-500 mx-auto" />
                  <p className="font-display font-semibold text-slate-900">My Notes</p>
                  <p className="text-xs text-slate-500">This is what others would see</p>
                </div>
              )}
              {selectedDisguise === "wellness" && (
                <div className="text-center space-y-2">
                  <Heart className="w-8 h-8 text-pink-500 mx-auto" />
                  <p className="font-display font-semibold text-slate-900">Wellness Tracker</p>
                  <p className="text-xs text-slate-500">Track your daily health</p>
                </div>
              )}
              {selectedDisguise === "calculator" && (
                <div className="text-center space-y-2">
                  <Calculator className="w-8 h-8 text-blue-500 mx-auto" />
                  <p className="font-display font-semibold text-slate-900">Calculator</p>
                  <p className="text-xs text-slate-500">Simple calculator</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={item} className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-rose-500" />
              <h3 className="font-display font-semibold text-sm text-slate-900">How It Works</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-500">
              <p>When disguise mode is active:</p>
              {[
                "App icon & name change on home screen",
                "Opening the app shows the disguise interface",
                "Secret gesture reveals the real app",
                "No SHEild branding visible anywhere",
                "Notifications appear as the disguise app",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Lock className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-900">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-rose-700">Important</p>
                <p className="text-[10px] text-slate-500 mt-0.5">SOS triggers still work even in disguise mode. Your safety features are always active.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DisguiseMode;
