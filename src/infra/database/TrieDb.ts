import { default as properties } from '../../data/properties.json';
import { init, add, search, get } from 'quick-trie';
import { Property, PropertySearchResult } from './models/Property';
import { Database } from './Database';

/**
 * Trie based Database implementation
 */
export class TrieDb implements Database {
  private propertiesRoot = init<Property[]>();

  constructor() {
    properties.forEach((property) => {
      const propertiesInSuburb = get<Property[]>(this.propertiesRoot, property.suburb);

      if (!propertiesInSuburb) {
        add<Property[]>(this.propertiesRoot, property.suburb, [property]);
      } else {
        propertiesInSuburb.push(property);
      }
    });
  }

  /**
   * Search TrieDB Properties by Suburb Keyword
   *
   * @param keyword - the keyword to search suburbs
   * @returns - An array of Search results
   */
  searchByKeyword(keyword: string): PropertySearchResult[] {
    const results = search<Property[]>(this.propertiesRoot, keyword);
    return results.map((result) => ({
      suburb: result.key,
      properties: result.value,
    }));
  }

  /**
   * Get TrieDB Properties by Suburb
   *
   * @param suburb - the suburb name
   * @returns - An array of Properties
   */
  getBySuburb(suburb: string): Property[] | undefined {
    return get<Property[]>(this.propertiesRoot, suburb);
  }
}
