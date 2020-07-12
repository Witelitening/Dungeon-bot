const users = require('../users.json');

module.exports.run = (client, message, args, author) => {
    const Discord = require('discord.js');
    const user = users[author.id];

    if(!user.inParty) {
        user.inParty = false;
        user.dungeonFloor = null;
        user.partyLeader = null;
        if(user.isPartyLeader) {
            user.isPartyLeader = false;
            user.description = null;
            for(member of partyMembers) {
                const mbr = users[member.id];
                mbr.inParty = false;
                mbr.dungeonFloor = false;
                mbr.partyLeader = false;
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