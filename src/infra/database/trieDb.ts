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

/**
 * Search TrieDB Properties by Suburb Keyword
 *
 * @param keyword - the keyword to search suburbs
 * @returns - An array of Search results
 */
export const searchByKeyword = (keyword: string): PropertySearchResult[] => {
  const results = search<Property[]>(propertiesRoot, keyword);
  return results.map((result) => ({
    suburb: result.key,
    properties: result.value,
  }));
};

/**
 * Get TrieDB Properties by Suburb
 *
 * @param suburb - the suburb name
 * @returns - An array of Properties
 */
export const getBySuburb = (suburb: string): Property[] | undefined => {
  return get<Property[]>(propertiesRoot, suburb);
};
