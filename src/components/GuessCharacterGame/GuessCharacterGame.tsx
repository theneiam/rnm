"use client";

import React from "react";

import { RandomCharacter } from "@/components/RandomCharacter";
import { CharacterNamePicker } from "@/components/CharacterNamePicker";
import { GameResult } from "@/components/GuessCharacterGame/GameResult";

// Types
import type { Character } from "@/types";

export const GuessCharacterGame: React.FC = () => {
  const [score, setScore] = React.useState<number>(0);
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [riddle, setRiddle] = React.useState<string | null>(null);
  const [riddleCharacter, setRiddleCharacter] =
    React.useState<Character | null>(null);

  const handleGuess = (characterName: string) => {
    setAnswer(characterName);
    setRiddle(riddleCharacter?.name || "");
    characterName === riddleCharacter?.name
      ? setScore((prevScore) => prevScore + 10)
      : setScore(0);
  };

  return (
    <div className="flex flex-row pt-10 gap-10">
      <RandomCharacter onLoad={setRiddleCharacter} reloadTrigger={answer} />
      <CharacterNamePicker onPick={handleGuess} />
      <div className="flex flex-col">
        <div className="text-4xl text-gray-50 font-bold">SCORE: {score}</div>
        {answer && (
          <div className="text-4xl text-gray-50 font-bold mt-3">
            Last game result:
            {answer && riddle && <GameResult riddle={riddle} answer={answer} />}
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};
