const { Command } = require('discord.js-commando');
const { oneLine } = require("common-tags");

module.exports = class RadioSourceCommand extends Command {
  constructor(client) {
    super(client, {
      name: "source",
      group: "radio",
      memberName: "source",
      description: "Starts a LoyaleRadio broadcast.",
      details: oneLine`
      Starts a LoyaleRadio broadcast.
			`,
      examples: ["join"],
      guildOnly: true,
      guarded: true
    });
  }

  
  async run(msg) {
    this.client.radio.setupBroadcast(msg);
  }
};
