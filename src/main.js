const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js'); // Discord Imports
const { readdirSync } = require("fs-extra"); // fs-extra Imports

const client = new Client({
    partials: [
        Partials.Channel, // Text Channel Partial
        Partials.GuildMember, // Guild Member Partial
        Partials.User, // Discord User Partial
        Partials.Message, // Discord Message Partial
    ],
    intents: [
        GatewayIntentBits.MessageContent, // Message Content Bits
        GatewayIntentBits.Guilds, // Guild Related Bits
        GatewayIntentBits.GuildMembers, // Guild Members Bits
        GatewayIntentBits.GuildIntegrations, // Discord Integrations Bits
        GatewayIntentBits.GuildMessages, // Guild Messages Bits
        GatewayIntentBits.DirectMessages, // Direct Messages Bits
    ],
});

client.commands = new Collection(); // Collection Of Commands
client.cooldown = new Collection(); // Command Cool Down Collection
client.config = require("./storage/config"); // Easier Access To Config
client.logger = require("./utilities/logger"); // Initiating Logger

readdirSync('./src/handlers').forEach((handler) => { // Iterating Through Handlers
    require(`./handlers/${handler}`)(client); // Executing Each Handler
});

client.login(client.config.discord.token).catch(err => { // Loading Token And Starting Bot
    client.logger.error("Invalid Bot Token!"); // Error Checking For Invalid Token
    process.exit(0) // Exiting With Status 0 If Token Invalid
});