import type { Character } from "../../types/";

export type CharacterCardOrientation = "horizontal" | "vertical";

export type CharacterCardProps = {
  data: Character;
  onClick?: (id: string) => void;
  orientation?: CharacterCardOrientation;
};
