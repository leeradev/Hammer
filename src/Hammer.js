/*    Client    */
const Commando = require('discord.js-commando');
const client = new Commando.Client({
	owner: '116293018742554625',
	commandPrefix: 'h3 '
});

/*    Events    */
client.on('ready', () => {
	console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
});

/*    Registry    */
client.registry
	.registerGroup('math', 'Math')
	.registerDefaults()
	.registerCommandsIn(`${__dirname}/commands`);

/*     Login    */
client.login(require('./config.json').token);
