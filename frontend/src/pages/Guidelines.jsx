import React, { useState } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, push } from "firebase/database";

function Guidelines() {
  const [ticketText, setTicketText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!ticketText.trim()) return;

    try {
      const db = getDatabase();
      
      await push(ref(db, "analytics/tickets"), {
        message: ticketText,
        timestamp: Date.now(),
        status: "Pending Investigation",
        reporterName: localStorage.getItem("userName") || "FAST Student",
        reporterId: localStorage.getItem("userId") || "24L-XXXX",
        reporterEmail: localStorage.getItem("userEmail") || "unknown@nu.edu.pk"
      });

      setTicketText("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("Firebase ticket submission failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-8 max-w-4xl mx-auto pb-12 font-mono"
    >
      {/* CAMPUS PARKING RULES BLOCK (UPDATED FOR HIGH READABILITY) */}
      <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl font-black border-l-4 border-cyan-400 pl-4 uppercase tracking-wider text-white">
            Campus Regulatory Guidelines
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Official vehicle administration protocols for FAST Lahore Campus.
          </p>
        </div>

        {/* Structured High-Visibility Rules */}
        <div className="grid grid-cols-1 gap-4 pt-2">
          <div className="bg-black/30 border border-white/5 p-5 rounded-2xl flex items-start gap-4 transition hover:border-white/10">
            <span className="text-2xl mt-0.5">🚫</span>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wide">Strict No-Parking Zones</h4>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Do not park in front of faculty rows, main walkways, or transit entrance rmaps. Vehicles violating lane discipline will be penalized immediately.
              </p>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 p-5 rounded-2xl flex items-start gap-4 transition hover:border-white/10">
            <span className="text-2xl mt-0.5">🪪</span>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wide">RFID Tag Compliance</h4>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Ensure your registered vehicle pass tag is displayed clearly on your front windshield. This allows the main gate barrier sensors to execute automated scans without delays.
              </p>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 p-5 rounded-2xl flex items-start gap-4 transition hover:border-white/10">
            <span className="text-2xl mt-0.5">🛑</span>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wide">Internal Speed Boundaries</h4>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Maintain a maximum speed ceiling of <span className="text-cyan-400 font-bold">15 km/h</span> inside all structural parking levels and basement transit pathways to ensure student safety.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT AN ISSUE / COMPLAINT FORM */}
      <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
            🚨 Incident Report Dispatch
          </h3>
          <p className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">
            Notice a vehicle blocking a lane or parking illegally? Submit a ticket below to alert the active security guard monitor console instantly.
          </p>
        </div>

        {submitted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold rounded-xl text-center text-xs uppercase tracking-wider"
          >
            🚀 Incident transmitted successfully! Ground units notified.
          </motion.div>
        )}

        <form onSubmit={handleCreateTicket} className="space-y-4">
          <textarea
            value={ticketText}
            onChange={(e) => setTicketText(e.target.value)}
            placeholder="Provide explicit details (e.g., Black Corolla, Plate LHR-772 blocking lane 2 in Basement A)..."
            rows="5"
            className="w-full bg-[#0c1424] border border-white/10 rounded-2xl p-4 text-xs md:text-sm focus:outline-none focus:border-red-500 text-white transition placeholder-slate-600 resize-none leading-relaxed"
          />

          <button
            type="submit"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3.5 rounded-xl transition text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-red-900/20"
          >
            Broadcast to Guard Station 📡
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Guidelines;


