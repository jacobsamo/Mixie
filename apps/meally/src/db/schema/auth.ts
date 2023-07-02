import { datetime, int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar,  } from 'drizzle-orm/mysql-core';


// This is everything we need for nextauth and our own custom stuff
export const accounts = mysqlTable('accounts', {
  id: serial('id').primaryKey().notNull(),
  userId: varchar('userId', {length: 191}).notNull(),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: int('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

export const sessions = mysqlTable('sessions', {
  id: serial('id').primaryKey().notNull(),
  sessionToken: text('sessionToken').notNull(),
  userId: text('userId').notNull(),
  expires: int('expires').notNull(),
});

export const users = mysqlTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: text('name'),
  email: varchar('email', {length: 255}),
  emailVerified: datetime('emailVerified'),
  image: text('image'),
});

export const verification_tokens = mysqlTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: int('expires').notNull(),
});