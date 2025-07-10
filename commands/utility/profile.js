const { SlashCommandBuilder, SlashCommandStringOption, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("profile")
		.setDescription("Create your profile or check other profiles.")
		.addStringOption(
			new SlashCommandStringOption()
				.setName("target")
            	.setDescription("Mention or in-game name.")
				.setRequired(false)
        ),
	async execute(interaction, db) {
		const target = interaction.options.getString("target")

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
			} else { // Display profile

			}
		}
	},
};