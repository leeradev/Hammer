const Discord = require("discord.js");
const time    = require("little-time");
const reload  = require("require-reload");
const notif   = require("node-notifier");
const path    = require("path")
const client  = new Discord.Client();
const color   = 0x002366;
const wcolor  = 0xFFC0CB;
const kcolor  = 0xFA8072;
const bcolor  = 0xFF0000;
const jcolor  = 0x7FFF00;
const version = "Zenith v1.8"
client.on('ready', () => {
    console.log(`Hammer online! | Currently on ${client.guilds.size} servers, serving ${client.users.size} people.`)
    client.user.setGame('hcmds | '+client.guilds.size+' Servers')
    client.user.setAvatar('./hammer.png');
    notif.notify({
        title: 'Hammer',
        message: `Hammer is online! Currently on ${client.guilds.size} servers, serving ${client.users.size} people.`,
        icon: path.join(__dirname, 'robot.png'), // Absolute path (doesn't work on balloons)
        sound: true, // Only Notification Center or Windows Toasters
      });
});
function isAdmin(id) {
  if(id == "116293018742554625" || id == "153244623219851266") {
    return true;
  } else {
    return false;
  }
}

var awaits = {};

var commands = {
  "cmds": {
    desc: "Generates an auto list of all commands available.",
    args: "",
    func: (bot,msg) => {
      var final = "**Here are all the commands:**\nYou can use the following prefix: `h`\n";
      for(var cmd in commands) {
        final += "\n**"+cmd+" "+commands[cmd].args+"**\n\t"+commands[cmd].desc;
      }
      msg.author.sendMessage(final);
      msg.channel.sendMessage("<@"+msg.author.id + "> | Check your direct messages.");
    }
  },
  "ping": {
    desc: "Find out if the bot is online, and find the response time in milliseconds.",
    args: "",
    func: (bot,msg) => {
      var t = new Date();
      msg.channel.sendMessage("Pong! Finding ms, one _second_.").then(m => {
        m.delete();
        var a = new Date();
        m.channel.sendMessage("", {embed: {
           title: "Ping Test",
           url: "https://jack.cernodile.com",
           description: "Pong!",
           color: color,
           fields: [
            {name: "Time (MS)", value: (a - t)+"ms.", inline: true},
            {name: "Command Caller", value:  `${msg.author}`, inline: true},
            {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}`, inline: true}
          ]
      }
    })
  })
  }
},
  "stats": {
    desc: "Get some stats about the bot.",
    args: "",
    func: (bot,m) => {
      m.channel.sendMessage("", {embed: {
        title: "Bot Statistics",
        url : "https://jack.cernodile.com",
        description: "These are the live stats for Hammer.",
        color: color,
        fields: [
          {name: "Users I Can See", value: `${bot.users.size}`, inline: true},
          {name: "Guilds I Am In", value: `${bot.guilds.size}`, inline: true},
          {name: "Visible Channels", value: `${bot.channels.size}`, inline: true},
          {name: "Current Version", value: `${version}`, inline: true},
          {name: "Uptime of The Bot", value: (Math.round(client.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(client.uptime / 1000) % 60) + " seconds", inline: true},
          {name: "Original Creators", value: "The Copper Coders", inline: true},
          {name: "Rewrite Creators", value: "Jack#0305 and DoctorDarkMagic ツ#3790\nAlso Fëitan#0154 for helping with some errors.", inline: true}
        ]

      }})
    }
  },
  "permcheck": {
    desc: "Check if you have a channel named `mod-log`.",
    args: "",
    func: (bot,m) => {
      if(m.guild.channels.find('name', 'mod-log')) {
        m.channel.sendMessage("✅ | **Channel `mod-log` was found.**")
      } else {
        m.channel.sendMessage(":x: | **Channel `mod-log` was not found.**")
      }
    if(m.member.roles.find('name', 'Wielder')) {
      m.channel.sendMessage("✅ | **You have the role `Wielder`.**")
    } else {
      m.channel.sendMessage(":x: | **You do not have the role `Wielder`.**")
    }
  }
},
  "logcheck": {
    desc: "Test to make sure that the bot can talk in the `mod-log` channel.",
    args: "",
    func: (bot,m) => {
      if(m.member.roles.find('name', 'Wielder')) {
        m.guild.channels.find('name', 'mod-log').sendMessage("", {embed: {
          title: "Test Punishment",
          url : "https://jack.cernodile.com",
          description: "A user has felt the power of Hammer!",
          color: bcolor,
          fields: [
            {name: "Punishment", value: "Ban", inline: true},
            {name: "User That Was Banned", value: `${m.author}`, inline: true},
            {name: "Reason", value: "Test reason.", inline: true},
            {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}`, inline: true},
            {name: "Responsible Wielder", value: `${m.author.username}#${m.author.discriminator}`, inline: true}
          ]
        }})
      }
    }
  },
  "eval": {
    desc: "Evaluates code. **OWNER**",
    args: "code",
    func: (bot,msg,args) => {
      if(isAdmin(msg.author.id)) {
        try {
          var result = eval(args);
          msg.channel.sendMessage("", {embed: {
            title: "Evaluation Completed!",
            url: "https://jack.cernodile.com",
            color: color,
            fields: [
              {name: "Result", value: `${result}`, inline: true},
              {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}`, inline: true},
            ]
          }})
        } catch(e) {
          msg.channel.sendMessage("", {embed: {
            title: "Evaluation Error!",
            url: "https://jack.cernodile.com",
            color: bcolor,
            fields: [
              {name: "Error!", value: `${e}`, inline: true},
              {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}`, inline: true},
            ]
          }})
        }
      } else {
        msg.channel.sendMessage("<@" + msg.author.id + "> | :x: You do not have the permissions for that command.");
      }
    }
  },
  "whois": {
    desc: "Get information on a user.",
    args: "Mention",
    func: (bot,msg,args) => {
      var mention = msg.mentions.users.first();
      if(msg.mentions.users.size === 0) {
        return msg.channel.sendMessage(":x: | Please mention a user.")
      }
      msg.channel.sendMessage("", {embed: {
        title: `Whois on ${mention.username}`,
        url: "https://jack.cernodile.com",
        color: color,
        description: "Here is some detailed info on that user.",
        fields: [
          {name: "Name", value: `${mention.username}`, inline: true},
          {name: "Discriminator", value: `${mention.discriminator}`, inline: true},
          {name: "Status", value: `${mention.presence.status}`, inline: true},
          {name: "Game", value: `${mention.presence.game.name}`, inline: true},
          {name: "Avatar", value: `[Click Here](${mention.avatarURL})`, inline: true},
          {name: "Creation Timestamp", value: `${mention.createdAt}`, inline: true},
          {name: "Joined At", value: `${msg.guild.member(mention).joinedAt.toUTCString()}`, inline: true}
        ]
      }})
    }
  },
  "reload": {
    desc: "Updates the bot. **OWNER**",
    args: "",
    func: (bot,msg) => {
      if(isAdmin(msg.author.id)) {
        var instance = reload('./ham_beta.js');
        msg.channel.sendMessage("<@" + msg.author.id + "> | Updating from **" + version + "**...");
        bot.destroy();
        instance.send(msg.channel.id, 'Done!');
      } else {
        msg.channel.sendMessage("<@" + msg.author.id + "> | :x: You do not have the permissions for that command.");
      }
    }
  },
  "sinfo": {
    desc: "Get information about the server.",
    args: "",
    func: (bot,msg) => {
      var final = "Emojis in the server: "
      for(var emoji in msg.guild.emojis.array()) {
        final += "<:"+msg.guild.emojis.array()[emoji].name+":"+msg.guild.emojis.array()[emoji].id+"> "
      }
      msg.channel.sendMessage("", {embed: {
        title: `Information on ${msg.guild.name}`,
        url: "https://jack.cernodile.com",
        color: color,
        description: "Here is some detailed info on your server.",
        fields: [
          {name: "Name of Server", value: `${msg.guild}`, inline: true},
          {name: "Owner Information", value: `${msg.guild.owner}`, inline: true},
          {name: "Server Information", value: `Name: ${msg.guild.name}\n${msg.guild.channels.size} channels total\n${msg.guild.memberCount} members`, inline: true},
          {name: "Miscellaneous Information", value: `Region: ${msg.guild.region}\n[Server Icon](${msg.guild.iconURL})\n${final}`, inline: true}
        ]
      }})
    }
  },
  "kick": {
    desc: "Kicks the user that you mentioned. __Requires 'Wielder' Role__",
    args: "| Mention + Reason",
    func: (bot,msg) => {
      let role = msg.guild.roles.find("name", "Wielder")
      if(!msg.member.roles.has(role.id)){
        return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, you have no permissions.`)
      }
      if(msg.member.roles.has(role.id)) {
        if(msg.mentions.users.size === 0) {
          return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, please mention a user.`)
          }
        let kickMember = msg.guild.member(msg.mentions.users.first())
        if(!kickMember) {
          return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, please mention a valid user.`)
          }
        if(!msg.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
          return msg.channel.sendMessage(":x: | I do not have the permission **KICK_MEMBERS**. Please give me that permission then try again.")
          }
          kickMember.kick().then(member => {
            msg.channel.sendMessage(`:ok_hand: | I successfully kicked **${member.user.username}**. Reason for kick?`)
              const collector = msg.channel.createCollector(
               m => m.author.id !== bot.user.id,
               { maxMatches: 1, time: 6000}
              );
              collector.on('message', m =>
              m.guild.channels.find('name', 'mod-log').sendMessage("", {embed: {
              title: `User has felt the power of Hammer!`,
              url: "https://jack.cernodile.com",
              color: kcolor,
              fields: [
              {name: "Punishment", value: "Kick", inline: true},
              {name: "User that was Kicked", value: `${kickMember}`, inline: true},
              {name: "Reason for Kick", value: `${m.content}`, inline: true},
              {name: "Responsible Moderator", value: `${msg.author.username}#${msg.author.discriminator}`, inline: true},
              {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}pm`, inline: true}
                    ]
                }}))
              })
            }
          }
        },
  "ban": {
    desc: "Ban the user that you mentioned. __Requires 'Wielder' Role__",
    args: "| Mention + Reason",
    func: (bot,msg) => {
      let role = msg.guild.roles.find("name", "Wielder")
      if(!msg.member.roles.has(role.id)){
        return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, you have no permissions.`)
      }
      if(msg.member.roles.has(role.id)) {
        if(msg.mentions.users.size === 0) {
          return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, please mention a user.`)
          }
        let kickMember = msg.guild.member(msg.mentions.users.first())
        if(!kickMember) {
          return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, please mention a valid user.`)
          }
        if(!msg.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
          return msg.channel.sendMessage(":x: | I do not have the permission **BAN_MEMBERS**. Please give me that permission then try again.")
          }
          kickMember.ban().then(member => {
            msg.channel.sendMessage(`:ok_hand: | I successfully banned **${member.user.username}**. Reason for ban?`)
              const collector = msg.channel.createCollector(
               m => m.author.id !== bot.user.id,
               { maxMatches: 1, time: 6000}
              );
              collector.on('message', m =>
              m.guild.channels.find('name', 'mod-log').sendMessage("", {embed: {
                                title: `User has felt the power of Hammer!`,
                                url: "https://jack.cernodile.com",
                                color: bcolor,
                                fields: [
                                  {name: "Punishment", value: "Ban", inline: true},
                                  {name: "User that was Banned", value: `${kickMember}`, inline: true},
                                  {name: "Reason for Ban", value: `${m.content}`, inline: true},
                                  {name: "Responsible Moderator", value: `${msg.author.username}#${msg.author.discriminator}`, inline: true},
                                  {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}pm`, inline: true}
                                ]
                              }}))
              })
            }
          }
      },
  "announce": {
    desc: "Annouce a message to all servers. **OWNER**.",
    args: "",
    func: (bot,msg,args) => {
      if(isAdmin(msg.author.id)) {
        msg.channel.sendMessage(`:warning: | Are you sure you want to send message ${args} as a **GLOBAL ANNOUCEMENT** to **${client.guilds.size} servers**?`)
        var filter = msg => msg.content.toUpperCase() === "YES"
            msg.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] }).then(collected => {
              for(var g in bot.guilds.array()) {
              bot.guilds.array()[g].defaultChannel.sendMessage(`:warning: **GLOBAL ANNOUCEMENT** :warning:\n\n${args}`);
              }
            })
          }
        }
      },
  "warn": {
    desc: "Warn a user. __Requires 'Wielder' Role__",
    args: "| Mention + Reason",
    func: (bot,msg) => {
      let role = msg.guild.roles.find("name", "Wielder")
      if(!msg.member.roles.has(role.id)){
        return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, you have no permissions.`)
      }
      if(msg.member.roles.has(role.id)) {
        if(msg.mentions.users.size === 0) {
          return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, please mention a user.`)
          }
        let warnMember = msg.guild.member(msg.mentions.users.first())
        if(!warnMember) {
          return msg.channel.sendMessage(`:x: | <@${msg.author.id}>, please mention a valid user.`)
          }
        }
        msg.channel.sendMessage(`:ok_hand: | Reason for warning?`)
        let warnMember = msg.guild.member(msg.mentions.users.first())
          const collector = msg.channel.createCollector(
           m => m.author.id !== bot.user.id,
           { maxMatches: 1, time: 6000}
          )
        collector.on('message', msg => {
          let msgAr = [];
          msgAr.push(`:warning: **Message from ${msg.guild.name}** :warning:`)
          msgAr.push(`You have been warned by ${msg.author} in the server of ${msg.guild.name}.`)
          msgAr.push(`Your offense: **${msg.content}**`)
          msgAr.push(`Timestamp: **${time().format('ddd MMM Do YYYY HH:mm:ss')}pm**`)
          warnMember.sendMessage(msgAr)
          msg.guild.channels.find('name', 'mod-log').sendMessage("", {embed: {
                            title: `User has felt the power of Hammer!`,
                            url: "https://jack.cernodile.com",
                            color: wcolor,
                            fields: [
                              {name: "Punishment", value: "Warn", inline: true},
                              {name: "User that was Warned", value: `${warnMember}`, inline: true},
                              {name: "Reason for Warn", value: `${msg.content}`, inline: true},
                              {name: "Responsible Moderator", value: `${msg.author.username}#${msg.author.discriminator}`, inline: true},
                              {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}pm`, inline: true}
                            ]
                          }})
        })
    }
  },
  "prune": {
    desc: "Prune a number of messages. __Requires 'Wielder' Role__",
    args: "| # of messages",
    func: (bot,msg,args) => {
      let role = msg.guild.roles.find("name", "Wielder")
        if(msg.member.roles.has(role.id)) {
          if(msg.guild.member(bot.user).permissions.hasPermission("MANAGE_MESSAGES")) {
            msg.channel.fetchMessages({limit: parseInt(args)+1}).then(msgs => {
              msg.channel.bulkDelete(msgs);
              msg.channel.sendMessage(":white_check_mark: | Pruning messages...").setTimeout(msg.delete(), 2000)

            })
              } else {
            msg.channel.sendMessage(":x: | I need the `Manage Messages` permission.");
              }
            } else {
            msg.channel.sendMessage(":x: | You need the `Wielder` permission.");
          }
        }
      },
  "invite": {
    desc: "Invite me to your server!",
    args: "",
    func: (bot,msg) => {
      msg.channel.sendMessage('Thank you for showing interest in me. Please follow this link: **https://tr.im/h4mmer**.\nNote: You **must** have the __Manage Server__ permission on the server you are looking to add me in. Once I am authorized in the server, follow the instructions provided and you should be good to go!')
    }
  },
  "support": {
    desc: "Get help for the bot.",
    args: "",
    func: (bot,msg) => {
      msg.channel.sendMessage(`**https://discord.io/hammer** is the link to my support server.`)
    }
  }
}

client.on('message', message => {
  if (message.content.toLowerCase().startsWith('h')) {
    var command = message.content.substring(1).split(" ")[0];
    if(commands[command]) {
      try {
        commands[command].func(client, message, message.cleanContent.substring(1+command.length));
      } catch(e) {
        console.log(e);
      }
    }
  }
});

client.on('guildCreate', (guild) => {
  client.user.setGame(`hcmds | ${client.guilds.size} servers`)
  client.channels.get('250072021143257088').sendMessage("", {embed: {
     title: "I have joined another server!",
     url: "https://jack.cernodile.com",
     color: jcolor,
     fields: [
       {name: "Name of Server", value: `${guild.name}`, inline: true},
       {name: "Owner of Server", value: `${guild.owner}\n(${guild.ownerID})`, inline: true},
       {name: "Member Count", value: `${guild.memberCount}`, inline: true},
       {name: "Creation Date", value: `${guild.createdAt}`, inline: true},
       {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}pm`, inline: true}
     ]

   }
 })
 let join = [];
 join.push(":wave: Hello! My name is Hammer, and I am here to mod your server.")
 join.push("I am being updated constantly, so if I am down, please excuse me!")
 join.push("I have many features, all which you can check out with `hcmds`.")
 join.push("To ensure that I can do my job, please make sure that I have the correct permissions. If you followed the link **https://tr.im/h4mmer**, my permissions should already be set up.")
 join.push("However, we are not done yet. The owner or a staff member of the server needs to create a text channel under the name of `#mod-log`, where I will post information about the punishments.")
 join.push("As the server owner, you also need to create a role under the name of `Wielder`, which will let me know which people are allowed to use my commands and which are not.")
 join.push("After you carry those things out, please run `hlogcheck` and `hpermcheck` to totally make sure that everything is set up.")
 join.push("If you need anything at all, please join my server @ **http://discord.io/hammer**, and someone there can help you.")
 join.push("As always, thank **YOU** for using Hammer.")
 guild.defaultChannel.sendMessage(join.join("\n"))

});
client.on('guildDelete', (guild) => {
  client.user.setGame(`hcmds | ${client.guilds.size} servers`)
  client.channels.get('250072021143257088').sendMessage("", {embed: {
     title: "I have left another server!",
     url: "https://jack.cernodile.com",
     color: bcolor,
     fields: [
       {name: "Name of Server", value: `${guild.name}`, inline: true},
       {name: "Owner of Server", value: `${guild.owner}\n(${guild.ownerID})`, inline: true},
       {name: "Member Count", value: `${guild.memberCount}`, inline: true},
       {name: "Creation Date", value: `${guild.createdAt}`, inline: true},
       {name: "Timestamp", value: `${time().format('ddd MMM Do YYYY HH:mm:ss')}pm`, inline: true}

     ]

   }
 })
});

client.login('ecks dee');
