const fs = require('fs');
const config = require('../config.json')
const paste = require('better-pastebin')
const sql = require('sqlite')

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
        paste.setDevKey(config.pastebin.token)
      
    }

    async message(message) {
        if (message.content.startsWith(config.prefix)) {
            let command = message.content.substr(config.prefix.length).split(" ")[0];
            let args = message.content.substr(config.prefix.length + command.length + 1)
            this.client.sql.open('./hammer.sqlite').then(() => {
                this.client.sql.run('CREATE TABLE IF NOT EXISTS servers (serverID TEXT, accessRole TEXT, loggingCh TEXT, antiAdv TEXT)').then(() => {
                    this.client.sql.run('INSERT INTO servers (serverID, accessRole, loggingCh, antiAdv) VALUES (?, ?, ?, ?)', [message.guild.id, "Not set.", "Not set.", false]);
                })
            })
            if (this.client.commands.get(command)) {
                try {
                    await new(this.client.commands.get(command))(this.client).run(message, args);
                } catch (e) {
                    console.error(e);
                    error(error);
                }
            }
        }
    }

    guildCreate(guild) {
        if (!this.client.channels.get('250072021143257088')) return;
        this.client.logger.sendMessage(`Joined **${guild.name}** (\`${guild.id}\`) with **${guild.memberCount}** members. I am now in **${this.client.guilds.size}** guilds.`);
        this.client.sql.open('./hammer.sqlite').then(() => {
            this.client.sql.run('CREATE TABLE IF NOT EXISTS servers (serverID TEXT, accessRole TEXT, loggingCh TEXT, antiAdv TEXT)').then(() => {
                this.client.sql.run('INSERT INTO servers (serverID, accessRole, loggingCh, antiAdv) VALUES (?, ?, ?, ?)', [guild.id, "Not set.", "Not set.", false]);
            })
        })

    }

    guildDelete(guild) {
        if (!this.client.channels.get('250072021143257088')) return;
        this.client.logger.sendMessage(`Left **${guild.name}** (\`${guild.id}\`) with **${guild.memberCount}** members. I am now in **${this.client.guilds.size}** guilds.`);
    }

    error(error) {
        console.log("An error has occured.")
        paste.login(config.pastebin.u, config.pastebin.p, function(success, data) {
            if (!success) {
                console.log("Failed (" + data + ")");
                return false;
            }
            paste.create({
                contents: error,
                name: `Hammer: Error on ${new Date().toUTCString()}`,
                privacy: "1"
            }, function(success, data) {
                if (success) {
                    this.client.logger.sendMessage(`**Error**. ${data}`)
                }
            })
        })
    }
}
