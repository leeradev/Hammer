module.exports = class Ping {
  constructor(client) {
    this.client = client;
    this.name = "set";
    this.info = "Sets some settings.";
    this.args = "<enable/disable> <setting>";
  }

  async run(message, args) {
    if(args.split(" ")[0] == 'enable' && args.split(" ")[1] == 'modlogs') {
      let data = await this.client.data.load();
      data.settings.modlogs[message.guild.id] = { channel: message.channel.id, guild: message.guild.id };
      await this.client.data.save(data);
      message.channel.sendMessage(`:ok_hand: Successfully enabled **modlogs** in <#${message.channel.id}>.`);
    }
  }
}
