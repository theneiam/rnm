import { Character } from "@/types";

export type RandomCharacterProps = {
  onLoad: (value: Character) => void;
  reloadTrigger?: boolean | string | number | null;
};
