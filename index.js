const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const profile_command = require("./commands/profile")
const create_profile_modal = require("./modals/create_profile")
const create_profile_select_menus = require("./prompts/request_roles")
const reject = require("./replies/reject")

const client = new Client({ intents: []});

client.once(Events.ClientReady, readyClient => {
	console.log(`Registering commands.`);
    client.application.commands.create(profile_command.data)
    console.log(`Done.`);
});

client.on('interactionCreate', async (interaction) => {
    let cmd = interaction.commandName
    if (!cmd)
        cmd = interaction.customId
    
    console.log(cmd)
    
    if (cmd == "profile") {
        profile_command.execute(interaction, db) // DB to verify and display profile data
    } else if (cmd == "create_profile") {
        interaction.showModal(create_profile_modal.modal)
    } else if (cmd == "username_modal") {
        //await db.set(`${interaction.user.id}.username`, interaction.fields.getTextInputValue("username"))
        create_profile_select_menus.execute(interaction)
    } else if (cmd == "request_roles") {
        change_roles.execute(interaction, username) // DB to set/update roles
    } else if (cmd == "reject") {
        reject.execute(interaction)
    } else {
        console.log("Invalid command received: " + cmd)
    }
})

client.login(token);