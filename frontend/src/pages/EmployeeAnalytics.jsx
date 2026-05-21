import React from "react";
import { motion } from "framer-motion";

function EmployeeAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-6 max-w-5xl mx-auto pb-12 font-mono text-xs"
    >
      <div>
        <h2 className="text-xl font-black border-l-4 border-emerald-500 pl-3 uppercase tracking-wider">Administrative Operational Analytics</h2>
        <p className="text-slate-400 text-[11px] mt-0.5">High-tier sector metrics compiled from physical gate sensors and citation logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PEAK CAPACITY GRAPH COMPONENT LOOKALIKES */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[28px] p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Peak Load Index Allocation</h3>
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>08:00 AM - 10:00 AM (Morning Load)</span><span className="text-red-400 font-bold">92% Capacity</span></div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-red-500 h-full w-[92%]" /></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>12:00 PM - 02:00 PM (Mid-Day Peak)</span><span className="text-amber-400 font-bold">75% Capacity</span></div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-amber-400 h-full w-[75%]" /></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>04:00 PM - 06:00 PM (Evening Clearance)</span><span className="text-emerald-400 font-bold">30% Capacity</span></div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-emerald-400 h-full w-[30%]" /></div>
            </div>
          </div>
        </div>

        {/* CITATION METRICS BLOCK */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[28px] p-6 flex flex-col justify-between space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Weekly Citation Analytics</h3>
          <div className="grid grid-cols-2 gap-4 text-center py-2">
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
              <span className="text-slate-500 text-[10px] block uppercase">Fines Issued</span>
              <span className="text-2xl font-black text-amber-400 font-mono">14</span>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
              <span className="text-slate-500 text-[10px] block uppercase">Settled Online</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">09</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed text-center">
            *Online micro-wallet settlements reduce manual cash handling at the main security booths by 64%.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default EmployeeAnalytics;
