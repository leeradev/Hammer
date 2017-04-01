const { RichEmbed } = require('discord.js');

module.exports = class Command {
	constructor(client) {
		this.client = client;
		this.name = 'stats';
		this.args = '';
		this.info = 'Views the client\'s stats.';
	}

	async execute(message, args) {
		let guilds = await this.client.shard.broadcastEval('this.guilds.size')
		let channels = await this.client.shard.broadcastEval('this.channels.size')
		let users = await this.client.shard.broadcastEval('this.users.size')
		let pings = await this.client.shard.broadcastEval('Math.round(this.ping)')

		const embed = new RichEmbed()
			.setTitle('Hammer Statistics')
			.setColor(0x7289DA)
			.addField('Guilds', guilds.reduce((prev, val) => prev + val, 0), true)
			.addField('Channels', channels.reduce((prev, val) => prev + val, 0), true)
			.addField('Users', users.reduce((prev, val) => prev + val, 0), true)
			.addField('Average Ping', pings.reduce((prev, val) => prev + val, 0), true)

		message.channel.sendEmbed(embed);
	}
}
