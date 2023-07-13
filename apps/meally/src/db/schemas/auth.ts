import { relations } from 'drizzle-orm';
import {
  int,
  timestamp,
  varchar,
  primaryKey,
  mysqlTable,
} from 'drizzle-orm/mysql-core';
import { type AdapterAccount } from 'next-auth/adapters';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 191 }).notNull().primaryKey(),
  name: varchar('name', { length: 191 }),
  email: varchar('email', { length: 191 }).notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: varchar('image', { length: 191 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = mysqlTable(
  'accounts',
  {
    userId: varchar('userId', { length: 191 }).notNull(),
    type: varchar('type', { length: 191 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 191 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 191 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 191 }),
    access_token: varchar('access_token', { length: 191 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 191 }),
    scope: varchar('scope', { length: 191 }),
    id_token: varchar('id_token', { length: 191 }),
    session_state: varchar('session_state', { length: 191 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable('sessions', {
  sessionToken: varchar('sessionToken', { length: 191 }).notNull().primaryKey(),
  userId: varchar('userId', { length: 191 }).notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 191 }).notNull(),
    token: varchar('token', { length: 191 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
