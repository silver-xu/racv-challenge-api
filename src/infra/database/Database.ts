import { Property, PropertySearchResult } from './models/Property';

export interface Database {
  /**
   * Search TrieDB Properties by Suburb Keyword
   *
   * @param keyword - the keyword to search suburbs
   * @returns - An array of Search results
   */
  searchByKeyword: (keyword: string) => PropertySearchResult[];

  /**
   * Get TrieDB Properties by Suburb
   *
   * @param suburb - the suburb name
   * @returns - An array of Properties
   */
  getBySuburb: (suburb: string) => Property[] | undefined;
}
