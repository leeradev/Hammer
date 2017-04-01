module.exports = class Command {
	constructor(client) {
		this.client = client;
		this.name = 'ping';
		this.args = '';
		this.info = 'Views the client\'s speed.';
	}

	async execute(message, args) {
		message.channel.sendMessage(`**Pong!** \`${Math.round(this.client.ping)}\`ms.`)
	}
}
