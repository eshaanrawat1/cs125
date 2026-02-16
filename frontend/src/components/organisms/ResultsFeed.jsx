import React from 'react';
import FlightCard from './FlightCard';

const ResultsFeed = ({ flights }) => (
  <div className="space-y-4">
    {flights.map((flight, index) => (
      <FlightCard key={index} flight={flight} />
    ))}
  </div>
);

export default ResultsFeed;
