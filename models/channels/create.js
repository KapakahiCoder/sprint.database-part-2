const validateName = (cName) =>
  typeof cName === "string" && cName.replace(" ", "").length >= 2; // make sure space doesn't count

module.exports = (knex, Channel) => {
  return (params) => {
    // get from client input params
    const name = params.name;

    if (!validateName(name)) {
      return Promise.reject(
        new Error(
          "Channel name must be provided, and be at least two characters"
        )
      );
    }

    return knex("channels")
      .insert({ name: name.toLowerCase() })
      .then(() => {
        return knex("channels")
          .where({ name: name.toLowerCase() })
          .select();
      })
      .then((channels) => {
        new Channel(channels.pop())();
      })
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That channel name already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
