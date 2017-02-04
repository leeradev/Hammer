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
          if(!this.client.channels.get('250072021143257088')) return;
          this.client.logger.sendMessage(`**Joined** ${guild.name} with **${guild.memberCount}** members. I am now in ${this.client.guilds.size}`);
        }

        guildDelete(guild) {
          if(!this.client.channels.get('250072021143257088')) return;
          this.client.logger.sendMessage(`**Joined** ${guild.name} with **${guild.memberCount}** members. I am now in ${this.client.guilds.size}`);
        }
      }
