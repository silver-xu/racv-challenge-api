import { getBySuburb, searchByKeyword } from '../infra/database';
import { ListingSearchResult } from '../entities/ListingSearchResult';
import { Listing } from '../entities/Listing';
import { mapPropertyToListing, mapSearchResultToListingSearchResult } from '../mappers/listingMapper';

export const getListingsBySuburb = (suburb: string): Listing[] => {
  const properties = getBySuburb(suburb);
  return properties ? properties.map((property) => mapPropertyToListing(property)) : [];
};

export const searchListingsByKeyword = (keyword: string): ListingSearchResult[] =>
  searchByKeyword(keyword).map((result) => mapSearchResultToListingSearchResult(result));
