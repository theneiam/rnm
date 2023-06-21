import { Character } from "@/types";

export type RandomCharacterProps = {
  onLoad: (value: Character) => void;
  reloadTrigger?: any;
};
