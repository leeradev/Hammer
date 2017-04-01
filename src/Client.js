const { Client } = require('discord.js');

const EventsManager = require('./Managers/Events.js')

const client = new class extends Client {
	constructor() {
		super();

		this.events = new EventsManager(this);

		this.on('ready', () => this.events.ready())
			.on('message', message => this.events.message(message));

		this.login(require('./config.json').token)
	}
}
