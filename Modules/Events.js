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
    }

    async message(message) {
        let data = await this.client.data.load();
        if (message.content.startsWith(config.prefix)) {
            if (data.blacklists[message.author.id]) return message.channel.sendMessage(`:warning: **Uh oh, that's not good.**\nLooks like your in Hammers blacklist. You cannot run any commands.`);
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
        this.client.webhook.sendMessage(`:inbox_tray: __**Shard ${this.client.shard.id}**__\nJoined **${guild.name}**.\nThere are **${guild.memberCount}** members.`)
    }

    guildDelete(guild) {
        this.client.webhook.sendMessage(`:outbox_tray: __**Shard ${this.client.shard.id}**__\nLeft **${guild.name}**.\nThere is now **${guild.memberCount}** members.`)
    }

    async guildMemberAdd(member) {
      let data = await this.client.data.load();
      if(data.settings.modlogs[member.guild.id].memberlogs === false) return;
      this.client.channels.get(data.settings.modlogs[member.guild.id].memberlogs).sendEmbed({
        author: {name: `${member.user.username}#${member.user.discriminator}`, icon_url: `${member.user.avatarURL}`},
        description: `User has joined.`,
        footer: {text: `Server Member Count: ${member.guild.memberCount}`},
        timestamp: new Date(),
        color: 0x32CD32
      })
    }

    async guildMemberRemove(member) {
      let data = await this.client.data.load();
      if(data.settings.modlogs[member.guild.id].memberlogs === false) return;
      this.client.channels.get(data.settings.modlogs[member.guild.id].memberlogs).sendEmbed({
        author: {name: `${member.user.username}#${member.user.discriminator}`, icon_url: `${member.user.avatarURL}`},
        description: `User has left.`,
        footer: {text: `Server Member Count: ${member.guild.memberCount}`},
        timestamp: new Date(),
        color: 0x8b0000
      })
    }
}
