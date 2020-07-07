const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');

const client = new Discord.Client();
client.config = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(file.substring(0, file.length - 3), command);
}

client.on('ready', () => {
 	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {require('./events/message.js').run(client, message, message.author)});
client.on('messageReactionAdd', (reaction, user) => require('./events/messageReactionAdd.js').execute(client, reaction, user));
client.on('guildJoined', member => require('./events/guildJoined.js').execute(client, member));

client.login(token);