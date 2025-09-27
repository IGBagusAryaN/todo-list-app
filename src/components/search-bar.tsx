import React from "react";
import type { AppDispatch } from "../store/config-store";
import { setPage } from "../store/tasks-slice";

interface SearchBarProps {
  pendingSearchTerm: string;
  setPendingSearchTerm: (value: string) => void;
  setSearchTerm: (value: string) => void;
  dispatch: AppDispatch;
}

const SearchBar: React.FC<SearchBarProps> = ({
  pendingSearchTerm,
  setPendingSearchTerm,
  setSearchTerm,
  dispatch,
}) => {
  const handleSearch = () => {
    setSearchTerm(pendingSearchTerm);
    dispatch(setPage(1));
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Search tasks by title, owner, assignee, or status..."
        value={pendingSearchTerm}
        onChange={(e) => setPendingSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="border border-gray-300 rounded px-3 py-2 w-full outline-blue-400"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-400 text-white px-4 rounded hover:bg-blue-500 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
