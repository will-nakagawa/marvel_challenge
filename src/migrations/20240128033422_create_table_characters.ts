import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('characters', (table) => {
    table.integer('id').primary();
    table.string('name').notNullable().unique();
    table.string('description', 1000);
    table.string('picture', 1000).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('characters');
}
