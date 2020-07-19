const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
const { prefix, token} = require('./config.json');

client.commands = new Discord.Collection();

client.commands.set('create', require('./commands/create.js'));
client.commands.set('find', require('./commands/find.js'));
client.commands.set('help', require('./commands/help.js'));
client.commands.set('join', require('./commands/join.js'));
client.commands.set('leave', require('./commands/leave.js'));
const commandNames = client.commands.map(command => command.help.name).join(', ');

client.on('ready', () => {
	 console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {require('./events/message.js').run(client, message, message.author)});
client.on('messageReactionAdd', (reaction, user) => require('./events/messageReactionAdd.js').execute(client, reaction, user));
client.on('guildJoined', member => require('./events/guildJoined.js').execute(client, member));

client.login('Your token here');