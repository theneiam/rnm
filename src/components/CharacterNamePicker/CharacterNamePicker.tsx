"use client";

import React, { useState, ChangeEvent } from "react";
import { gql, useQuery } from "@apollo/client";

import { useDebounce } from "@/hooks";
import { Character } from "@/types";
import { CharacterNamePickerProps } from "./CharacterNamePicker.types";

const GET_CHARACTER = gql`
  query CharacterNames($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      results {
        name
        species
        id
      }
      info {
        pages
        prev
        next
      }
    }
  }
`;

export const CharacterNamePicker: React.FC<CharacterNamePickerProps> = ({
  onPick,
}) => {
  const [page, setPage] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { page, name: debouncedSearchTerm },
  });

  const { characters } = data || {};

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
    setPage(1);
  };

  const handlePick = (e: React.MouseEvent<HTMLDivElement>) => {
    onPick(e.currentTarget.textContent!);
    setSearchTerm("");
    setPage(1);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <input
          type="search"
          placeholder="Filter by name"
          onChange={handleSearch}
          value={searchTerm}
          className="p-3 outline-none bg-gray-700 rounded-sm text-gray-50 w-full border-2 border-[#39ff14]"
        />
      </div>
      {loading && <div>Loading...</div>}
      {!loading && characters && (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-2 w-full">
            {characters.results.map((character: Character) => (
              <div
                key={character.id}
                className="cursor-pointer border-2 border-[#39ff14] rounded-md p-2 text-center text-white hover:bg-[#39ff14]"
                onClick={handlePick}
              >
                {character.name}
              </div>
            ))}
          </div>
          <div className="w-full text-center mt-4">
            <button
              className="bg-[#97ce4c] py-2 px-4 mr-2 rounded-sm text-white hover:bg-[#39ff14]"
              disabled={!characters.info.prev}
              onClick={() => setPage(characters.info.prev)}
            >
              Prev
            </button>
            <button
              className="bg-[#97ce4c] py-2 px-4 rounded-sm text-white hover:bg-[#39ff14]"
              disabled={!characters.info.next}
              onClick={() => setPage(characters.info.next)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
