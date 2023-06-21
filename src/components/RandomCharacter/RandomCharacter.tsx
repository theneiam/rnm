"use client";

import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { FaRedo } from "react-icons/fa";

import { RandomCharacterProps } from "./RandomCharacter.types";

const GET_CHARACTER = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      image
      name
      id
    }
  }
`;

export const RandomCharacter: React.FC<RandomCharacterProps> = ({
  onLoad,
  reloadTrigger,
}) => {
  const [randomCharId, setRandomCharId] = useState<number>(
    Math.floor(Math.random() * 200)
  );

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { characterId: randomCharId },
  });

  useEffect(() => {
    setRandomCharId(Math.floor(Math.random() * 200));
  }, [reloadTrigger]);

  const { character } = data || {};

  useEffect(() => {
    onLoad(character);
  }, [character, onLoad]);

  return (
    <div className="flex flex-col">
      {loading && <div>Loading...</div>}
      {!loading && character && (
        <Image
          priority
          src={character.image}
          alt={character.id}
          width={500}
          height={500}
          className="rounded-md border-2 border-[#39ff14]"
        />
      )}
      <div
        className="bg-[#97ce4c] py-2 px-4 mr-2 rounded-sm text-white text-2xl flex flex-row justify-center items-center gap-2 mt-2 w-full cursor-pointer"
        onClick={() => setRandomCharId(Math.floor(Math.random() * 200))}
      >
        <FaRedo />
        <span>Another one</span>
      </div>
    </div>
  );
};
