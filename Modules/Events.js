const fs = require('fs');
const config = require('../config.json')

module.exports = class Events {
        constructor(client) {
            this.client = client;
        }

        ready() {
            console.log('Ready!');
            const commands = fs.readdirSync(`./Commands/`);
            for (const command in commands) {
                const mod = new(require(`../Commands/${commands[command]}`))(this.client);
                this.client.commands.set(mod.name, require(`../Commands/${commands[command]}`))
            }
        }

        async message(message) {
                if (message.content.startsWith(config.prefix)) {
                    let command = message.content.substr(config.prefix.length).split(" ")[0];
                    let args = message.content.substr(config.prefix.length + command.length + 1)

                    if (this.client.commands.get(command)) {
                        try {
                            await new(this.client.commands.get(command))(this.client).run(message, args);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
        }

        guildCreate(guild) {
          this.client.channels.get("250072021143257088").sendEmbed({
            author: {name: `${guild.name}`, icon_url: `${guild.iconURL}`},
            description: `__**New Guild**__\n\n**Name**: ${guild.name}\n**Owner**: ${guild.owner.user.username}#${guild.owner.user.discriminator}\n**User Count**: ${guild.memberCount} members\n**Current Guild Count**: ${this.client.guilds.size}`,
            color: 0x00FF00,
            footer: {text: `Joined at ${guild.joinedAt.toUTCString()}`}
          })
        }

        guildDelete(guild) {
          this.client.channels.get("250072021143257088").sendEmbed({
            author: {name: `${guild.name}`, icon_url: `${guild.iconURL}`},
            description: `__**Left Guild**__\n\n**Name**: ${guild.name}\n**Owner**: ${guild.owner.user.username}#${guild.owner.user.discriminator}\n**User Count**: ${guild.memberCount} members\n**Current Guild Count**: ${this.client.guilds.size}`,
            color: 0x8B0000,
            footer: {text: `Left at ${guild.joinedAt.toUTCString()}`}
          })
        }
      }
