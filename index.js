/*    Discord    */
const { ShardingManager } = require('discord.js');
const Manager = new ShardingManager('./src/Client.js');

/*    Spawn    */
Manager.spawn(2);
