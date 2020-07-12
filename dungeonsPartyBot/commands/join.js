const users = require('../users.json');

module.exports.run = (client, message, args, author) => {
    if(args[0]) {
        const leader = getUserFromMention(args[0]);
        const pLeader = users[leader.id];
        const user = users[author.id];

        pLeader.partyMembers.push(author);

        user.partyLeader = client.users.get(leader.id).tag;
        user.inParty = true;
        user.dungeonFloor = pLeader.dungeonFloor;
    }
}

module.exports.help = {
    name: 'join',
    description: 'Lets you join a party',
    usage: 'p!join (@party leader)',
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