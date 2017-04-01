module.exports = class EventsManager {
	constructor(client) {
		this.client = client;
	}

	ready() {
		console.log(`Client Ready | Shard ${this.client.shard.id}/${this.client.shard.count}`);
	}

	async message(message) {
		if(message.author.bot) return;
		if(message.content.startsWith('hb')) {
			let command = message.content.substring(2).split(" ")[0];
			let args = message.content.substring(3 + command.length);

			let commands = require('fs').readdirSync(__dirname + '/../Commands/');
			commands.forEach(async c => {
				if(c == command + '.js') {
					let cmd = new (require(__dirname + '/../Commands/' + c))(this.client)
					await cmd.execute(message, args);
				}
			})
		}
	}
}
