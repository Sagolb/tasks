"use client";

import React from "react";

interface Props {
  filter: string;
  onFilterChange: (filter: string) => void;
  search: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white shadow-sm border border-gray-200 rounded-xl p-4">
      <div className="relative w-full sm:w-1/3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg "
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="filter" className="text-sm text-gray-600">
          Status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm px-3 py-2"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-gray-600">
          Sort:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm px-3 py-2"
        >
          <option value="name">By Name</option>
          <option value="date">By Date</option>
        </select>
      </div>
    </div>
  );
}
