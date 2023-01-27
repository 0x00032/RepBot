const { PermissionsBitField } = require('discord.js');
const { readdirSync } = require("fs-extra");
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');


module.exports = (client) => {

    const slashCommands = [];

    readdirSync('./src/commands').forEach( dir => {
        const files = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));

        for(const file of files){
            const slashCommand = require(`../commands/${dir}/${file}`);

            slashCommands.push({
                name: slashCommand.name,
                description: slashCommand.description,
                type: slashCommand.type,
                options: slashCommand.options ? slashCommand.options : null,
                default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
                default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
            });

            client.commands.set(slashCommand.name, slashCommand) && client.logger.info(`Loading command ${slashCommand.name}.js`)
        }
    });

    (async () => {
        await new REST().setToken(client.config.discord.token).put(
            Routes.applicationCommands(client.config.discord.client_id),
            { body: slashCommands }
        );
    })();


};