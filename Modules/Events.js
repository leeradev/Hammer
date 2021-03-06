const fs = require('fs');
const config = require('../config.json')
const paste = require('better-pastebin')
const sql = require('sqlite')

module.exports = class Events {
    constructor(client) {
        this.client = client;
    }

    async setGameManager() {
      let client = this.client;
      async function getGuilds() {
        let guilds = await client.shard.broadcastEval('this.guilds.size');
        guilds = guilds.reduce((a, b) => a + b);
        return guilds;
      }
      let games = [`hhelp | {guilds} Servers`, `hhelp | Shard ${this.client.shard.id}/${this.client.shard.count}`];
      setInterval(async () => {
        let g = await getGuilds();
        this.client.user.setGame(games[Math.floor(Math.random() * games.length)].replace('{guilds}', g));
      }, 12000)
    }

    ready() {
        console.log('Ready!');
        this.client.user.setGame(`Starting Up`);
        this.setGameManager();
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
      try {
        let role = guild.createRole({ name: 'HammerMuted' })
        guilds.channels.forEach(ch => {
          chan.overwritePermissions(role, {
            'SEND_MESSAGES': false,
            'SEND_TTS_MESSAGES': false
          });
        })
      } catch(e) {}
      this.client.webhook.sendMessage(`:inbox_tray: __**Shard ${this.client.shard.id}**__\nJoined **${guild.name}**.\nThere are **${guild.memberCount}** members.`)
    }

    guildDelete(guild) {
        this.client.webhook.sendMessage(`:outbox_tray: __**Shard ${this.client.shard.id}**__\nLeft **${guild.name}**.\nThere is now **${guild.memberCount}** members.`)
    }

    async guildMemberAdd(member) {
      let data = await this.client.data.load();
      if(!data.settings.modlogs[member.guild.id]) return;
      if(data.settings.modlogs[member.guild.id].memberlogs === false) return;
      this.client.channels.get(data.settings.modlogs[member.guild.id].memberlogs).sendEmbed({
        author: {name: `${member.user.username}#${member.user.discriminator} (${member.user.id})`, icon_url: `${member.user.displayAvatarURL}`},
        footer: {text: `User Joined`, icon_url: this.client.user.avatarURL.replace('.jpg', '.png')},
        timestamp: new Date(),
        color: 0x32CD32
      })
    }

    async guildMemberRemove(member) {
      let data = await this.client.data.load();
      if(!data.settings.modlogs[member.guild.id]) return;
      if(data.settings.modlogs[member.guild.id].memberlogs === false) return;
      console.log(`${member.user.username}#${member.user.discriminator} (${member.user.id})`)
      console.log(`${member.user.avatarURL == '' ? member.user.defaultAvatarURL : member.user.avatarURL}`)
      this.client.channels.get(data.settings.modlogs[member.guild.id].memberlogs).sendEmbed({
        author: {name: `${member.user.username}#${member.user.discriminator} (${member.user.id})`, icon_url: `${member.user.displayAvatarURL}`},
        footer: {text: `User Left`, icon_url: this.client.user.avatarURL.replace('.jpg', '.png')},
        timestamp: new Date(),
        color: 0x8b0000
      })
    }
}
