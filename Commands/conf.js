const Discord = require('discord.js')


module.exports = class Info {
        constructor(client) {
            this.client = client;
            this.name = "conf";
            this.info = "Returns server database information";
            this.args = "";
        }
        async run(message, args) {
          if(args === "inspect") {
            this.client.sql.open('./hammer.sqlite').then(() => {
              this.client.sql.get(`SELECT * FROM servers WHERE serverID ='${message.guild.id}'`).then(row => {
                if(!row) return message.reply('No data found for this server.');

                message.channel.sendEmbed({
                  author: {name: message.guild.name, icon_url: message.guild.iconURL},
                  fields: [
                    {'Server ID' row.serverID},
                    {'Access Role' row.accessRole},
                    {'\u200b', '\u200b', true},
                    {'Logging Channel', row.loggingCh},
                    {'Anti-Invites', row.antiAdv},
                    {'\u200b', '\u200b', true}
                  ]
                  color: 0x176790
                })
            })
          })
        }
      }
    }
