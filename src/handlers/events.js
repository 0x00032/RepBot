const { readdirSync } = require('fs-extra'); // fs-extra Imports

module.exports = (client) => {
    readdirSync('./src/events').forEach(dirs => { // Iterating through each directory
        const events = readdirSync(`./src/events/${dirs}`).filter(files => files.endsWith('.js')); // Array of events

        for (const file of events) { // Iterating event in events
            const event = require(`../events/${dirs}/${file}`); // The Event lol
            client.logger.info(`Loading event ${file}`); // Log event initialization
            client.on(file.split(".")[0], event.bind(null, client)); // Initiate Event
        }

    });
};