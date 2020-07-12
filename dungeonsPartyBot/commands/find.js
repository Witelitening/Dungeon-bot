const fs = require('fs');
const users = require('../users.json');

module.exports.run = (client, message, args, author) => {
    let entranceParties = [];
    let f1Parties = [];
    let f2Parties = [];
    let f3Parties = [];
    let entrancePartiesDesc = [];
    let f1PartiesDesc = [];
    let f2PartiesDesc = [];
    let f3PartiesDesc = [];
    for(let i = 0; i < users.length; i++) {
        if(users[i].isPartyLeader) {
            switch(users[i].dungeonFloor) {
                case 0:
                    entranceParties.push(users[i].name.substring(0, users[i].name.length - 4) + "'s party");
                    entrancePartiesDesc.push(users[i].description);
                    break;
                case 1:
                    f1Parties.push(users[i].name.substring(0, users[i].name.length - 4) + "'s party");
                    f1PartiesDesc.push(users[i].description);
                    break;
                case 2:
                    f2Parties.push(users[i].name.substring(0, users[i].name.length - 4) + "'s party");
                    f2PartiesDesc.push(users[i].description);
                    break;
                case 3:
                    f3Parties.push(users[i].name.substring(0, users[i].name.length - 4) + "'s party");
                    f3PartiesDesc.push(users[i].description);
                    break;
            }
        }
    }
    let entranceField = addField(entranceParties, entrancePartiesDesc);
    let f1Field = addField(f1Parties, f1PartiesDesc);
    let f2Field = addField(f2Parties, f2PartiesDesc);
    let f3Field = addField(f3Parties, f3PartiesDesc);

    const embed1 = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Active Dungeon Parties')
        .addFields(
            {name: 'Entrance', value: entraceField},
            {name: 'Floor 1', value: f1Field},
            {name: 'Floor 2', value: f2Field},
            {name: 'Floor 3', value: f3Field},
        )
    message.channel.send(embed1);
}

module.exports.help = {
    name: 'find',
    description: 'Finds active dungeon parties',
    usage: 'p!find'
}

function addField(list, desc) {
    var ret = '';
    for(var i = 0; i < list.length; i++) {
        ret.concat(list[i], '/n`', desc[i], '`/n')
    }
    return ret
}