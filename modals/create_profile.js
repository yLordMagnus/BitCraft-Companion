const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const fs = require("fs")
const yaml = require("js-yaml")
const ui = yaml.load(fs.readFileSync('ui/content.yaml', 'utf-8'))

module.exports = {
	modal: new ModalBuilder()
        .setTitle(ui.interactions.texts.profile_modal_title)
        .setCustomId(ui.interactions.ids.username_modal)
        .setComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId(ui.interactions.ids.username)
                    .setLabel(ui.interactions.texts.username)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            )
        )
}