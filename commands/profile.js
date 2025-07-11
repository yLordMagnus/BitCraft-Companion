const { SlashCommandBuilder, SlashCommandStringOption, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, Emoji, EmbedBuilder, MessageFlags } = require("discord.js");
const fs = require("fs")
const yaml = require("js-yaml")
const ui = yaml.load(fs.readFileSync('ui/content.yaml', 'utf-8'))

module.exports = {
	data: new SlashCommandBuilder()
		.setName(ui.interactions.ids.profile)
		.setDescription(ui.interactions.texts.profile)
		.addStringOption(
			new SlashCommandStringOption()
				.setName(ui.interactions.ids.profile_target)
            	.setDescription(ui.interactions.texts.profile_target)
				.setRequired(false)
        ),
	async execute(interaction, db) {
		const target = interaction.options.getString(ui.interactions.ids.profile_target)

		if (!target) { // Create/view your own profile.
			const data = await db.get(interaction.user.id)
			if (!data) { // Create profile
				/*
				- Send embeds asking for info:

				* Name
				* Role(s)
				* Gear set(s) (Tier/Type/Rarity)
				* Tools (Tier/Rarity)
				*/

				const embed = new EmbedBuilder()
					.setColor(0xFFFFFF)
					.setDescription(ui.interactions.texts.no_profile)
				
				const actionRow = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId(ui.interactions.ids.create_profile)
						.setEmoji(ui.emojis.approval)
						.setLabel(ui.interactions.texts.create_profile)
						.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId(ui.interactions.ids.reject)
						.setEmoji(ui.emojis.disapproval)
						.setLabel(ui.interactions.texts.reject)
						.setStyle(ButtonStyle.Secondary),
				)

				interaction.reply({embeds: [embed], components: [actionRow], flags: MessageFlags.Ephemeral})

				// const modal = new ModalBuilder()
				// 	.setTitle('Create your profile!')
				// 	.setCustomId('profile-username-modal')
				// 	.setComponents(
				// 		new ActionRowBuilder().addComponents(
				// 			new TextInputBuilder()
				// 				.setCustomId('profile-username-textinput')
				// 				.setLabel("Username")
				// 				.setStyle(TextInputStyle.Short)
				// 				.setRequired(true)
				// 		)
				// 	)

				// await interaction.showModal(modal)
				return
			} else { // Display profile
				return
			}
		}
	},
};