exports.up = function(knex, Promise) {
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column
    t.integer("channel_id", 6) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it
    t.integer("from_id", 6)
      .unique()
      .notNullable()
      .index();
    t.string("message").index();
    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("channel_messages");
};
