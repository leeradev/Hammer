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
                    {name: 'Server ID', value: row.serverID, inline: true},
                    {name: 'Access Role', value: row.accessRole, inline: true},
                    {name:'\u200b', value: '\u200b', inline: true},
                    {name: 'Logging Channel', value: row.loggingCh, inline: true},
                    {name: 'Anti-Invites', value: row.antiAdv, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true}
                  ],
                  color: 0x176790
                })
            })
          })
        }
      }
    }
