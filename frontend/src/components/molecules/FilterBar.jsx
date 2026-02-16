import React from 'react';
import Button from '../atoms/Button';

const FilterBar = ({ categories, activeFilter, onFilterChange }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {categories.map(cat => (
      <Button
        key={cat}
        variant="filter"
        onClick={() => onFilterChange(cat)}
        className={activeFilter === cat ? "bg-blue-600 text-white" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}
      >
        {cat}
      </Button>
    ))}
  </div>
);

export default FilterBar;
