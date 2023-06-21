import React from "react";

import { GuessCharacterGame } from "@/components/GuessCharacterGame";

const GuessWhoPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold pt-5 text-white">
        Guess Rick and Morty Character
      </h1>
      <GuessCharacterGame />
    </div>
  );
};

export default GuessWhoPage;
