// src/components/SearchAndFilter/SearchAndFilter.tsx
import React, { useState } from 'react';

interface SearchAndFilterProps {
  onSearch: (searchText: string) => void;
  onFilter: (progress: string, dueDate: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilter,
}) => {
  const [searchText, setSearchText] = useState('');
  const [progress, setProgress] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProgress(e.target.value);
    onFilter(e.target.value, dueDate);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    onFilter(progress, e.target.value);
  };

  return (
    <div className="flex space-x-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={handleSearchChange}
        className="border p-2 rounded"
      />
      <select
        value={progress}
        onChange={handleProgressChange}
        className="border p-2 rounded"
      >
        <option value="">Filter by progress</option>
        <option value="0">0%</option>
        <option value="50">50%</option>
        <option value="100">100%</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={handleDateChange}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default SearchAndFilter;
