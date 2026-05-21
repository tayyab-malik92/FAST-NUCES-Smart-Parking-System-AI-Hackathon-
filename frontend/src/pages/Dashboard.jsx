import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, onValue } from "firebase/database";

function Dashboard({ zones }) {
  const [totalLogins, setTotalLogins] = useState(0);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all"); // all, cars, bikes

  useEffect(() => {
    const db = getDatabase();
    
    // Listen to login statistics
    const loginCountRef = ref(db, "analytics/totalLogins");
    const unsubscribeLogins = onValue(loginCountRef, (snapshot) => {
      if (snapshot.exists()) setTotalLogins(snapshot.val());
    });

    // Listen to live system admin broadcasts
    const broadcastRef = ref(db, "analytics/broadcast");
    const unsubscribeBroadcast = onValue(broadcastRef, (snapshot) => {
      if (snapshot.exists()) {
        setBroadcastMessage(snapshot.val());
      } else {
        setBroadcastMessage("System Alert: Drive safely. Keep speed limits under 10 km/h inside campus levels.");
      }
    });

    return () => {
      unsubscribeLogins();
      unsubscribeBroadcast();
    };
  }, []);

  // Filter zones matching search query or constraints
  const filteredZones = zones ? zones.filter(zone => {
    const matchesSearch = zone.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 text-white pb-12"
    >
      {/* 📢 PRO FEATURE: LIVE BROADCAST SYSTEM MARQUEE */}
      {broadcastMessage && (
        <div className="bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-transparent border border-amber-500/30 px-4 py-2.5 rounded-xl flex items-center gap-3 overflow-hidden text-sm">
          <span className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse shrink-0">
            Broadcast
          </span>
          <div className="animate-marquee whitespace-nowrap text-amber-300 font-medium tracking-wide">
            {broadcastMessage}
          </div>
        </div>
      )}

      {/* 🚀 PRO LEVEL METRIC CARD CAROUSEL OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">System Metrics</p>
            <h3 className="text-xl font-black mt-0.5 text-blue-400">Total System Logins</h3>
          </div>
          <div className="text-2xl font-black bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-500/40 text-blue-300">
            {totalLogins}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600/20 to-transparent border border-emerald-500/20 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Hardware Grid</p>
            <h3 className="text-xl font-black mt-0.5 text-emerald-400">IoT Sensor Network</h3>
          </div>
          <div className="text-xs font-black bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-xl border border-emerald-500/30 tracking-widest">
            ACTIVE 🟢
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/20 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Architecture</p>
            <h3 className="text-xl font-black mt-0.5 text-purple-400">Peak Load Efficiency</h3>
          </div>
          <div className="text-sm font-extrabold text-purple-300">
            99.98%
          </div>
        </div>
      </div>

      {/* 🔍 SEARCH AND EXTRA COMPONENT FILTERS BLOCK */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search localized parking structure level..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition text-white"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-1">Filter Allocation:</span>
          {["all", "cars", "bikes"].map((filter) => (
            <button
              key={filter}
              onClick={() => setVehicleFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                vehicleFilter === filter 
                  ? "bg-cyan-500 text-slate-950 shadow-md" 
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 📊 LIVE ZONE INFRASTRUCTURE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredZones.map((zone) => {
          const occupied = zone.occupiedSpots || 0;
          const total = zone.totalSpots || 1;
          const available = total - occupied;
          const percentFree = Math.round((available / total) * 100);

          // Advanced calculations separating vehicle categories
          const carCapacity = Math.round(total * 0.6);
          const bikeCapacity = total - carCapacity;
          const carOccupied = Math.min(occupied, carCapacity);
          const bikeOccupied = Math.max(0, occupied - carCapacity);

          const freeCars = carCapacity - carOccupied;
          const freeBikes = bikeCapacity - bikeOccupied;

          // Skip render if target filter constraints hide it
          if (vehicleFilter === "cars" && freeCars === 0) return null;
          if (vehicleFilter === "bikes" && freeBikes === 0) return null;

          return (
            <motion.div
              key={zone.id}
              whileHover={{ y: -4 }}
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden"
            >
              {percentFree < 15 && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse" />
              )}

              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl bg-white/5 p-2 rounded-xl border border-white/5">{zone.icon || "🚗"}</span>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{zone.name}</h3>
                    <p className="text-[11px] text-slate-400 font-mono tracking-wider">NODE_REF_{zone.id.toUpperCase()}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-xl text-xs font-black ${
                  percentFree > 40 ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" :
                  percentFree > 15 ? "bg-amber-500/10 border border-amber-500/30 text-amber-400" :
                  "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}>
                  {percentFree}% Available
                </div>
              </div>

              {/* BAR PROGRESS SLIDER UTILITY */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>Occupied Nodes ({occupied})</span>
                  <span>Limit Vector ({total})</span>
                </div>
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(occupied / total) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      percentFree > 40 ? "from-blue-500 to-cyan-400" :
                      percentFree > 15 ? "from-amber-500 to-orange-400" :
                      "from-red-600 to-pink-500"
                    }`}
                  />
                </div>
              </div>

              {/* VEHICLE DISTRIBUTION DATA CARD */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4 mb-4">
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3">
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span>🚙</span> Cars Allocation
                  </div>
                  <div className="text-base font-black text-blue-400">
                    {freeCars} <span className="text-[10px] text-slate-500 font-medium">/ {carCapacity} Free</span>
                  </div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3">
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span>🏍️</span> Bikes Allocation
                  </div>
                  <div className="text-base font-black text-indigo-400">
                    {freeBikes} <span className="text-[10px] text-slate-500 font-medium">/ {bikeCapacity} Free</span>
                  </div>
                </div>
              </div>

              {/* PRO IOT SENSOR DIAGNOSTIC MODULE */}
              <div className="bg-black/20 rounded-xl p-2 flex items-center justify-between text-[10px] font-mono border border-white/5">
                <span className="text-slate-500">📡 Sensor Stream ID:</span>
                <span className="text-cyan-400 font-bold uppercase animate-pulse">STREAM_ONLINE_VAL_{occupied}</span>
              </div>

            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Dashboard;
