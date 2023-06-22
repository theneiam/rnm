"use client";
/**
 * RandomCharacter component.
 * Renders a random character from the Rick and Morty API.
 */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRedo } from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";

// Types section
import { RandomCharacterProps } from "./RandomCharacter.types";

// GraphQL queries section
const GET_CHARACTER = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      image
      name
      id
    }
  }
`;

const CHAR_AVATAR_SIZE = 500;
const getRandomId = (): number => Math.floor(Math.random() * 200);

export const RandomCharacter: React.FC<RandomCharacterProps> = ({
  onLoad,
  reloadTrigger,
}) => {
  const [randomCharId, setRandomCharId] = useState<number>(getRandomId());
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { characterId: randomCharId },
  });

  const { character } = data || {};
  const isCharacterLoaded = !loading && !error && character;

  // Reload character on reloadTrigger change
  useEffect(() => {
    setRandomCharId(getRandomId());
  }, [reloadTrigger]);

  useEffect(() => {
    onLoad(character);
  }, [character, onLoad]);

  const handleReload = (): void => {
    setRandomCharId(getRandomId());
  };

  return (
    <div className="flex flex-col">
      {loading && <div>Loading...</div>}
      {error && <div>Error...</div>}
      {isCharacterLoaded && (
        <Image
          priority
          src={character.image}
          alt={character.id}
          width={CHAR_AVATAR_SIZE}
          height={CHAR_AVATAR_SIZE}
          className="rounded-md border-2 border-rnm-portal-green"
        />
      )}
      <div
        className="bg-rnm-green py-2 px-4 mr-2 rounded-sm text-white text-2xl flex flex-row justify-center items-center gap-2 mt-2 w-full cursor-pointer"
        onClick={handleReload}
      >
        <FaRedo />
        <span>Another one</span>
      </div>
    </div>
  );
};
