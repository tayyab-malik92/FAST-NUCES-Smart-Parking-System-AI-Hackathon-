import React from "react";
import { motion } from "framer-motion";

function VehicleProfile() {
  // Fetching dynamic session details from local infrastructure memory
  const currentUserName = localStorage.getItem("userName") || "Muhammad Tayyab Malik";
  const currentUserId = localStorage.getItem("userId") || "24L-0634";
  const currentUserEmail = localStorage.getItem("userEmail") || "tayyab.malik@nu.edu.pk";
  const currentUserRole = localStorage.getItem("userRole") || "student";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6 max-w-2xl mx-auto pb-12 font-mono text-white text-xs"
    >
      {/* UNIVERSAL PROFILE IDENTITY HUB CARD */}
      <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 shadow-xl space-y-6 relative overflow-hidden">
        {/* Decorative background glow based on access clearance role */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] pointer-events-none ${
          currentUserRole === "student" ? "bg-cyan-500/20" : "bg-purple-500/20"
        }`} />

        {/* Header Block with avatar indicator */}
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shadow-lg ${
            currentUserRole === "student" 
              ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
              : "bg-purple-500/10 border-purple-500/30 text-purple-400"
          }`}>
            {currentUserRole === "student" ? "🎓" : "👮‍♂️"}
          </div>
          <div>
            <h3 className="text-base font-black uppercase tracking-wider">{currentUserName}</h3>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mt-0.5">
              Access Tier:{" "}
              <span className={currentUserRole === "student" ? "text-cyan-400" : "text-purple-400"}>
                {currentUserRole}
              </span>
            </p>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Dynamic Structural Variables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-1">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">
              {currentUserRole === "student" ? "FAST Student ID" : "Employee Core ID"}
            </span>
            <span className="font-bold text-white text-sm uppercase tracking-wide">
              {currentUserId}
            </span>
          </div>

          <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-1">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">
              Network Operational Status
            </span>
            <span className="font-bold text-emerald-400 text-sm uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Verified Node
            </span>
          </div>
        </div>

        <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">
            Registered Campus Email Gateway
          </span>
          <span className="font-bold text-slate-300 text-xs break-all">
            {currentUserEmail}
          </span>
        </div>

        {/* Dynamic Contextual Extra Info (Based on Role) */}
        <div className="bg-white/[0.01] border border-dashed border-white/10 p-4 rounded-2xl">
          {currentUserRole === "student" ? (
            <div className="space-y-1.5">
              <h5 className="text-[10px] uppercase font-black text-cyan-400 tracking-wider">🎓 Student Transit Pass Allocation</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Authorized to park in Zone A and Zone B. Ensure your smart RFID pass is visible on the windshield to prevent automated fine logging triggers in the main gate loop sensor.
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <h5 className="text-[10px] uppercase font-black text-purple-400 tracking-wider">👮‍♂️ Guard Terminal Privileges</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Full administration override active. You have operational rights to dispatch enforcement units, adjust spot statuses manually, and update real-time terminal configurations.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default VehicleProfile;

