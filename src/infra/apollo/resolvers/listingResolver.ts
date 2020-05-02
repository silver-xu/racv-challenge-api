import { getListings, searchListings } from '../../../useCases/listingUseCases';

export const listingResolver = {
  Query: {
    getListings: (_, { suburb }: { suburb: string }) => getListings(suburb),
    searchListings: (_, { keyword }: { keyword: string }) => searchListings(keyword),
  },
};
