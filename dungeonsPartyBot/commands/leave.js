const fs = require('fs');

module.exports.run = (client, message, args, author) => {
    const Discord = require('discord.js');
    const users = require('../users.json');
    const user = users[author.id];

    if(user.inParty) {
        if(user.isPartyLeader) {
            for(member of users[author.id].partyMembers) {
                mbr = users[member.id];
                
                mbr.inParty = false;
                mbr.partyLeader = null;
                mbr.description = '';
                mbr.dungeonFloor = null;
            }
        }

        user.inParty = false;
        user.isPartyLeader = false;
        user.partyLeader = null;
        user.partyMembers = [];
        user.description = '';
        user.dungeonFloor = null;

        fs.writeFile('./users.json', JSON.stringify(user), (err) => {
            if(err) return console.log(err)
        });
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