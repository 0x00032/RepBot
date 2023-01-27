const { ApplicationCommandType, EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'ping',
    description: "Check API & Bot Ping!.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const pingEmbed = new EmbedBuilder();
        pingEmbed.setColor("#ffffff");
        pingEmbed.setDescription(`test`);
        interaction.reply({ embeds: [pingEmbed] });
    }
};