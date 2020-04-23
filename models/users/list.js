// module.exports = (knex, User) => {
//   return () => {
//     return Promise.resolve([]); // fix me!
//   };
// };
const moment = require("moment");

const User = function(dbUser) {
  this.id = dbUser.id;
  this.username = dbUser.username;
  this.createdAt = new Date(dbUser.created_at);
};

User.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    username: this.username,
    createdAt: moment(this.createdAt).format("hh:mm:ss"),
  };
};

module.exports = (knex, User) => {
  return async () => {
    const allUsers = await knex.select("id", "username").from("users"); // fix me!
    const serialUser = allUsers.map((user) => new User(user));
    return serialUser;
  };
};
