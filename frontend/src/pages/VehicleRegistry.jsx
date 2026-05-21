import React, { useState } from "react";
import { motion } from "framer-motion";

function VehicleRegistry() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const mockDatabase = [
    { id: "24L-0634", name: "Muhammad Tayyab", plate: "LEW-2026", type: "Motorcycle", pass: "Valid Pass", violations: 0 },
    { id: "24L-0772", name: "Abdullah Khan", plate: "ICT-4412", type: "Car", pass: "Valid Pass", violations: 1 },
    { id: "23L-9910", name: "Zain Ali", plate: "LHR-8890", type: "Car", pass: "Expired Pass", violations: 3 }
  ];

  const filteredRecords = mockDatabase.filter(user => 
    user.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.plate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-white space-y-6 max-w-5xl mx-auto pb-12 font-mono text-xs"
    >
      <div>
        <h2 className="text-xl font-black border-l-4 border-purple-500 pl-3 uppercase tracking-wider">FAST Vehicle Registry Database</h2>
        <p className="text-slate-400 text-[11px] mt-0.5">Query smart authorization tags and gate clearance profiles instantly.</p>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-[24px] p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Student ID (e.g., 24L-0634) or License Plate..."
          className="w-full bg-[#0c1424] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-[28px] p-6 shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-500 uppercase text-[10px] tracking-widest">
              <th className="pb-3">Student Name / ID</th>
              <th className="pb-3">Plate Code</th>
              <th className="pb-3">Classification</th>
              <th className="pb-3">RFID Status</th>
              <th className="pb-3 text-right">Infractions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[11px]">
            {filteredRecords.map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.01] transition-all">
                <td className="py-3.5">
                  <span className="text-white font-bold block">{row.name}</span>
                  <span className="text-slate-500 text-[10px]">{row.id}</span>
                </td>
                <td className="py-3.5 text-cyan-400 font-bold">{row.plate}</td>
                <td className="py-3.5 text-slate-400">{row.type}</td>
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    row.pass === "Valid Pass" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {row.pass}
                  </span>
                </td>
                <td className={`py-3.5 text-right font-bold ${row.violations > 1 ? "text-red-400" : "text-slate-400"}`}>
                  {row.violations} Logs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default VehicleRegistry;
