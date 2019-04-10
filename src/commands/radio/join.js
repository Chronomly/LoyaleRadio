//eslint-disable-next-line
const commando = require('discord.js-commando');
const { oneLine } = require("common-tags");

module.exports = class RadioJoinCommand extends commando.Command {
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

  //eslint-disable-next-line class-methods-use-this
  async run(msg) {
    this.client.radio.joinBroadcast(msg);
  }
};
