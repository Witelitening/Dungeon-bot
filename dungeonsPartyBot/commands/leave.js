const fs = require('fs');

module.exports.run = (client, message, args, author) => {
    const Discord = require('discord.js');
    const user = require('../users.json');

    if(user[author.id].inParty) {
        user[author.id] = {
            name: author.tag,
            inParty: false,
            isPartyLeader: false,
            partyLeader: null,
            description: null,
            partyMembers: [],
            dungeonFloor: null,
        }
        fs.writeFile('../users.json', JSON.stringify(user), (err) => {
            if(err) return console.log(err)
        });
        
        if(user[author.id].isPartyLeader) {
            for(member of user[author.id].partyMembers) {
                user[member.id] = {
                    name: member.tag,
                    inParty: false,
                    isPartyLeader: false,
                    partyLeader: null,
                    description: null,
                    partyMembers: [],
                    dungeonFloor: null,
                }
                fs.writeFile('../users.json', JSON.stringify(user), (err) => {
                    if(err) return console.log(err)
                });
            }
        }
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription('`You need to be in a party to do this`');
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: 'leave',
    description: "Leaves the party you're currently in. If you are the party leader, this disbands the party.",
    usage: 'p!leave'
}