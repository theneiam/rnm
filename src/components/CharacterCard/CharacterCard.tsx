"use client";
/**
 * CharacterCard component.
 */
import React, { ReactNode } from "react";
import Image from "next/image";

// Types section
import { CharacterCardProps } from "./CharacterCard.types";

const CHAR_AVATAR_SIZE = 350;

export const CharacterCard: React.FC<CharacterCardProps> = ({
  data,
  onClick,
  orientation = "vertical",
}): ReactNode => {
  const { id, image, name, species, status, gender, type, location } = data;
  const isVertical = orientation === "vertical";
  const orientationClasses = isVertical
    ? "flex-col rounded-md"
    : "flex-row p-10 rounded-full";

  return (
    <div
      key={id}
      onClick={() => onClick && onClick(id)}
      className={`flex ${orientationClasses} bg-gray-800 border-2 border-rnm-portal-green cursor-pointer`}
    >
      <div className="flex flex-row justify-center items-center">
        <Image
          priority
          src={image}
          alt={name}
          width={CHAR_AVATAR_SIZE}
          height={CHAR_AVATAR_SIZE}
          className={`${isVertical ? "rounded-md" : "rounded-full"}`}
        />
      </div>

      <div className="p-3 text-white flex flex-col justify-center">
        <div className="text-xl">{name}</div>
        <div>Species: {species}</div>
        <div>Status: {status}</div>

        {type && <div>Type: {type}</div>}
        {gender && <div>Gender: {gender}</div>}
        {location && <div>Location: {location.name}</div>}
      </div>
    </div>
  );
};
