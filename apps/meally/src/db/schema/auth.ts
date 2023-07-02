import { datetime, int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar,  } from 'drizzle-orm/mysql-core';
import { date } from 'zod';

// This is everything we need for nextauth and our own custom stuff
export const accounts = mysqlTable('accounts', {
  id: serial('id').primaryKey().notNull(),
  userId: varchar('userId', {length: 191}).notNull(),
  type: text('type').notNull(),
  provider: text('provider').notNull().primaryKey(),
  providerAccountId: text('providerAccountId').notNull().primaryKey(),
  refresh_token: text('refresh_token').default('NULL'),
  access_token: text('access_token').default('NULL'),
  expires_at: int('expires_at').default(0),
  token_type: text('token_type').default('NULL'),
  scope: text('scope').default('NULL'),
  id_token: text('id_token').default('NULL'),
  session_state: text('session_state').default('NULL'),
});

export const sessions = mysqlTable('sessions', {
  id: serial('id').primaryKey().notNull(),
  sessionToken: text('sessionToken').primaryKey().notNull(),
  userId: text('userId').notNull(),
  expires: int('expires').notNull(),
});

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').default('NULL'),
  email: varchar('email', {length: 255}).primaryKey(),
  emailVerified: datetime('emailVerified').notNull(),
  image: text('image').default('NULL'),
  accounts: 
});

export const verification_tokens = mysqlTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: int('expires').notNull(),
});