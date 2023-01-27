const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName);

    if (interaction.type == 4) {
        if(command.autocomplete) {
            const choices = [];
            await command.autocomplete(interaction, choices);
        }
    }

    if(!command){
        return client.command.delete(interaction.commandName);
    }

    if(command.cooldown) {
        if(client.cooldown.has(`slash-${command.name}${interaction.user.id}`)){
            return interaction.reply({
                content: "On Cooldown Until: <duration>".replace('<duration>', ms(client.cooldown.get(`slash-${command.name}${interaction.user.id}`) - Date.now(), {long : true}) )
            });
        }

        await command.run(client, interaction);
        client.cooldown.set(`slash-${command.name}${interaction.user.id}`, Date.now() + command.cooldown);
        setTimeout(() => { client.cooldown.delete(`slash-${command.name}${interaction.user.id}`); }, command.cooldown);
    } else {
        await command.run(client, interaction);
    }

}