const fs = require('fs');
const users = require('../users.json');
const parties = require('../parties.json');

module.exports.run = async (client, message, args, author) => {
    const Discord = require('discord.js');

    //create user profile if not existing
    if(!users[author.id]) {
        users[author.id] = {
            name = client.users.get(author.id).tag,
            inParty = true,
            partyID = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
        }
        fs.writeFile('../users.json', JSON.stringify(users), (err) => {
            if(err) console.log(err);
        });
    }

    //send embed asking for a description
    const embed1 = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Add description')
        .setDescription('What would you like your party description to be?');
    message.channel.send(embed1);

    //get party description/requests
    let desc;
    const collector = message.channel.createMessageCollector(message.channel, m => m.author.id === message.author.id, { time: 15000 });
    collector.once('collect', m => {
        desc = m.content;
        console.log(`Collected ${m.content}`);
    });

    //create party
    parties[users[author.id].partyID] = {
        partyLeader = client.users.get(author.id).tag,
        description = desc,
        partyMembers = [],
    }
    fs.writeFile('../parties.json', JSON.stringify(users), (err) => {
        if(err) console.log(err);
    });
};

module.exports.help = {
    name: 'create'
}