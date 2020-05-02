import * as trie from 'quick-trie';
import { Node } from 'quick-trie/tries/types';
import { Property } from './models/Property';
import { searchByKeyword, getBySuburb } from './trieDb';

jest.mock('quick-trie');

describe('trieDb tests', () => {
  const mockedTrie = trie as jest.Mocked<typeof trie>;
  const mockProperty: Property = {
    address: 'foo',
    suburb: 'bar',
    minPrice: 100,
    maxPrice: 200,
    subtitle: 'foobar',
    image: 'foo image',
  };

  describe('searchByKeyword tests', () => {
    it('searchByKeyword should pass through keyword to search and map to correct results', () => {
      mockedTrie.search.mockReturnValue([
        {
          key: 'bar',
          value: mockProperty,
        },
      ]);

      const result = searchByKeyword('fo');
      expect(mockedTrie.search).toHaveBeenCalledWith(undefined, 'fo');
      expect(result).toEqual([
        {
          suburb: 'bar',
          properties: mockProperty,
        },
      ]);
    });
  });

  describe('getBySuburb tests', () => {
    it('searchByKeyword should pass through keyword to search and map to correct results', () => {
      mockedTrie.get.mockReturnValue([mockProperty]);

      const result = getBySuburb('bar');
      expect(mockedTrie.get).toHaveBeenCalledWith(undefined, 'bar');
      expect(result).toEqual([mockProperty]);
    });
  });
});
