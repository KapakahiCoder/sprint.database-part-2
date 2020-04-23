module.exports = (knex, User) => {
  return async () => {
    const allUsers = await knex.select("id", "username").from("users"); // fix me!
    const serialUser = allUsers.map((user) => new User(user));
    return serialUser;
  };
};
