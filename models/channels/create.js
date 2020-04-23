const validateChannelName = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length >= 2;

const validateID = (uID) => {
  if (uID === undefined) {
    return false;
  }
  return true;
};

module.exports = (knex, Channel) => {
  return (params) => {
    const username = params.username;
    let id = params.id;

    if (!validateChannelName(username)) {
      return Promise.reject(
        new Error("Username must be provided, and be at least two characters")
      );
    }
    if (!validateID(id)) {
      id = 0;
    }

    return knex("channels")
      .insert({ username: username.toLowerCase() })
      .then(() => {
        return knex("channels")
          .where({ username: username.toLowerCase() })
          .select();
      })
      .then((chan) => new Channel(chan.pop())()) // create a user model out of the plain database response
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That channel already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
