import React from 'react';
import Input from '../atoms/Input';
import RangeInput from '../atoms/RangeInput';

const SearchFormFields = ({ origin, setOrigin, cities, setCities, maxBudget, setMaxBudget }) => (
  <>
    <Input 
      label="Coming From"
      value={origin}
      onChange={(e) => setOrigin(e.target.value)}
      placeholder="Origin (e.g. LGA)"
    />
    <Input 
      label="Going To"
      value={cities}
      onChange={(e) => setCities(e.target.value)}
      placeholder="Destinations"
    />
    <RangeInput 
      label="Max Budget"
      value={maxBudget}
      onChange={(e) => setMaxBudget(e.target.value)}
      min="0"
      max="1000"
    />
  </>
);

export default SearchFormFields;
