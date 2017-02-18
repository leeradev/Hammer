module.exports = class Update {
  constructor(client) {
    this.client = client;
    this.name = "update";
    this.info = "Updates the bot.";
    this.args = "";
  }

  async run(message, args) {
    if(message.author.id != "153244623219851266" && message.author.id != "116293018742554625") return message.channel.sendMessage(`:x: You have invalid permissions.`);

    require('child_process').exec(`git pull origin master`, (err, out, er) => {
      if(err) return message.channel.sendCode(``, err);
      message.channel.sendCode('', `${out}\n${er}`).then(() => {
        message.channel.sendMessage(`**Rebooting...**`).then(() => {
          this.client.shard.broadcastEval(`this.logout()`);
        })
      })
    })
  }
}
