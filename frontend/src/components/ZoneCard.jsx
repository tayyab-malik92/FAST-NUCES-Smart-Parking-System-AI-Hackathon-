import { motion } from "framer-motion";
import { getStatusInfo } from "../utils/helpers";

const ZoneCard = ({ zone, index }) => {
  // NaN-safe values
  const totalSpots = Number(zone.totalSpots) || 0;
  const occupiedSpots = Number(zone.occupiedSpots) || 0;
  const availableSpots = totalSpots - occupiedSpots;
  const occupancyPercentage =
    totalSpots > 0 ? Math.round((occupiedSpots / totalSpots) * 100) : 0;

  const status = getStatusInfo(occupancyPercentage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 hover:border-white/20 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{zone.icon}</span>
          <div>
            <h3 className="font-semibold text-white text-lg">{zone.name}</h3>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`}
              ></span>
              <span className={`text-xs font-medium ${status.color}`}>
                {status.label}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color}`}
        >
          {occupancyPercentage}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${occupancyPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${status.gradient}`}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 bg-slate-800/50 rounded-lg">
          <p className="text-xs text-slate-400">Total</p>
          <p className="text-lg font-bold text-white">{totalSpots}</p>
        </div>
        <div className="text-center p-2 bg-slate-800/50 rounded-lg">
          <p className="text-xs text-slate-400">Occupied</p>
          <p className="text-lg font-bold text-orange-400">{occupiedSpots}</p>
        </div>
        <div className="text-center p-2 bg-slate-800/50 rounded-lg">
          <p className="text-xs text-slate-400">Available</p>
          <p className="text-lg font-bold text-green-400">{availableSpots}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ZoneCard;
