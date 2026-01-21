import {integer, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

export const pizzas = pgTable('pizzas', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  image_url: text('image_url'),
});

export const toppings = pgTable('toppings', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description')
});

export const orders = pgTable('orders', {
  //make this a UUID in typescript code and find a way to make it appear here
  id: text('id').primaryKey().notNull(),
  total_price: integer('total_price').notNull(),
  customer_name: text('customer_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  timeslot: timestamp('timeslot').notNull()
});

export const order_items = pgTable('order_items', {
  id: text('id').primaryKey().notNull(),
  order_id: text('order_id').references(() => orders.id).notNull(),
  base_pizza_id: text('base_pizza_id').references(() => pizzas.id).notNull(),
  extra_toppings: text('extra_toppings').array().default([]).notNull(),
});

export const work_days = pgTable('work_days', {
  id: text('id').primaryKey().notNull(),
  start_time: timestamp('start_time').notNull(),
  end_time: timestamp('end_time').notNull(),
})