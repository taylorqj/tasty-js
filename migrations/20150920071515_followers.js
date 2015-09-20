exports.up = function (knex, Promise) {
    return knex.schema.createTable('follower', function (table) {
        table.uuid('id').notNullable().primary();
        table.uuid('followee').notNullable().references('id').inTable('person');
        table.uuid('follower').notNullable().references('id').inTable('person');
        table.unique(['followee', 'follower']);
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {

};
