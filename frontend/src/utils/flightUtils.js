export const getUrgencyLabel = (dateStr) => {
  const flightDate = new Date(dateStr);
  const today = new Date();
  const diffTime = Math.abs(flightDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return { text: "⏰ Departs Soon", color: "text-red-600 font-bold" };
  if (diffDays <= 3) return { text: "📅 This Week", color: "text-orange-600" };
  return { text: `In ${diffDays} days`, color: "text-gray-500" };
};

export const getHours = (durationStr) => {
  const match = durationStr.match(/(\d+)H/);
  return match ? parseInt(match[1]) : 0;
};

export const getContextBadge = (flight) => {
  const price = parseFloat(flight.totalFare);
  const score = parseFloat(flight.score);
  const hours = getHours(flight.duration);
  
  const [y, m, d] = flight.date.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const day = date.getDay();

  if (day === 5 || day === 6) {
    return { label: "🎉 Weekend Escape", color: "bg-pink-100 text-pink-800 border border-pink-200" };
  }

  if (hours > 0 && hours < 3) {
    return { label: "⚡ Quick Trip", color: "bg-blue-100 text-blue-800 border border-blue-200" };
  }

  if (score > 50) { 
    return { label: "💰 Best Value", color: "bg-green-100 text-green-800 border border-green-200" };
  }

  if (price < 300) {
    return { label: "👍 Recommended", color: "bg-purple-100 text-purple-800 border border-purple-200" };
  }

  return { label: "✈️ Available", color: "bg-gray-100 text-gray-800 border border-gray-200" };
};
