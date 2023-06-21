"use client";

import React from "react";

import { RandomCharacter } from "@/components/RandomCharacter";
import { CharacterNamePicker } from "@/components/CharacterNamePicker";

// Types
import type { Character } from "@/types";

export const GuessCharacterGame: React.FC = () => {
  const [score, setScore] = React.useState<number>(0);
  const [riddleCharacter, setRiddleCharacter] =
    React.useState<Character | null>(null);

  const handleGuess = (characterName: string) => {
    console.log(characterName, riddleCharacter?.name);
    characterName === riddleCharacter?.name
      ? setScore((prevScore) => prevScore + 10)
      : setScore(0);
  };

  return (
    <div className="flex flex-row pt-10 gap-10">
      <RandomCharacter onLoad={setRiddleCharacter} reloadTrigger={score} />
      <CharacterNamePicker onPick={handleGuess} />
      <div className="text-4xl text-gray-50 font-bold">SCORE: {score}</div>
    </div>
  );
};
