import React from "react";
import { motion } from "framer-motion";

function SlotLayout({ zones }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-8 max-w-7xl mx-auto pb-12"
    >
      <div>
        <h2 className="text-2xl font-black border-l-4 border-emerald-500 pl-3 uppercase tracking-wider">
          Real-Time Slot Matrix Mapping
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Interactive digital floor plans reflecting live sensory slot states.
        </p>
      </div>

      <div className="space-y-8">
        {zones && zones.map((zone) => {
          const occupied = zone.occupiedSpots || 0;
          const total = zone.totalSpots || 100;

          // Generate simulated slot items arrays based on current occupied states
          const slotsArray = Array.from({ length: Math.min(total, 24) }, (_, i) => ({
            id: i + 1,
            isOccupied: i < occupied,
          }));

          return (
            <div key={zone.id} className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{zone.icon || "🚗"}</span>
                  <h3 className="text-lg font-bold tracking-tight">{zone.name}</h3>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Available
                  </span>
                  <span className="flex items-center gap-1.5 text-red-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Occupied
                  </span>
                </div>
              </div>

              {/* LIVE INDIVIDUAL CARD BLOCKS GRID */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 pt-2">
                {slotsArray.map((slot) => (
                  <motion.div
                    key={slot.id}
                    whileHover={{ scale: 1.05 }}
                    className={`h-14 rounded-xl border flex flex-col items-center justify-center font-mono text-[10px] font-black transition-all shadow-md ${
                      slot.isOccupied
                        ? "bg-red-500/10 border-red-500/30 text-red-400 shadow-red-950/20"
                        : "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 shadow-emerald-950/20"
                    }`}
                  >
                    <span>P-{slot.id}</span>
                    <span className="text-[8px] mt-0.5 opacity-60">
                      {slot.isOccupied ? "BUSY" : "FREE"}
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 font-mono italic pt-2">
                *Display limited to first 24 node segments for UI presentation layout purposes.
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default SlotLayout;
