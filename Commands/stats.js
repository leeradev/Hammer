const Discord = require('discord.js')
module.exports = class Stats {
  constructor(client) {
    this.client = client;
    this.name = "stats";
    this.info = "Get the bot's current stats.";
    this.args = "";
  }

  async run(message, args) {
    const embed = new Discord.RichEmbed();
    embed.setColor(0x176790);
    embed.setTitle("Hammer's Current Stats")
    embed.setURL("https://google.com")
    embed.setDescription(`__**Bot Stats**__\n\n**Guild Count**: ${this.client.guilds.size} guilds\n**User Count**: ${this.client.users.size} users\n**Channel Count**: ${this.client.channels.size} channels\n**Uptime**: ${Math.round(this.client.uptime / (1000 * 60 * 60))} hours, ${Math.round(this.client.uptime / (1000 * 60)) % 60} minutes, and ${Math.round(this.client.uptime / 1000) % 60} seconds\n\n__**Other Stats**__\n\n**Memory Usage**: ${(process.memoryUsage().rss / 1024 / 1024).toString().split(".")[0]} MiB\n**Owners**: Jack#0305, DoctorDarkMagic ツ#3790`)
    embed.setTimestamp();
    embed.setFooter("Generated at ", `${this.client.user.avatarURL}`)
    message.channel.sendEmbed(embed)
  }
}
