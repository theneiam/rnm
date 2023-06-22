"use client";
import React from "react";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";

// Components and hooks section
import { CharacterCard } from "@/components/CharacterCard";

// GraphQL queries section
const GET_SINGLE_CHARACTER = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      type
      image
      status
      gender
      species
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

const CharacterPage = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_CHARACTER, {
    variables: { characterId: params.id },
  });
  const { character } = data || {};
  const isCharacterLoaded = !loading && !error && character;
  return (
    <div className="flex flex-row justify-center pt-5">
      {error && <div>Error...</div>}
      {loading && <div>Loading...</div>}
      {isCharacterLoaded && (
        <CharacterCard data={character} orientation="horizontal" />
      )}
    </div>
  );
};

export default CharacterPage;
