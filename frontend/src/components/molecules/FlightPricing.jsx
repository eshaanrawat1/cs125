import React from 'react';
import Typography from '../atoms/Typography';

const FlightPricing = ({ flight }) => (
  <div className="text-right">
    <Typography variant="price" className="group-hover:scale-110 transition-transform">
      ${flight.totalFare}
    </Typography>
    <Typography variant="score">
      Relevance Score: {flight.score}
    </Typography>
    <div className="text-xs text-blue-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
      View on Google Flights →
    </div>
  </div>
);

export default FlightPricing;
