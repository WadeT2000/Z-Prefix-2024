const bcrypt = require('bcryptjs');

const hashme = async (pass) => {
  return await bcrypt.hash(pass, 10)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const password = await hashme('12345')
  await knex.schema.raw('TRUNCATE users CASCADE')
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Billy', last_name: 'Bates', username: 'BillyB', password: password, auth_token: ''},
    {first_name: 'Jimmy', last_name: 'John', username: 'JimmyJ', password: password, auth_token: ''},
    {first_name: 'Harry', last_name: 'Hatt', username: 'HarryH', password: password, auth_token: ''}
  ]);
};
