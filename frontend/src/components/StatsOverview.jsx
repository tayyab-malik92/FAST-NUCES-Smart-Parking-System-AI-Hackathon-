import { motion } from "framer-motion";
import { FaCar, FaParking, FaCheckCircle, FaChartPie } from "react-icons/fa";

const StatsOverview = ({ zones }) => {
  const totalSpots = zones.reduce((sum, z) => sum + (Number(z.totalSpots) || 0), 0);
  const totalOccupied = zones.reduce((sum, z) => sum + (Number(z.occupiedSpots) || 0), 0);
  const totalAvailable = totalSpots - totalOccupied;
  const overallPercentage = totalSpots > 0
    ? Math.round((totalOccupied / totalSpots) * 100)
    : 0;

  const stats = [
    {
      label: "Total Spots",
      value: totalSpots,
      icon: FaParking,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Occupied",
      value: totalOccupied,
      icon: FaCar,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Available",
      value: totalAvailable,
      icon: FaCheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Occupancy",
      value: `${overallPercentage}%`,
      icon: FaChartPie,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="glass-card p-4 group hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
            >
              <stat.icon className="text-white text-sm" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;
