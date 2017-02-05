const Discord = require('discord.js')


module.exports = class Info {
    constructor(client) {
        this.client = client;
        this.name = "conf";
        this.info = "Returns server database information";
        this.args = "";
    }

    async run(message, args) {
        const client = this.client;
        function inspect() {
          client.sql.open('./hammer.sqlite').then(() => {
            client.sql.get(`SELECT * FROM servers WHERE serverID ='${message.guild.id}'`).then(row => {
              if (!row) return message.reply('No data found for this server.');

              message.channel.sendEmbed({
                author: {
                  name: message.guild.name,
                  icon_url: message.guild.iconURL
                },
                fields: [{
                  name: 'Server ID',
                  value: row.serverID,
                  inline: true
                },
                {
                  name: 'Access Role',
                  value: row.accessRole,
                  inline: true
                },
                {
                  name: '\u200b',
                  value: '\u200b',
                  inline: true
                },
                {
                 name: 'Logging Channel',
                 value: row.loggingCh,
                 inline: true
                },
                {
                  name: 'Anti-Invites',
                  value: row.antiAdv,
                  inline: true
                },
                {
                  name: '\u200b',
                  value: '\u200b',
                  inline: true
                }],
                color: 0x176790
              })
            })
          })
        }


        if (!args) return message.channel.sendMessage("You didn't supply an argument. Would you like to `inspect` the server configuration, or would you like to `edit` it?");
        message.channel.awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 30000
        }).then(messages => {
            if (messages.first().content == 'inspect') {
                inspect()
            } else {
                if (messages.first().content == 'edit') {
                  console.log('called edit')
                    message.channel.sendMessage("Would you like to edit `accessRole`, `loggingCh` (logging channel), or `antiAdv` (anti advertisements)?")
                    message.channel.awaitMessages(m => m.author.id == message.author.id, {
                        max: 1,
                        time: 30000
                    }).then(messages2 => {
                        if (messages2.first().content == 'loggingCh') {
                            message.channel.sendMessage("Soon:tm:.")
                        }
                    })

                }
            }

        })
        if (args === "inspect") {
            inspect();
        }
    }
}
