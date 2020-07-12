const fs = require('fs');

module.exports.run = (client, message, args, author) => {
    const Discord = require('discord.js');
    const user = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

    if(!user[author.id]) {
        user[author.id] = {
            inParty = false,
            dungeonFloor = null,
            partyLeader = null,
        }
        
        if(user[author.id].isPartyLeader) {
            user[author.id] = {
                isPartyLeader: false,
                description: null,
            }
            for(member of partyMembers) {
                user[member.id] = {
                    inParty: false,
                    dungeonFloor: false,
                    partyLeader: false,
                }     
            }
        }
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