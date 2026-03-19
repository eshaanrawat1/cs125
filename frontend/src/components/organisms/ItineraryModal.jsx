import React, { useState, useEffect } from 'react';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import { HiSun, HiCloud, HiMoon, HiLightBulb, HiCheckCircle } from 'react-icons/hi';

const ItineraryModal = ({ flight, onClose }) => {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const days = flight.trip_duration || 3;
        const response = await fetch(`http://127.0.0.1:8000/itinerary?dst=${flight.dst}&date=${flight.date}&days=${days}`);
        const data = await response.json();
        setItinerary(data);
      } catch (err) {
        console.error("Failed to fetch itinerary", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [flight]);

  const googleFlightsUrl = `https://www.google.com/travel/flights?q=Flights%20from%20${flight.src}%20to%20${flight.dst}%20on%20${flight.date}`;

  const getTimeIcon = (time) => {
    if (time.toLowerCase().includes('morning')) return <HiSun className="text-orange-400 w-5 h-5" />;
    if (time.toLowerCase().includes('afternoon')) return <HiCloud className="text-blue-400 w-5 h-5" />;
    if (time.toLowerCase().includes('evening')) return <HiMoon className="text-indigo-400 w-5 h-5" />;
    return <HiCheckCircle className="text-green-400 w-5 h-5" />;
  };

  const currentDayData = itinerary?.days?.find(d => d.day === activeDay);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gradient-to-br from-blue-50 to-white">
          <div className="space-y-1">
            <Typography variant="h2" className="text-3xl font-extrabold tracking-tight text-gray-900">
              {flight.dst} Expedition
            </Typography>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                {flight.trip_duration || 3}-Day Itinerary
              </span>
              <span className="text-gray-400 text-sm">•</span>
              <Typography variant="detail" className="text-gray-500 font-medium italic">
                Starting {flight.date}
              </Typography>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        {!loading && itinerary && (
          <div className="px-8 pt-4 flex gap-2 border-b border-gray-50 bg-white">
            {itinerary.days.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`pb-3 px-4 text-sm font-bold transition-all relative ${
                  activeDay === day.day 
                    ? 'text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Day {day.day}
                {activeDay === day.day && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {loading ? (
            <div className="space-y-6">
              <div className="h-6 bg-gray-100 rounded-lg w-1/3 animate-pulse" />
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex-shrink-0" />
                  <div className="flex-1 space-y-2 py-2">
                    <div className="h-4 bg-gray-100 rounded w-1/4" />
                    <div className="h-16 bg-gray-50 rounded-xl w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : itinerary ? (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              {/* Day Title */}
              <div>
                <Typography variant="h3" className="text-xl text-gray-800 mb-6">
                  {currentDayData?.title || `Day ${activeDay} Highlights`}
                </Typography>

                {/* Activities */}
                <div className="space-y-6 relative before:absolute before:left-[1.625rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100">
                  {currentDayData?.activities.map((act, i) => (
                    <div key={i} className="flex gap-6 relative group">
                      <div className="w-[3.25rem] h-[3.25rem] bg-white border-2 border-gray-50 shadow-sm rounded-2xl flex items-center justify-center flex-shrink-0 z-10 transition-transform group-hover:scale-110">
                        {getTimeIcon(act.time)}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                            {act.time}
                          </span>
                          {act.label && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold rounded uppercase tracking-tighter">
                              {act.label}
                            </span>
                          )}
                        </div>
                        <Typography variant="body" className="text-gray-700 leading-relaxed text-[15px]">
                          {act.description}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips Section (only on the last day) */}
              {activeDay === (itinerary.days.length) && itinerary.tips && (
                <div className="mt-12 bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50 space-y-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <HiLightBulb className="w-5 h-5" />
                    <span className="font-bold text-sm uppercase tracking-wider">Travel Intelligence</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {itinerary.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm text-amber-900/80 leading-snug">
                        <span className="text-amber-400 mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl font-bold">!</div>
              <Typography variant="h3">Adventure Interrupted</Typography>
              <Typography variant="body" className="text-gray-500 max-w-xs">
                We couldn't reach the local guides right now. Please try again in a moment.
              </Typography>
              <Button variant="filter" onClick={onClose}>Dismiss</Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/30 flex gap-4">
          <div className="flex-1">
            <Typography variant="detail" className="text-gray-400 block mb-1">Total Estimated Fare</Typography>
            <Typography variant="h3" className="text-2xl">${flight.totalFare}</Typography>
          </div>
          <div className="flex gap-3">
            <Button variant="filter" className="px-8 border-gray-200" onClick={onClose}>
              Maybe Later
            </Button>
            <Button 
              className="px-10 shadow-lg shadow-blue-200" 
              onClick={() => window.open(googleFlightsUrl, '_blank')}
            >
              Book Adventure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryModal;
