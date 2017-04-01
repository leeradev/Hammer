module.exports = class Warn {
  constructor(client) {
    this.client = client;
    this.name = "warn";
    this.info = "Warns a user.";
    this.args = "<user>";
  }

  async run(message, args) {
    if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.channel.sendMessage(`:warning: You required the **Kick Members** permission.`);
    if(!message.mentions.users.first()) return message.channel.sendMessage(`:warning: **User** is a required argument.`);
    let data = await this.client.data.load();

    message.channel.sendMessage(`**Please enter a reason for this action.**`);
    message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 200000, errors: ['time'] }).then(collected => {
      message.channel.sendMessage(`:ok_hand: Successfully warned **${message.mentions.users.first().username}** for \`${collected.first().content}\`.`);
      message.mentions.users.first().sendMessage(`You have been warned by **${message.author.username}#${message.author.discriminator}** in **${message.guild.name}**.\n**Reason:** ${collected.first().content}`);
      if(data.settings.modlogs[message.guild.id]) {
        if(!this.client.channels.get(data.settings.modlogs[message.guild.id].channel)) return;
        this.client.channels.get(data.settings.modlogs[message.guild.id].channel).sendMessage(`**Action:** Warn\n**User:** ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Reason:** ${collected.first().content}`);
      }
    }).catch(e => {
      if(e == 'time') {
        message.channel.sendMessage("**Canceled prompt.**");
      } else {
        message.channel.sendMessage(`:warning: **An error occurred.**\n${e}`);
      }
    })
  }
}
