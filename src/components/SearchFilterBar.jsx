import React from 'react';
import { Search, Plus } from 'lucide-react';

const SearchFilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  filterCriteria, 
  setFilterCriteria,
  isAdminMode,
  handleAddNew
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search profiles..."
            className="w-full p-2 pl-10 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        </div>
        <select 
          className="p-2 bg-grey-300 border rounded-md"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        >
          <option value="all">All Locations</option>
          <option value="east-coast">East Coast</option>
          <option value="west-coast">West Coast</option>
        </select>
        {isAdminMode && (
          <button 
            className="bg-slate-600 text-white p-2 rounded-md hover:bg-slate-700 transition-colors flex items-center justify-center"
            onClick={handleAddNew}
          >
            <Plus size={18} className="mr-1" /> Add Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;