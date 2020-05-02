import { Listing } from '../entities/Listing';

import { ListingSearchResult } from '../entities/ListingSearchResult';
import { getListingsBySuburb, searchListingsByKeyword } from '../repositories/listingRepository';

export const getListings = (suburb: string): Listing[] => getListingsBySuburb(suburb);

export const searchListings = (keyword: string): ListingSearchResult[] => {
  if (keyword === '') {
    return [];
  }
  return searchListingsByKeyword(keyword);
};
