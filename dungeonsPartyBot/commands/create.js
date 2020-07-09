module.exports.run = async (client, message, args, author) => {
    console.log('In create');
    const Discord = require('discord.js');

    const embed1 = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Class requests')
        .setDescription('Do you have any special requests?');
    message.channel.send(embed1);

    const collector = message.channel.createMessageCollector(message.channel, m => m.author.id === message.author.id, { time: 15000 });
    collector.once('collect', m => {
        console.log(`Collected ${m.content}`);
    });
};

module.exports.help = {
    name: 'create'
}