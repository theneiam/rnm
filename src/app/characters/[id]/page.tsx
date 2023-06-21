"use client";
import React from "react";
import { useParams } from "next/navigation";

import { SingleCharacter } from "@/components/SingleCharacter";

const CharacterPage = () => {
  const params = useParams();
  return (
    <div className="flex flex-row justify-center pt-5">
      <SingleCharacter id={params.id} />
    </div>
  );
};

export default CharacterPage;
