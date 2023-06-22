"use client";
import React from "react";

// Types section
import { SearchProps } from "./Search.types";

export const Search: React.FC<SearchProps> = ({ onChange, value }) => {
  return (
    <div className="w-full">
      <input
        type="search"
        placeholder="Search"
        onChange={onChange}
        value={value}
        className="p-3 outline-none bg-gray-700 rounded-sm text-gray-50 w-full border-2 border-rnm-portal-green"
      />
    </div>
  );
};
