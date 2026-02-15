import { useState } from 'react'
import { FaRegPaperPlane } from "react-icons/fa";

function App() {
  const [origin, setOrigin] = useState("LGA")
  const [cities, setCities] = useState("MIA, SFO")
  const [maxBudget, setMaxBudget] = useState(500)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/search?origin=${origin}&cities=${cities}&min_budget=0&max_budget=${maxBudget}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const getUrgencyLabel = (dateStr) => {
    const flightDate = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(flightDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return { text: "⏰ Departs Soon", color: "text-red-600 font-bold" };
    if (diffDays <= 3) return { text: "📅 This Week", color: "text-orange-600" };
    return { text: `In ${diffDays} days`, color: "text-gray-500" };
  };

  const getHours = (durationStr) => {
    const match = durationStr.match(/(\d+)H/);
    return match ? parseInt(match[1]) : 0;
  };

  const getContextBadge = (flight) => {
    const price = parseFloat(flight.totalFare);
    const score = parseFloat(flight.score);
    const hours = getHours(flight.duration);
    
    const [y, m, d] = flight.date.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const day = date.getDay();

    // PRIORITY 1: The "Student" features (Day & Time)
    // If it's a Friday/Saturday departure, tag it as a "Weekend Escape"
    if (day === 5 || day === 6) {
      return { label: "🎉 Weekend Escape", color: "bg-pink-100 text-pink-800 border border-pink-200" };
    }

    // If it's short (< 3 hours), tag it "Quick Trip"
    if (hours > 0 && hours < 3) {
      return { label: "⚡ Quick Trip", color: "bg-blue-100 text-blue-800 border border-blue-200" };
    }

    // PRIORITY 2: The "Value" features (Score & Price)
    // With score = 10000/price, a score > 50 means Price < $200
    if (score > 50) { 
      return { label: "💰 Best Value", color: "bg-green-100 text-green-800 border border-green-200" };
    }

    // Default fallbacks
    if (price < 300) {
      return { label: "👍 Recommended", color: "bg-purple-100 text-purple-800 border border-purple-200" };
    }

    return { label: "✈️ Available", color: "bg-gray-100 text-gray-800 border border-gray-200" };
  }

  // Helper to mock weather (Proposal Section 4.2)
  const getWeather = () => Math.random() > 0.5 ? "☀️ Sunny" : "⛅ Cloudy";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 flex items-center justify-center gap-2">
          <FaRegPaperPlane size={25}/>
          FAANGPLS <span className="text-blue-600">Smart Travel Advising</span>
        </h1>
        
        {/* Search Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coming From</label>
            <input 
              type="text" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Origin (e.g. LGA)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Going To</label>
            <input 
              type="text" 
              value={cities}
              onChange={(e) => setCities(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Destinations"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Budget: ${maxBudget}</label>
            <input 
              type="range" 
              min="0" max="1000" 
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md active:scale-95"
          >
            {loading ? 'Analyzing Schedules...' : 'Find Smart Itineraries'}
          </button>
        </div>

        {/* Flight Results Feed */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((flight, index) => {
              const badge = getContextBadge(flight);
              return (
                <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group">
                  
                  {/* Left: Flight Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs text-gray-500 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100">
                        {getWeather()}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {flight.src} <span className="text-gray-400">→</span> {flight.dst}
                    </div>
                    <div className="text-sm mt-1">
                      <span className={getUrgencyLabel(flight.date).color}>
                        {getUrgencyLabel(flight.date).text}
                      </span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-500">
                        {flight.date} • {flight.duration.replace("PT", "").toLowerCase()}
                      </span>
                    </div>
                  </div>

                  {/* Right: Price & Score */}
                  <div className="text-right">
                    <div className="text-2xl font-black text-blue-600">
                      ${flight.totalFare}
                    </div>
                    <div className="text-xs text-gray-400 font-medium">
                      Relevance Score: {flight.score}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-16 px-6 bg-white rounded-xl border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-6 grayscale opacity-80">🤔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No itineraries found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                We couldn't find any flights from <span className="font-semibold text-gray-700">{origin}</span> to your destinations within the 
                <span className="font-semibold text-gray-700"> ${maxBudget}</span> budget.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                  💡 Tip: Try increasing your budget
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                  💡 Tip: Check for typos in city codes
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default App