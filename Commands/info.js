const Discord = require('discord.js')


module.exports = class Info {
        constructor(client) {
            this.client = client;
            this.name = "info";
            this.info = "Returns information based on query.";
            this.args = "";
        }


        async run(message, args) {
          function serverE() {
              const embed = new Discord.RichEmbed();
              embed.setAuthor(`${message.guild.name}`, `${message.guild.iconURL}`)
              embed.setColor(0x176790)
              embed.setDescription(`__**Guild Information**__\n\n**User Count**: ${message.guild.memberCount}\n**Server ID**: ${message.guild.id}\n**Default Channel**: ${message.guild.defaultChannel.name}\n**Server Owner**: ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}\n**Date of Creation**: ${message.guild.createdAt.toUTCString()}\n**# of Emojis**: ${message.guild.emojis.size}\n**# of Channels**: ${message.guild.channels.size}\n**# of Roles**: ${message.guild.roles.size}\n\n__**Channel Information**__\n\n**Channel Name**: ${message.channel.name}\n**Created At**: ${message.channel.createdAt.toUTCString()}\n**ID of the Channel**: ${message.channel.id}\n**Type of Channel**: ${message.channel.type}`);
              embed.setFooter(`Generated at ${new Date().toUTCString()}`)
              message.channel.sendEmbed(embed)
          }


          function memberE(member) {
            const embed = new Discord.RichEmbed();
            embed.setAuthor(`${member.user.username}`, `${member.user.avatarURL}`, `https://github.com/jaacks/selfcord`)
            embed.setDescription(`__**Information on ${member.user.username}**__\n\n**Discriminator**: ${member.user.discriminator}\n**Presence**: ${member.user.presence.status}\n**Playing**: ${member.user.presence.game ? member.user.presence.game.name : "None."}\n**Joined Guild**: ${member.joinedAt.toUTCString()}\n**Account Creation**: ${member.user.createdAt.toUTCString()}`)
            embed.setColor(0x176790)
            embed.setFooter(`Generated at ${new Date().toUTCString()}`)
            message.channel.sendEmbed(embed)
          }

          function myselfE(member) {
            const embed = new Discord.RichEmbed();
            embed.setAuthor(`${message.author.username}`, `${message.author.avatarURL}`, `https://github.com/jaacks/selfcord`)
            embed.setDescription(`__**Information on ${message.author.username}**__\n\n**Discriminator**: ${message.author.discriminator}\n**Presence**: ${message.author.presence.status}\n**Playing**: ${message.author.presence.game ? message.author.presence.game.name : "None."}\n**Joined Guild**: ${message.guild.members.get(message.author.id).joinedAt}\n**Account Creation**: ${message.author.createdAt}`)
            embed.setColor(0x176790)
            embed.setFooter(`Generated at ${new Date().toUTCString()}`)
            message.channel.sendEmbed(embed)
          }

            const client = this.client;
            if (!args) {
                message.channel.sendMessage("You didn't include an argument. Would you like information on `server` or `user`? You can also `cancel` the operation.")
                message.channel.awaitMessages(m => m.author.id == message.author.id, {
                    max: 1,
                    time: 30000
                }).then(messages => {
                      if(messages.first().content == 'server') {
                        serverE()
                      }
                      if(messages.first().content == 'cancel') {
                        message.channel.sendMessage(":ok_hand:")
                      }
                      if(messages.first().content == 'user' && !messages.first().mentions.users.first()) {
                        message.channel.sendMessage("Would you like information for `myself` or another user? If so, please mention the user.");
                        message.channel.awaitMessages(m => m.author.id == message.author.id, {
                            max: 1,
                            time: 30000
                        }).then(messages2 => {
                          if(messages2.first().content == 'myself') {
                            myselfE()
                          } else {
                            if(messages2.first().mentions.users.first()) {
                              let member = message.guild.member(messages2.first().mentions.users.first())
                              memberE(member);
                            }
                          }
                        })
                        }

                    })
                  } else {
                    if(args.includes('server')) return serverE()
                  }

                    if(args.includes('user')) {
                      if(!message.guild.member(message.mentions.users.first())) {
                        message.channel.sendMessage("You didn't include a `user`. Would you like information on `myself` or another user? If so, please mention someone now.")
                        message.channel.awaitMessages(m => m.author.id == message.author.id, {
                            max: 1,
                            time: 30000
                        }).then(messages2 => {
                          if(messages2.first().content == 'myself') {
                            myselfE()
                          } else {
                            if(messages2.first().mentions.users.first()) {
                              let member = message.guild.member(messages2.first().mentions.users.first())
                              memberE(member);
                            }
                          }

                        })
                      } else {
                        let member = message.guild.member(message.mentions.users.first())
                        memberE(member);
                      }
                    }

                }
              } //messages.first().mentions.users.first().username
