const users = require('../users.json');

module.exports.run = (client, message, args, author) => {
    const Discord = require('discord.js');
    const leader = getUserFromMention(args[0]);
    const user = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

    if(user[author.id].inParty) {
        const embed = new Discord.MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`You must leave/disband the party you're currently in to join another party.`)
        return message.channel.send(`||@${author.username}|| ${embed}`);
    } 
    if(args[0]) {
        if(!user[author.id]) {
            user[author.id] = {
                name: author.tag,
                inParty: true,
                isPartyLeader: false,
                partyLeader: pLeader.username,
                partyMembers: [],
                description: user[pleader.id].description,
                dungeonFloor: user[pleader.id].dungeonFloor,
            }
        } else {
            user[author.id].partyLeader = pLeader.username;
            user[author.id].inParty = true;
            user[author.id].description = user[pleader.id].description;
            user[author.id].dungeonFloor = user[pleader.id].dungeonFloor;
        }
        user[pLeader.id].partyMembers.push(author)

        fs.writeFile('./users.json', JSON.stringify(user), (err) => {
            if(err) return console.log(err)
        })

        const embed = new Discord.MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`You have joined ${leader.displayName}'s party.`)
        message.channel.send(`||@${author.username}|| ${embed}`);
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription('Please @ mention the party leader of the party you want to join.')
        message.channel.send(`||@${author.username}|| ${embed}`);
    }
}

module.exports.help = {
    name: 'join',
    description: 'Lets you join a party',
    usage: 'p!join {@party leader}',
}

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}