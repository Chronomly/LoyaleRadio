const { Command } = require("discord.js-commando");

module.exports = class RadioVolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      group: "radio",
      memberName: "volume",
      description: "Joins the current LoyaleRadio broadcast",
      details: "Joins the current LoyaleRadio broadcast.",
      examples: ["join"],
      guildOnly: true,
      guarded: true
    });
  }

  async run(msg) {
    msg.reply("I'm sorry but in order to turn down the volume you must turn down the volume of me on discord");
  }
};
