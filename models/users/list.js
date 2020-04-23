module.exports = (knex, User) => {
  return () => {
    knex.select(User).from("clark");
    return Promise.resolve([]); // fix me!
  };
};
