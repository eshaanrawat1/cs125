import React from 'react';
import FlightInfo from '../molecules/FlightInfo';
import FlightPricing from '../molecules/FlightPricing';

const FlightCard = ({ flight }) => {
  const googleFlightsUrl = `https://www.google.com/travel/flights?q=Flights%20from%20${flight.src}%20to%20${flight.dst}%20on%20${flight.date}`;

  return (
    <a 
      href={googleFlightsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex justify-between items-center group block cursor-pointer hover:border-blue-300"
    >
      <FlightInfo flight={flight} />
      <FlightPricing flight={flight} />
    </a>
  );
};

export default FlightCard;
