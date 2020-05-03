import { TrieDb } from './TrieDb';
import { Database } from './Database';

/**
 * Using TrieDb as the database implementation
 */
export const database: Database = new TrieDb();

/**
 * Substitute if using alternative implementation of
 * Database
 */
// export const database: Database = new HashMapDb();
