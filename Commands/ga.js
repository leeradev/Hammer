module.exports = class Ga {
    constructor(client) {
        this.client = client;
        this.name = "ga";
        this.info = "Creates a global annoucement.";
        this.args = "";
    }

    async run(message, args) {
        var a = new Date();
        //var arg = message.content.split(" ").slice(1).join(' ')
        if (message.author.id === "153244623219851266" || message.author.id === "116293018742554625") {
            message.channel.sendMessage(`:warning: **Woah woah woah there bud.** Do you really want to send \`${args}\` to **${this.client.guilds.size}** servers?`)
            var filter = message => message.content.toUpperCase() === "YES"
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ['time']
            }).then(collected => {
                let res1 = client.shard.broadcastEval(`for (var g in this.client.guilds.array()) {
                    this.client.guilds.array()[g].defaultChannel.sendEmbed({
                      author: {name: \`${message.author.username}#${message.author.discriminator}\`, icon_url: \`${message.author.avatarURL}\`},
                      title: \`:globe_with_meridians: Global Annoucement\`,
                      description: \`**Annoucement**\n\n${args}\`,
                      color: 0x176790,
                      url: "https://google.com",
                      footer: {text: \`Global Annoucement | Sent at ${new Date().toUTCString()}\`, icon_url: \`${this.client.user.avatarURL.replace('.jpg', '.png')}\`}
                    })
                }`)
            })
        }
    }
}
