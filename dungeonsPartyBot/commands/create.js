const fs = require('fs');
const users = require('../users.json');

module.exports.run = async (client, message, args, author) => {
    const Discord = require('discord.js');

    //create user profile if not existing
    if(!users[author.id]) {
        users[author.id] = {
            name = client.users.get(author.id).tag,
            inParty = true,
            partyID = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
            partyLeader = true,
            description = null,
            partyMembers = [],
            dungeonFloor = null,
        }
        fs.writeFile('../users.json', JSON.stringify(users), (err) => {
            if(err) console.log(err);
        });
    }

    //send embed asking for party floor
    const embed1 = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Select floor')
        .setDescription('`What floor will your party play?`');
    message.channel.send(embed1);

    //get party floor
    let floor;
    const collector = message.channel.createMessageCollector(message.channel, m => m.author.id === message.author.id, { time: 15000 });
    collector.once('collect', m => {
        floor = Number(m.content);
        console.log(`Collected ${m.content}`);
    });

    //send embed asking for party description
    const embed2 = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Add description')
        .setDescription('`What would you like your party description to be?`');
    message.channel.send(embed1);

    //get party description/requests
    let desc;
    const collector = message.channel.createMessageCollector(message.channel, m => m.author.id === message.author.id, { time: 15000 });
    collector.once('collect', m => {
        desc = m.content;
        console.log(`Collected ${m.content}`);
    });

    users[author.id].description = desc;
};

module.exports.help = {
    name: 'create'
}