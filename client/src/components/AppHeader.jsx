import { Shield } from "lucide-react";

const AppHeader = ({ mode, onModeChange }) => {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>

        <span className="text-xl font-display font-bold tracking-tight text-slate-900">
          RAKSHA
          <span className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-700 bg-clip-text text-transparent">
            AI
          </span>
        </span>
      </div>

      <div className="flex items-center bg-slate-100 rounded-full p-1">
        <button
          onClick={() => onModeChange("external")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${mode === "external"
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900"
            }`}
        >
          External
        </button>

        <button
          onClick={() => onModeChange("internal")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${mode === "internal"
              ? "bg-gradient-to-r from-violet-500 to-pink-600 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900"
            }`}
        >
          Internal
        </button>
      </div>
    </header>
  );
};

export default AppHeader;