module.exports = class Ping {
  constructor(client) {
    this.client = client;
    this.name = "help";
    this.info = "Views commands.";
    this.args = "";
  }

  pad(str, l) {
      return str + ' '.repeat(l - str.length + 1);
  }

  async run(message, args) {
    let final = "";
    this.client.commands.forEach(value => {
      final += `${this.pad(new value().name, 10)} :: ${new value().info}\n`
    })

    message.channel.sendCode(`asciidoc`, `= Hammer Commands =\n${final}`);
  }
}
