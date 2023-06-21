"use client";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { CharacterCard } from "../CharacterCard";
import { SingleCharacterProps } from "./SingleCharacter.type";

const GET_SINGLE_CHARACTER = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      gender
      id
      image
      name
      species
      status
      type
      episode {
        name
        episode
      }
      location {
        name
        dimension
      }
      origin {
        name
        dimension
      }
    }
  }
`;

export const SingleCharacter: React.FC<SingleCharacterProps> = ({ id }) => {
  const { loading, error, data } = useQuery(GET_SINGLE_CHARACTER, {
    variables: { characterId: id },
  });

  const { character } = data || {};

  return (
    <div className="flex flex-row">
      {error && <div>Error...</div>}
      {loading && <div>Loading...</div>}
      {!loading && character && (
        <CharacterCard data={character} orientation="horizontal" />
      )}
    </div>
  );
};
