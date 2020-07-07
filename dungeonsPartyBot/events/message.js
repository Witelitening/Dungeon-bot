module.exports = (client, message, author) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();
    
    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        command.execute(client, message, args, author);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
        console.log(`Error while executing command '${commandName}' with arguments: ${args}`);
        client.commands.get('help')(client, message, args, author);
        return;
    }
};