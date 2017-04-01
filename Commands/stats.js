const Discord = require('discord.js')
module.exports = class Stats {
  constructor(client) {
    this.client = client;
    this.name = "stats";
    this.info = "Get the bot's current stats.";
    this.args = "";
  }

  async run(message, args) {
    let guilds = await this.client.shard.broadcastEval('this.guilds.size');
    guilds = guilds.reduce((a, b) => a + b);
    let channels = await this.client.shard.broadcastEval('var x=0;this.guilds.map(g => {x += g.channels.size});x;');
    channels = channels.reduce((a, b) => a + b);
    let users = await this.client.shard.broadcastEval(`this.guilds.map(g => g.memberCount).reduce((a, b) => a + b)`);
    users = users.reduce((a, b) => a + b);
    const embed = new Discord.RichEmbed();
    embed.setColor(0x176790);
    embed.setTitle("Hammer's Current Stats")
    embed.setURL("https://google.com")
    embed.setDescription(`__**Bot Stats**__\n\n**Guild Count**: ${guilds} guilds\n**User Count**: ${users} users\n**Channel Count**: ${channels} channels\n**Uptime**: ${Math.round(this.client.uptime / (1000 * 60 * 60))} hours, ${Math.round(this.client.uptime / (1000 * 60)) % 60} minutes, and ${Math.round(this.client.uptime / 1000) % 60} seconds\n\n__**Other Stats**__\n\n**Memory Usage**: ${(process.memoryUsage().rss / 1024 / 1024).toString().split(".")[0]} MiB\n**Owners**: Jack#0305, DoctorDarkMagic ツ#3790`)
    embed.setTimestamp();
    embed.setFooter("Generated at ", `${this.client.user.avatarURL.replace('.jpg', '.png')}`)
    message.channel.sendEmbed(embed)
  }
}
