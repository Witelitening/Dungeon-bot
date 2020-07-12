const fs = require('fs');
const users = require('../users.json');

module.exports.run = async (client, message, args, author) => {
    const Discord = require('discord.js');

    //create user profile if not existing
    if(!users[author.id]) {
        users[author.id] = {
            name: author.tag,
            inParty: true,
            isPartyLeader: true,
            partyLeader: null,
            description: null,
            partyMembers: [],
            dungeonFloor: null,
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
    const collector = message.channel.createMessageCollector(message.channel, { time: 3000 });
    collector.on('collect', m => {
        floor = Number(m.content);
        console.log(`Collected ${m.content}`);
    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });

    //send embed asking for party description
    const embed2 = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Add description')
        .setDescription('`What would you like your party description to be?`');
    message.channel.send(embed2);

    //get party description/requests
    let desc;
    const collector1 = message.channel.createMessageCollector(message.channel, { time: 15000 });
    collector1.on('collect', m => {
        desc = m.content;
        console.log(`Collected ${m.content}`);
    });

    collector1.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });

    users[author.id].description = String(desc);
    users[author.id].dungeonFloor = Number(floor);
};

module.exports.help = {
    name: 'create',
    description: 'Used to create dungeon parties',
    usage: 'p!create'
}