import React from "react";
import { motion } from "framer-motion";

function Analytics({ zones }) {
  // Mock data for peak hours trend representation
  const peakHours = [
    { time: "08:00 AM", load: 95, label: "Classes Start Rush" },
    { time: "10:00 AM", load: 70, label: "Steady State" },
    { time: "11:30 AM", load: 85, label: "Mid-Day Peak" },
    { time: "01:00 PM", load: 45, label: "Break Hour" },
    { time: "03:30 PM", load: 20, label: "Departure Flow" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-8 max-w-6xl mx-auto pb-12"
    >
      <div>
        <h2 className="text-2xl font-black border-l-4 border-indigo-500 pl-3 uppercase tracking-wider">
          Predictive Analytics & Congestion Trends
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Historical system trends derived from continuous campus cluster node tracking.
        </p>
      </div>

      {/* CHART CONTAINER AREA */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Average Daily Load Metrics</h3>
        
        <div className="h-64 flex items-end justify-between gap-2 pt-6 px-4 bg-black/20 rounded-2xl border border-white/5">
          {peakHours.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
              <span className="text-xs font-mono font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition mb-2">
                {item.load}%
              </span>
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${item.load}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`w-full max-w-[60px] rounded-t-xl transition-all ${
                  item.load > 80 
                    ? "bg-gradient-to-t from-indigo-600 to-red-500" 
                    : "bg-gradient-to-t from-indigo-500 to-cyan-400"
                }`}
              />
              <span className="text-[10px] md:text-xs font-bold font-mono text-slate-400 mt-3 whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CORE INSIGHTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/10 rounded-[24px] p-6 space-y-3">
          <span className="text-2xl">🧠</span>
          <h4 className="text-base font-bold text-slate-200">AI Optimization Insight</h4>
          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            Data models show high congestion in **Basement A** between 07:50 AM and 08:15 AM. 
            Vehicles entering past 08:10 AM are automatically suggested to redirect straight to **Ground Parking**.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-[24px] p-6 space-y-3">
          <span className="text-2xl">⚡</span>
          <h4 className="text-base font-bold text-slate-200">Infrastructure Health</h4>
          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            All primary hardware nodes are functioning perfectly with a 99.8% tracking resolution. 
            Real-time updates to your Firebase cloud nodes are executing with an average speed latency of 34ms.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Analytics;
