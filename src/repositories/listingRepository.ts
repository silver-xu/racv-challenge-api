import { getBySuburb, searchByKeyword } from '../infra/database';
import { ListingSearchResult } from '../entities/ListingSearchResult';
import { Listing } from '../entities/Listing';
import { mapPropertyToListing, mapSearchResultToListingSearchResult } from '../mappers/listingMapper';

/**
 * Get Listing entities by Suburb name
 *
 * @param suburb - the name of the suburb
 * @returns - An array of Listing entities
 */
export const getListingsBySuburb = (suburb: string): Listing[] => {
  const properties = getBySuburb(suburb);
  return properties ? properties.map((property) => mapPropertyToListing(property)) : [];
};

/**
 * Search Listings by Suburb Keyword
 *
 * @param keyword - the keyword used to search listings
 * @returns - An array of ListingSearchResult entities
 */
export const searchListingsByKeyword = (keyword: string): ListingSearchResult[] =>
  searchByKeyword(keyword).map((result) => mapSearchResultToListingSearchResult(result));
