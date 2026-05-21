import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // "student" or "employee"
  const [customId, setCustomId] = useState("");
  const [authError, setAuthError] = useState("");
  
  const navigate = useNavigate();

  const handleAuthSequence = (e) => {
    e.preventDefault();
    setAuthError("");

    // 1. Check for blank fields
    if (!email || !name || !password || !customId) {
      setAuthError("Please fill out all identity deployment tracking fields.");
      return;
    }

    // 🔥 NEW SECURITY CHECK: Enforce exactly 6 characters for the passkey
    if (password.length !== 6) {
      setAuthError("Security Key Restriction: Passkey must be exactly 6 characters long.");
      return;
    }

    // 2. Role-Based Custom Identification Checks
    if (role === "student") {
      const studentIdRegex = /^\d{2}L-\d{4}$/;
      if (!studentIdRegex.test(customId.trim())) {
        setAuthError("Invalid Student ID format. Expected standard template: YY-L-XXXX (e.g., 24L-0634)");
        return;
      }
    } else if (role === "employee") {
      const employeeIdRegex = /^\d{6}$/;
      if (!employeeIdRegex.test(customId.trim())) {
        setAuthError("Security Failure: Employee ID terminal requires a clean 6-digit verification code.");
        return;
      }
    }

    // Cache Session Meta Credentials directly into local client infrastructure
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", customId.trim());
    localStorage.setItem("userName", name.trim());
    localStorage.setItem("userEmail", email.trim());

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#070b13] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[36px] p-8 w-full max-w-md shadow-2xl space-y-6"
      >
        <div className="text-center">
          <span className="text-4xl">🔐</span>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider mt-2">Identity Hub Login</h2>
          <p className="text-slate-500 text-xs font-mono">FAST Campus Smart Parking Matrix</p>
        </div>

        {authError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-mono font-bold text-center">
            ⚠️ {authError}
          </div>
        )}

        <form onSubmit={handleAuthSequence} className="space-y-4 font-mono text-xs text-slate-300">
          
          {/* ROLE SELECTOR SLIDER TOGGLE */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Select System Operational Access Role
            </label>
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => { setRole("student"); setCustomId(""); }}
                className={`py-2 rounded-lg font-bold transition-all uppercase select-none cursor-pointer ${
                  role === "student" ? "bg-cyan-500 text-black font-black" : "text-slate-400 hover:text-white"
                }`}
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => { setRole("employee"); setCustomId(""); }}
                className={`py-2 rounded-lg font-bold transition-all uppercase select-none cursor-pointer ${
                  role === "employee" ? "bg-purple-500 text-black font-black" : "text-slate-400 hover:text-white"
                }`}
              >
                👮‍♂️ Employee
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Muhammad Tayyab"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-400 text-white transition"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">Campus Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., tayyab.malik@nu.edu.pk"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-400 text-white transition"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
              {role === "student" ? "FAST Student ID (YY-L-XXXX)" : "Corporate Employee ID (6 Digits)"}
            </label>
            <input
              type="text"
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
              placeholder={role === "student" ? "e.g., 24L-0634" : "e.g., 880432"}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-400 text-white transition font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">Secure Passkey (Must be 6 characters)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g., 123456"
              maxLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-400 text-white transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 font-black py-3 rounded-xl transition text-black uppercase tracking-wider text-xs shadow-lg mt-2 cursor-pointer"
          >
            Deploy Node Dashboard Access 🚀
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
