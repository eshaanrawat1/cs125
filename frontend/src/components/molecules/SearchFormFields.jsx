import React from 'react';
import Input from '../atoms/Input';
import RangeInput from '../atoms/RangeInput';

const SearchFormFields = ({ 
  origin, setOrigin, 
  cities, setCities, 
  minBudget, setMinBudget,
  maxBudget, setMaxBudget
}) => (
  <>
    {/* Top Row: Origin and Destinations */}
    <div className="md:col-span-3 flex flex-col md:flex-row gap-6 items-end w-full mb-4">
      <div className="w-full md:flex-1">
        <Input 
          label="Coming From"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origin (e.g. LGA)"
          className="text-center"
        />
      </div>
      <div className="w-full md:flex-[2.5]">
        <Input 
          label="Going To"
          value={cities}
          onChange={(e) => setCities(e.target.value)}
          placeholder="Destination (SFO, MIA, ...)"
          className="text-center"
        />
      </div>
    </div>

    {/* Bottom Row: Dual Range Sliders */}
    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <RangeInput 
        label={`Min Budget`}
        value={minBudget}
        onChange={(e) => setMinBudget(Math.min(Number(e.target.value), maxBudget - 10))}
        min="0"
        max="1000"
        step="10"
      />
      <RangeInput 
        label={`Max Budget`}
        value={maxBudget}
        onChange={(e) => setMaxBudget(Math.max(Number(e.target.value), minBudget + 10))}
        min="0"
        max="1000"
        step="10"
      />
    </div>
  </>
);

export default SearchFormFields;