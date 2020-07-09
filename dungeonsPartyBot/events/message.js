module.exports.run = async (client, message, author) => {
    console.log('In message');
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
    console.log('starts with prefix');

	const args = message.content.slice(client.config.prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();
    console.log(args[0]);
    
    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        command.run(client, message, args, author);
    } catch (error) {
        message.reply('there was an error trying to execute that command!');
        console.log(`Error while executing command '${commandName}' with arguments: ${args}`);
        client.commands.get('help').run(client, message, args, author);
        console.error(error);
    }
};