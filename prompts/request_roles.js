const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const fs = require("fs")
const yaml = require("js-yaml")
const ui = yaml.load(fs.readFileSync('ui/content.yaml', 'utf-8'))

module.exports = {
    async execute(interaction, username) {
        const embed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle(ui.interactions.texts.request_roles_title.replace("%username%", interaction.fields.getTextInputValue("username")))
            .setDescription(ui.interactions.texts.request_roles_description)
        
        const actionRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(ui.interactions.ids.select_roles)
                .setMinValues(1)
                .setOptions([
                    new StringSelectMenuOptionBuilder()
                        .setEmoji(ui.emojis.loading)
                        .setLabel(ui.roles.texts.forester)
                        .setValue(ui.roles.ids.forester)
                ])
        )

        const actionRow2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(ui.interactions.ids.submit_roles)
                .setEmoji(ui.emojis.approval)
                .setLabel(ui.interactions.texts.continue)
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(ui.interactions.ids.reject)
                .setEmoji(ui.emojis.disapproval)
                .setLabel(ui.interactions.texts.cancel)
                .setStyle(ButtonStyle.Secondary)
        )

        interaction.reply({embeds: [embed], components: [actionRow, actionRow2], flags: MessageFlags.Ephemeral})
    }
}