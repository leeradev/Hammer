/*    Sharder    */
const { ShardingManager } = require('discord.js');
const Manager = new ShardingManager('./src/Hammer.js');

/*    Spawn    */
Manager.spawn(1);
