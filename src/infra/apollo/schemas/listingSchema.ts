const { gql } = require('apollo-server-express');

export const listingSchema = gql`
  # The Query object for listings
  type Query {
    # Get Listings by suburb
    # Params suburb
    # Returns a collection of Listing Object (could be empty)
    getListings(suburb: String!): [Listing]!

    # Search Listings by keywords
    # Params keyword
    # Returns a collection of ListingSearchResult Object (could be empty)
    searchListings(keyword: String!): [ListingSearchResult]!
  }

  # Listing represents a Listed property entry in the Real Estate system
  type Listing {
    # The address of the listed property
    address: String!

    # The suburb of the listed property
    suburb: String!

    # The subtitle of the listed property
    subtitle: String!

    # The imageUrl of the listed property
    image: String!
  }

  # ListingSearchResult represents a Consolidated object that contains suburb and their subsequent listings
  # This is commonly used in search or auto completion
  type ListingSearchResult {
    # The suburb of the listed property that matches search keyword
    suburb: String!

    # The subsequent listings
    listings: [Listing!]!
  }
`;
