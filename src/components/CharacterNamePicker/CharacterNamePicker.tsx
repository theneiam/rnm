"use client";
import React, { useState, ChangeEvent } from "react";
import { gql, useQuery } from "@apollo/client";

// Components and hooks section
import { Search } from "@/components/Search";
import { useDebounce } from "@/hooks";

// Types section
import { Character } from "@/types";
import { CharacterNamePickerProps } from "./CharacterNamePicker.types";

// GraphQL queries section
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

  const { loading, data } = useQuery(GET_CHARACTER, {
    variables: { page, name: debouncedSearchTerm },
  });

  const { characters } = data || {};

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value.trim());
    setPage(1);
  };

  const handlePick = (e: React.MouseEvent<HTMLDivElement>): void => {
    onPick(e.currentTarget.textContent!);
    setSearchTerm("");
    setPage(1);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <Search onChange={handleSearch} value={searchTerm} />
      </div>
      {loading && <div>Loading...</div>}
      {!loading && characters && (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-2 w-full">
            {characters.results.map((character: Character) => (
              <div
                key={character.id}
                className="cursor-pointer border-2 border-rnm-portal-green rounded-md p-2 text-center text-white hover:bg-rnm-portal-green hover:text-black"
                onClick={handlePick}
              >
                {character.name}
              </div>
            ))}
          </div>
          <div className="w-full text-center mt-4">
            <button
              className="bg-rnm-green py-2 px-4 mr-2 rounded-sm text-white hover:bg-rnm-portal-green"
              disabled={!characters.info.prev}
              onClick={() => setPage(characters.info.prev)}
            >
              Prev
            </button>
            <button
              className="bg-rnm-green py-2 px-4 rounded-sm text-white hover:bg-rnm-portal-green"
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
