import React from "react";
import { motion } from "framer-motion";

function Header({ activeTab, setActiveTab }) {
  // Pull current active profile variables
  const userRole = localStorage.getItem("userRole") || "student";
  const userDisplayName = localStorage.getItem("userName") || "User Terminal";
  const userIdentityToken = localStorage.getItem("userId") || "FAST-NODE";

  // Master List containing specific conditional roles parameters mapping
 const allNavigationTabs = [
  { id: "dashboard", label: "Dashboard", icon: "📊", roles: ["student", "employee"] },
  { id: "profile", label: "My Profile", icon: "👤", roles: ["student", "employee"] }, // 🔥 UPDATED: Now visible to both!
  
  // Strict Student Restricted Pipeline Nodes
  { id: "layout", label: "Slot Matrix", icon: "🗺️", roles: ["student"] },
  { id: "booking", label: "Pre-Booking", icon: "🎟️", roles: ["student"] },
  { id: "analytics", label: "Analytics", icon: "📈", roles: ["student"] },
  { id: "wallet", label: "Fines Ledger", icon: "💸", roles: ["student"] },
  { id: "guidelines", label: "Guidelines", icon: "🚨", roles: ["student"] },
  
  // Strict Employee Restricted Pipeline Nodes
  { id: "security", label: "Live Complaints", icon: "👮‍♂️", roles: ["employee"] },
  { id: "roster", label: "Shift Roster", icon: "📋", roles: ["employee"] },
  { id: "registry", label: "Vehicle Registry", icon: "🚗", roles: ["employee"] },
  { id: "empanalytics", label: "Oversight Stats", icon: "📉", roles: ["employee"] },
  { id: "admin", label: "Admin Override", icon: "🎛️", roles: ["employee"] }
];


  // 🛡️ Filter menus so elements match the active context precisely
  const activeNavigationTabs = allNavigationTabs.filter((tab) => tab.roles.includes(userRole));

  return (
    <header className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>🅿️</span> Smart Parking <span className="text-cyan-400 font-mono text-xs bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">FAST Lahore</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-mono mt-0.5 uppercase tracking-wide">
            Session Context: <span className="text-slate-300 font-bold">{userDisplayName} ({userIdentityToken})</span> — Logged in as <span className="text-cyan-400 font-bold">{userRole.toUpperCase()}</span>
          </p>
        </div>
        
        <div className="bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-2 self-start md:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Firebase Pipeline Connected
          </span>
        </div>
      </div>

      {/* HORIZONTAL SYSTEM NAVIGATIONAL TRACK */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max bg-white/[0.01] border border-white/5 p-1 rounded-xl">
          {activeNavigationTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-lg text-[11px] font-bold uppercase font-mono tracking-wider transition-all flex items-center gap-2 select-none cursor-pointer ${
                  isActive ? "text-cyan-400 bg-white/5 border border-white/10" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyan-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
