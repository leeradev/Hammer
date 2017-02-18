module.exports = class Blacklist {
  constructor(client) {
    this.client = client;
    this.name = "blacklist";
    this.info = "Adds/removes a blacklist.";
    this.args = "<add/remove> <id>";
  }

  async run(message, args) {
    if(message.author.id != "153244623219851266" && message.author.id != "116293018742554625") return message.channel.sendMessage(`:x: You have invalid permissions.`);
    if(args.split(" ")[0] == 'add') {
      let data = await this.client.data.load();
      data.blacklists[args.split(" ")[1]] = true;
      await this.client.data.save(data);
      message.channel.sendMessage(`:ok_hand: Added **${args.split(" ")[1]}** to blacklist.`);
    }
    if(args.split(" ")[0] == 'remove') {
      let data = await this.client.data.load();
      delete data.blacklists[args.split(" ")[1]];
      await this.client.data.save(data);
      message.channel.sendMessage(`:ok_hand: Removed **${args.split(" ")[1]}** from blacklist.`);
    }
  }
}
