import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, set } from "firebase/database";

function AdminPanel({ zones }) {
  const [broadcastText, setBroadcastText] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  
  // 🔥 لائیو اسکرین اپڈیٹ کے لیے لوکل اسٹیٹ مینیجر
  const [localZones, setLocalZones] = useState([]);

  // جب بھی پیرنٹ کمپوننٹ (App.jsx) سے فائر بیس کا نیا ڈیٹا آئے، اسے لوکل اسٹیٹ میں سنک کریں
  useEffect(() => {
    if (zones) {
      setLocalZones(zones);
    }
  }, [zones]);

  // 🔥 100% ورکنگ پلس مائنس ہینڈلر (جو اسکرین پر نمبر اسی وقت بدلتا ہے)
  const adjustSpots = async (zoneId, amount) => {
    try {
      // 1. لوکل اسٹیٹ میں سے زون ڈھونڈیں
      const targetZone = localZones.find((z) => z.id === zoneId);
      if (!targetZone) return;

      const currentOccupied = targetZone.occupiedSpots !== undefined ? targetZone.occupiedSpots : 0;
      const total = targetZone.totalSpots || 100;

      // 2. نئی ویلیو کیلکولیٹ کریں اور باؤنڈریز چیک کریں
      let newOccupied = currentOccupied + amount;
      if (newOccupied < 0) newOccupied = 0;
      if (newOccupied > total) newOccupied = total;

      // 3. 🚀 سب سے اہم کام: اسکرین پر نمبر کو فوری طور پر بدلیں (UI First Update)
      setLocalZones(prevZones => 
        prevZones.map(z => z.id === zoneId ? { ...z, occupiedSpots: newOccupied } : z)
      );

      // 4. اب بیک اینڈ فائر بیس پر بھی ڈیٹا بھیجیں تاکہ وہ بھی سنک رہے
      const db = getDatabase();
      const occupiedSpotsRef = ref(db, `parking/${zoneId}/occupiedSpots`);
      await set(occupiedSpotsRef, newOccupied);

      setAdminStatus(`🎯 System Refreshed: ${targetZone.name} is now at ${newOccupied}`);
      setTimeout(() => setAdminStatus(""), 2000);
    } catch (err) {
      console.error("Adjustment error tracking:", err);
      setAdminStatus("⚠️ Database sync failure.");
    }
  };

  const pushBroadcastMessage = async (e) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;

    try {
      const db = getDatabase();
      const broadcastRef = ref(db, "analytics/broadcast");
      await set(broadcastRef, broadcastText);
      
      setAdminStatus("✅ Broadcast alert pushed out successfully!");
      setBroadcastText("");
      setTimeout(() => setAdminStatus(""), 4000);
    } catch (err) {
      setAdminStatus("⚠️ Security failure: Counter-sync failed.");
    }
  };

  const clearBroadcastMessage = async () => {
    try {
      const db = getDatabase();
      const broadcastRef = ref(db, "analytics/broadcast");
      await set(broadcastRef, "System Alert: Drive safely. Keep speed limits under 10 km/h inside campus levels.");
      setAdminStatus("🗑️ Broadcast system reset to default tracking.");
      setTimeout(() => setAdminStatus(""), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-8 max-w-7xl mx-auto pb-12"
    >
      {/* Activity Feedback Banner */}
      {adminStatus && (
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-xs font-semibold text-cyan-400 text-center shadow-lg shadow-cyan-500/5">
          {adminStatus}
        </div>
      )}

      {/* TOP AREA: CAPACITY CONTROLLERS */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-black border-l-4 border-cyan-500 pl-3 uppercase tracking-wider">
            Master Infrastructure Override
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Manually inject real-time counter steps directly onto physical campus node clusters.
          </p>
        </div>

        {/* ULTRA-PRO MASSIVE OVERRIDE MODULE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localZones && localZones.map((zone) => {
            const occupied = zone.occupiedSpots !== undefined ? zone.occupiedSpots : 0;
            const total = zone.totalSpots || 100;
            
            // پرسنٹیج (%) کی کیلکولیشن جو اب لائیو بدلے گی
            const percentageUsed = Math.round((occupied / total) * 100);

            return (
              <div 
                key={zone.id} 
                className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-xl flex flex-col justify-between space-y-6"
              >
                {/* Zone Header Meta */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl bg-white/5 p-3 rounded-2xl border border-white/5">{zone.icon || "🚗"}</span>
                    <div>
                      <h3 className="text-xl font-black tracking-tight">{zone.name}</h3>
                      <p className="text-xs text-slate-500 font-mono tracking-widest">NODE_ID::{zone.id.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Usage Ratio</span>
                    <span className="text-lg font-extrabold text-cyan-400">{percentageUsed}% Full</span>
                  </div>
                </div>

                {/* THE MASSIVE TACTILE CONTROLLER CONTROLS */}
                <div className="grid grid-cols-3 gap-4 items-center bg-black/30 p-3 rounded-2xl border border-white/5">
                  
                  {/* BIG MINUS BUTTON */}
                  <button
                    type="button"
                    onClick={() => adjustSpots(zone.id, -1)}
                    disabled={occupied <= 0}
                    className="h-20 bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 active:scale-95 rounded-xl text-3xl font-black transition-all flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none text-red-400 shadow-md shadow-black/20 select-none cursor-pointer"
                  >
                    －
                  </button>

                  {/* GIANT CENTRAL STATUS METRIC READOUT */}
                  <div className="text-center flex flex-col justify-center py-2">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1">Occupied</span>
                    <span className="text-4xl font-black font-mono text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                      {occupied}
                    </span>
                  </div>

                  {/* BIG PLUS BUTTON */}
                  <button
                    type="button"
                    onClick={() => adjustSpots(zone.id, 1)}
                    disabled={occupied >= total}
                    className="h-20 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 active:scale-95 rounded-xl text-3xl font-black transition-all flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none text-emerald-400 shadow-md shadow-black/20 select-none cursor-pointer"
                  >
                    ＋
                  </button>

                </div>

                {/* Progress Bar (یہ بھی لائیو کلک پر آگے پیچھے ہوگا) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>{occupied} Nodes Engaged</span>
                    <span>{total} Max Spots</span>
                  </div>
                  <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${percentageUsed}%` }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* LOWER AREA: BROADCAST DISPATCH CONTROLLER MODULE */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-xl max-w-3xl mx-auto">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black border-l-4 border-purple-500 pl-3 uppercase tracking-wide">
              Administrative Broadcast Dispatcher
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Trigger global structural messages or alerts across user smartphone terminals instantly.
            </p>
          </div>

          <form onSubmit={pushBroadcastMessage} className="space-y-4 pt-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Notification Ribbon Stream Content
              </label>
              <textarea
                rows="3"
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                placeholder="Example: Basement B is undergoing automated clean check. Faculty vehicles are redirected to ground lots."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white transition placeholder:text-slate-600 resize-none h-24"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-4 rounded-xl transition text-xs uppercase tracking-wider shadow-lg shadow-purple-600/10 cursor-pointer"
              >
                Emit Global Alert ⚡
              </button>
              <button
                type="button"
                onClick={clearBroadcastMessage}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold px-6 rounded-xl transition text-xs uppercase cursor-pointer"
              >
                Reset Default
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminPanel;

