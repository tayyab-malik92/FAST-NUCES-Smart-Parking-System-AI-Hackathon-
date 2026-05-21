import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center select-none bg-[#070b13] relative overflow-hidden">
      
      {/* 🌌 NEXT LEVEL BACKGROUND RADIAL GLOWS */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 🏎️ ULTRA PRO ANIMATED TRAFFIC TRACK (MOVING VEHICLES) */}
      <div className="absolute inset-x-0 bottom-12 h-24 overflow-hidden pointer-events-none opacity-40 select-none">
        {/* Cyber Track Line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent absolute top-1/2" />
        
        {/* Row 1: Cars Moving Left to Right */}
        <motion.div 
          initial={{ x: "-20%" }}
          animate={{ x: "120%" }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute top-2 text-4xl flex gap-32 items-center"
        >
          <span>🚙</span>
          <span>🏎️</span>
          <span>🚗</span>
        </motion.div>

        {/* Row 2: Bikes Moving Right to Left (Delayed & Faster) */}
        <motion.div 
          initial={{ x: "120%" }}
          animate={{ x: "-20%" }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute bottom-2 text-3xl flex gap-24 items-center flex-row-reverse"
        >
          <span>🏍️</span>
          <span>🛵</span>
          <span>🏍️</span>
        </motion.div>
      </div>

      {/* 🏆 MAIN CENTRAL GLASS TIER CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[32px] max-w-xl w-full p-8 md:p-12 space-y-8 flex flex-col items-center shadow-2xl relative z-10"
      >
        {/* Glowing Indicator Cluster */}
        <div className="relative group">
          <span className="text-6xl block transform group-hover:rotate-12 transition duration-300 cursor-pointer">🅿️</span>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-40 group-hover:opacity-70 animate-pulse transition duration-500" />
        </div>

        {/* Dynamic Typography Zone */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
            FAST-NUCES <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Smart Parking
            </span>
          </h1>
          
          {/* Elite Creator Identity Branding */}
          <div className="inline-block">
            <p className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 rounded-xl">
              Engineered & Built by <span className="text-white font-extrabold">Muhammad Tayyab Malik</span>
            </p>
          </div>
        </div>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto font-medium">
          Lahore Campus ultimate real-time analytical gateway. Instantly track vacancy metrics across multi-level infrastructure zones.
        </p>

        {/* Action Trigger Node */}
        <div className="w-full pt-2">
          <button
            onClick={() => navigate("/login")}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black tracking-wide py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-500/10 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {/* Subtle overlay reflection light */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:animate-shine" />
            <span className="flex items-center justify-center gap-2">
              LAUNCH LIVE CORE ⚡
            </span>
          </button>
        </div>
      </motion.div>

      {/* Subtle Platform Status Footer Tag */}
      <div className="absolute bottom-4 text-[10px] text-slate-600 tracking-widest font-mono uppercase">
        VITE_CORE // PRODUCTION_READY_ACTIVE
      </div>
    </div>
  );
}

export default Welcome;
