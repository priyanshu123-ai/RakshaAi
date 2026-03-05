import { motion } from "framer-motion";
import { useState } from "react";
import {
  Camera, Mic, Video, FileText, Download, Trash2,
  Lock, Shield, Square, Image
} from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const demoFiles = [
  { id: "1", type: "audio", name: "Audio Recording #1", date: "Today, 2:30 PM", size: "2.4 MB", encrypted: true },
  { id: "2", type: "photo", name: "Photo Evidence #1", date: "Today, 1:15 PM", size: "1.8 MB", encrypted: true },
  { id: "3", type: "note", name: "Incident Note", date: "Yesterday", size: "0.2 KB", encrypted: true },
];

const typeIcon = {
  photo: Image,
  audio: Mic,
  video: Video,
  note: FileText
};

const EvidencePage = () => {
  const [recording, setRecording] = useState("idle");
  const [files, setFiles] = useState(demoFiles);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

      <motion.div variants={item}>
        <h1 className="text-3xl font-display font-bold text-slate-900">
          Evidence Capture
        </h1>
        <p className="text-slate-500 mt-1">
          Silently capture and securely store evidence with encryption.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">

        <motion.div variants={item} className="col-span-2 space-y-4">

          {/* Capture Controls */}
          <div className="grid grid-cols-4 gap-3">

            {[
              { icon: Camera, label: "Silent Photo", desc: "No shutter sound", action: () => {} },
              { icon: Mic, label: "Audio Record", desc: recording === "audio" ? "Recording..." : "Tap to start", action: () => setRecording(recording === "audio" ? "idle" : "audio") },
              { icon: Video, label: "Video Record", desc: recording === "video" ? "Recording..." : "Tap to start", action: () => setRecording(recording === "video" ? "idle" : "video") },
              { icon: FileText, label: "Write Note", desc: "Add text evidence", action: () => {} },
            ].map((ctrl) => (
              <button
                key={ctrl.label}
                onClick={ctrl.action}
                className={`bg-white rounded-2xl p-5 border shadow-md text-center transition-all hover:shadow-lg hover:shadow-rose-500/10 ${
                  (recording === "audio" && ctrl.label === "Audio Record") ||
                  (recording === "video" && ctrl.label === "Video Record")
                    ? "border-red-500 shadow-lg shadow-red-500/10"
                    : "border-slate-200"
                }`}
              >

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                    (recording === "audio" && ctrl.label === "Audio Record") ||
                    (recording === "video" && ctrl.label === "Video Record")
                      ? "bg-red-500/10"
                      : "bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700"
                  }`}
                >
                  {(recording === "audio" && ctrl.label === "Audio Record") ||
                  (recording === "video" && ctrl.label === "Video Record")
                    ? <Square className="w-5 h-5 text-red-500" />
                    : <ctrl.icon className="w-5 h-5 text-white" />
                  }
                </div>

                <h4 className="font-display font-semibold text-sm text-slate-900">
                  {ctrl.label}
                </h4>

                <p
                  className={`text-[10px] mt-0.5 ${
                    (recording === "audio" && ctrl.label === "Audio Record") ||
                    (recording === "video" && ctrl.label === "Video Record")
                      ? "text-red-500 font-medium"
                      : "text-slate-500"
                  }`}
                >
                  {ctrl.desc}
                </p>

              </button>
            ))}

          </div>

          {/* Files List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md">

            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-slate-900">
                Captured Evidence
              </h3>
              <span className="text-xs text-slate-500">
                {files.length} files
              </span>
            </div>

            <div className="divide-y divide-slate-200">

              {files.map((file) => {
                const Icon = typeIcon[file.type];

                return (
                  <div key={file.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group">

                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-rose-700" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900">
                        {file.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {file.date} · {file.size}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">

                      {file.encrypted && (
                        <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Encrypted
                        </span>
                      )}

                      <button className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                      </button>

                      <button
                        onClick={() => setFiles(files.filter((f) => f.id !== file.id))}
                        className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>

                    </div>

                  </div>
                );
              })}

              {files.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No evidence files yet.
                </div>
              )}

            </div>

          </div>

        </motion.div>

        <motion.div variants={item} className="space-y-4">

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">

            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-500" />
              <h3 className="font-display font-semibold text-sm text-slate-900">
                Security Info
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-500">All evidence files are:</p>

              {[
                "End-to-end encrypted",
                "Stored securely in cloud",
                "Timestamped & geotagged",
                "Tamper-proof metadata",
                "Shareable with authorities"
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="text-slate-900">{f}</span>
                </div>
              ))}

            </div>

          </div>

        </motion.div>

      </div>

    </motion.div>
  );
};

export default EvidencePage;