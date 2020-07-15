const { prefix } = require('../config.json');

module.exports.run = async (client, message, author) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();
    console.log(args[0]);
    
    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        command.run(client, message, args, author);
    } catch (error) {
        message.reply('There was an error trying to execute that command!');
        console.log(`Error while executing command '${commandName}' with arguments: ${args}`);
        client.commands.get('help').run(client, message, args, author);
        console.error(error);
    }
};