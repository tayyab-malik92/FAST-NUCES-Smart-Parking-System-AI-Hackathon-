export const getStatusInfo = (percentage) => {
  if (percentage >= 90) {
    return {
      label: "Full",
      color: "text-red-400",
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      ring: "ring-red-500/30",
      dot: "bg-red-500",
      gradient: "from-red-500 to-rose-600",
    };
  }
  if (percentage >= 70) {
    return {
      label: "Nearly Full",
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/50",
      ring: "ring-yellow-500/30",
      dot: "bg-yellow-500",
      gradient: "from-yellow-500 to-amber-600",
    };
  }
  return {
    label: "Available",
    color: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-500/50",
    ring: "ring-green-500/30",
    dot: "bg-green-500",
    gradient: "from-green-500 to-emerald-600",
  };
};

export const formatTime = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
