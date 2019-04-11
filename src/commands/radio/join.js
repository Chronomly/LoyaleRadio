const { Command } = require('discord.js-commando');
const { oneLine } = require("common-tags");

module.exports = class RadioJoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: "join",
      group: "radio",
      memberName: "join",
      description: "Joins the current LoyaleRadio broadcast",
      details: oneLine`
      Joins the current LoyaleRadio broadcast.
			`,
      examples: ["join"],
      guildOnly: true,
      guarded: true
    });
  }

  
  async run(msg) {
    this.client.radio.joinBroadcast(msg);
  }
};
