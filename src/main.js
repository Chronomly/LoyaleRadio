/* eslint-disable no-console */
const { CommandoClient, FriendlyError, SQLiteProvider } = require("discord.js-commando");
const Discord = require("discord.js");
const path = require("path");
const { oneLine } = require("common-tags");
const sqlite = require("sqlite");
const config = require("./config");

const client = new CommandoClient({
  owner: "251383432331001856",
  commandPrefix: "."
});
const Radio = require("./radio.js")(client);

client
  .on("error", console.error)
  .on("warn", console.warn)
  .on("debug", console.log)
  .on("ready", () => {
    client.Discord = Discord;
    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
  })
  .on("disconnect", () => {
    console.warn("Disconnected!");
  })
  .on("reconnecting", () => {
    console.warn("Reconnecting...");
  })
  .on("commandError", (cmd, err) => {
    if (err instanceof FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on("commandBlocked", (msg, reason) => {
    console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""}
			blocked; ${reason}
		`);
  })
  .on("commandPrefixChange", (guild, prefix) => {
    console.log(oneLine`
			Prefix ${prefix === "" ? "removed" : `changed to ${prefix || "the default"}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("commandStatusChange", (guild, command, enabled) => {
    console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("groupStatusChange", (guild, group, enabled) => {
    console.log(oneLine`
			Group ${group.id}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  });

client
  .setProvider(sqlite.open(path.join(__dirname, "database.sqlite3")).then(db => new SQLiteProvider(db)))
  .catch(console.error);

client.registry
  .registerGroups([["general", "General"], ["radio", "Radio"], ["support", "Support"], ["control", "Owners"]])
  .registerCommandsIn(path.join(__dirname, "commands"))
  .registerDefaults();

client.broadcast.on("end", () => {
  client.radio.findSong();
});

client.on("ready", () => {
  client.radio.setupAutoBroadcast(client);
});

client.login(config.token);
