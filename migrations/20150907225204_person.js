exports.up = function (knex, Promise) {
    return knex.schema.createTable('person', function (table) {
        table.uuid('id').notNullable().primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('password');
        table.string('salt');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {

};
