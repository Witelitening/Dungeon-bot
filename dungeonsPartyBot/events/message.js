module.exports = (client, message, author) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    if (client.commands.has(command)) {
        client.commands.get(command)(client, message, args, author);
    }
};