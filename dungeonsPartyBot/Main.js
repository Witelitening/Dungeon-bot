const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

const client = new Discord.Client();
client.config = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.help.name, command);
}

client.on('ready', () => {
 	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {require('./events/message.js').run(client, message, message.author)});
client.on('messageReactionAdd', (reaction, user) => require('./events/messageReactionAdd.js').execute(client, reaction, user));
client.on('guildJoined', member => require('./events/guildJoined.js').execute(client, member));

client.login(client.config.token);