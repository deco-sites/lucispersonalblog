import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const newsletter = sqliteTable("newsletter", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique(),
  confirmed_at: text("confirmed_at"),
  confirmation_key: text("confirmation_key"),
});
