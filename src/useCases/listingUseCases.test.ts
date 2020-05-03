import { getListings, searchListings } from '../useCases/listingUseCases';
import * as repositories from '../repositories/listingRepository';
import { Listing } from '../entities/Listing';

jest.mock('../repositories/listingRepository');

describe('listingUseCases tests', () => {
  const mockedRepositories = repositories as jest.Mocked<typeof repositories>;
  const mockListing: Listing = {
    id: 1,
    address: 'foo',
    suburb: 'bar',
    subtitle: 'foobar',
    image: 'foobar image',
  };

  const mockListingSearchResult = {
    suburb: 'foo',
    listings: [mockListing],
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getListings tests', () => {
    it('getListings should pass through suburb to getListingBySuburb and return back Listings', () => {
      mockedRepositories.getListingsBySuburb.mockReturnValue([mockListing]);

      const listings = getListings('bar');
      expect(mockedRepositories.getListingsBySuburb).toBeCalledWith('bar');
      expect(listings.length).toEqual(1);
      expect(listings[0]).toEqual(mockListing);
    });
  });

  describe('searchListings tests', () => {
    beforeEach(() => {
      mockedRepositories.searchListingsByKeyword.mockReturnValue([mockListingSearchResult]);
    });

    describe('if keyword is empty', () => {
      it('searchListings() should pass through keyword to searchListingsByKeyword return back ListingSearchResults', () => {
        const listings = searchListings('');

        expect(mockedRepositories.searchListingsByKeyword).not.toHaveBeenCalled();
        expect(listings.length).toEqual(0);
      });
    });

    describe('if keyword is not empty', () => {
      it('searchListings() should pass through keyword to searchListingsByKeyword return back ListingSearchResults', () => {
        const listings = searchListings('ba');
        expect(mockedRepositories.searchListingsByKeyword).toBeCalledWith('ba');

        expect(listings.length).toEqual(1);
        expect(listings[0]).toEqual(mockListingSearchResult);
      });
    });
  });
});
