/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments();
    table.integer('user_id')
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.string('user_name', 250);
    table.foreign('user_name').references('username').inTable('users').onDelete('CASCADE');
    table.string('item_name', 250);
    table.string('description', 800);
    table.integer('quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('item')
};
