module.exports = client => client.radio = new Radio(client);
let songs = require('./songs.json').songs;
const ytdl = require('ytdl-core');

class Radio {

    constructor(client) {
        this.client = client;
        const streamOptions = { seek: 0, volume: 1 };
        client.broadcast = client.createVoiceBroadcast();
    }

    setupBroadcast(msg) {
        if(msg.member.voiceChannel) {
            msg.member.voiceChannel.join()
                .then(connection => {
                    const receiver = connection.createReceiver(msg.author);
                    let opusBroadcast = receiver.createOpusStream()
                    client.broadcast.playOpusStream(opusBroadcast, streamOptions)
                });
        } else {
            msg.channel.send('Error')
        }
    }

    setupAutoBroadcast(client) {
        this.findSong()
        // let ON_AIRchannel = client.channels.get('539612640692142100')
        // if(ON_AIRchannel) {
        //     ON_AIRchannel.join().then(() => {
        //         client.channels.get('539588610173698068').send(`Ready! Joined \`${ON_AIRchannel.name}\``)//.send(`Ready! Joined \`${ON_AIRchannel.name}\``)
        //     })
        // } else {
        //     msg.channel.send('Error')
        // }
        // ON_AIRchannel = null
        // https://www.youtube.com/watch?v=7AZinyIUhOo
        // https://www.youtube.com/watch?v=EbnH3VHzhu8
    }

    joinBroadcast(msg) {
        if(msg.member.voiceChannel) {
            msg.member.voiceChannel.join().then(connection => {
                const dispatcher = connection.playBroadcast(this.client.broadcast);
                msg.reply(`Playing.`)
            }).catch(console.error);
        } else return msg.reply('You\'re not in a voice channel here.')
    }

    findSong() {
        const recordChannel = this.client.channels.get('564538560108167172');
        let randomInt = Math.floor(Math.random() * songs.length) + 0
        this.client.broadcast.playStream(ytdl(songs[randomInt], { filter: 'audioonly' }));
        ytdl.getInfo(songs[randomInt]).then((info) => {
            let time = info.length_seconds
            // 100% Stack Overflow
            let minutes = Math.floor(time / 60);
            let seconds = time - minutes * 60;
            let hours = Math.floor(time / 3600);
            time = time - hours * 3600;
            function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
            }
            let finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2); 
            // End 100% Stack Overflow               
            let embed = new this.client.Discord.RichEmbed()
                .setAuthor('Now Playing:', this.client.user.avatarURL)
                .setDescription(`URL: ${info.video_url}\nTitle: ${info.title}\nAuthor: ${info.author.name}\nLength: ${finalTime}`)
                .setTimestamp()
                .setImage(info.thumbnail_url);
                recordChannel.send(embed)
            recordChannel.send(embed)
            console.log(info)
        })
        
    };
    
};
