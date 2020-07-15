const fs = require('fs');
const users = require('../users.json');

module.exports.run = async (client, message, args, author) => {
    const Discord = require('discord.js');
    const user = users[author.id];

    if(!args[0]) {
        return message.channel.send(`@${author.username} Please include the dungeon floor your party will play.`)
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
        } else {
            user.inParty = true;
            user.isPartyLeader = true;
            user.partyLeader = author.username;
            user.description = desc;
            user.dungeonFloor = Number(args.shift());
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