export interface Statistics {
  longestDistance: LongestDistance;
  mostTraced: MostTraced;
}

export interface LongestDistance {
  countryName: string;
  distanceToUsa: number;
}

export interface MostTraced {
  country: string;
  value: number;
}