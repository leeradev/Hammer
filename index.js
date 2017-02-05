const discord = require('discord.js');
const manager = new discord.ShardingManager('./hammer.js');

manager.spawn(1);
