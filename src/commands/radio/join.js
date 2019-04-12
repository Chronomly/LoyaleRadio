const { Command } = require("discord.js-commando");

module.exports = class RadioJoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: "join",
      group: "radio",
      memberName: "join",
      description: "Joins the current LoyaleRadio broadcast",
      details: "Joins the current LoyaleRadio broadcast.",
      examples: ["join"],
      guildOnly: true,
      guarded: true
    });
  }

  async run(msg) {
    this.client.radio.joinBroadcast(msg);
  }
};
