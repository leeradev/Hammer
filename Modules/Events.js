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

  }

  guildDelete(guild) {

  }
}
