import { Property, PropertySearchResult } from '../infra/database/models/Property';
import { Listing } from '../entities/Listing';
import { ListingSearchResult } from '../entities/ListingSearchResult';
import { formatCurrency } from '../utils/currency';

/**
 * Map from a Property model to a Listing entity
 *
 * @param property - the property to map
 * @returns - A Property Listing
 */
export const mapPropertyToListing = (property: Property): Listing => ({
  id: property.id,
  address: property.address,
  suburb: property.suburb,
  subtitle:
    property.subtitle ||
    (property.maxPrice
      ? `${formatCurrency(property.minPrice)} - ${formatCurrency(property.maxPrice)}`
      : formatCurrency(property.minPrice)),
  image: property.image,
});

/**
 * Map from a PropertySearchResult model to a ListingSearchResult entity
 *
 * @param searchResult - the PropertySearchResult to map
 * @returns - A ListingSearchResult
 */
export const mapSearchResultToListingSearchResult = (searchResult: PropertySearchResult): ListingSearchResult => ({
  suburb: searchResult.suburb,
  listings: searchResult.properties.map((property) => mapPropertyToListing(property)),
});
