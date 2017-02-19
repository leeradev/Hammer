module.exports = class Perms {
    constructor(client) {
        this.client = client;
        this.name = "perms";
        this.info = "Shows different permissions required to use Hammer.";
        this.args = "<user / bot>";
    }

    async run(message, args) {
        if (!args) return message.channel.sendMessage("Please specify an argument.\n`user` or `bot`.3")
        if (args === "user") {
            message.channel.sendEmbed({
                title: `Permissions List`,
                description: `These are the different permissions that you need to use moderation commands.\n\n**MANAGE_SERVER**\n<:vpOnline:212789758110334977>\`set\`\n<:vpOnline:212789758110334977>\`conf\`\n\n**KICK_MEMBERS**\n<:vpAway:212789859071426561>\`warn\`\n<:vpAway:212789859071426561>\`kick\`\n\n**BAN_MEMBERS**\n<:vpDnD:236744731088912384>\`ban\`\n<:vpDnD:236744731088912384>\`mute\`\n\n**ADMINISTRATOR**\n<:vpStreaming:212789640799846400>\`conf reset\`\n\n**HAMMER OWNERS**\n<:vpOffline:212790005943369728> \`eval\`\n<:vpOffline:212790005943369728> \`update\`\n<:vpOffline:212790005943369728> \`ga\``,
                color: 0x176790,
                url: `https://google.com`
            })
        }
        if (args === "bot") {
            var kickMem = message.guild.member(this.client.user).hasPermission("KICK_MEMBERS") ? '<:vpGreenTick:257437292820561920>' : '<:vpRedTick:257437215615877129>'
            var banMem = message.guild.member(this.client.user).hasPermission("BAN_MEMBERS") ? '<:vpGreenTick:257437292820561920>' : '<:vpRedTick:257437215615877129>'
            var msgs = message.guild.member(this.client.user).hasPermission("MANAGE_MESSAGES") ? '<:vpGreenTick:257437292820561920>' : '<:vpRedTick:257437215615877129>'
            var links = message.guild.member(this.client.user).hasPermission("EMBED_LINKS") ? '<:vpGreenTick:257437292820561920>' : '<:vpRedTick:257437215615877129>'
            message.channel.sendEmbed({
                title: `Permissions List`,
                description: `These are the permissions the bot needs to function.\n\n**Kick Members**: ${kickMem}\n**Ban Members**: ${banMem}\n**Manage Messages**: ${msgs}\n**Embed Links**: ${links}\n\nI cannot kick anyone above my role (${message.guild.member(this.client.user).highestRole})`,
                color: 0x176790,
                url: `https://google.com`
            })
        }
    }
}
