import { mapPropertyToListing, mapSearchResultToListingSearchResult } from './listingMapper';
import { Property } from '../infra/database/models/Property';
import { Listing } from '../entities/Listing';

describe('listingMapper tests', () => {
  const mockProperty: Property = {
    id: 1,
    address: 'foo',
    suburb: 'bar',
    minPrice: 100,
    maxPrice: 200,
    subtitle: 'foobar',
    image: 'foo image',
  };

  const mockExpectedListing: Listing = {
    id: 1,
    address: 'foo',
    suburb: 'bar',
    subtitle: 'foobar',
    image: 'foo image',
  };

  describe('mapPropertyToListing tests', () => {
    describe('if subtitle is not undefined', () => {
      it('if subtitle is not undefined, mapPropertyToListing() should be mapped into subtitle in listing', () => {
        const property = {
          ...mockProperty,
        };
        const listing = mapPropertyToListing(property);

        expect(listing).toEqual(mockExpectedListing);
      });
    });

    describe('if subtitle is undefined', () => {
      it('if max price is not undefined mapPropertyToListing() should be mapped into {max - min} format in listing', () => {
        const property = {
          ...mockProperty,
          subtitle: undefined,
        };
        const listing = mapPropertyToListing(property);

        expect(listing).toEqual({
          ...mockExpectedListing,
          subtitle: '$100 - $200',
        });
      });

      it('if max price is undefined mapPropertyToListing() should be mapped into {min} format in listing', () => {
        const property = {
          ...mockProperty,
          subtitle: undefined,
          maxPrice: undefined,
        };
        const listing = mapPropertyToListing(property);

        expect(listing).toEqual({
          ...mockExpectedListing,
          subtitle: '$100',
        });
      });
    });
  });

  describe('mapSearchResultToListingSearchResult tests', () => {
    it('mapSearchResultToListingSearchResult() should map into ListingSearchResult correctly', () => {
      const propertySearchResult = {
        suburb: 'foo',
        properties: [mockProperty],
      };

      const listingSearchResult = mapSearchResultToListingSearchResult(propertySearchResult);

      expect(listingSearchResult).toEqual({
        suburb: 'foo',
        listings: [mockExpectedListing],
      });
    });
  });
});
