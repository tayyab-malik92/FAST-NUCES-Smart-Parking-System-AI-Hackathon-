import { motion } from "framer-motion";
import { getStatusInfo } from "../utils/helpers";

const OccupancyChart = ({ zones }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6 mb-6"
    >
      <h2 className="text-lg font-semibold text-white mb-4">
        Zone Occupancy Overview
      </h2>
      <div className="space-y-4">
        {zones.map((zone) => {
          const totalSpots = Number(zone.totalSpots) || 0;
          const occupiedSpots = Number(zone.occupiedSpots) || 0;
          const occupancyPercentage =
            totalSpots > 0 ? Math.round((occupiedSpots / totalSpots) * 100) : 0;
          const status = getStatusInfo(occupancyPercentage);
          return (
            <div key={zone.id} className="flex items-center gap-4">
              <span className="text-2xl w-8">{zone.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-300">{zone.name}</span>
                  <span className={`text-sm font-medium ${status.color}`}>
                    {occupiedSpots}/{totalSpots}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${occupancyPercentage}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${status.gradient}`}
                  />
                </div>
              </div>
              <span
                className={`text-sm font-bold ${status.color} min-w-[40px] text-right`}
              >
                {occupancyPercentage}%
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default OccupancyChart;
