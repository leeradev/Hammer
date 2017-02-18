module.exports = class Set {
  constructor(client) {
    this.client = client;
    this.name = "set";
    this.info = "Sets some settings.";
    this.args = "<enable/disable> <setting>";
  }

  async run(message, args) {
    if(args.split(" ")[0] == 'enable' && args.split(" ")[1] == 'modlogs') {
      let data = await this.client.data.load();
      if(data.settings.modlogs[message.guild.id].channel === message.channel.id) return message.channel.sendMessage(`:x: **Modlogs** are already enabled in this channel.`)
      data.settings.modlogs[message.guild.id].channel = `${message.channel.id}`;
      await this.client.data.save(data);
      message.channel.sendMessage(`:ok_hand: Successfully enabled **modlogs** in <#${message.channel.id}>.`);
    }

    if(args.split(" ")[0] == 'disable' && args.split(" ")[1] == 'modlogs') {
      let data = await this.client.data.load();
      if(data.settings.modlogs[message.guild.id].channel === false) return message.channel.sendMessage(`:x: **Modlogs** are already disabled in this channel.`)
      data.settings.modlogs[message.guild.id].channel = false;
      await this.client.data.save(data);
      message.channel.sendMessage(`:ok_hand: Successfully disabled **modlogs** in <#${message.channel.id}>.`);
    }

    if(args.split(" ")[0] == 'enable' && args.split(" ")[1] == 'memberlogs') {
      let data = await this.client.data.load();
      if(data.settings.modlogs[message.guild.id].memberlogs === message.channel.id) return message.channel.sendMessage(`:x: **Member Logs** is already enabled in this channel.`)
      data.settings.modlogs[message.guild.id].memberlogs = `${message.channel.id}`;
      await this.client.data.save(data);
      message.channel.sendMessage(`:ok_hand: Successfully enabled **member logging** in <#${message.channel.id}>.`);
    }

    if(args.split(" ")[0] == 'disable' && args.split(" ")[1] == 'memberlogs') {
      let data = await this.client.data.load();
      if(data.settings.modlogs[message.guild.id].memberlogs === false) return message.channel.sendMessage(`:x: **Member Logs** is already disabled in this channel.`)
      data.settings.modlogs[message.guild.id].memberlogs = false;
      await this.client.data.save(data);
      message.channel.sendMessage(`:ok_hand: Successfully disabled **member logging** in <#${message.channel.id}>.`);
    }
  }
}
