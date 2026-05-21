import React, { useState } from "react";
import { motion } from "framer-motion";

function Wallet() {
  const [balance, setBalance] = useState(1250); // FAST digital mock coins balance
  const [fines, setFines] = useState([
    { id: 1, type: "Wrong Lane Infraction", date: "15-May-2026", amount: 500, status: "Unpaid", zone: "Basement A" },
    { id: 2, type: "Faculty Row Blockage", date: "10-May-2026", amount: 1000, status: "Paid", zone: "Ground Parking" }
  ]);

  const handlePayFine = (fineId, amount) => {
    if (balance < amount) {
      alert("⚠️ Insufficient credit profile balance! Recharge your Campus Pass.");
      return;
    }
    
    // بیلنس کم کریں اور فائن اسٹیٹس اپڈیٹ کریں
    setBalance((prev) => prev - amount);
    setFines((prevFines) =>
      prevFines.map((f) => (f.id === fineId ? { ...f, status: "Paid" } : f))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-8 max-w-5xl mx-auto pb-12"
    >
      <div>
        <h2 className="text-2xl font-black border-l-4 border-amber-500 pl-3 uppercase tracking-wider">
          Campus Micro-Transactions & Ledger
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Settle automated regulatory fine logs or manage your rapid entrance micro-wallet credit balance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* WALLET BALANCE DISPLAY CARD */}
        <div className="bg-gradient-to-br from-amber-600/20 via-[#0c1424] to-black border border-white/10 rounded-[32px] p-6 shadow-xl flex flex-col justify-between space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              Available Transit Credit
            </span>
            <h3 className="text-4xl font-black font-mono text-white pt-2">
              Rs. {balance}.00
            </h3>
          </div>
          
          <button 
            onClick={() => setBalance(prev => prev + 500)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black py-3 rounded-xl transition text-xs uppercase tracking-widest shadow-md cursor-pointer"
          >
            Quick Top-Up (Rs. 500) ⚡
          </button>
        </div>

        {/* FINES RECORD LIST VIEW */}
        <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-[32px] p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-300">Regulatory Violations Record</h3>
          
          <div className="space-y-3">
            {fines.map((fine) => (
              <div 
                key={fine.id} 
                className="bg-black/30 border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200 font-bold">{fine.type}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      fine.status === "Paid" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {fine.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Issued at {fine.zone} on {fine.date}</p>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <span className="text-sm font-black text-slate-300">Rs. {fine.amount}</span>
                  {fine.status === "Unpaid" && (
                    <button
                      onClick={() => handlePayFine(fine.id, fine.amount)}
                      className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/20 font-black px-3 py-1.5 rounded-lg text-[10px] transition uppercase cursor-pointer"
                    >
                      Clear Log 💳
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default Wallet;
