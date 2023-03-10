export interface Trace {
  ip: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  currencies: Currency[];
  distance_to_usa: number;
  timestamp: number;
}


export interface Currency {
  iso: string;
  symbol: string;
  conversion_rate?: number;
}

export interface SymbolMap {
  [iso: string]: string;
}

export const isoToSymbol: SymbolMap = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: '$',
  AUD: '$',
  INR: '₹',
};