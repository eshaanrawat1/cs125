import React from 'react';
import FlightInfo from '../molecules/FlightInfo';
import FlightPricing from '../molecules/FlightPricing';

const FlightCard = ({ flight, onClick }) => {
  return (
    <div 
      onClick={() => onClick(flight)}
      className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex justify-between items-center group block cursor-pointer hover:border-blue-300 active:scale-[0.99]"
    >
      <FlightInfo flight={flight} />
      <FlightPricing flight={flight} />
    </div>
  );
};

export default FlightCard;
