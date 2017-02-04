const Discord = require('discord.js')
const events  = require('./Modules/Events.js')

const client = new class Client extends Discord.Client {
  constructor() {
    super({ fetchAllMembers: true });
    this.events = new events(this);
    this.commands = new Map();


    // Event Handling
    this.on('ready', () => { this.events.ready(); })
    this.on('message', message => { this.events.message(message); })
    this.on('guildCreate', guild => { this.events.guildCreate(guild); })
    this.on('guildDelete', guild => { this.events.guildDelete(guild); })

    // Login
    this.login(require(`./config.json`).token);
  }


}
