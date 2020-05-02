import { default as properties } from '../../data/properties.json';
import { init, add, search, get } from 'quick-trie';
import { Property, PropertySearchResult } from './models/Property';

const propertiesRoot = init<Property[]>();

properties.forEach((property) => {
  const propertiesInSuburb = get<Property[]>(propertiesRoot, property.suburb);

  if (!propertiesInSuburb) {
    add<Property[]>(propertiesRoot, property.suburb, [property]);
  } else {
    propertiesInSuburb.push(property);
  }
});

export const searchByKeyword = (keyword: string): PropertySearchResult[] => {
  const results = search<Property[]>(propertiesRoot, keyword);
  return results.map((result) => ({
    suburb: result.key,
    properties: result.value,
  }));
};

export const getBySuburb = (suburb: string): Property[] | undefined => {
  return get<Property[]>(propertiesRoot, suburb);
};
