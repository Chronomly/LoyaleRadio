//eslint-disable-next-line
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');
const os = require('os');

module.exports = class InfoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'source',
      group: 'radio',
      memberName: 'source',
      description: 'Starts a LoyaleRadio broadcast.',
      details: oneLine `
      Starts a LoyaleRadio broadcast.
			`,
      examples: ['join'],
      guildOnly: true,
      guarded: true
    })
  }

  //eslint-disable-next-line class-methods-use-this
  async run(msg) {
    this.client.radio.setupBroadcast(msg);
  }
};
