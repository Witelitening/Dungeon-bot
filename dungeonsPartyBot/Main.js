const Discord = require('discord.js');
const { dp, NzI5ODIzMDczNjk5ODg5MTc0.XwOlqA.4fL61VnzHEnYZwYJ5umoqjxtnmc } = require('./package.json');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
client.login(token);

client.commands = new Discord.Collection();

client.commands.set('party', require('./commands/party'));
client.commands.set('create', require('./commands/create'));
client.commands.set('create', require('./commands/find'));

client.on('ready', () => {
 	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => require('./events/message.js')(client, message, message.author));
client.on('messageReactionAdd', (reaction, user) => require('./events/messageReactionAdd.js')(client, reaction, user));
client.on('guildJoined', member => require('./events/guildJoined.js')(client, member));
