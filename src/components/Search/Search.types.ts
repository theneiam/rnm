import { ChangeEvent } from "react";

export interface SearchProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
