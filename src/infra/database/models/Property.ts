export interface Property {
  address: string;
  suburb: string;
  subtitle?: string;
  maxPrice?: number;
  minPrice?: number;
  image: string;
}

export interface PropertySearchResult {
  suburb: string;
  properties: Property[];
}
