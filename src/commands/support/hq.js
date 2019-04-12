const { Command } = require("discord.js-commando");
const { oneLine, stripIndents } = require("common-tags");

module.exports = class HQCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hq",
      aliases: ["server", "helpserver", "officialserver", "devsserevr"],
      group: "support",
      memberName: "hq",
      description: "Sends an helpful links and commands for SmoreBot help.",
      details: oneLine`
        Do you need help with SmoreTel? Want to suggest a feature? Just want to drop by and meet the developers?
        This command sends an invite to the official SmoreSoftware Discord server.
			`,
      examples: ["hq"],
      guarded: true
    });
  }

  run(message) {
    return message.reply(stripIndents`**Need help?**
    Come join the official SmoreSoftware Discord server!
    https://discord.gg/6P6MNAU
    Need some quick help? Call the developers!
    ${message.anyUsage("support")}
    Want to suggest something?
    ${message.anyUsage("suggest")}`);
  }
};
