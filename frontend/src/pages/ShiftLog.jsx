import React, { useState } from "react";
import { motion } from "framer-motion";

function ShiftLog() {
  const [clockedIn, setClockedIn] = useState(false);
  const guardName = localStorage.getItem("userName") || "Duty Officer";

  const activeRoster = [
    { zone: "Basement Sector A", officer: guardName, shift: "Morning (08:00 - 14:00)", status: "Active" },
    { zone: "Ground Main Lot", officer: "Officer Tariq Mahmood", shift: "Morning (08:00 - 14:00)", status: "On-Site" },
    { zone: "Faculty Reserved Wing", officer: "Officer Junaid Khan", shift: "Full-Day Standby", status: "Patrolling" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-6 max-w-5xl mx-auto pb-12 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/10 rounded-[24px] p-6">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wider">Tactical Shift Log Terminal</h2>
          <p className="text-slate-400 text-[11px] mt-0.5">Manage personnel deployments and operational gate check-in loops.</p>
        </div>
        <button
          onClick={() => setClockedIn(!clockedIn)}
          className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
            clockedIn 
              ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20" 
              : "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
          }`}
        >
          {clockedIn ? "🟢 Active: Clocked In" : "🟡 Action Required: Clock In"}
        </button>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-[28px] p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Active Campus Personnel Distribution</h3>
        <div className="space-y-3">
          {activeRoster.map((item, idx) => (
            <div key={idx} className="bg-black/30 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-cyan-400 font-bold block text-[12px]">{item.zone}</span>
                <span className="text-slate-400 text-[10px]">Staff: {item.officer} • {item.shift}</span>
              </div>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 uppercase tracking-widest">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ShiftLog;
