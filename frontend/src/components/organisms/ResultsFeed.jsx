import React from 'react';
import FlightCard from './FlightCard';

const ResultsFeed = ({ flights, onFlightClick }) => (
  <div className="space-y-4">
    {flights.map((flight, index) => (
      <FlightCard 
        key={index} 
        flight={flight} 
        onClick={onFlightClick}
      />
    ))}
  </div>
);

export default ResultsFeed;
