import React from "react";

// Components and hooks section
import { GuessCharacterGame } from "@/components/GuessCharacterGame";

const GuessWhoPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold pt-5 text-white">
        Try to guess as many characters as you can!
      </h1>
      <GuessCharacterGame />
    </div>
  );
};

export default GuessWhoPage;
