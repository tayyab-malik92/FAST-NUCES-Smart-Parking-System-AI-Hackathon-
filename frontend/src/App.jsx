import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Core Components & Routing Protection
import Header from "./components/Header";
import AdminPanel from "./components/AdminPanel";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

// Shared Common Pages (Visible to Both Roles)
import Dashboard from "./pages/Dashboard";
import VehicleProfile from "./pages/VehicleProfile";

// Student Restricted Pages
import SlotLayout from "./pages/SlotLayout";
import Analytics from "./pages/Analytics";
import Guidelines from "./pages/Guidelines";
import Booking from "./pages/Booking";
import Wallet from "./pages/Wallet";

// Employee / Security Guard Restricted Pages
import SecurityPanel from "./pages/SecurityPanel";
import ShiftLog from "./pages/ShiftLog";
import VehicleRegistry from "./pages/VehicleRegistry";
import EmployeeAnalytics from "./pages/EmployeeAnalytics";

// Realtime Database Pipeline Bridge
import { subscribeToZones } from "./services/parkingService";

// Session Authorization Boundary Check
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuthenticated") === "true";
  return isAuth ? children : <Navigate to="/login" replace />;
};

function App() {
  const [zones, setZones] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Custom State handling for the Premium Full-Screen Logout Sequence
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const navigate = useNavigate();
  const currentRole = localStorage.getItem("userRole") || "student";

  // Global Realtime Database Subscriber Node Hook
  useEffect(() => {
    const unsubscribe = subscribeToZones(
      (updatedZones) => { 
        setZones(updatedZones); 
        setLoading(false); 
      },
      (errMsg) => { 
        setError(errMsg); 
        setLoading(false); 
      }
    );
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  // Safe structured execution cycle handling logging updates parameters safely
  const triggerSessionLogout = () => {
    setIsLoggingOut(true);
    
    // Smooth countdown delay timer mock pipeline teardown sequence
    setTimeout(() => {
      localStorage.clear(); // Wipe transient operational context keys clean
      setIsLoggingOut(false);
      setActiveTab("dashboard"); // Reset default index view state pointers
      navigate("/");
    }, 2500);
  };

  // Main Loading Screen Asset
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#070b13]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full"
        />
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Syncing Active Core Nodes...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#070b13]">
      
      {/* 🌀 PREMIUM FULL-SCALE FULLSCREEN LOGOUT PROCESSING OVERLAY SCREEN */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#070b13]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-4 text-white font-mono"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-4xl"
            >
              🔄
            </motion.div>
            <h3 className="text-base font-black uppercase tracking-widest text-cyan-400">Teardown Active Session Pipeline</h3>
            <p className="text-slate-500 text-xs text-center max-w-xs leading-relaxed">
              De-allocating dashboard assets and flushing transient authorization data safely from client cluster memory...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE ROUTING MATRIX LAYER */}
      <Routes>
        {/* Public Screens */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        {/* Secured Workspace App Matrix Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="p-4 md:p-6 max-w-7xl mx-auto">
                
                {/* HIGH-VISIBILITY PROFESSIONAL LOGOUT CONTROL ACTION TRIGGER */}
                <div className="flex justify-end mb-2">
                  <button 
                    onClick={triggerSessionLogout}
                    className="text-[10px] font-bold uppercase font-mono tracking-wider bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl text-red-400 hover:bg-red-500 hover:text-black transition-all duration-300 select-none cursor-pointer"
                  >
                    Logout Session 🚪
                  </button>
                </div>

                {/* Shared Navigation Tabs Handler */}
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* System Synchronicity Failure Banner Warnings */}
                {error && (
                  <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-yellow-400 text-xs font-mono">
                    ⚠️ Realtime Error: {error}
                  </div>
                )}

                {/* DYNAMIC WORKSPACE COMPONENT LAYER DISPATCHER */}
                <AnimatePresence mode="wait">
                  
                  {/* Common Area View Elements (Shared by Both Roles) */}
                  {activeTab === "dashboard" && <Dashboard key="dashboard" zones={zones} />}
                  {activeTab === "profile" && <VehicleProfile key="profile" />} 
                  
                  {/* Strict Student Restricted Pipeline Nodes */}
                  {currentRole === "student" && activeTab === "layout" && <SlotLayout key="layout" zones={zones} />}
                  {currentRole === "student" && activeTab === "booking" && <Booking key="booking" zones={zones} />}
                  {currentRole === "student" && activeTab === "analytics" && <Analytics key="analytics" zones={zones} />}
                  {currentRole === "student" && activeTab === "wallet" && <Wallet key="wallet" />}
                  {currentRole === "student" && activeTab === "guidelines" && <Guidelines key="guidelines" />}

                  {/* Strict Employee / Security Guard Restricted Pipeline Nodes */}
                  {currentRole === "employee" && activeTab === "security" && <SecurityPanel key="security" />}
                  {currentRole === "employee" && activeTab === "roster" && <ShiftLog key="roster" />}
                  {currentRole === "employee" && activeTab === "registry" && <VehicleRegistry key="registry" />}
                  {currentRole === "employee" && activeTab === "empanalytics" && <EmployeeAnalytics key="empanalytics" />}
                  {currentRole === "employee" && activeTab === "admin" && <AdminPanel key="admin" zones={zones} />}

                </AnimatePresence>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Global Fallback Route Redirector */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
