module.exports = class Shard {
  constructor(client) {
    this.client = client;
    this.name = "shard";
    this.info = "Views shards. (* = Server shard is on.)";
    this.args = "";
  }

  async run(message, args) {
    let final = [];
    final.push(`\`\`\`asciidoc\n`);
    final.push(`= Shards = \n`)
    let res  = this.client.shard.broadcastEval('this.guilds.size').then(res => {
      res.map(i => i).forEach((value, index) => {
        if(index == this.client.shard.id) {
          final.push(`${this.pad(`Shard ${index}*`, 9)} :: ${value} Guilds`);
        } else {
          final.push(`${this.pad(`Shard ${index}`, 9)} :: ${value} Guilds`);
        }
      })
      final.push(`\n\`\`\``);
      message.channel.sendMessage(final.join('\n'));
    });
  }


  pad(str, l) {
      return str + ' '.repeat(l - str.length + 1);
  }
}
