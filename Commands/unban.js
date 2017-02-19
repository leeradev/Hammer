module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.name = "unban";
    this.info = "Unbans a user from the server.";
    this.args = "<userid>";
  }

  async run(message, args) {
    if(!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.sendMessage(`:warning: You required the **Ban Members** permission.`);
    if(!message.guild.member(this.client.user).hasPermission(`BAN_MEMBERS`)) return message.channel.sendMessage(`:warning: Hammer requires the **Ban Members** permission.`);
    if(args == '') return message.channel.sendMessage(`:warning: **UserID** is a required argument.`);
    let data = await this.client.data.load();

    message.channel.sendMessage(`**Please enter a reason for this action.**`);
    message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 200000, errors: ['time'] }).then(collected => {
      message.guild.unban(args).then(user => {
        message.channel.sendMessage(`:ok_hand: Successfully unbanned **${user.username}** for \`${collected.first().content}\`.`);
        if(data.settings.modlogs[message.guild.id]) {
          if(!this.client.channels.get(data.settings.modlogs[message.guild.id].channel)) return;
          this.client.channels.get(data.settings.modlogs[message.guild.id].channel).sendMessage(`**Action:** Unban\n**User:** ${user.username}#${user.discriminator}\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Reason:** ${collected.first().content}`);
        }
      }).catch(e => message.channel.sendMessage(`:warning: **An error occurred.**\n${e}`))
    }).catch(e => {
      if(e == 'time') {
        message.channel.sendMessage("**Canceled prompt.**");
      } else {
        message.channel.sendMessage(`:warning: **An error occurred.**\n${e}`);
      }
    })
  }
}
