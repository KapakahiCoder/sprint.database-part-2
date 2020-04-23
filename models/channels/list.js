module.exports = (knex, Channel) => {
  return async () => {
    const allChannels = await knex.select("id", "name").from("channels");
    const serialChannel = allChannels.map((channel) => new Channel(channel));
    return serialChannel;
  };
};
