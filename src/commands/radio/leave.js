const { Command } = require("discord.js-commando");

module.exports = class RadioLeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: "leave",
      group: "radio",
      memberName: "leave",
      description: "Leaves the current voice channel",
      details: "Leaves the current voice channel.",
      examples: ["leave"],
      guildOnly: true,
      guarded: true
    });
  }

  async run(msg) {
    if (msg.guild.voiceConnection) {
      msg.guild.voiceConnection.disconnect();
    } else {
      return msg.reply("You is big stupid");
    }
  }
};
