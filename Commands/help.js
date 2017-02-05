module.exports = class Ping {
  constructor(client) {
    this.client = client;
    this.name = "help";
    this.info = "Views commands.";
    this.args = "";
  }

  async run(message, args) {
    let final = "";
    this.client.commands.forEach(value => {
      final += `\n__**${new value().name} ${new value().args}**__\n\t${new value().info}`
    })

    message.channel.sendMessage(`__**Hammer Commands**__\n${final}`);
  }
}
