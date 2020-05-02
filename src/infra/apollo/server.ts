import { ApolloServer } from 'apollo-server-express';

import { listingResolver } from './resolvers/listingResolver';
import { listingSchema } from './schemas/listingSchema';

export const apolloServer = new ApolloServer({ typeDefs: listingSchema, resolvers: listingResolver });
