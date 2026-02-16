import React from 'react';
import Button from '../atoms/Button';
import SearchFormFields from '../molecules/SearchFormFields';

const SearchSection = ({ origin, setOrigin, cities, setCities, maxBudget, setMaxBudget, onSearch, loading }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
    <SearchFormFields 
      origin={origin} setOrigin={setOrigin}
      cities={cities} setCities={setCities}
      maxBudget={maxBudget} setMaxBudget={setMaxBudget}
    />
    <Button 
      onClick={onSearch}
      className="md:col-span-3"
    >
      {loading ? 'Analyzing Schedules...' : 'Find Smart Itineraries'}
    </Button>
  </div>
);

export default SearchSection;
