module.exports = client => (client.radio = new Radio(client));
const { songs } = require("./songs.json");
const ytdl = require("ytdl-core");
const signale = require("signale");

class Radio {
  constructor(client) {
    this.client = client;
    const streamOptions = { seek: 0, volume: 1 };
    client.broadcast = client.createVoiceBroadcast();
  }

  setupBroadcast(msg) {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join().then(connection => {
        const receiver = connection.createReceiver(msg.author);
        const opusBroadcast = receiver.createOpusStream();
        client.broadcast.playOpusStream(opusBroadcast, streamOptions);
      });
    } else {
      msg.channel.send("Error");
    }
  }

  setupAutoBroadcast(client) {
    this.findSong();
    // let onAirChannel = client.channels.get("539612640692142100")
    // if (onAirChannel) {
    //   onAirChannel.join().then(() => {
    //     client.channels.get("539588610173698068").send(`Ready! Joined \`${onAirChannel.name}\``); //.send(`Ready! Joined \`${ON_AIRchannel.name}\``)
    //   });
    // } else {
    //   msg.channel.send("Error");
    // }
    // onAirChannel = null;
    // https://www.youtube.com/watch?v=7AZinyIUhOo
    // https://www.youtube.com/watch?v=EbnH3VHzhu8
  }

  joinBroadcast(msg) {
    const joinBroadcastLogger = signale.scope("join broadcast");
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel
        .join()
        .then(connection => {
          connection.playBroadcast(this.client.broadcast);
          msg.reply("Playing.");
        })
        .catch(joinBroadcastLogger.error);
    } else return msg.reply("You're not in a voice channel here.");
  }

  findSong() {
    const recordChannel = this.client.channels.get("564538560108167172");
    const randomInt = Math.floor(Math.random() * songs.length) + 0;
    this.client.broadcast.playStream(ytdl(songs[randomInt], { filter: "audioonly" }));
    // ytdl.getInfo(songs[randomInt]).then(info => {
    //   let time = info.length_seconds;
    //   // 100% Stack Overflow
    //   const minutes = Math.floor(time / 60);
    //   const seconds = time - minutes * 60;
    //   const hours = Math.floor(time / 3600);
    //   time = time - hours * 3600;
    //   function strPadLeft(string, pad, length) {
    //     return (new Array(length + 1).join(pad) + string).slice(-length);
    //   }
    //   const finalTime = `${strPadLeft(minutes, "0", 2)}:${strPadLeft(seconds, "0", 2)}`;
    //   // End 100% Stack Overflow
    //   const embed = new this.client.Discord.RichEmbed()
    //     .setAuthor("Now Playing:", this.client.user.avatarURL)
    //     .setDescription(
    //       `URL: ${info.video_url}\nTitle: ${info.title}\nAuthor: ${info.author.name}\nLength: ${finalTime}`
    //     )
    //     .setTimestamp()
    //     .setImage(info.thumbnail_url);
    //   recordChannel.send(embed);
    //   recordChannel.send(embed);
    // });
    // console.log(info);
  }
}
