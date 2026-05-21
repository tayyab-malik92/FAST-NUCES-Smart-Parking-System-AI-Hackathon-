import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, onValue, remove } from "firebase/database";

function SecurityPanel() {
  const [tickets, setTickets] = useState([]);
  const [gateLog] = useState([
    { plate: "LEA-4456", time: "11:12 AM", model: "Civic", access: "Approved Student" },
    { plate: "ICT-8812", time: "11:05 AM", model: "Corolla", access: "Approved Student" },
    { plate: "LHR-9901", time: "10:45 AM", model: "Sportage", access: "Faculty VIP" }
  ]);

  useEffect(() => {
    const db = getDatabase();
    const ticketsRef = ref(db, "analytics/tickets");
    
    const unsubscribe = onValue(ticketsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([key, value]) => ({
          firebaseId: key,
          ...value,
        }));
        setTickets(list);
      } else {
        setTickets([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleResolveTicket = async (firebaseId) => {
    try {
      const db = getDatabase();
      await remove(ref(db, `analytics/tickets/${firebaseId}`));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-6 max-w-6xl mx-auto pb-12"
    >
      <div>
        <h2 className="text-xl font-black border-l-4 border-red-500 pl-3 uppercase tracking-wider">
          Gate Operations & Incident Dispatch Control
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          High-tier oversight parameters mapped across incoming terminal security request streams.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COMPLAINTS DISPATCH TERMINAL SHOWCASING EXTENDED USER DATA */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-[28px] p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Student Violation Log Feeds
          </h3>

          {tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((t) => (
                <div 
                  key={t.firebaseId} 
                  className="bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-xs flex flex-col justify-between gap-4"
                >
                  {/* Detailed Incident Meta Block Header Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-3 border-b border-white/5 text-[11px] text-slate-400">
                    <div>👤 Name: <span className="text-white font-bold">{t.reporterName || "Anonymous Node"}</span></div>
                    <div>🆔 ID: <span className="text-cyan-400 font-bold">{t.reporterId || "N/A"}</span></div>
                    <div>✉️ Email: <span className="text-slate-300 font-bold text-[10px] break-all">{t.reporterEmail || "N/A"}</span></div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-slate-200 leading-relaxed text-[11px] bg-white/[0.01] p-3 rounded-xl border border-white/5">
                      {t.message}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-red-400 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                      STATUS:: PENDING_DISPATCH
                    </span>
                    <button
                      onClick={() => handleResolveTicket(t.firebaseId)}
                      className="bg-red-600 hover:bg-red-700 text-white font-black px-3 py-2 rounded-xl transition text-[10px] uppercase cursor-pointer"
                    >
                      Settle Incident Ticket ✅
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 border border-white/5 bg-black/20 rounded-xl text-center text-slate-500 font-mono text-xs">
              ✅ Clear Grid Status: No vehicle violation incident entries recorded currently.
            </div>
          )}
        </div>

        {/* ACCESS LOG TERMINAL */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[28px] p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">RFID Barrier Monitor Log</h3>
          <div className="space-y-3 font-mono text-xs">
            {gateLog.map((log, index) => (
              <div key={index} className="p-3 bg-black/40 border border-white/5 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-cyan-400 font-black block">{log.plate}</span>
                  <span className="text-[10px] text-slate-500">{log.model} • {log.time}</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {log.access}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default SecurityPanel;

