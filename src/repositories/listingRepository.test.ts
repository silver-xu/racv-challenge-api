import * as database from '../infra/database';
import { Property } from '../infra/database/models/Property';
import { Listing } from '../entities/Listing';
import { getListingsBySuburb, searchListingsByKeyword } from './listingRepository';
jest.mock('../infra/database');

describe('listingRepository tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockProperty: Property = {
    address: 'foo',
    suburb: 'bar',
    minPrice: 100,
    maxPrice: 200,
    subtitle: 'foobar',
    image: 'foo image',
  };

  const mockExpectedListing: Listing = {
    address: 'foo',
    suburb: 'bar',
    subtitle: 'foobar',
    image: 'foo image',
  };

  const mockedDatabase = database as jest.Mocked<typeof database>;

  describe('getListingsBySuburb tests', () => {
    it('getListingsBySuburb() should return listings if getBySuburb is not returning undefined', () => {
      mockedDatabase.getBySuburb.mockReturnValue([mockProperty]);

      const listings = getListingsBySuburb('foo');
      expect(mockedDatabase.getBySuburb).toHaveBeenCalledWith('foo');
      expect(listings).toEqual([mockExpectedListing]);
    });

    it('getListingsBySuburb() should return [] if getBySuburb is returning undefined', () => {
      mockedDatabase.getBySuburb.mockReturnValue(undefined);

      const listings = getListingsBySuburb('foo');
      expect(mockedDatabase.getBySuburb).toHaveBeenCalledWith('foo');
      expect(listings.length).toEqual(0);
    });
  });

  describe('searchListingsByKeyword tests', () => {
    it('searchListingsByKeyword() should return listing search results', () => {
      mockedDatabase.searchByKeyword.mockReturnValue([
        {
          suburb: mockProperty.suburb,
          properties: [mockProperty],
        },
      ]);

      const listingSearchResult = searchListingsByKeyword('fo');
      expect(listingSearchResult).toEqual([
        {
          suburb: mockExpectedListing.suburb,
          listings: [mockExpectedListing],
        },
      ]);
    });
  });
});
