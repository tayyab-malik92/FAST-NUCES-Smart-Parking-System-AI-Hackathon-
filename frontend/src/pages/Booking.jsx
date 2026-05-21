import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, set } from "firebase/database";

function Booking({ zones }) {
  const [selectedZone, setSelectedZone] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [activeBooking, setActiveBooking] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 Minutes countdown

  // کاؤنٹ ڈاؤن ٹائمر ہینڈلر
  useEffect(() => {
    let timer;
    if (activeBooking && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeBooking, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedZone || !timeSlot) return;

    const targetZone = zones.find((z) => z.id === selectedZone);
    if (!targetZone) return;

    // چیک کریں کہ گنجائش ہے یا نہیں
    const occupied = targetZone.occupiedSpots || 0;
    const total = targetZone.totalSpots || 100;
    if (occupied >= total) {
      alert("❌ Selection failed: No empty nodes available in this sector!");
      return;
    }

    try {
      const newOccupied = occupied + 1;
      const db = getDatabase();
      
      // فائر بیس پر لائیو کاؤنٹر اپڈیٹ کریں
      await set(ref(db, `parking/${selectedZone}/occupiedSpots`), newOccupied);

      // لوکل بکنگ اسٹیٹ سیٹ کریں
      setActiveBooking({
        zoneName: targetZone.name,
        slot: timeSlot,
        ticketId: `FAST-PK-${Math.floor(1000 + Math.random() * 9000)}`,
      });
      setTimeLeft(1800); // کلاک ری سیٹ کریں
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-8 max-w-5xl mx-auto pb-12"
    >
      <div>
        <h2 className="text-2xl font-black border-l-4 border-pink-500 pl-3 uppercase tracking-wider">
          Advanced Slot Reservation Terminal
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Lock a structural parking node allocation prior to your arrival at FAST campus gates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BOOKING INPUT CARD */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-xl space-y-6">
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-300">Reserve New Grid Node</h3>
          
          <form onSubmit={handleBooking} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Select Destination Level
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full bg-[#0c1424] border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-pink-500 text-white transition font-mono"
              >
                <option value="">-- Select Zone --</option>
                {zones && zones.map(z => (
                  <option key={z.id} value={z.id}>{z.name} ({z.totalSpots - z.occupiedSpots} Free)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Time Window Block
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-[#0c1424] border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-pink-500 text-white transition font-mono"
              >
                <option value="">-- Choose Arrival Window --</option>
                <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM (Morning Load)</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Mid-Day)</option>
                <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM (Afternoon Class)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={activeBooking !== null}
              className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-20 text-white font-black py-3.5 rounded-xl transition text-xs uppercase tracking-wider shadow-lg shadow-pink-600/10 cursor-pointer"
            >
              Authorize Pre-Booking 🎟️
            </button>
          </form>
        </div>

        {/* ACTIVE E-TICKET RESPONSE WINDOW */}
        <div className="flex flex-col justify-center">
          {activeBooking ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-pink-950/20 via-[#0c1424] to-black border-2 border-pink-500/30 rounded-[32px] p-6 text-center space-y-6 shadow-xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/5 rounded-full filter blur-2xl" />
              
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-pink-400 uppercase bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
                  Gate Reservation Locked
                </span>
                <h4 className="text-3xl font-black font-mono text-white mt-3">{activeBooking.ticketId}</h4>
              </div>

              <div className="border-y border-white/5 py-4 space-y-2 font-mono text-xs">
                <p className="text-slate-400">Level Allocation: <strong className="text-white">{activeBooking.zoneName}</strong></p>
                <p className="text-slate-400">Arrival Window: <strong className="text-white">{activeBooking.slot}</strong></p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-wider">Gate Hold Time Left</span>
                <span className="text-4xl font-black font-mono text-pink-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <p className="text-[10px] text-slate-500 italic leading-relaxed">
                *Please scan your Digital Pass QR Code at the main barrier before the timer hits 00:00 to verify structural placement.
              </p>
            </motion.div>
          ) : (
            <div className="border-2 border-dashed border-white/10 rounded-[32px] p-12 text-center text-slate-500 font-mono text-xs flex flex-col items-center justify-center h-full">
              <span>🎟️ No Active Pre-Booking Tracked For This Session.</span>
              <p className="text-[11px] text-slate-600 mt-2 max-w-xs leading-relaxed">
                Fill the structural framework form on the left to intercept and hold an automated sensor slot.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Booking;
