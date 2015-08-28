
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
    table.increments(),
    table.string('first_name'),
    table.string('last_name'),
    table.string('email'),
    table.string('password'),
    table.string('salt'),
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {

};
