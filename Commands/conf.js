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
                if(!row) return;
                message.reply(row);
            })
          })
        }
      }
    }
