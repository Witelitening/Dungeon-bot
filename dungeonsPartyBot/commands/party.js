module.exports.run = async (client, message, args, author) => {
    console.log('In party');
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    switch (commandName) {
        case "create":
            command.run(client, message, author, args);
            break;
        case "find":

            break;

    }
}