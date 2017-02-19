module.exports = class Prune {
  constructor(client) {
    this.client = client;
    this.name = "prune";
    this.info = "Prunes messages from a user/channel/current channel.";
    this.args = "[channel/user] <amount>";
  }

  async run(message, args) {
    if(!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.sendMessage(`:warning: You required the **Manage Messages** permission.`);
    if(!message.guild.member(this.client.user).hasPermission(`MANAGE_MESSAGES`)) return message.channel.sendMessage(`:warning: Hammer requires the **Manage Messages** permission.`);
    if(message.mentions.channels.first()) {
      message.mentions.channels.first().fetchMessages({ limit: parseInt(args.split(" ").pop()) }).then(messages => {
        message.mentions.channels.first().bulkDelete(messages).then(() => {
          message.channel.sendMessage(`:ok_hand: Pruned **${messages.size}** messages from <#${message.mentions.channels.first().id}>.`);
        }).catch(e => message.channel.sendMessage(`:x: Failed to prune **${messages.size}** messages from <#${message.mentions.channels.first().id}>.\n${e}`))
      })
    } else if(message.mentions.users.first()) {
      message.channel.fetchMessages({ limit: 100 }).then(messages => {
        let count = parseInt(args.split(" ").pop()) || 5
        let found = []
        messages.array().forEach(m => {
          if(m.author.id == message.mentions.users.first().id) {
            if(found.length == count) return;
            found.push({ id: m.id })
          }
        })
        message.channel.bulkDelete(found).then(() => {
          message.channel.sendMessage(`:ok_hand: Pruned **${found.length}** messages from <@${message.mentions.users.first().id}>.`);
        }).catch(e => { message.channel.sendMessage(`:x: Failed to prune **${found.length}** messages from <@${message.mentions.users.first().id}>.\n${e}`); console.error(e); })
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
