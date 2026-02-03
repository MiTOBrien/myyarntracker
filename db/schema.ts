import { integer, pgTable, varchar, text, serial, timestamp } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull().default(''),
})

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
})

export const patterns = pgTable('patterns', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull().default(''),
  difficulty: varchar('difficulty', { length: 100 }).notNull(),
  yarn_weight: varchar('yarn_weight', { length: 100 }).notNull(),
  yarn_amount: integer('yarn_amount').notNull(),
  gauge: varchar('gauge', { length: 100 }).notNull(),
  needles: varchar('needles', { length: 100 }).notNull(),
  pattern_file_url: varchar('pattern_file_url', { length: 500 }),
  pattern_file_name: varchar('pattern_file_name', { length: 255 }),
  pattern_file_type: varchar('pattern_file_type', { length: 100 }),
  pattern_file_size: integer('pattern_file_size'),
  created_at: timestamp('created_at').defaultNow(),
})

export const stash = pgTable('stash', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  brand: varchar('brand', { length: 255 }).notNull(),
  yarn_name: varchar('yarn_name', { length: 255 }).notNull(),
  colorway: varchar('colorway', { length: 255 }).notNull(),
  dye_lot: varchar('dye_lot', { length: 100 }).notNull(),
  fiber: varchar('fiber', { length: 255 }).notNull(),
  yarn_weight: varchar('yarn_weight', { length: 100 }).notNull(),
  yardage: integer('yardage').notNull(),
  num_skeins: integer('num_skeins').notNull().default(1),
  created_at: timestamp('created_at').defaultNow(),
})
