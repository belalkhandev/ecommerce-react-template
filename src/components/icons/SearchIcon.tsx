import type { FC } from 'react';
import { useSearch } from '../../context/SearchContext';

const SearchIcon: FC = () => {
  const { openSearch } = useSearch();

  return (
    <button
      onClick={openSearch}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
      aria-label="Search"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
};

export default SearchIcon;
