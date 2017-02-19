module.exports = class Prune {
  constructor(client) {
    this.client = client;
    this.name = "prune";
    this.info = "Prunes messages from a user/channel/current channel.";
    this.args = "[channel/user] <amount>";
  }

  async run(message, args) {
    if(message.mentions.channels.first()) {
      message.mentions.channels.first().fetchMessages({ limit: parseInt(args.split(" ").pop()) }).then(messages => {
        message.mentions.channels.first().bulkDelete(messages).then(() => {
          message.channel.sendMessage(`:ok_hand: Pruned **${messages.size}** messages from <#${message.mentions.channels.first().id}>.`);
        }).catch(e => message.channel.sendMessage(`:x: Failed to prune **${messages.size}** messages from <#${message.mentions.channels.first().id}>.\n${e}`))
      })
    } else if(message.mentions.users.first()) {
      message.channel.fetchMessages({ limit: 100 }).then(messages => {
        let found = {};
        messages.forEach(message => {
          if(message == message.mentions.users.first().id)
          found[message.id] = { id: message.id };
        })
        message.channel.bulkDelete(found).then(() => {
          message.channel.sendMessage(`:ok_hand: Pruned **${found.size}** messages from this channel.`);
        }).catch(e => message.channel.sendMessage(`:x: Failed to prune **${found.size}** messages from this channel.\n${e}`))
      })
    } else {
      message.channel.fetchMessages({ limit: parseInt(args) }).then(messages => {
        message.channel.bulkDelete(messages).then(() => {
          message.channel.sendMessage(`:ok_hand: Pruned **${messages.size}** messages from this channel.`);
        }).catch(e => message.channel.sendMessage(`:x: Failed to prune **${messages.size}** messages from this channel.\n${e}`))
      })
    }
  }
}
