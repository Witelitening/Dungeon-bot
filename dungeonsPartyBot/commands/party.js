module.exports = (client, message, args, author) => {
    const commandName = args.shift().toLowerCase();

    switch (commandName) {
        case "create":
            client.commands.get(commandName)(client, message, author, args);
            break;
        case "find":

            break;

    }
}