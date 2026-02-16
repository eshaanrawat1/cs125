import React from 'react';
import Badge from '../atoms/Badge';
import Typography from '../atoms/Typography';
import { getUrgencyLabel, getContextBadge } from '../../utils/flightUtils';

const FlightInfo = ({ flight }) => {
  const urgency = getUrgencyLabel(flight.date);
  const badge = getContextBadge(flight);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Badge color={badge.color}>{flight.category}</Badge>
        <Badge color="bg-yellow-50 text-gray-500 border-yellow-100 border">{flight.weather}</Badge>
      </div>
      <Typography variant="h3" className="text-xl">
        {flight.src} <span className="text-gray-400">→</span> {flight.dst}
      </Typography>
      <div className="text-sm mt-1">
        <span className={urgency.color}>{urgency.text}</span>
        <span className="text-gray-400 mx-2">•</span>
        <span className="text-gray-500">
          {flight.date} • {flight.duration.replace("PT", "").toLowerCase()}
        </span>
      </div>
    </div>
  );
};

export default FlightInfo;
