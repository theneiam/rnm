"use client";
import React from "react";

// Components and hooks section
import { GameResultProps } from "./GameResult.types";

export const GameResult: React.FC<GameResultProps> = ({ riddle, answer }) => {
  const isCorrect = riddle === answer;
  const classNames = isCorrect ? "text-green-400" : "text-red-400";
  return (
    <div className="flex flex-col">
      <div
        className={`text-4xl ${classNames} flex flex-row justify-center my-4`}
      >
        {isCorrect ? "WINNER" : "LOOSER"}
      </div>
      <div className="flex flex-row">
        <div className="text-2xl">You choose {answer} an it is &nbsp;</div>
        <div className={`text-2xl ${classNames}`}>
          {isCorrect ? "Correct!" : "Wrong!"}
        </div>
      </div>
      {!isCorrect && (
        <div className="flex flex-row">
          <div className="text-2xl">The correct answer is {riddle}</div>
        </div>
      )}
    </div>
  );
};
