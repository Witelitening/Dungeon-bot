module.exports = (client, message, args, author) => {
    const command = args.shift().toLowerCase();

    switch (command) {
        case "create":
            client.commands.get(command)(client, author);
            break;
        case "find":
            break;

    }
}