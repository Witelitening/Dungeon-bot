const { prefix } = require('../config.json');

module.exports.run = async (client, message, args, author) => {
    const data = [];

    if (!args.length) {
	    data.push('Here\'s a list of all my commands:');
        data.push(client.commands.map(command => command.help.name).join(', '));
        data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

        return message.author.send(data, { split: true })
	        .then(() => {
		    if (message.channel.type === 'dm') return;
		    message.reply('I\'ve sent you a DM with all my commands!');
	    })
	    .catch(error => {
		    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
		    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
	    });
    }

    const name = args[0].toLowerCase();
    const command = client.commands.get(name);
    if (!command) {
    	return message.reply('that\'s not a valid command!');
    }

    data.push(`**Name:** ${command.help.name}`);

    if (command.help.description) data.push(`**Description:** ${command.help.description}`);
    if (command.help.usage) data.push(`**Usage:** ${command.help.usage}`);

    message.channel.send(data, { split: true });
}
module.exports.help = {
    name: 'help',
    description: "Sends a message with a list of the bot's commands",
    usage: 'p!help (command)'
}
