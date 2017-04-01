module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.name = "kick";
    this.info = "Kicks a user from the server.";
    this.args = "<user>";
  }

  async run(message, args) {
    if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.channel.sendMessage(`:warning: You required the **Kick Members** permission.`);
    if(!message.guild.member(this.client.user).hasPermission(`KICK_MEMBERS`)) return message.channel.sendMessage(`:warning: Hammer requires the **Kick Members** permission.`);
    if(!message.mentions.users.first()) return message.channel.sendMessage(`:warning: **User** is a required argument.`);
    let data = await this.client.data.load();

    message.channel.sendMessage(`**Please enter a reason for this action.**`);
    message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 200000, errors: ['time'] }).then(collected => {
      message.guild.member(message.mentions.users.first()).kick().then(member => {
        message.channel.sendMessage(`:ok_hand: Successfully kicked **${member.user.username}** for \`${collected.first().content}\`.`);
        if(data.settings.modlogs[message.guild.id]) {
          if(!this.client.channels.get(data.settings.modlogs[message.guild.id].channel)) return;
          this.client.channels.get(data.settings.modlogs[message.guild.id].channel).sendMessage(`**Action:** Kick\n**User:** ${member.user.username}#${member.user.discriminator}\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Reason:** ${collected.first().content}`);
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
