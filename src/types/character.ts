export type CharacterStatus = "Alive" | "Dead" | "unknown";

export type CharacterLocation = {
  name: string;
  dimension: string;
};

export type CharacterEpisode = {
  name: string;
  episode: string;
};

export type CharacterOrigin = {
  name: string;
  dimension: string;
};

export type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
  status: CharacterStatus;
  gender?: string;
  type?: string;
  location?: CharacterLocation;
  episode?: CharacterEpisode[];
  origin?: CharacterOrigin;
};
