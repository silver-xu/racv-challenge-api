import { createTestClient } from 'apollo-server-integration-testing';
import { apolloServer } from '../infra/apollo/server';
import { gql } from 'apollo-server-express';

describe('integration tests', () => {
  const { query } = createTestClient({
    apolloServer,
  });

  it('get properties from Glen Waverley should return results', async () => {
    const result = (await query(
      gql`
        query listings($suburb: String!) {
          getListings(suburb: $suburb) {
            address
            suburb
            subtitle
            image
          }
        }
      `,
      {
        variables: {
          suburb: 'Glen Waverley',
        },
      },
    )) as any;

    expect(result?.data?.getListings?.length).toBeGreaterThan(0);
  });

  it('get properties from Galaxy should return []', async () => {
    const result = (await query(
      gql`
        query listings($suburb: String!) {
          getListings(suburb: $suburb) {
            address
            suburb
            subtitle
            image
          }
        }
      `,
      {
        variables: {
          suburb: 'Galaxy',
        },
      },
    )) as any;

    expect(result?.data?.getListings).toEqual([]);
  });

  it('search with box should return results', async () => {
    const result = (await query(
      gql`
        query listings($keyword: String!) {
          searchListings(keyword: $keyword) {
            suburb
            listings {
              address
              suburb
              subtitle
              image
            }
          }
        }
      `,
      {
        variables: {
          keyword: 'box',
        },
      },
    )) as any;

    expect(result?.data?.searchListings?.length).toBeGreaterThan(0);
  });
});
