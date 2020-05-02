import { Listing } from '../entities/Listing';

import { ListingSearchResult } from '../entities/ListingSearchResult';
import { getListingsBySuburb, searchListingsByKeyword } from '../repositories/listingRepository';

/**
 * Get Listing entities by Suburb name
 *
 * @param suburb - the name of the suburb
 * @returns - An array of Listing entities
 */
export const getListings = (suburb: string): Listing[] => getListingsBySuburb(suburb);

/**
 * Search Listings by Suburb Keyword
 *
 * Note: Empty keyword will return empty results
 *
 * @param keyword - the keyword used to search listings
 * @returns - An array of ListingSearchResult entities
 */
export const searchListings = (keyword: string): ListingSearchResult[] => {
  if (keyword === '') {
    return [];
  }
  return searchListingsByKeyword(keyword);
};
