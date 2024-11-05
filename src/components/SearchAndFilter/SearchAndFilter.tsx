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
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={handleSearchChange}
        className="border p-3 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={progress}
        onChange={handleProgressChange}
        className="border p-3 rounded-lg w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="border p-3 rounded-lg w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchAndFilter;
