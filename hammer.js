const Discord = require('discord.js')
const paste = require('better-pastebin');

const events = require('./Modules/Events.js');
const data   = require('./Modules/Data.js');

const client = new class Client extends Discord.Client {
  constructor() {
    super();

    this.events   = new events(this)
    this.data     = new data(this);
    this.commands = new Map();
    this.sql      = require('sqlite');
    this.webhook  = new Discord.WebhookClient("282604545232732160", "HQyYi8J8mYRLXYxtSlLaTe4PAMsb8V1N24Etqq5fnvr4jRhk11SFwRc62k4qnE8E8u6M")

    // Event Handling
    this.on('ready', () => {
      this.events.ready();
    })
    this.on('message', message => {
      this.events.message(message);
    })
    this.on('guildCreate', guild => {
      this.events.guildCreate(guild);
    })
    this.on('guildDelete', guild => {
      this.events.guildDelete(guild);
    })
    this.on('error', error => {
      console.error(error);
    })
    this.on('warn', error => {
      console.warn(error)
    })

    // Login
    this.login(require(`./config.json`).token);
  }
}

process.on('unhandledRejection', err => console.error(err))
