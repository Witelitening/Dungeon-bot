module.exports.run = async (client, message, author, args) => {
    console.log('In create');
    const Discord = require('discord.js');

    if (!args[1]) {
        message.reply('**Please include a party size**');
    }
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle('Class requests')
        .setDescription('Would you like a berserker in your team?');

};