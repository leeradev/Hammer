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
                message.reply(`__**Row Data**__\n\n**Access Role:** ${row.accessRole}\n**Logging Channel:** ${row.loggingCh}\n**Anti-Invites:** ${row.antiAdv}`);
            })
          })
        }
      }
    }
