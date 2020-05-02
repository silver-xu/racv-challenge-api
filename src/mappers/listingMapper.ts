import { Property, PropertySearchResult } from '../infra/database/models/Property';
import { Listing } from '../entities/Listing';
import { ListingSearchResult } from '../entities/ListingSearchResult';
import { formatCurrency } from '../utils/currency';

export const mapPropertyToListing = (property: Property): Listing => ({
  address: property.address,
  suburb: property.suburb,
  subtitle:
    property.subtitle ||
    (property.maxPrice
      ? `${formatCurrency(property.minPrice)} - ${formatCurrency(property.maxPrice)}`
      : formatCurrency(property.minPrice)),
  image: property.image,
});

export const mapSearchResultToListingSearchResult = (searchResult: PropertySearchResult): ListingSearchResult => ({
  suburb: searchResult.suburb,
  listings: searchResult.properties.map((property) => mapPropertyToListing(property)),
});
