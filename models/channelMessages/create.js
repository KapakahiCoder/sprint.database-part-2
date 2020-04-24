// module.exports = (knex, channelMessage) => (params) => Promise.resolve({
//  knex("clack").insert()

// });

module.exports = (knex, ChannelMessage) => {
  return (params) => {
    // get from client input params
    console.log(params);
    return knex("channel_messages")
      .insert({
        message: params.message,
        from_id: params.fromId,
        channel_id: params.channelId,
      })
      .then(
        () => {
          return knex("channel_messages")
            .select({
              username: "users.username",
              channelId: "channels.name",
              message: "channel_messages.message",
              id: "channel_messages.channel_id",
              sentAt: "channel_messages.sent_at",
            })
            .innerJoin("users", "channel_messages.from_id", "users.id")
            .innerJoin("channels", "channel_messages.channel_id", "channels.id")
            .where("channel_messages.channel_id", params.channelId);
        }

        // "users.username as username",
        // "channels.name as channelId",
        // "channel_messages.message as message"
      )
      .then((channels) => {
        console.log(channels, "@@@@@@@@@@@@");
        const result = channels.map((ele) => {
          const newEle = {};
          newEle.fromUser = ele.username;
          newEle.toChannel = ele.channelId;
          newEle.message = ele.message;
          newEle.id = ele.id;
          newEle.sentAt = ele.sentAt;
          return newEle;
        });
        console.log(result);
        return result;
      })
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
