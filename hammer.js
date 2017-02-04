const Discord = require('discord.js')
const paste   = require('better-pastebin')
const events  = require('./Modules/Events.js')

const client = new class Client extends Discord.Client {
  constructor() {
    super({ fetchAllMembers: true });
    this.events = new events(this);
    this.commands = new Map();

    this.logger = new Discord.WebhookClient('277540915504087040', '0rtOAJT7wklRQMP66jgEnCqXYUEjgjAmofzZyNUPbUpl17yM51o_zjAv2cNHA_3bYB-t');

    // Event Handling
    this.on('ready', () => { this.events.ready(); })
    this.on('message', message => { this.events.message(message); })
    this.on('guildCreate', guild => { this.events.guildCreate(guild); })
    this.on('guildDelete', guild => { this.events.guildDelete(guild); })
    this.on('error', error => { this.events.error(error); })
    this.on('warn', error => { this.events.error(error); })

    // Login
    this.login(require(`./config.json`).token);
  }


}
