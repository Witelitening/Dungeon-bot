module.exports.run = async (client, message, args, author) => {
    console.log('In create');
    const Discord = require('discord.js');

    const embed1 = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Class requests')
        .setDescription('Do you have any special requests?');
    message.channel.send(embed1);
    const filter = m => m.content.includes('discord');
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });

    collector.on('collect', m => {
        console.log(`Collected ${m.content}`);
        collector.stop();
    });

    collector.on('end', collected => {
	    console.log(`Collected ${collected.size} items`);
    });
};

module.exports.help = {
    name: 'create'
}