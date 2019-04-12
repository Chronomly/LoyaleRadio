/* eslint-disable no-console */
require("dotenv").config();

const { CommandoClient, FriendlyError, SQLiteProvider } = require("discord.js-commando");
const Discord = require("discord.js");
const path = require("path");
const { oneLine } = require("common-tags");
const sqlite = require("sqlite");
const config = require("./config");
const logger = require("./util/logger");
const package = require("../package.json");

logger.start(`LoyaleRadio version v${package.version}`);

const client = new CommandoClient({
  owner: "251383432331001856",
  commandPrefix: "."
});
const Radio = require("./radio.js")(client);

client
  .on("error", logger.error)
  .on("warn", logger.warn)
  .on("debug", logger.debug)
  .on("ready", () => {
    client.Discord = Discord;
    logger.success(`Client ready; logged in as ${client.user.tag} (${client.user.id})`);
  })
  .on("disconnect", () => {
    logger.warn("Disconnected!");
  })
  .on("reconnecting", () => {
    logger.pending("Reconnecting...");
  })
  .on("commandError", (cmd, err) => {
    if (err instanceof FriendlyError) return;
    logger.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on("commandBlocked", (msg, reason) => {
    logger.debug(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""}
			blocked; ${reason}
		`);
  })
  .on("commandPrefixChange", (guild, prefix) => {
    const commandPrefixChangeLogger = logger.scope("command prefix change");
    commandPrefixChangeLogger.info(oneLine`
			Prefix ${prefix === "" ? "removed" : `changed to ${prefix || "the default"}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("commandStatusChange", (guild, command, enabled) => {
    const commandStatusChangeLogger = logger.scope("command status change");
    commandStatusChangeLogger.info(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("groupStatusChange", (guild, group, enabled) => {
    const groupStatusChangeLogger = logger.scope("group status change");
    groupStatusChangeLogger.info(oneLine`
			Group ${group.id}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("ready", () => {
    Radio.setupMusicBroadcast();
  });

client
  .setProvider(sqlite.open(path.join(__dirname, "database.sqlite3")).then(db => new SQLiteProvider(db)))
  .then(logger.scope("provider").success("SQLite provider set successfully"))
  .catch(logger.scope("provider").error);

client.registry
  .registerDefaults()
  .registerGroups([["general", "General"], ["radio", "Radio"], ["support", "Support"], ["control", "Owners"]])
  .registerCommandsIn(path.join(__dirname, "commands"));

client.broadcast.on("end", () => {
  client.radio.findSong();
});

client.login(config.token).catch(logger.scope("login").error);
