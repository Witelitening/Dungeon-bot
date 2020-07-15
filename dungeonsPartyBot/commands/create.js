const fs = require('fs');

module.exports.run = async (client, message, args, author) => {
    const Discord = require('discord.js');
    const users = require('../users.json');

    if(!args[0]) {
        return message.reply(`Please include the dungeon floor your party will play.`)
    }

    //send embed asking for party description
    const embed = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Add description')
        .setDescription('`What would you like your party description to be?`');
    message.channel.send(embed);

    //get party description/requests
    let desc = '';
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { max: 1});
    collector.on('collect', m => {
        desc = m.content.toString();
        console.log(`Collected ${m.content}`);

        if(!users[author.id]) {
            users[author.id] = {
                name: author.tag,
                inParty: true,
                isPartyLeader: true,
                partyLeader: author.username,
                partyMembers: [],
                description: desc,
                dungeonFloor: Number(args.shift()),
            }
        } else if(!users[author.id].inParty) {
            users[author.id].inParty = true;
            users[author.id].isPartyLeader = true;
            users[author.id].partyLeader = author.username;
            users[author.id].description = desc;
            users[author.id].dungeonFloor = Number(args.shift());
        }

        fs.writeFile('./users.json', JSON.stringify(users), (err) => {
            if(err) console.log(err);
        });
    });
};

module.exports.help = {
    name: 'create',
    description: 'Used to create dungeon parties',
    usage: 'p!create {dungeon floor}'
}