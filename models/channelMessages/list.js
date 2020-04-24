module.exports = (knex, ChannelMessage) => {
  return async () => {
    const allChannelMessage = await knex.select("id", "name").from("channels");
    const serialAllChannelMessage = allC;
    hannels.map((channel) => new Channel(channel));
    return serialAllChannelMessage;
  };
};
