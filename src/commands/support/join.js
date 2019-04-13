const { Command } = require("discord.js-commando");
const { oneLine } = require("common-tags");
const { RichEmbed } = require("discord.js");

module.exports = class JoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: "links",
      aliases: ["links", "tos", "twitter", "website"],
      group: "support",
      memberName: "links",
      description: "Sends you some important links.",
      details: oneLine`
      Do you like LoyaleRadio? Do you want to get some links for it?
      This command sends you important links for help and updates about SmoreBot.
			`,
      examples: ["invite"],
      guildOnly: true,
      guarded: true
    });
  }

  run(message) {
    const embed = new RichEmbed()
      .setAuthor(this.client.user.username, this.client.user.avatarURL)
      .setColor(0x0099cc)
      .setTitle("Here are some important links:")
      .addField(
        "Add the bot:",
        "https://discordapp.com/oauth2/authorize?client_id=290228059599142913&scope=bot&permissions=8"
      )
      .addField("SmoreSoftware Website:", "http://smore.romtypo.com", true)
      .addField("SmoreSoftware Server:", "https://discord.gg/6P6MNAU", true)
      .addField("SmoreSoftware Twitter:", "https://twitter.com/smoresoftware")
      .addField("SmoreSoftware User TOS:", "http://smore.romtypo.com/tos.html")
      .setTimestamp();

    return message.replyEmbed(embed);
  }
};
