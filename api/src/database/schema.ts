import { desc } from 'drizzle-orm';

import {
  index,
  uuid,
  text,
  pgTable,
  timestamp,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const objects = pgTable('objects', {
  id: uuid().primaryKey().defaultRandom(),
  company_id: uuid()
    .references(() => companies.id)
    .notNull(),
  name: text().notNull(),
  invite_token: uuid().notNull().unique().defaultRandom(),
  created_at: timestamp().notNull().defaultNow(),
});

export const stages = pgTable('stages', {
  id: uuid().primaryKey().defaultRandom(),
  company_id: uuid()
    .notNull()
    .references(() => companies.id),
  object_id: uuid()
    .references(() => objects.id)
    .notNull(),
  name: text().notNull(),
  order_index: integer().notNull(),
  status: text().notNull().default('pending'),
});

export const files = pgTable('files', {
  id: uuid().primaryKey().defaultRandom(),
  company_id: uuid()
    .notNull()
    .references(() => companies.id),
  original_key: text().notNull(),
  preview_key: text().notNull(),
  taken_at: timestamp(),
  created_at: timestamp().notNull().defaultNow(),
});

export const events = pgTable(
  'events',
  {
    id: uuid().primaryKey().defaultRandom(),
    company_id: uuid()
      .notNull()
      .references(() => companies.id),
    object_id: uuid()
      .references(() => objects.id)
      .notNull(),
    type: text().notNull(),
    body: text().notNull(),
    published_at: timestamp(),
    created_at: timestamp().notNull().defaultNow(),
    author_name: text().notNull(),
    author_role: text().notNull(),
  },
  (table) => [
    index('events_object_created_idx').on(
      table.object_id,
      desc(table.created_at),
    ),
  ],
);

export const event_files = pgTable(
  'event_files',
  {
    event_id: uuid()
      .notNull()
      .references(() => events.id),
    file_id: uuid()
      .notNull()
      .references(() => files.id),
  },
  (table) => [primaryKey({ columns: [table.event_id, table.file_id] })],
);
