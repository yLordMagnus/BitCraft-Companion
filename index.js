const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const { QuickDB } = require("quick.db");
const db = new QuickDB();



const profile_command = require("./commands/utility/profile")

const client = new Client({ intents: []});

client.once(Events.ClientReady, readyClient => {
	console.log(`Registering commands.`);
    client.application.commands.create(profile_command.data)
    console.log(`Done.`);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.commandName)
    
    switch (interaction.commandName) {
        case 'profile':
            profile_command.execute(interaction, db)
        default:
            console.log("Invalid command received:" + interaction)
    }
})

client.login(token);