const Discord = require('discord.js')


module.exports = class Conf {
    constructor(client) {
        this.client = client;
        this.name = "conf";
        this.info = "Returns server database information";
        this.args = "";
    }

    async run(message, args) {
        const client = this.client;
        let data = await this.client.data.load();
        if(args === "inspect") {
          message.channel.sendEmbed({
              title: `Server Settings for ${message.guild.name}`,
              url: `https://google.com`,
              description: `**Mod Log Events:** <#${data.settings.modlogs[message.guild.id].channel}>\n**Member Join/Leave Events**: <#${data.settings.modlogs[message.guild.id].memberlogs}>`,
              color: 0x176790
          }).catch(console.error)
        }

    }
}
