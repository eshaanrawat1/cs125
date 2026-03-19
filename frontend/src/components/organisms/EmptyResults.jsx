import React from 'react';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';

const EmptyResults = ({ origin, minBudget, maxBudget, resultsFound, filter, onClearFilter }) => {
  if (resultsFound) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
        <Typography variant="body">No results matching the "{filter}" filter.</Typography>
        <Button variant="ghost" onClick={onClearFilter} className="mt-2">
          Clear filter
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-16 px-6 bg-white rounded-xl border-2 border-dashed border-gray-200">
      <div className="text-6xl mb-6 grayscale opacity-80">🤔</div>
      <Typography variant="h3" className="mb-2">
        No itineraries found
      </Typography>
      <Typography variant="body" className="mb-6 max-w-md mx-auto">
        We couldn't find any flights from <span className="font-semibold text-gray-700">{origin}</span> to your destinations within the 
        <span className="font-semibold text-gray-700"> ${minBudget} - ${maxBudget}</span> budget.
      </Typography>
      <div className="flex flex-wrap justify-center gap-3 text-sm">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
          💡 Tip: Try increasing your budget
        </span>
        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
          💡 Tip: Check for typos in city codes
        </span>
      </div>
    </div>
  );
};

export default EmptyResults;
