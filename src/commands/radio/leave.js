const { Command } = require("discord.js-commando");
const { oneLine } = require("common-tags");

module.exports = class RadioLeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: "leave",
      group: "radio",
      memberName: "leave",
      description: "Leaves the current voice channel",
      details: oneLine`
      Leaves the current voice channel.
			`,
      examples: ["leave"],
      guildOnly: true,
      guarded: true
    });
  }

  async run(msg) {
    if (msg.guild.voiceConnection) {
      msg.guild.voiceConnection.disconnect();
    } else {
      msg.reply("You is big stupid");
    }
  }
};
