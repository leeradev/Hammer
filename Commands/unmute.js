module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.name = "unmute";
    this.info = "Unmutes a user from the server.";
    this.args = "<user>";
  }

  async run(message, args) {
    if(!message.member.hasPermission(`MUTE_MEMBERS`)) return message.channel.sendMessage(`:warning: You required the **Mute Members** permission.`);
    if(!message.guild.member(this.client.user).hasPermission(`MUTE_MEMBERS`)) return message.channel.sendMessage(`:warning: Hammer requires the **Mute Members** permission.`);
    if(!message.mentions.users.first()) return message.channel.sendMessage(`:warning: **User** is a required argument.`);
    let data = await this.client.data.load();

    message.channel.sendMessage(`**Please enter a reason for this action.**`);
    message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 200000, errors: ['time'] }).then(collected => {
      let role = message.guild.roles.find('name', 'HammerMuted');
      if(!role) return message.channel.sendMessage(`:warning: **HammerMuted** role is not in this server.`);
      message.guild.member(message.mentions.users.first()).removeRole(role.id);
      message.channel.sendMessage(`:ok_hand: Successfully unmuted **${message.mentions.users.first().username}** for \`${collected.first().content}\`.`);
      if(data.settings.modlogs[message.guild.id]) {
        if(!this.client.channels.get(data.settings.modlogs[message.guild.id].channel)) return;
        this.client.channels.get(data.settings.modlogs[message.guild.id].channel).sendMessage(`**Action:** Unmute\n**User:** ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Reason:** ${collected.first().content}`);
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
